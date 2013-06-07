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

var showUserManage = {};

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase('http://localhost:7474');
var nodeId = 2;//create a node in Neo4j monitoring and management tools, and put its node id here.

/***************************************
 *     URL：/api2/showUser/show
 ***************************************/
var RSA = require('./../tools/RSA');
showUserManage.show = function (data, response) {
    response.asynchronous = 1;
    db.getIndexedNodes("account", "accountName", "kekegcycom", function (err, newNodes) {
        if (newNodes != null) {
            db.getIndexedRelationships("message", "weixinName", "ssdeq", function (err, newNode) {
                newNode.getRelationshipNodes(newNode, function (err, node) {
                    if (node == null) {

                        response.write(JSON.stringify({
                            "提示信息": "获得关系失败",
                            "失败原因": "关系不存在"
                        }));
                        response.end();
                    } else {
                        newNode.show([0], [1]);
//                node[0].del();
                        response.write(JSON.stringify({
                            "提示信息": "找到关系"
                        }));
                        response.end();
                    }
                });
            });
        }else{
            response.write(JSON.stringify({
                "提示信息": "获得关系失败"
            }));
            response.end();
        }

    });
}

module.exports = showUserManage;