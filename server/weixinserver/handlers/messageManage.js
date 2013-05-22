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

messageManage.add = function (data, response) {
    response.asynchronous = 1;
    var account = {
        "message": data.message,
        "type": "account"
    };

    db.getIndexedNode("account", "message", account.message, function (err, node) {
        if (account.message != null) {
            addAccountToNeo4j();
        } else {
            response.write(JSON.stringify({
                "提示信息": "发送消息失败",
                "reason": "信息不存在"
            }));
            response.end();
        }
    });

    function addAccountToNeo4j() {
        var node = db.createNode(account);
        node.save(function (err, node) {
            node.data.uid = node.id;
            node.index("account", "message", account.message);
            node.save(function (err, node) {
                response.write(JSON.stringify({
                    "提示信息": "发送消息成功",
                    "uid": node.data.uid,
                    "acccesskey": node.data.accessKey
                }));
                response.end();
            });
        });
    }
}

/***************************************
 *     URL：/api2/weixinuer/delete
 ***************************************/

/***************************************
 *     URL：/api2/weixinuer/modify
 ***************************************/


module.exports = messageManage;