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

$(document).ready(function () {
    data.uid = "16";
    data.accesskey = "123";
    data.weixinopenid = "gh_c6cd8a443586";
    data.start = 0;
    data.end = 50;
    getUsers();

});
function getUsers() {
    $.ajax({
        type: "GET",
        url: "/api2/user/getall",
        data: {
            uid: data.uid,
            accesskey: data.accesskey,
            weixinopenid: data.weixinopenid,
            start: data.start,
            end: data.end
        },
        success: function (serverData) {
            console.log(serverData);
            data.users = serverData.users;
            var nTemplate = getTemplate("user_list");
            nTemplate.templateDiv.html(nTemplate.template.render());
            nTemplate.templateDiv.removeClass("hide");
        }
    });
}


function getTemplate(template) {
    var tenjin = nTenjin;
    var templateDiv = $(".template[template='" + template + "']")

    if (templateDiv.size() != 1) {
        return null;
    }
    var string = templateDiv.html();
    string = string.replace(/\<\!\-\-\?/g, "<?");
    string = string.replace(/\?\-\-\>/g, "?>");
    string = string.replace(/比较符号大于/g, ">");
    string = string.replace(/比较符号兄小于/g, "<");
    var nTemplate = new tenjin.Template();
    nTemplate.convert(string);
    nTemplate.eventPool = $(templateDiv).attr("eventPool");
    nTemplate.serverData = $(templateDiv).attr("serverData");
    nTemplate.localData = $(templateDiv).attr("localData");
    return {template: nTemplate, templateDiv: templateDiv};
}


function modifyUser() {
    $.ajax({
        type: "POST",
        url: "/api2/user/modify",
        data: {
            uid: data.uid,
            accesskey: data.accesskey,
            userid: "oeFW0jtlqpAbSigW2yLvCEwPmQq8",
            user: JSON.stringify({
                id:"oeFW0jtlqpAbSigW2yLvCEwPmQq8",
                "姓名":"说的萨",
                "地址":"发货的合法身份哈师傅沙发上飞"  ,
                "邮箱":"sf@fsdk.com",
                "手机":"18566664444"
            })
        },
        success: function (serverData) {
            console.log(serverData);
        }
    });
}