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
    var uid = data.uid;

    db.getNodeById(uid, function (err, accountNode) {
        if (accountNode == null) {
            response.write(JSON.stringify({
                "提示信息": "添加微信绑定用户失败",
                "失败原因": "账号不存在"
            }));
            response.end();
        }
        else {
            next(accountNode);
        }
    });
    function next(accountNode) {
        var weixin =
        {
            "type": "weixin",
            "weixinOpenID": data.weixinOpenID,
            "weixinName": data.weixinName,
            "token": data.token
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
        function weixinAdd() {
            var weixinNode = db.createNode(weixin);
            weixinNode.save(function (err, weixinNode) {
                weixinNode.data.weixinid = weixinNode.id;
                weixinNode.index("weixin", "weixinid", weixinNode.id);
                weixinNode.index("weixin", "weixinOpenID", weixin.weixinOpenID);
                weixinNode.save(function (err, weixinNode) {

                    weixinNode.createRelationshipFrom(accountNode, "OWNED");
                    response.write(JSON.stringify({
                        "提示信息": "添加微信绑定用户成功",
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
weixinManage.delete = function (data, response) {
    response.asynchronous = 1;
    var weixin =
    {
        "type": "weixin",
        "accesskey": data.accesskey,
        "weixinOpenID": data.weixinOpenID,
        "weixinName": data.weixinName
    }
    db.getIndexedNode("weixin", "weixinOpenID", weixin.weixinOpenID, function (err, node) {
        if (node != null) {
            node.delete();
            response.write(JSON.stringify({
                "information": "删除微信绑定用户成功",
                "node": node.data
            }));
            response.end();
        } else {
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
weixinManage.modify = function (data, response) {
    response.asynchronous = 1;
    var weixin =
    {
        "type": "weixin",
        "accesskey": data.accesskey,
        "weixinOpenID": data.weixinOpenID,
        "weixinName": data.weixinName,
        "token": data.token
    }
    db.getIndexedNode("weixin", "weixinOpenID", weixin.weixinOpenID, function (err, node) {
        if (node != null) {
//            node.getRelationshipNodes("weixin", "weixinOpenID",weixin.weixinOpenID ,function(err, node){})
            node.save(function (err, node) {
                node.data.weixinName = weixin.weixinName;
                node.data.token = weixin.token;
                node.index("weixin", "weixinName", weixin.weixinName);
                node.index("weixin", "token", weixin.token);
                node.save(function (err, node) {
                    response.write(JSON.stringify({
                        "提示信息": "修改微信绑定用户成功",
                        "node": node.data
                    }));
                    response.end();
                });
            });

        } else {
            response.write(JSON.stringify({
                "提示信息": "修改微信绑定用户失败",
                "reason": "微信用户不存在。"
            }));
            response.end();
        }
    });
}

/***************************************
 *     URL：/api2/weixinuer/gatall
 ***************************************/
weixinManage.getall = function (data, response) {
    response.asynchronous = 1;

    var uid = data.uid;

    db.getNodeById(uid, function (err, accountNode) {
        if (accountNode == null) {
            response.write(JSON.stringify({
                "提示信息": "获取所有微信绑定用户失败",
                "失败原因": "账号不存在"
            }));
            response.end();
        }
        else {
            next(accountNode);
        }
    });
    function next(accountNode) {

        accountNode.getRelationshipNodes({type: 'OWNED', direction: 'out'}, function (err, weixinNodes) {
            var weixins = {};
            for (var index in weixinNodes) {
                var weixinNode = weixinNodes[index];
                weixins[weixinNode.data.weixinid] = weixinNode.data;
            }

            response.write(JSON.stringify({
                "提示信息": "获取所有微信绑定用户成功",
                "weixins": weixins
            }));
            response.end();
        });
    }
}

module.exports = weixinManage;