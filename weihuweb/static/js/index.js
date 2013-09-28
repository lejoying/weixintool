$(document).ready(function () {
    var leftHeight = $(".mainContern").height();
    $(".sildLeft").css("height", leftHeight);
    var nowAccount = window.localStorage.getItem("nowAccount");
    if (nowAccount != null) {
        $(".userAccount span").html("欢迎" + unescape(JSON.parse(nowAccount).accountname));
        if (JSON.parse(nowAccount).type == "admin") {
            var li = document.createElement("li");
            var a = document.createElement("a");
            a.appendChild(document.createTextNode("后台管理"));
            li.appendChild(a);
            $(".nav ul")[0].appendChild(li);
            $.getScript("./../static/js/sha1.js");
            $(li).click(function () {
                authAccount();
            });
        }
        $($(".nav ul li")[4]).hide();
    } else {
        location.href = "/login.html";
    }

    function authAccount() {
        $.ajax({
            type: "GET",
            url: "/api2/account/auth?",
            data: {
                "accountname": JSON.parse(nowAccount).accountname, "password": function () {
                    var pass = prompt("请输入登录密码", "******");
                    if (pass == null) {
                        $.ajax.responseXML.abort();

                    } else {
                        pass = hex_sha1(pass);
                        return pass;
                    }
                }
            },
            success: function (serverData) {
                if (serverData["提示信息"] == "账号登录成功") {
                    location.href = "/page/Management/default.html"
                } else if (serverData["提示信息"] == "账号登录失败") {
                    authAccount();
                }
            }
        });
    }

    var weixins = window.sessionStorage.getItem("nowBindWeixins");
    if (weixins != undefined) {
        weixins = JSON.parse(weixins);
        var url = window.location.href;
        url = url.substr(url.lastIndexOf("/") + 1);
        if (url != "default.html") {
            getAllWeixin(weixins);
            var apps = window.sessionStorage.getItem("apps");
            if (apps != null)
                setApp(JSON.parse(apps));
        }
    }
    startMethod();
    /*$("#jsbtn").click(function(){
     //发送Ajax请求，获取绑定的微信用户
     $.ajax({
     type:"POST",
     url:"/api2/weixin/getall?",
     data:{
     "uid":JSON.parse(nowAccount).uid,
     "jscode": $("#jscode").val()
     },
     success:function(serverData){
     alert(serverData["提示信息"]);
     }
     });
     });*/
    $(".js_exit").click(function () {
        //清除window.localStorage和window.sessionStorage下存放的键值对
        window.localStorage.clear();
        window.sessionStorage.clear();
        location.href = "default.html";
    });
    $(".js_weixinNow").click(function () {
        $(".accountSwitching").toggle();
        addEvent(document.body, "mousedown", clickother);
    });
});
function startMethod() {
    //获取当前微信用户的ID
    var weixinid = "";
    var nowWeixin = window.sessionStorage.getItem("nowWeixin");
    if (nowWeixin != null) {
        weixinid = JSON.parse(nowWeixin).weixinOpenID;
        var url = window.location.href;
        url = url.substr(url.lastIndexOf("/") + 1);
        if (url == "default.html") {
            getAllApps(JSON.parse(nowWeixin).weixinOpenID);
        }
    }
}
function getAllApps(weixinid) {
    $.ajax({
        type: "GET",
        url: "/api2/app/getall?",
        data: {
            weixinOpenID: weixinid,
            filter: "BIND",
            status: "true"
        },
        success: function (serverData) {
            if (serverData["提示信息"] == "获得应用列表成功") {
                $($(".sysNotice span")[1]).html(serverData["apps"].length - 1);
                window.sessionStorage.setItem("apps", JSON.stringify(serverData["apps"]));
                setApp(serverData["apps"]);
            }
        }
    });
}
function setApp(apps) {
    $(".js_myopenapp")[0].length = 1;
    for (var i = 0; i < apps.length; i++) {
        if (apps[i].type == "private") {
            continue;
        }
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.appendChild(document.createTextNode(apps[i].name));
        if (apps[i].type == "public") {
            a.href = "/page/publicAppDetail.html?id=" + apps[i].appid + "&rela=true";
        } else {
            a.href = "/page/industryAppDetail.html?id=" + apps[i].appid + "&rela=true";
        }
        li.appendChild(a);
        $(".js_myopenapp")[0].appendChild(li);
    }
}
function getAllWeixin(weixins) {
    var index = 0;
    for (var key in weixins) {
        if (index == 0) {
            var nowWeixin = window.sessionStorage.getItem("nowWeixin");
            if (nowWeixin == null) {
                window.sessionStorage.setItem("nowWeixin", JSON.stringify(weixins[key]));
                startMethod();
                getNewUserCount(weixins[key].weixinOpenID);
            }
        }
        index++;
        var li = document.createElement("li");
        var a = document.createElement("a");
        a.href = "javascript:;";
        a.appendChild(document.createTextNode(weixins[key].weixinName));
        li.appendChild(a);
        $(".accountSwitching ul")[0].appendChild(li);
    }
    var li = document.createElement("li");
    var a = document.createElement("a");
    a.href = "/page/allBindWeixin.html";
    a.appendChild(document.createTextNode("全部"));
    li.appendChild(a);
    $(".accountSwitching ul")[0].appendChild(li);
    var nowWeixin = window.sessionStorage.getItem("nowWeixin");
    if (nowWeixin != null) {
        var str = JSON.parse(nowWeixin).weixinName;
        $(".js_weixinNow").html(str.substr(0, 8));
        $(".welcome").find("span").html(str.substr(0, 8));
        $(".js_weixinNow").attr("title", str);
    }
//    var url = window.location.href;
//    url = url.substr(url.lastIndexOf("/") + 1);
    /*if(url == "default.html"){
     $.getScript("./../static/js/default.js");
     }*/
    $(".accountSwitching ul li").click(function () {
        $(".accountSwitching").hide();
        var nowWeixin = window.sessionStorage.getItem("nowWeixin");
        if ($(this).find("a").html() != "全部") {
            if ($(this).find("a").html() != JSON.parse(nowWeixin).weixinName) {
                location.href = "default.html";
                var nowBindWeixins = window.sessionStorage.getItem("nowBindWeixins");
                for (var key in JSON.parse(nowBindWeixins)) {
                    if (JSON.parse(nowBindWeixins)[key].weixinName == $(this).find("a").html()) {
                        window.sessionStorage.setItem("nowWeixin", JSON.stringify(JSON.parse(nowBindWeixins)[key]));
                    }
                }
            }
        }
    });
}
function getPageData(next, pagesize, count, index, data) {
    count = Math.ceil(data / pagesize);
    if (index == 1) {
        $($(".pagination a")[1]).hide();
    }
    $($(".pagination a")[9]).attr("value", count);
    $($(".pagination a")[9]).attr("title", count);
    $(".pagination a").each(function (i) {
        var now = 0;
        if ($($(".pagination a")[i]).attr("value") > count) {
            $($(".pagination a")[i]).attr("class", "unclick");
            return true;
        }
        $($(".pagination a")[i]).click(function () {
            if(i == 0){
                now = 0;
                index = 1;
            }
            if (i != 1 && i != 8) {
                now = index;
                if(i != 0)
                    index = $($(".pagination a")[i]).attr("value");
            }
            $($(".pagination a")[7]).html(Math.ceil(index / 10) * 10);
            $($(".pagination a")[7]).attr("value", Math.ceil(index / 10) * 10);
            $($(".pagination a")[7]).attr("title", Math.ceil(index / 10) * 10);
            if (i == 1) {
                now = index;
                if (index - 1 > 0) {
                    index--;
                } else {
                    index = 1;
                }
            }
            if (i == 8) {
                now = index;
                if (index + 1 < count) {
                    index++;
                } else {
                    index = count;
                }
            }
            if (index > 1) {
                $($(".pagination a")[1]).show();
            } else {
                $($(".pagination a")[1]).hide();
            }
            if (count >= 5) {
                if (i == 0) {
                    for (var x = 2; x < 7; x++) {
                        $($(".pagination a")[x]).html(x - index);
                        $($(".pagination a")[x]).attr("value", x - index);
                        $($(".pagination a")[x]).attr("title", x - index);
                    }
                }
                if (i == 9) {
                    for (var x = 2; x < 7; x++) {
                        $($(".pagination a")[x]).html(count - 6 + x);
                        $($(".pagination a")[x]).attr("value", count - 6 + x);
                        $($(".pagination a")[x]).attr("title", count - 6 + x);
                    }
                }
                if (i == 7) {
                    if (index < count) {
                        for (var x = 2; x < 7; x++) {
                            $($(".pagination a")[x]).html(index - 4 + x);
                            $($(".pagination a")[x]).attr("value", index - 4 + x);
                            $($(".pagination a")[x]).attr("title", index - 4 + x);
                        }
                        $($(".pagination a")[1]).attr("value", index--);
                        $($(".pagination a")[1]).attr("title", index--);
                        $($(".pagination a")[8]).attr("value", index++);
                        $($(".pagination a")[8]).attr("title", index++);
                    }
                }
                if (i == 5 || i == 6 || i == 8) {
                    if (index < count && index > 2) {
                        for (var x = 2; x < 7; x++) {
                            $($(".pagination a")[x]).html(index - 4 + x);
                            $($(".pagination a")[x]).attr("value", index - 4 + x);
                            $($(".pagination a")[x]).attr("title", index - 4 + x);
                        }
                    }
                }
                if (i == 2 || i == 3 || i == 1) {
                    if (index > 1 && index > 2) {
                        for (var x = 2; x < 7; x++) {
                            $($(".pagination a")[x]).html(index - 4 + x);
                            $($(".pagination a")[x]).attr("value", index - 4 + x);
                            $($(".pagination a")[x]).attr("title", index - 4 + x);
                        }
                    }
                }
            }
            $(".pagination a").each(function (j) {
                $(".pagination a")[j].removeAttribute("class");
                if ($($(".pagination a")[j]).html() == index) {
                    $($(".pagination a")[j]).attr("class", "pageSelected");
                }
                if ($($(".pagination a")[j]).attr("value") > count) {
                    $($(".pagination a")[j]).attr("class", "unclick");
                    return true;
                }
            });
            if (now != index) {
                next((index - 1) * pagesize, pagesize, count, index);
            }
        });
    });
}

