/**
 * Date: 2013.04.15
 * The request processor for the route mapping.
 */

function route(routemap, url, request, response) {
    var pathObject = null;
    var err = true;
    if (url == '/favicon.ico') {
        return404();
        return;
    }
    var handlemethod = null;
    if (request.method == "GET") {
        handlemethod = routemap.get;
    } else if (request.method == "PUT") {
        handlemethod = routemap.put;
    } else if (request.method == "POST") {
        handlemethod = routemap.post;
    } else if (request.method == "DELETE") {
        handlemethod = routemap.del;
    } else {
        return404();
        return;
    }

    for (var pathvalue in handlemethod) {
        pathObject = routepath(pathvalue, url);
        if (pathObject != null && typeof handlemethod[pathvalue] === 'function') {
            err = false;
            var getParam = parseUrl(url);
            getPostData(request, response, function (postData) {
                if (request.method == "GET") {
                    handlemethod[pathvalue](request, response, pathObject, getParam);
                } else if (request.method == "POST") {
                    handlemethod[pathvalue](request, response, pathObject, postData);
                }
            })
            break;
        }
    }

    if (err) {
        return404();
    }

    function return404() {

        response.writeHead(404, {"Content-Type":"text/plain; charset=UTF-8"});
        if (url == "/") {
            response.write("欢迎访问Restful Server.");
        } else if (url == "/favicon.ico") {
            response.write("");
        }
        else {
            response.write("404 Not found, API地址木有找到。。。");
            console.log("No request handler found for " + url);
        }
        response.end();
    }
}

var separator = /^[\s\/]+|[\s\/]+$/g;


function routepath(pathvalue, url) {
    var pathObject = {};
    var pathvalueArray = decodeURI(pathvalue).split('?', 1)[0].replace(separator, '').split('/');
    var urlArray = decodeURI(url).split('?', 1)[0].replace(separator, '').split('/');

    if (urlArray.length == pathvalueArray.length) {
        for (var i = 0; i < pathvalueArray.length; i++) {
            if (pathvalueArray[i] == "*") {
                continue;
            } else if (pathvalueArray[i].substring(0, 1) == ":") {
                pathObject[pathvalueArray[i].substring(1, pathvalueArray[i].length)] = urlArray[i];
                continue;
            } else if (urlArray[i] == pathvalueArray[i]) {
                continue;
            } else {
                return null;
            }
        }
        return pathObject;
    }
    return null;
}
/**
 * parseUrl to read the GET paramiter.
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

var maxData = 2 * 1024 * 1024; //prevent mass post data
var querystring = require('querystring');

function getPostData(request, response, next) {
    if (request.method == "POST") {
        response.asynchronous = 1;
        var postData = '';
        request.on('data',function (chunk) {
            postData += chunk;
            if (postData.length > maxData) {
                pstData = '';
                this.pause;//stop further data
                response.writeHead(413);
                response.end('Request too large');
            }
        }).on('end', function () {
                if (!postData) {
                    response.end();
                    return;
                }//prevent empty post
                var postDataObject = querystring.parse(postData);
                next(postDataObject);

            });
    }
    else {
        next(null);
    }
}

module.exports = route;
