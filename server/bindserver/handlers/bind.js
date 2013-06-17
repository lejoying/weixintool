var bind = {};

var serverSetting = root.globaldata.serverSetting;

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase(serverSetting.neo4jUrl);

var sha1 = require('./../tools/sha1');

var push = require('../lib/push');

bind.message = function (data, response) {
    response.asynchronous = 1;
    var echostr = data.echostr;

    var timestamp = data.timestamp;
    var nonce = data.nonce;
    var signature = data.signature;

    var token = "1489099100";

    checkToken();

    function checkToken() {
        var query = [
            'MATCH account:Account-[:HAS_WEIXIN]->weixin:Weixin' ,
            'WHERE weixin.status! ={status}',
            'RETURN  weixin, account'
        ].join('\n');

        var params = {
            status: "binding"
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
            } else {
                var weixins = {};
                for (var index in results) {
                    var weixinNode = results[index].weixin;
                    var accountNode = results[index].account;
                    var weixin = weixinNode.data;

                    weixins[weixin.token] = {
                        weixinNode: weixinNode,
                        accountNode:accountNode
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
                    response.write("忠实于共产党");
                    response.end();
                } else {

                    var bindingWeixin = weixins[bindingToken];
                    bindingWeixin.weixinNode.data.status = "bind_server";
                    bindingWeixin.weixinNode.save();

                    push.notify(bindingWeixin.accountNode.data.uid, "*", {
                        eventID: "bind_server",
                        data: {bindingToken: bindingToken}
                    });

                    response.write(echostr);
                    response.end();
                }
            }
        });
    }

}


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

module.exports = bind;