//添加点击空白处关闭弹出框事件
function addEvent(obj, eventType, func) {
    if (obj.attachEvent) {
        obj.attachEvent("on" + eventType, func);
    }
    else {
        obj.addEventListener(eventType, func, false)
    }
}
function clickother(el) {
    thisObj = el.target ? el.target : event.srcElement;
    if (thisObj.tagName == "BODY") {
        document.getElementById("accountSwitching").style.display = "none";
        return;
    }
    if (thisObj.id == "accountSwitching" || thisObj.id == "weixinNow" || (thisObj.parentNode).parentNode.parentNode.id == "accountSwitching") {
        return;
    }
    do {
        if (thisObj.tagName == "BODY") {
            if (document.getElementById("accountSwitching")) {
                document.getElementById("accountSwitching").style.display = "none";
                return;
            }
        }
        ;
        thisObj = thisObj.parentNode;
    } while (thisObj.parentNode);
}
//背景变黑弹出窗口
function showBlackPage(clarity, tipword) {
    var bWidth = '100%';
    var bHeight = $("BODY").height() + 87;
    //var bHeight=$(".content").offset().top+$(".content").height()+19;
    // var wWidth = 602;
    //var left = bWidth/2-wWidth/2-19;
    var back = document.createElement("div");
    back.id = "blackbackcommon";
    var styleStr = "top:0px;left:0;position:absolute;background:#000;z-index:21;width:" + bWidth + ";height:" + bHeight + "px;opacity:0.2;";
    //styleStr+=(isIe)?"filter:alpha(opacity=0);":"opacity:0;";
    back.style.cssText = styleStr;
    document.body.appendChild(back);
    showBackground(back, clarity);
    var mesW = document.createElement("div");
    mesW.id = "blackbackCommonWindow";
    mesW.innerHTML = "<div class='prompted' id='promptedShow'><div class='tipWord'></div><div><a class='buttonblue changeSaveButton' href='javascript:closeBlackBackground();'>确定</a></div></div>";
    document.body.appendChild(mesW);
    $(".tipWord").html(tipword);
    var popWidth = parseInt($("#promptedShow").css("width")) + 60;
    $("#promptedShow").css("margin-left", -(popWidth / 2));
    $(".buttonblue")[0].focus();
}
http://weixintool.com/change_info.html
// 显示弹出背景
    function showBackground(obj, endInt) {
        var al = parseFloat(obj.style.opacity);
        al += 0.1;
        obj.style.opacity = al;
        if (al < (endInt / 100)) {
            setTimeout(function () {
                showBackground(obj, endInt)
            }, 1);
        }
    }
function closeBlackBackground() {
    $("#blackbackCommonWindow").remove();
    $("#blackbackcommon").remove();
}