var http = require("http");
var url = require("url");
var querystring = require('querystring');

//var serverSetting = root.globaldata.serverSetting;
//console.log("server: " + JSON.stringify(serverSetting));

function start(route, handle) {
    function onRequest(request, response) {
        var postData = "";
        var pathname = url.parse(request.url).pathname;
        console.log("Request for " + pathname + " received.");

        request.setEncoding("utf8");

        request.addListener("data", function (postDataChunk) {
            postData += postDataChunk;
            console.log("Received POST data chunk '" + postDataChunk.length + "'.");
        });

        request.addListener("end", function () {
            var postDataObject = querystring.parse(postData);
            //            console.log(JSON.stringify(postDataObject));
            route(pathname, response, postDataObject);
        });

    }

    http.createServer(onRequest).listen(8066);
    console.log("The Images server is running.");
}

exports.start = start;