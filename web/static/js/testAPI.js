var logindata = {};
logindata.localSettings = {};
window.onbeforeunload = function () {
    window.localStorage.localSettings = JSON.stringify(logindata.localSettings);
};
$(document).ready(function () {
    if (window.localStorage.localSettings != null) {
        logindata.localSettings = JSON.parse(window.localStorage.localSettings);
    }
});
$(document).ready(function () {

    $("#bindingtoken").click(function () {
        var weixinName = $("#weixinName").val();
        if (weixinName != "") {

            bindingtoken(weixinName);

        } else {
            alert("绑定微信号不能为空！");
        }
    });

    function bindingtoken(weixinName) {
        $.ajax({
            type: "get",
            url: "/api2/weixin/bindingtoken?",
            data: {
                weixinName: weixinName, uid: 16, accesskey: "XXXXXX"
            },
            success: function (data) {
                if (data["提示信息"] == "微信公众账号正在绑定") {
                    logindata.localSettings.bindingWeixinName = weixinName;
                    logindata.localSettings.bindingToken = data.token;
                    location.href = "step_1.html";
                }
            }
        });
    }
});

$(document).ready(function () {
    $("#bindingToken").val(logindata.localSettings.bindingToken);
});


var data = {};

$(document).ready(function () {
    var now = new Date();
    data.uid = "16";
    data.sessionID = data.uid + now.getTime();
    getEvent();
});


function getEvent() {
    if (data.uid == null || data.sessionID == null) {
        return;
    }
    $.ajax({
        type: "GET",
        url: "api2/session/event",
        timeout: 30000,
        data: {uid: data.uid, sessionID: data.sessionID},
        success: function (event, textStatus) {
            eventLoop(event)
            getEvent();
        },
        complete: function (XMLHttpRequest, textStatus) {
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            if (textStatus == "timeout") {
                getEvent();
            }
        }
    });
}

function eventLoop(event) {
    if (event.eventID == "bind_server") {
        alert("bind_server");
    }
}