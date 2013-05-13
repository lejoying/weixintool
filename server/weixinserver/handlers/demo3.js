/**
 * Demo of reading and writing data with neo4j.
 * Date: 2013.04.15
 *  http://127.0.0.1:8061/api2/neo4j/get
 *  http://127.0.0.1:8061/api2/neo4j/reset?i=0
 */

var demo3 = {};

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase('http://localhost:7474');
var nodeId = 60;//create a node in Neo4j monitoring and management tools, and put its node id here.

demo3.update = function(data, response){
    response.asynchronous = 1;


}


demo3.get = function (response) {
    response.asynchronous = 1;

    var node;
    db.getNodeById(nodeId, function (err, node) {
        var access = 1;
        if (node.data.access != null) {
            access = node.data.access;
        }
        response.write(JSON.stringify({
            "information":"/api2/neo4j/get  success",
            "access":access,
            "node":node.data
        }));
        response.end();
        access++;
        node.data.access = access;
        node.save(function (err, node) {
        });
    });
}


demo3.reset = function (i, response) {
    response.asynchronous = 1;

    var access = parseInt(i);
    var node;
    db.getNodeById(nodeId, function (err, node) {
        node.data.access = access;
        node.save(function (err, node) {
            response.write(JSON.stringify({
                "information":"/api2/neo4j/reset  success",
                "access":access,
                "node":node.data
            }));
            response.end();
        });
    });
}

module.exports = demo3;