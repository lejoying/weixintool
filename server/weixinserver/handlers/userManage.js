/**
 * Demo of reading and writing data with neo4j.
 * Date: 2013.04.15
 */

var userManage = {};

var serverSetting = root.globaldata.serverSetting;

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase(serverSetting.neo4jUrl);


/***************************************
 *     URL：/api2/user/getall
 ***************************************/
userManage.getall = function (data, response) {
    response.asynchronous = 1;
    var weixin =
    {
        weixinOpenID: data.weixinopenid
    };
    var start = data.start;   //todo take it effect
    var end = data.end;

    getallUserNode();

    function getallUserNode() {
        var query = [
            'MATCH user:User-[:FOCUS]->weixin:Weixin' ,
            'WHERE weixin.weixinOpenID! ={weixinOpenID}',
            'RETURN  user',
//            'SKIP {start}',
//            'LIMIT {count}'
        ].join('\n');

        var params = {
            weixinOpenID: weixin.weixinOpenID,
            start: start,
            count: end - start
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
            }
            if (results.length == 0) {
                response.write(JSON.stringify({
                    "提示信息": "获得所有关注用户失败",
                    "失败原因 ": "微信公众账号不存在"
                }));
                response.end();
            } else {
                var users = [];
                for (var index in results) {
                    var userNode = results[index].user;
                    users.push(userNode.data);
                }
                response.write(JSON.stringify({
                    "提示信息": "获得所有关注用户成功",
                    "users": users
                }));
                response.end();
            }
        });
    }
}


/***************************************
 *     URL：/api2/user/modify
 ***************************************/
userManage.modify = function (data, response) {
    response.asynchronous = 1;
    var userid = data.userid;
    var userStr = data.user;
    var user = JSON.parse(userStr);

    modifyUserNode();

    function modifyUserNode() {
        var query = [
            'MATCH user:User' ,
            'WHERE user.id! ={userid}',
            'RETURN  user'
        ].join('\n');

        var params = {
            userid: userid
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
            }
            if (results.length == 0) {
                response.write(JSON.stringify({
                    "提示信息": "修改关注用户信息失败",
                    "失败原因 ": "用户信息不存在"
                }));
                response.end();
            } else {
                var userNode = results.pop().user;
                userNode.data = user;
                userNode.save();
                response.write(JSON.stringify({
                    "提示信息": "修改关注用户信息成功",
                    "user": user
                }));
                response.end();
            }
        });
    }
}

module.exports = userManage;