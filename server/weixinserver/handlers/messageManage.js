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
        createNewApp(message,accountNode);


        function createNewApp(message,accountNode) {
            var newNode = db.createNode(message);
            newNode.save(function (err, newNode) {
                newNode.data.uid = newNode.id;
                newNode.index("message", "weixinName", message.weixinName);
                newNode.save(function (err, newNode) {
                    response.write(JSON.stringify({
                        "提示信息": "注册账号成功"
                    }));
//                    response.end();
                    createre(newNode,accountNode);
                });
            });
        }

        function createre(newNode,accountNode) {
//            adata = {
//                "type": "OWNEDR",
//                "kkkey" : "vvalue"
//            }
            var rel = db.createRelationship(accountNode,newNode,"ggg");
//            newNode.createRelationshipFrom(accountNode, "juhgfd");
//            rel.index("fff");
//            rel.index("cbw", "cbw1", "cbw1");
//            (newNode.createRelationshipFrom(accountNode, "juhgfd")).index("cbw", "cbw1", "cbw1");

            db.getIndexedRelationships("fff",function(err, node){
                if(node == null){
                    response.write(JSON.stringify({
                        "newNode":newNode.createRelationshipFrom(accountNode, "juhgfd"),
                        "提示信息": "获得关系失败",
                        "失败原因": "关系不存在"
                    }));
                    response.end();
                }else{
                    response.write(JSON.stringify({
                        "提示信息": "找到关系",
                        "node": node.data
                    }));
                    response.end();
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
    db.getIndexedRelationship("OWNEDR","hav","uytgrfsadfrt",function(err, node){
        if(node == null){
            response.write(JSON.stringify({
                "提示信息": "获得关系失败",
                "失败原因": "关系不存在"
            }));
            response.end();
        }else{
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