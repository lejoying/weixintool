/**
 * Demo of reading and writing data with neo4j.
 * Date: 2013.05.20
 * Request:
 *  http://127.0.0.1:8062/api2/message/weixinMessage/add
 * Response:
 *  "{}"
 */

var applyManage = {};

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase('http://localhost:7474');
var nodeId = 2;//create a node in Neo4j monitoring and management tools, and put its node id here.


/***************************************
 *     URL：/api2/apply/add
 ***************************************/

var RSA = require('./../tools/RSA');
applyManage.add = function (data, response) {
    response.asynchronous = 1;
    var weixinid = data.weixinOpenID;

    db.getNodeById(weixinid, function (err, accountNode) {
        if (accountNode == null) {
            response.write(JSON.stringify({
                "提示信息": "添加微信应用失败",
                "失败原因": "用户账号不存在"
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
            "weixinOpenID": data.weixinOpenID,
            "newAppName": data.newAppName,
            "appIcon": data.appIcon,
            "updateScript": data.updateScript,
            "appScpecification": data.appScpecification
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
                weixinNode.index("message", "newAppName", message.newAppName);
                weixinNode.index("message", "appIcon", message.appIcon);
                weixinNode.index("message", "updateScript", message.updateScript);
                weixinNode.index("message", "appScpecification", message.appScpecification);
                    weixinNode.save(function (err, weixinNode) {

                    weixinNode.createRelationshipFrom(accountNode, "OWNEDAPLAY");
                    response.write(JSON.stringify({
                        "提示信息": "添加应用成功",
                        "node": weixinNode.data
                    }));
                    response.end();
                });
            });
        }
    }
}
/***************************************
 *     URL：/api2/apply/applicationPersonalizationAddtest
 ***************************************/

var RSA = require('./../tools/RSA');
applyManage.addtest = function (data, response) {
    response.asynchronous = 1;
    var weixinid = data.weixinOpenID;

    db.getNodeById(weixinid, function (err, accountNode) {
        var message =
        {
            "weixinOpenID": data.weixinOpenID,
            "newAppName": data.newAppName,
            "appIcon": data.appIcon,
            "updateScript": data.updateScript,
            "appScpecification": data.appScpecification
        };

        db.getIndexedNode("message", "weixinOpenID", message.weixinOpenID, function (err, node) {
            if (node == null) {
                weixinAdd();
            }
            else {
                response.write(JSON.stringify({
                    "提示信息": "添加应用失败",
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
                weixinNode.index("appmessage", "newAppName", message.newAppName);
                weixinNode.index("message", "appIcon", message.appIcon);
                weixinNode.index("message", "updateScript", message.updateScript);
                weixinNode.index("message", "appScpecification", message.appScpecification);
                weixinNode.save(function (err, weixinNode) {

//                    weixinNode.createRelationshipFrom(accountNode, "OWNEDAPLAY");
                    response.write(JSON.stringify({
                        "提示信息": "添加应用成功",
                        "node": weixinNode.data
                    }));
                    response.end();
                });
            });
        }
    });

}

/***************************************
 *     URL：/api2/apply/modify
 ***************************************/
applyManage.modify = function (data, response) {
    response.asynchronous = 1;
    var weixin =
    {
        "type": "weixin",
        "weixinOpenID": data.weixinOpenID,
        "accountName": data.accountName,
        "token": data.token
    }

    db.getIndexedNode("message", "weixinOpenID", weixin.weixinOpenID, function (err, node) {
        if (node != null) {
            node.save(function (err, node) {
                node.data.weixinOpenID = weixin.weixinOpenID;
                node.data.weixinName = weixin.weixinName;
                node.index("weixin", "weixinOpenID", weixin.weixinOpenID);
                node.save(function (err, node) {
                    response.write(JSON.stringify({
                        "提示信息": "修改应用成功",
                        "node": node.data
                    }));
                    response.end();
                });
            });

        } else {
            response.write(JSON.stringify({
                "提示信息": "修改应用失败",
                "reason": "应用不存在"
            }));
            response.end();
        }
    });
}

/***************************************
 *     URL：/api2/apply/delete
 ***************************************/
applyManage.delete = function (data, response) {
    response.asynchronous = 1;
    var weixin =
    {
        "type": "weixin",
        "weixinOpenID": data.weixinOpenID,
        "weixinName": data.weixinName,
        "token": data.token
    }
    db.getIndexedNode("weixin", "weixinOpenID", weixin.weixinOpenID, function (err, node) {
        if (node != null) {
            node.delete();
            response.write(JSON.stringify({
                "information": "删除应用成功",
                "node": node.data
            }));
            response.end();
        } else {
            response.write(JSON.stringify({
                "提示信息": "删除应用失败",
                "reason": "应用不存在"
            }));
            response.end();
        }
    });
}

module.exports = applyManage;