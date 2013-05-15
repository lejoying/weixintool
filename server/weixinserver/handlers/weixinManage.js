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

/***************************************
 *     URL：/api2/weixinuer/add
 ***************************************/
var RSA = require('./../tools/RSA');
weixinManage.add = function (data, response) {
    response.asynchronous = 1;
    var weixin =
    {
        "uid": data.uid,
        "type": "weixin",
        "accesskey": data.accesskey,
        "weixinOpenID": data.weixinOpenID,
        "weixinName": data.weixinName,
        "token": "fdfsafsa"
    };

    db.getIndexedNode("weixin", "weixinOpenID", weixin.weixinOpenID, function (err, node) {
        if (node == null) {
            weixinAdd();
        }
        else {
            response.write(JSON.stringify({
                "提示信息": "添加微信绑定用户失败",
                "node": node.data
            }));
            response.end();
        }
    });
    function weixinAdd(){
        var node = db.createNode(weixin);
        node.save(function (err, node) {
            node.data.uid = node.id;
            node.index("weixin", "uid", weixin.uid);
            node.index("weixin", "weixinOpenID", weixin.weixinOpenID);
            node.index("weixin", "weixinName", weixin.weixinName);
            node.index("weixin", "accesskey", weixin.accesskey);
            node.save(function (err, node) {
                response.write(JSON.stringify({
                    "提示信息": "添加微信绑定用户成功",
                    "node": node.data
                }));
                response.end();
            });
        });
    }
}
/***************************************
 *     URL：/api2/weixinuer/delete
 ***************************************/
weixinManage.delete = function(data, response) {
    response.asynchronous = 1;
    var weixin =
    {
        "uid": data.uid,
        "type": "weixin",
        "accesskey": data.accesskey,
        "weixinOpenID": data.weixinOpenID,
        "weixinName": data.weixinName
    }
    db.getIndexedNode("weixin", "weixinOpenID",weixin.weixinOpenID, function (err, node){
        if (node != null){
            node.delete();
            response.write(JSON.stringify({
                "information": "删除微信绑定用户成功",
                "node": node.data
            }));
            response.end();
        }else {
            response.write(JSON.stringify({
                "提示信息": "删除微信绑定用户失败",
                "reason": "微信用户不存在。"
            }));
            response.end();
        }
    });
}
/***************************************
 *     URL：/api2/weixinuer/modify
 ***************************************/
weixinManage.modify = function(data, response) {
    response.asynchronous = 1;
    var weixin =
    {
        "uid": data.uid,
        "type": "weixin",
        "accesskey": data.accesskey,
        "weixinOpenID": data.weixinOpenID,
        "weixinName": data.weixinName,
        "token": "ChrisGai"
    }
    db.getIndexedNode("weixin", "weixinOpenID",weixin.weixinOpenID, function (err, node){
        if (node != null){
            node.index("weixin", "weixinOpenID",weixin.weixinOpenID);
            node.index("weixin", "weixinName",weixin.weixinName);
            node.index("weixin", "accesskey",weixin.accesskey);
            node.index("weixin", "token",weixin.token);
            response.write(JSON.stringify({
                "information": "修改微信绑定用户成功",
                "node": node.data
            }));
            response.end();
        }else {
            response.write(JSON.stringify({
                "提示信息": "修改微信绑定用户失败",
                "reason": "微信用户不存在。"
            }));
            response.end();
        }
    });
}

module.exports = weixinManage;