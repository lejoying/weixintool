/**
 * Demo of reading and writing data with neo4j.
 * Date: 2013.05.20
 * Request:
 *  http://127.0.0.1:8062/api2/message/weixinMessage/add
 * Response:
 *  "{}"
 */

var messageManage = {};

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase('http://localhost:7474');
var nodeId = 2;//create a node in Neo4j monitoring and management tools, and put its node id here.

/***************************************
 *     URL：/api2/message/add
 ***************************************/

var RSA = require('./../tools/RSA');
messageManage.add = function (data, response) {
    response.asynchronous = 1;
    var weixinid = data.weixinOpenID;

    db.getNodeById(weixinid, function (err, accountNode) {
        if (accountNode == null) {
            response.write(JSON.stringify({
                "提示信息": "添加微信信息失败",
                "失败原因": "账号不存在"
            }));
            response.end();
        }
        else {
            next(accountNode);
        }
    });
    function next(accountNode) {
        var message =
        {
            "type": "message",
            "weixinOpenID": data.weixinOpenID,
            "phone": data.phone,
            "email": data.email
        };

        db.getIndexedNode("message", "weixinOpenID", message.weixinOpenID, function (err, node) {
            if (node == null) {
                weixinAdd();
            }
            else {
                response.write(JSON.stringify({
                    "提示信息": "添加信息失败",
                    "node": node.data
                }));
                response.end();
            }
        });
        function weixinAdd() {
            var weixinNode = db.createNode(message);
            weixinNode.save(function (err, weixinNode) {
                weixinNode.data.weixinOpenID = weixinNode.id;
                weixinNode.index("message", "weixinOpenID", weixinNode.id);
//                weixinNode.index("message", "weixinOpenID", message.weixinOpenID);
                weixinNode.index("message", "phone", message.phone);
                weixinNode.index("message", "email", message.email);
                weixinNode.index("message", "message", message.message);
                weixinNode.save(function (err, weixinNode) {

                    weixinNode.createRelationshipFrom(accountNode, "OWNEDR");
                    response.write(JSON.stringify({
                        "提示信息": "添加信息成功",
                        "node": weixinNode.data
                    }));
                    response.end();
                });
            });
        }
    }


}
/***************************************
 *     URL：/api2/weixinuer/delete
 ***************************************/

/***************************************
 *     URL：/api2/weixinuer/modify
 ***************************************/
messageManage.modify = function (data, response) {
    response.asynchronous = 1;
    var information =
    {
        "type": "information",
        "phone": data.phone,
        "email": data.email,
        "weixinOpenID": data.weixinOpenID
    }
    db.getIndexedNode("information", "weixinOpenID", weixin.weixinOpenID, function (err, node) {
        if (node != null) {
//            node.getRelationshipNodes("weixin", "weixinOpenID",weixin.weixinOpenID ,function(err, node){})
            node.save(function (err, node) {
//                node.data.weixinName = weixin.weixinName;
//                node.data.token = weixin.token;
                node.index("information", "weixinName", weixin.weixinName);
                node.index("information", "information", weixin.information);
                node.index("information", "phone", weixin.phone);
                node.index("information", "email", weixin.email);
                node.save(function (err, node) {
                    response.write(JSON.stringify({
                        "提示信息": "添加信息成功",
                        "node": node.data
                    }));
                    response.end();
                });
            });

        } else {
            response.write(JSON.stringify({
                "提示信息": "添加信息失败",
                "reason": "微信用户不存在"
            }));
            response.end();
        }
    });
}

module.exports = messageManage;