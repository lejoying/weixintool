/**
 * Date: 12-3-25
 * 演示程序9
 * 说明: 使用客户端模板nTenjin输出动态轻博客内容，restful API Server提供模板和数据。
 *
 * 请求1：http://127.0.0.1:8080/api/feedlist/username
 * 响应1：["这是第一篇文章", "这是第二篇文章", "这是第3篇文章"]
 *
 * 请求2：http://127.0.0.1:8080/api/template
 * 响应2：{"模板名":{"string":"模板内容"},"模板夹名":{"模板名":{"string":"模板内容"},"模板名":{"string":"模板内容"}}}
 */
var http = require("http");

var i = 1;

http.createServer(
    function (request, response) {

        response.writeHead(200, {
            "Content-Type":"application/json; charset=UTF-8"
        });
        var getParam = parseUrl(request.url);
        if(getParam!=null){
            response.write(getParam.echostr);
        }

        i++;
        console.log("服务器访问被访问次数: i = " + i);
        response.end();

    }).listen(80);

console.log("服务器开启");

var separator = /^[\s\/]+|[\s\/]+$/g;
/**
 * 读取get参数
 * @param url
 */
function parseUrl(url) {
    var getParamStr = decodeURI(url).split('?', 2)[1];
    if (getParamStr != null) {
        var getParam = {};
        var getParamArray = getParamStr.replace(separator, '').split('&');
        for (var i = 0; i < getParamArray.length; i++) {
            if (getParamArray[i] != "") {
                getParamPeer = getParamArray[i].split('=', 2);
                getParam[getParamPeer[0]] = getParamPeer[1];
            }
        }
        return getParam;
    }
    return null;
}