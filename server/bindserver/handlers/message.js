var message = {};

var serverSetting = root.globaldata.serverSetting;

var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase(serverSetting.neo4jUrl);

var parser = require('./../tools/sax2json');
message.message = function (data, getParam, response) {
    response.asynchronous = 1;

    var timestamp = getParam.timestamp;
    var nonce = getParam.nonce;
    var signature = getParam.signature;

    var now = new Date();
    for (var key in data) {
//        console.log("key:");
//        console.log(key);
        var messageXML = key;
        parser.toJson(messageXML, function (error, messageJSON) {

            var messageData = messageJSON.XML;
//            var replyData

            var user = {
                id: messageData.FROMUSERNAME
            };
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
                    }
                };
            }

            var reply;
            resolveReply();

            function resolveReply() {
                reply = {
                    type: "text",
                    text: {
                        content: "【公众账号管理工具】\n"
                    },
                    music: {
                        MusicUrl: "http://baidu.com/lala.map4",
                        HQMusicUrl: "http://baidu.com/lala.map5"
                    },
                    news: {
                        ArticleCount: 2,
                        Articles: [
                            {
                                Title: "拥护共产党的领导",
                                description: "践行中国梦",
                                picUrl: "http://baidu.com",
                                url: "http://baidu.com"
                            },
                            {
                                Title: "拥护共产党的路线",
                                description: "实现中国梦",
                                picUrl: "http://baidu.com",
                                url: "http://baidu.com"
                            }
                        ]
                    }
                };
            }

            var weixin =
            {
                weixinOpenID: messageData.TOUSERNAME,
                weixinName: "",
                token: "",
                status: ""
            };

            resolveWeixin(weixin);

            function resolveWeixin(weixin) {
                var query = [
                    'MATCH weixin:Weixin' ,      //get the app bind with the weixin at the same time.
                    'WHERE weixin.weixinOpenID! ={weixinOpenID}',
                    'RETURN  weixin'
                ].join('\n');

                var params = {
                    weixinOpenID: weixin.weixinOpenID
                };

                db.query(query, params, function (error, results) {
                    if (error) {
                        console.error(error);
                    }
                    if (results.length == 0) {
                        reply.text.content += "【调试信息】绑定weixinOpenID/::)\n"
                        checkToken(next);
                    } else {
                        var weixinNode = results.pop().weixin;
                        reply.text.content += "【调试信息】weixinOpenID已存在对应关系/::)\n"
                        reply.text.content += "【调试信息】公共账号名称" + weixinNode.data.weixinName + "/::)\n"
                        next();
                    }
                    function next() {
                        sendReply();
                    }
                });
            }


            function checkToken(next) {
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
                            reply.text.content += "【调试信息】没有微信token对应于该weixinOpenID/::)\n"

                        } else {

                            var bindingWeixin = weixins[bindingToken];
                            bindingWeixin.weixinNode.data.weixinOpenID = weixin.weixinOpenID;
                            bindingWeixin.weixinNode.data.status = "bind_message";
                            bindingWeixin.weixinNode.save();
                            reply.text.content += "【调试信息】微信token对应weixinOpenID/::)\n"
                        }
                        next();
                    }
                });
            }


            function sendReply() {
//                reply.text="sadfsaf";
                var replyData = {
                    xml: {
                        ToUserName: {'$cdata': user.id},
                        FromUserName: {'$cdata': weixin.weixinOpenID},
                        CreateTime: {'$t': now.getTime().toString().substr(0, 10)},
                        MsgType: {'$cdata': reply.type},
                        Content: {'$cdata': "@@@@"},
                        FuncFlag: {'$t': "0"}
                    }
                };
                var replyXML = parser.toXml(replyData);
                replyXML = replyXML.replace("@@@@", reply.text.content);
                response.write(replyXML);
                response.end();
            }


        });
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