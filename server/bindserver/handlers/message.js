var message = {};

var serverSetting = root.globaldata.serverSetting;

var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(serverSetting.neo4jUrl);

var parser = require('./../tools/sax2json');
var base64 = require('./../tools/base64');
var replyTemplate = require('./../tools/replyTemplate');
var ajax = require('./../lib/ajax.js');
var vm = require('vm');
var http = require('http');
var scriptPool = {};
var redis = require("redis");
var saveClient_from;
var saveClient_reply;

var debug = serverSetting.debug;

message.message = function (data, getParam, response) {
    response.asynchronous = 1;

    var timestamp = getParam.timestamp;
    var nonce = getParam.nonce;
    var signature = getParam.signature;

    var now = new Date();

    /*************************************** ***************************************
     *    parse XML
     *************************************** ***************************************/
    for (var key in data) {
//        console.log("key:");
//        console.log(key);
        var messageXML = key;
        parser.toJson(messageXML, function (error, messageJSON) {
            var messageData = messageJSON.XML;
//            console.log(messageData.TOUSERNAME+"______"+messageData.CONTENT);
            next(messageData);
        });
    }
    function next(messageData) {
        /*************************************** ***************************************
         *    resolve message
         *************************************** ***************************************/
        var message;
        resolveMessage(messageData);

        function resolveMessage(messageData) {
            message = {
                type: messageData.MSGTYPE,
                MsgId: messageData.MSGID,
                text: {
                    content: messageData.CONTENT
                },
                image: {
                    picUrl: messageData.PICURL
                },
                location: {
                    location_X: messageData.LOCATION_X,
                    location_Y: messageData.LOCATION_Y,
                    scale: messageData.SCALE,
                    label: messageData.LABEL
                },
                link: {
                    title: messageData.TITLE,
                    description: messageData.DESCRIPTION,
                    url: messageData.URL
                },
                event: {
                    eventType: messageData.EVENT,
                    EventKey: messageData.EVENTKEY
                },
                CreateTime:now.getTime()
            };
        }

        /*************************************** ***************************************
         *    saveMessages
         *************************************** ***************************************/

        console.log(message);
        saveClient_from = redis.createClient();
        saveClient_from.rpush(messageData.TOUSERNAME,JSON.stringify(message),function(err,reply){
            if(err!=null){
                console.log(err);
            }
            saveClient_from.end();
        });

        /*************************************** ***************************************
         *    resolve reply
         *************************************** ***************************************/
        var reply;
        resolveReply();

        function resolveReply() {
            reply = {
                ToUserName: "",
                FromUserName: "",
                CreateTime: now.getTime(),
                type: "text",
                text: {
                    content: ""
                },
                music: {
                    Title: "我的音乐",
                    Description: "我的音乐很好听",
                    MusicUrl: "http://124.202.164.17/download/24482991/31451002/1/mp3/107/128/1320945678443_384/LS9MDWtPO6z7yvJnA9bg==.mp3",
                    HQMusicUrl: "http://124.202.164.17/download/24482991/31451002/1/mp3/107/128/1320945678443_384/LS9MDWtPO6z7yvJnA9bg==.mp3"
                },
                news: {
                    ArticleCount: 2,
                    Articles: [
                        {
                            Title: "拥护共产党的领导",
                            Description: "践行中国梦",
                            PicUrl: "http://www.baidu.com/img/bdlogo.gif",
                            Url: "http://www.baidu.com/img/bdlogo.gif"
                        },
                        {
                            Title: "拥护共产党的路线",
                            Description: "实现中国梦",
                            PicUrl: "http://www.baidu.com/img/bdlogo.gif",
                            Url: "http://www.baidu.com/img/bdlogo.gif"
                        }
                    ]
                },
                log: "【公众账号管理工具.】\n"
            };
        }

        /*************************************** ***************************************
         *    resolve weixin and its bind apps
         *************************************** ***************************************/
        var weixin =
        {
            weixinOpenID: messageData.TOUSERNAME,
            weixinName: "",
            token: "",
            status: ""
        };

        var bindApps = [];

        function startResolve() {
            resolveWeixinANDBindApps(weixin);
        }

        function resolveWeixinANDBindApps(weixin) {
            var query = [
                'MATCH app:App-[pr:BIND]->weixin:Weixin<-[cr:HAS_WEIXIN]-account:Account' ,
                'WHERE weixin.weixinOpenID! ={weixinOpenID} AND app.status! ="true"',
                'RETURN  weixin, app, pr, cr'  //resolve weixin data in r
            ].join('\n');

            var params = {
                weixinOpenID: weixin.weixinOpenID
            };

            db.query(query, params, function (error, results) {
                if (error) {
                    console.error(error);
                }
                if (results.length == 0) {
                    reply.log += "【调试信息】绑定weixinOpenID/::)\n"
                    checkToken(weixin, next);
                } else {
                    var weixinNode = results[0].weixin;
                    reply.log += "【调试信息】weixinOpenID已存在对应关系/::)\n"
                    weixin.weixinName = weixinNode.data.weixinName;
                    reply.log += "【调试信息】公共账号名称" + weixinNode.data.weixinName + "/::)\n"

                    for (var index in results) {
                        var appNode = results[index].app;
                        var bindApp = {
                            script: appNode.data.script,
                            name: appNode.data.name,
                            appid: appNode.data.appid,
                            type: appNode.data.type,
                            replytxt: appNode.data.replytxt,
                            cr: results[index].cr.data,
                            pr: results[index].pr.data,
                            data: appNode.data.data
                        }
                        bindApps.push(bindApp);
                        reply.log += "【调试信息】绑定应用：" + appNode.data.appid + "/::)\n"
                    }

                    if (checkSignature(weixinNode.data.token, timestamp, nonce, signature) == true) {
                        next();
                    } else {
                        reply.log += "【调试信息】签名消息不匹配/::)\n"
                        checkToken(weixin, next);
                    }
                }
                function next() {
                    resolveUser(user, weixin);
                }
            });
        }


        function checkToken(weixin, next) {
            var query = [
                'MATCH weixin:Weixin' ,
                'WHERE weixin.status! ={status}',
                'RETURN  weixin'
            ].join('\n');

            var params = {
                status: "bind_server"
            };

            db.query(query, params, function (error, results) {
                if (error) {
                    console.error(error);
                } else {
                    var weixins = {};
                    for (var index in results) {
                        var weixinNode = results[index].weixin;

                        weixins[weixinNode.data.token] = {
                            weixinNode: weixinNode
                        };
                    }
                    var bindingToken;
                    for (var index in weixins) {
                        if (checkSignature(index, timestamp, nonce, signature) == true) {
                            bindingToken = index;
                            break;
                        }
                    }
                    if (bindingToken == null) {
                        reply.log += "【调试信息】没有微信token对应于该weixinOpenID/::)\n"
                        next();
                    } else {
                        weixin.token = bindingToken;
                        var bindingWeixin = weixins[bindingToken];
                        console.log(bindingToken + "---");
                        weixin.weixinName = bindingWeixin.weixinNode.data.weixinName;
                        weixin.status = "bind_message";
                        reply.log += "【调试信息】新建微信token与weixinOpenID的对应关系/::)\n";
                        reply.log += "【调试信息】微信节点不存在，新建微信/::)" + weixin.weixinOpenID + "\n";
                        checkWeixin(weixin, next);
                    }
                }
            });
        }

        function checkWeixin(weixin, next) {
            var query = [
                'MATCH weixin:Weixin' ,
                'WHERE weixin.weixinOpenID! ={weixinOpenID}',
                'RETURN weixin'
            ].join('\n');
            var params = {
                weixinOpenID: weixin.weixinOpenID,
                token: weixin.token,
                status: "bind_message"
            };

            db.query(query, params, function (error, results) {
                if (error) {
                    console.error(error);
                }
                if (results.length == 0) {
                    addNewWeixin(weixin, next);
                } else {
                    reply.log += "【调试信息】已有微信公众账号，修改绑定信息/::)" + "\n";
                    var weixinNode = results.pop().weixin;
                    weixinNode.data.token = weixin.token;
                    weixinNode.data.weixinName = weixin.weixinName;
                    weixinNode.save(function (err, node) {

                    });

                    deleteUnusedWeixin(weixin, next);
                }
            });
        }

        function deleteUnusedWeixin(weixin, next) {
            var query = [
                'MATCH other-[r]-weixin:Weixin' ,       //?????
                'WHERE weixin.status! ={status1} OR weixin.status! ={status2}',
                'DELETE  weixin, r'
            ].join('\n');
            var params = {
                status1: "binding",
                status2: "bind_server"
            };
            db.query(query, params, function (error, results) {
                if (error) {
                    console.error(error);
                } else {
                    reply.log += "【调试信息】删除无用微信/::)" + "\n";
                    next();
                }
            });

        }

        function addNewWeixin(weixin, next) {
            var query = [
                'MATCH weixin:Weixin, app:App' ,
                'WHERE weixin.token! ={token} AND app.appid! = 99',
                'CREATE UNIQUE app-[r:BIND]->weixin',
                'SET weixin.status={status}, weixin.weixinOpenID={weixinOpenID}',
                'RETURN  app, weixin, r'
            ].join('\n');
            var params = {
                weixinOpenID: weixin.weixinOpenID,
                token: weixin.token,
                status: "bind_message"
            };

            db.query(query, params, function (error, results) {
                if (error) {
                    console.error(error);
                } else {
                    var weixinNode = results.pop().weixin;
                    next();
                }
            });
        }

        /*************************************** ***************************************
         *    resolve user
         *************************************** ***************************************/
        Date.prototype.format = function (format) {
            var o =
            {
                "M+": this.getMonth() + 1, //month
                "d+": this.getDate(),    //day
                "h+": this.getHours(),   //hour
                "m+": this.getMinutes(), //minute
                "s+": this.getSeconds(), //second
                "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
                "S": this.getMilliseconds() //millisecond
            }
            if (/(y+)/.test(format))
                format = format.replace(RegExp.$1, (this.getFullYear() + ""));
            for (var k in o)
                if (new RegExp("(" + k + ")").test(format))
                    format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            return format;
        }

        var user = {
            id: messageData.FROMUSERNAME,
            time: new Date().format("yy-MM-dd")
        }

        function resolveUser(user, weixin) {
            var query = [
                'MATCH user:User-[r:FOCUS]->weixin:Weixin' ,
                'WHERE user.id! ={userID} AND weixin.weixinOpenID! ={weixinOpenID}',
                'RETURN  user'
            ].join('\n');

            var params = {
                userID: user.id,
                weixinOpenID: weixin.weixinOpenID
            };

            db.query(query, params, function (error, results) {
                if (error) {
                    console.error(error);
                }
                if (results.length == 0) {
                    reply.log += "【调试信息】新增关注用户/::)" + user.id + "\n"
                    checkUser(user, weixin, next);
                } else {
                    var userNode = results.pop().user;
                    reply.log += "【调试信息】用户已存在对应关系/::)\n"
                    reply.log += "【调试信息】用户id:" + userNode.data.id + "/::)\n"
                    next(userNode);
                }
                function next(userNode) {
                    var userDate = userNode.data;
                    user.city = userDate.city;
                    /*var reg = /^[A-Za-z]{2}\d{0,}$/;
                     if(reg.test(messageData.CONTENT)){
                     checkWeixinAndApp(next);
                     //                        replyPublicApp(userDate.city);
                     }else{
                     sandbox();
                     //                        replyMyApp();
                     }*/
                    for (var index in userDate) {
                        user[index] = userDate[index];
                    }
                    reply.log += "【调试信息】用户信息：/::)" + JSON.stringify(user) + "\n";
                    sandbox();
//                    console.log(message.location.location_X+"--"+message.location.location_Y+"\n"+JSON.stringify(message));
                    /*function next(){
                     replyPublicAppTQ(userDate.city);
                     }*/
                }
            });
        }

        function checkUser(user, weixin, next) {
            var query = [
                'MATCH user:User' ,
                'WHERE user.id! ={userID}',
                'RETURN  user'
            ].join('\n');

            var params = {
                userID: user.id
            };

            db.query(query, params, function (error, results) {
                if (error) {
                    console.error(error);
                }
                if (results.length == 0) {
                    reply.log += "【调试信息】用户不存在，新建用户/::)" + user.id + "\n";
                    var query = [
                        'MATCH weixin:Weixin' ,
                        'WHERE weixin.weixinOpenID! ={weixinOpenID}',
                        'CREATE UNIQUE user:User{user}-[r:FOCUS]->weixin',
                        'RETURN  user, weixin, r'
                    ].join('\n');

                    addNewUser(query, user, weixin, next);
                } else {
                    var userNode = results.pop().user;
                    reply.log += "【调试信息】用户已存在，新建关注关系/::)\n";
                    reply.log += "【调试信息】用户id:" + userNode.data.id + "/::)\n"
                    var query = [
                        'MATCH weixin:Weixin, user:User' ,
                        'WHERE weixin.weixinOpenID! ={weixinOpenID} AND user.id={userID}',
                        'CREATE UNIQUE user-[r:FOCUS]->weixin',
                        'RETURN  user, weixin, r'
                    ].join('\n');
                    addNewUser(query, user, weixin, next);
                }
            });
        }

        function addNewUser(query, user, weixin, next) {

            var params = {
                user: user,
                userID: user.id,
                weixinOpenID: weixin.weixinOpenID
            };

            db.query(query, params, function (error, results) {
                if (error) {
                    console.error(error);
                } else {
                    var userNode = results.pop().user;
                    next(userNode);
                }
            });
        }


        /*************************************** ***************************************
         *    sandbox
         *************************************** ***************************************/
        function sandbox() {
            try {
                test(api, message, reply, weixin, user, bindApps);
            } catch (error) {
                console.error(error)
            }
//            api.sendReply();
        }

        function test(api, message, reply, weixin, user, bindApps) {
            var sandbox = { api: api, message: message, reply: reply, weixin: weixin, user: user, bindApp: null};
//                var userDate = userNode.data;
            var reg = /^[A-Za-z]{2}\d{0,}$/;
            var reg1 = /^[A-Za-z]{2}([\u4e00-\u9fa5]|[A-Za-z0-9#]){0,}$/;
                if (reg1.test(messageData.CONTENT)) {
                    var flag = false;
                for (var index in bindApps) {
                    var bindApp = bindApps[index];
                    if (bindApp.replytxt == undefined || bindApp.replytxt == "") {
                        continue;
                    }
                    var a = bindApp.replytxt.substr(0, 2).toUpperCase();
                    var b = message.text.content.substr(0, 2).toUpperCase();
                    if (a == b) {
                        flag = true;
                        next();
                        break;
                    }
                }
                if (!flag) {
                    reply.text.content = "没有绑定对应的应用";
                    api.sendReply();
                }
//                    checkWeixinAndApp(next);
            } else {
                //个性化设置的回复
                for (var index in bindApps) {
                    var bindApp = bindApps[index];
                    if (bindApp.type == "private") {
                        next();
                        break;
                    }
                }
            }
            function next() {
                var script = scriptPool[bindApp.appid];
                if (script == null) {
                    reply.log += "【调试信息】新建应用脚本" + bindApp.appid + "/::)\n";
                    var script_code = base64.decode(bindApp.script);
                    var script = vm.createScript(script_code);
                    scriptPool[bindApp.appid] = script;
                    console.log(script_code);
                }
                sandbox.bindApp = bindApp;
                reply.log += "【调试信息】调用应用脚本" + bindApp.appid + "/::)\n";
                script.runInNewContext(sandbox, {}, "loop", 1000);
            }
        }

        /*************************************** ***************************************
         *    api
         *        api.saveData();
         *        api.sendReply();
         *************************************** ***************************************/
        var api = {};
//        api.db = db;
//        api.http = http;
        api.ajax = ajax;
        var replySent = false;
        api.sendReply = function () {
            if (replySent == true) {
                return false;
            }

            reply.type = "text";
            if (debug == true) {
                reply.text.content = reply.text.content;
                //reply.text.content = reply.log; //+ reply.text.content;
//                console.log(reply.text.content);
                reply.userid = user.id;
                reply.weixinOpenID = weixin.weixinOpenID;
                reply.createTime = now.getTime().toString().substr(0, 10);
                var replyXML = replyTemplate.render(reply);
                response.write(replyXML,function(){

                    saveClient_reply = redis.createClient();
                    saveClient_reply.rpush(weixin.weixinOpenID,JSON.stringify(reply),function(err,r){
                         if(err!=null){
                             console.log(err);
                         }
                        saveClient_reply.end();
                    });
                });
                response.end();
                replySent = true
                return true;
            }
        }

        var dataSaved = false;
        api.saveData = function (app) {
            if (message.text.content.substr(0, 2).toUpperCase() == "PH") {
                modifyWeixinAndAppRela(app)
            }
            return true;
        }

        //对公共应用排号data数据的保存
        function modifyWeixinAndAppRela(app) {
            query = [
                'MATCH app:App-[r:BIND]->weixin:Weixin' ,
                'WHERE weixin.weixinOpenID! ={weixinOpenID} AND app.appid! ={appid}',
                'RETURN  r'
            ].join('\n');

            var params = {
                weixinOpenID: weixin.weixinOpenID,
                appid: app.appid
            };

            db.query(query, params, function (error, results) {
                if (error) {
                    console.error(error);
                    return false;
                } else {
                    var rNode = results.pop().r;
                    rNode.data.data = app.pr.data;
                    rNode.data.time = app.pr.time;
                    rNode.save();
                }
            });
        }

        startResolve();
    }
}

var sha1 = require('./../tools/sha1');
function checkSignature(token, timestamp, nonce, signature) {

    var strings = [timestamp , nonce , token];
    var sortedStrings = strings.sort();
    var string = sortedStrings.join().replace(/,/g, "");
    var signatureSHA = sha1.hex_sha1(string);
    if (signatureSHA == signature) {
        return true;
    }
    else {
        return false;
    }
}

module.exports = message;