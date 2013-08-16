/**
 * Created with JetBrains WebStorm.
 * User: Admin
 * Date: 13-8-16
 * Time: 上午11:17
 * To change this template use File | Settings | File Templates.
 */
var myappManage = {};

var serverSetting = root.globaldata.serverSetting;

var neo4j = require('neo4j');

var db = new neo4j.GraphDatabase(serverSetting.neo4jUrl);

/***************************************
 *     URL：/api2/myapp/add
 ***************************************/
myappManage.add = function (data, response) {
    response.asynchronous = 1;
    var weixinid = data.weixinid;
    var myappStr = data.myapp;
    var myapps = JSON.parse(myappStr);

    deleteMyAppNodeExist();
    //删除和当前绑定微信有关的myapp节点
    function deleteMyAppNodeExist(){
        var query = [
            'MATCH weixin:Weixin-[r]->myapp:Myapp',
            'WHERE weixin.weixinOpenID! ={weixinid}',
            'DELETE myapp,r',
            'RETURN  weixin'
        ].join('\n');

        var params = {
            weixinid: weixinid
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                response.write(JSON.stringify({
                    "提示信息": "保存个性化设置失败",
                    "失败原因":"删除个性化数据出现异常"
                }));
                response.end();
            } else {
                for(var i=0;i<myapps.length;i++){
                    createMyAppNode(myapps[i]);
                }
            }
        });
    }
    //创建新的myapp节点
    function createMyAppNode(myapp) {
        var query = [
            'MATCH weixin:Weixin' ,
            'WHERE weixin.weixinOpenID! ={weixinid}',
            'CREATE UNIQUE myapp:Myapp{myapp}<-[r:SELFDOM]-weixin',
            'RETURN  weixin, myapp, r'
        ].join('\n');

        var params = {
            weixinid: weixinid,
            myapp: myapp
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                response.write(JSON.stringify({
                    "提示信息": "保存个性化设置失败",
                    "失败原因":"保存数据出现异常"
                }));
                response.end();
            }else {
                response.write(JSON.stringify({
                    "提示信息": "保存个性化设置成功"
                }));
                response.end();
            }
        });
    }
}

/***************************************
 *     URL：/api2/myapp/getall
 ***************************************/
myappManage.getall = function (data, response) {
    var count = 0;
    var weixinid = data.weixinid;
    getTenMyApp();
    function getTenMyApp(){
        getAllMyApp();
        var query = [
            'MATCH weixin:Weixin-[r]->myapp:Myapp',
            'WHERE weixin.weixinOpenID! ={weixinid}',
            'RETURN  myapp',
            'ORDER BY myapp.myappid',
            'SKIP 0',
            'LIMIT 10'
        ].join('\n');

        var params = {
            weixinid: weixinid
        };

        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
                response.write(JSON.stringify({
                    "提示信息": "获取个性化设置失败",
                    "失败原因":"获取数据出现异常"
                }));
                response.end();
            } else {
                var myappData = [];
                for (var index in results) {
                    var myappNode = results[index].myapp;
                    myappData.push(myappNode.data);
                }
                response.write(JSON.stringify({
                    "提示信息": "获取个性化设置成功",
                    "myapps": myappData,
                    "count": count
                }));
                response.end();
            }
        });
    }
    function getAllMyApp(){
        var query = [
            'MATCH weixin:Weixin-[r]->myapp:Myapp',
            'WHERE weixin.weixinOpenID! ={weixinid}',
            'RETURN  count(myapp)'
        ].join('\n');
        var params = {
            weixinid: weixinid
        };
        db.query(query, params, function (error, results) {
            if (error) {
                console.error(error);
            } else {
               /* var myappData = results.pop().myapp.data;
                count = myappData.length;*/
                count = results.pop()["count(myapp)"];
            }
        });
    }


}
module.exports = myappManage;