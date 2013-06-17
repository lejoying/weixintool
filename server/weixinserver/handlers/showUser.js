/**
 * Demo of reading and writing data with neo4j.
 * Date: 2013.04.15
 * Request:
 *  http://127.0.0.1:8062/api2/weixinuer/weixinMessage/add
 * Response:
 *  "{}"
 *
 * Request:
 *  http://127.0.0.1:8062/api2/account/auth?i=0
 * Response:
 *  "{}"
 */

var showUser = {};

var serverSetting = root.globaldata.serverSetting;

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase(serverSetting.neo4jUrl);

/***************************************
 *     URL：/api2/showUser/show
 ***************************************/

showUser.show = function (data, response) {
    response.asynchronous = 1;
    db.getIndexedNode("account", "accountName", "kekegcycom", function (err, newNode) {
        db.getIndexedRelationships(index, property, value, function (err, newNode) {
            newNode.getRelationshipNodes(newNode, function (err, node) {
                if (node == null) {
                    response.write(JSON.stringify({
                        "提示信息": "获得关系失败",
                        "失败原因": "关系不存在"
                    }));
                    response.end();
                } else {
//                node[0].del();
                    response.write(JSON.stringify({
                        "提示信息": "找到关系"
                    }));
                    response.end();
                }
            });
        });
    });
}
/***************************************
 *     URL：/api2/showUser/adduser
 ***************************************/
showUser.adduser = function (data, response) {
    response.asynchronous = 1;
    var account = {
        "uid": data.uid,
        "type": "account",
        "token": data.token
    };

    db.getIndexedNode("account", "accountName", account.accountName, function (err, node) {
        if (account.accountName == "" || account.accountName == null) {
            response.write(JSON.stringify({
                "提示信息": "添加用户失败",
                "reason": "用户不能为空"
            }));
            response.end();
        }
        else {
            if (node == null) {
                var node = db.createNode(account);
                node.save(function (err, node) {
                    node.data.uid = node.id;
                    node.index("account", "uid", account.uid);
                    node.save(function (err, node) {
                        response.write(JSON.stringify({
                            "提示信息": "添加用户成功",
                            "uid": node.data.uid
                        }));
                        response.end();
                    });
                });
            } else {
                response.write(JSON.stringify({
                    "提示信息": "添加用户失败",
                    "reason": "用户已存在"
                }));
                response.end();
            }
        }

    });
}

module.exports = showUser;