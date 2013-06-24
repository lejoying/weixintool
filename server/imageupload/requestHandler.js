//var serverSetting = root.globaldata.serverSetting; //为什么在这里不能够传值


var serverSetting = root.globaldata.serverSetting;
//console.log("requestHandler: " + JSON.stringify(serverSetting));

function start(response, postData) {
    console.log("Request handler 'start' was called.");

    response.writeHead(200, {"Content-Type": "text/html"});
    var body = '<html>' + '<head>' + '<meta http-equiv="Content-Type" content="text/html; ' + 'charset=UTF-8" />' + '</head>' + '<body>' + '<canvas id="mycanvas" width=500 height=500 border=3 solid=#9C9898></canvas>' + '<script src="http://common.cnblogs.com/script/jquery.js" type="text/javascript"></script>' + '</body>' + '<script type="text/javascript">window.onload = function(){var canvas=document.getElementById("mycanvas");var context = canvas.getContext("2d");context.beginPath();context.moveTo(100, 150);context.lineTo(450, 50);context.lineWidth = 10;context.strokeStyle ="#ff0000";context.stroke();$.ajax({url: "/upload",data:canvas.toDataURL("image/png"),type: "post",success: function( result ) {console.log( result );}});};</script>' +

        '</html>';
    response.write(body);
    response.end();
}

function upload(response, postDataObject) {

    //    console.log("requestHandler upload: " + JSON.stringify(serverSetting));
    response.writeHead(200, {"Content-Type": "application/json; charset=UTF-8"});
    var fs = require('fs');
    var postData = postDataObject.image;
    var weibo_user = postDataObject.weibo_user;
    if (postData == null || weibo_user == null) {
        response.write(JSON.stringify({"提示信息": "图片上传失败", b: "图片上传失败"}));
        response.end();
        return;
    }
    var base64Data = postData.replace(/^data:image\/\w+;base64,/, "");
    var dataBuffer = new Buffer(base64Data, 'base64');
    console.log("Request handler 'upload' was called.");
    var now = new Date();
    var filename = weibo_user + now.getTime();
    console.log(filename + " has been uploaded.");

    fs.writeFile(serverSetting.imageFolder + filename + ".png", dataBuffer, function (err) {
    });
    response.write(JSON.stringify({"filename": filename, b: "888你好", "提示信息": "图片上传成功"}));
    response.end();
}
var handle = [];
handle['/start'] = start;
handle['/upload2/'] = upload;
handle['/'] = start;
exports.handle = handle;