var parser = require('./../tools/sax2json');


var weixinuser = {};
var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase('http://localhost:7474');

weixinuser.weixinuser = function (data, response) {
    response.asynchronous = 1;

    var now = new Date();
    console.log("receive message:");
    for (var key in data) {
        console.log("key:");
        console.log(key);
        //        console.log("value:");
        //        console.log(data[key]);
        var messageXML = key;
        parser.toJson(messageXML, function (error, messageJSON) {

            var message = messageJSON.XML;
            console.log(message);
            var reply = {
                xml: {
                    ToUserName: {'$cdata': message.FROMUSERNAME},
                    FromUserName: {'$cdata': message.TOUSERNAME},
                    CreateTime: {'$t': now.getTime().toString().substr(0,10)},
                    MsgType: {'$cdata': "text"},
                    Content: {'$cdata': "你好！app智能回复。"},
                    FuncFlag: {'$t': "0"}
                }
            };

            var replyXML = parser.toXml(reply);
            console.log(replyXML);
            response.write(replyXML);
            response.end();

            var wxuser = {
                "wid": message.TOUSERNAME,
                "type": "wxuser",
                "phone": "",
                "email": "",
                 "address": ""
            };

                var node = db.createNode(wxuser);
                node.save(function (err, node) {
                    node.data.wid = wxuser.wid;
                    node.index("wxuser", "phone", wxuser.phone);
                    node.index("wxuser", "email", wxuser.email);
                    node.index("wxuser", "wid", wxuser.wid);
//                    node.save(function (err, node) {
//                        response.write(JSON.stringify({
//                            "提示信息": "添加成功",
//                            "wid": node.data.uid,
//                            "phone": node.data.phone,
//                            "wxuser": node.data.wxuser
//                        }));
//                        response.end();
//                    });
                });

            });
    }
}


module.exports = weixinuser;