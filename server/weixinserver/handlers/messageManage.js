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
 *     URL：/api2/message/adds
 ***************************************/

var RSA = require('./../tools/RSA');
messageManage.adds = function (data, response) {
    response.asynchronous = 1;
    var weixinid = data.weixinOpenID;

    db.getNodeById(weixinid, function (err, accountNode) {
        var message =
        {
            "weixinOpenID": data.weixinOpenID,
            "newId": data.newId,
            "phone": data.phone,
            "type": "weixin",
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
                weixinNode.index("message", "newId", message.newId);
                weixinNode.index("message", "phone", message.phone);
                weixinNode.index("message", "email", message.email);
                weixinNode.index("message", "type", "weixin");
                weixinNode.save(function (err, weixinNode) {

                    weixinNode.createRelationshipFrom(accountNode, "OWNEDMESSAGE");
                    response.write(JSON.stringify({
                        "提示信息": "添加信息成功",
                        "node": weixinNode.data
                    }));
                    response.end();
                });
            });
        }
    });

}


/***************************************
 *     URL：/api2/message/add
 ***************************************/


var RSA = require('./../tools/RSA');
messageManage.add = function (data, response) {
    response.asynchronous = 1;
    var uid = data.uid;

    db.getNodeById(uid, function (err, accountNode) {
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
            "weixinName": data.weixinName
        };
        createNewApp(message, accountNode);


        function createNewApp(message, accountNode) {
            var newNode = db.createNode(message);
            newNode.save(function (err, newNode) {
                newNode.data.uid = newNode.id;
                newNode.index("message", "weixinName", message.weixinName);
                newNode.save(function (err, newNode) {
                    response.write(JSON.stringify({
                        "提示信息": "注册账号成功"
                    }));
//                    response.end();
                    createre(newNode, accountNode);
                });
            });
        }

        function createre(newNode, accountNode) {
            adata = {
                "id":  155,
                "appName": newNode.data.weixinName
            }
            newNode.createRelationshipFrom(accountNode, "appName", adata);
            db.getRelationshipById(155, function (err, node) {
                node.index("rel", "app", newNode.data.weixinName);
//                if (node != null) {
//                    node.del();
//                    response.write(JSON.stringify({
//                        "提示信息": "shanchu"
//                    }));
//                    response.end();
//                }
            });
            db.getIndexedRelationship("rel","app",newNode.data.weixinName, function (err, node) {
                if (node != null) {
                    node.del();
                }
            });
        }
    }
}

/***************************************
 *     URL：/api2/message/leavemessage
 ***************************************/

var RSA = require('./../tools/RSA');
messageManage.leave = function (data, response) {
    response.asynchronous = 1;
//
//    var have =
//    {
//        "type": "have",
//        "kkey" : have.kkey
//    };
    db.getIndexedRelationship("OWNEDR", "hav", "uytgrfsadfrt", function (err, node) {
        if (node == null) {
            response.write(JSON.stringify({
                "提示信息": "获得关系失败",
                "失败原因": "关系不存在"
            }));
            response.end();
        } else {
            response.write(JSON.stringify({
                "提示信息": "找到关系",
                "node": node.data
            }));
            response.end();
        }
    });


//    db.getNodeById(weixinid, function (err, accountNode) {
//        if (accountNode == null) {
//            response.write(JSON.stringify({
//                "提示信息": "解除关系失败",
//                "失败原因": "账号不存在"
//            }));
//            response.end();
//        }
//        else {
//            var message =
//            {
//                "weixinOpenID": data.weixinOpenID
//            };
//            db.getIndexedRelationship("message", "weixinOpenID", message.weixinOpenID, function(err, node){
//                if(node == null){
//                    response.write(JSON.stringify({
//                        "提示信息": "获得关系失败",
//                        "失败原因": "关系不存在"
//                    }));
//                    response.end();
//                }else{
//                    response.write(JSON.stringify({
//                        "提示信息": "找到关系",
//                        "node": node.data
//                    }));
//                    response.end();
//                }
//            });
//
//        }
//    });
}

module.exports = messageManage;