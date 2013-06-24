$(document).ready(function () {
    checkLogin();
    function checkLogin() {
        if (data.uid == null || data.accesskey == null || data.uid == "" || data.accesskey == "110") {
            location.href = "login.html";
        }
    }

    for (index in data.apps) {
        var app = data.apps[index];
        if (app.appid == data.appid) {
            data.currentApp = app;
            break;
        }
    }

    $(".js_app_name").val(data.currentApp.name);
    $(".js_app_description").val(data.currentApp.description);
    var iconUrl = data.imageServerUrl + data.currentApp.icon + ".png";
    $(".js_app_icon").attr("src", iconUrl);


});

