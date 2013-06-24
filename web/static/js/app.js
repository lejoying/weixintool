/*************************************** ***************************************
 * core data structure
 *    app
 *************************************** ***************************************/
var app = {};

app.uploadStatus = "none";

app.environment = "local";//local or server

if (app.environment == "local") {
    app.serverUrl = "www.weixintool.com";
    app.imageServerUrl = "http://images.weibo.com/";
}
else if (app.environment == "server") {
    app.serverUrl = "wx.lejoying.com";
    app.imageServerUrl = "http://tools.wlm1001.com/";
}

/*************************************** ***************************************
 * core data structure
 *    data localSettings
 *************************************** ***************************************/

var data = {};
app.data = data;

function initializeData(){
    data.uid = "";
    data.accesskey = "110";
    data.remindme = true;
}


window.onbeforeunload = function () {
    window.localStorage.data = JSON.stringify(data);
};

function saveLocalSettings() {
    window.localStorage.data = JSON.stringify(data);
}

$(document).ready(function () {
    if (window.localStorage.data != null) {
        data = JSON.parse(window.localStorage.data);
    }
});