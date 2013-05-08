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

var weixinManage = {};

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase('http://localhost:7474');
var nodeId = 2;//create a node in Neo4j monitoring and management tools, and put its node id here.

var RSA = require('./../tools/RSA');
weixinManage.add = function (data, response) {
    response.asynchronous = 1;
    account =
    {
        "uid": data.uid,
        "type": "account",
        "accesskey": data.accesskey,
        "weixinOpenID": data.weixinOpenID,
        "weixinName": data.weixinName,
        "token": "fdfsafsa"
    };
    var node = db.createNode(account);
    node.save(function (err, node) {
        node.data.uid = node.id;
        node.index("account", "uid", account.uid);
        node.index("account", "weixinOpenID", account.weixinOpenID);
        node.index("account", "weixinName", account.weixinName);
        node.index("account", "accesskey", account.accesskey);
        node.save(function (err, node) {
            response.write(JSON.stringify({
                "information": "添加成功！",
                "node": node.data
            }));
            response.end();
        });
    });
}

weixinManage.delet = function(data, response) {
    response.asynchronous = 1;
    account =
    {
        "uid": data.uid,
        "type": "account",
        "accesskey": data.accesskey,
        "weixinOpenID": data.weixinOpenID,
        "weixinName": data.weixinName,
        "token": "fdfsafsa"
    }
    var node = db.delete(uid, force=ture);
    node.data.uid = node.id;
        node.index("account", "uid", account.uid)
            response.write(JSON.stringify({
                "information": "delete  success",
                "node": node.data
            }));
            response.end();
}

weixinManage.modify = function(data, response) {
    response.asynchronous = 1;
    account =
    {
        "uid": data.uid,
        "type": "account",
        "accesskey": data.accesskey,
        "weixinOpenID": data.weixinOpenID,
        "weixinName": data.weixinName,
        "token": "fdfsafsa"
    }
    var node = db.index(data.uid ,data.accesskey , data.weixinOpenID, data.weixinName,"fdfsfsa");
    node.data.uid = node.id;
    node.index("account", "uid", account.uid)
    response.write(JSON.stringify({
        "information": "delete  success",
        "node": node.data
    }));
    response.end();
}

module.exports = weixinManage;