var parser = require('./../tools/sax2json');


var message = {};


message.message = function (data, response) {
    response.asynchronous = 1;

    var now = new Date();
    console.log("receive message:");
    //    console.log(typeof (data));
    //    console.log(data);
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
        });
    }
}


module.exports = message;