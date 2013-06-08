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
    $("[name='username1']").click(function () {
        $("[name='username1']").focus();
        $("[name='username1']").attr("class", "input_focus");
    });
    $("[name='username1']").blur(function () {
        var emailRegexp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        var phoneRegexp = /^1[3|5|8][0-9]\d{4,8}$/;
        var name = $("[name='username1']").val();
        var b = name.length;
        $("[name='username1']").attr("class", "input_text");
        if (name == "") {
            usernameNone();
        } else if (b <= 5 || b >= 30) {
            usernameNone1();
        } else {
            $("#username_right").show();
            $(".error_warning_user").hide();
        }
    });
    $("[name='password1']").click(function () {
        $("[name='password1']").focus();
        $("[name='password1']").attr("class", "input_focus");
    });
    $("[name='password1']").blur(function () {
        var x = $("[name='password1']").val();
        var y = x.length;
        $("[name='password1']").attr("class", "input_text");
        if (x == "") {
            passwordNone();
        } else if (y <= 5 || y >= 30) {
            passwordNone1();
        } else {
            $("#password_right").show();
            $(".error_warning_password").hide();
        }
    });
    $("#login").click(function () {
        logindata.localSettings.username = $("[name='username1']").val();
        window.localStorage.localSettings = $("[name='username1']").val();
        var emailRegexp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        var phoneRegexp = /^1[3|5|8][0-9]\d{4,8}$/;
        var text = $("[name='username1']").val();
        var passwordPlaint = $("[name='password1']").val();
        var password = hex_sha1(passwordPlaint);
//        var password = (passwordPlaint);
        if ((text == "") || (password == "")) {
            $(".error_warning").toggle();
            $("#username_error").html("<" + "span class='error_icon'" + "></" + "span" + ">" + "用户名密码不能为空！");
        } else {
            var user = {
                account: null,
                phone: null,
                email: null,
                password: password
            }
            if (emailRegexp.test(text)) {
                user.email = text;
            }
            else if (phoneRegexp.test(text)) {
                user.phone = text;
            }
            else {
                user.account = text;
            }
            $.ajax({
                type: "get",
                url: "/api2/account/auth?",
                data: user,
                success: function (data) {
                    //返回正确操作
                    if (data["提示信息"] == "电话存在") {
                        alert("登录成功");
                        location.href = "step.html";
                    }
                    else if (data["提示信息"] == "账号登录失败") {
                        $(".error_warning").toggle();
                        $("#error_text").text("用户名或密码错误！");
                    } else {
                    }
                }
            });
        }
    });
    $("#login1").click(function () {
        logindata.localSettings.username = $("[name='username2']").val();
        window.localStorage.localSettings = $("[name='username2']").val();
        var emailRegexp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        var phoneRegexp = /^1[3|5|8][0-9]\d{4,8}$/;
        var text = $("[name='username1']").val();
        var passwordPlaint = $("[name='password1']").val();
        var password = passwordPlaint;
//        var password = hex_sha1(passwordPlaint);
        if ((text == "") || (password == "")) {
            $(".error_warning").toggle();
            $("#username_error").html("<" + "span class='error_icon'" + "></" + "span" + ">" + "用户名密码不能为空！");
        } else {
            var user = {
                account: null,
                phone: null,
                email: null,
                password: password
            }
            if (emailRegexp.test(text)) {
                user.email = text;
            }
            else if (phoneRegexp.test(text)) {
                user.phone = text;
            }
            else {
                user.account = text;
            }
            $.ajax({
                type: "get",
                url: "/api2/account/auth?",
                data: user,
                success: function (data) {
                    //返回正确操作
                    if (data["提示信息"] == "电话存在") {
                        alert("登录成功");
                        location.href = "step.html";
                    }
                    else if (data["提示信息"] == "账号登录失败") {
                        $(".error_warning").toggle();
                        $("#error_text").text("用户名或密码错误！");
                    } else {
                    }
                }
            });
        }
    });
})
function usernameNone() {
    $("#username1_error").html("<" + "span class='error_icon'" + "></" + "span" + ">" + "用户名不能为空！");
    $("#username_right").hide();
    $(".error_warning_user").show();
}
function usernameNone1() {
    $("#username1_error").html("<" + "span class='error_icon'" + "></" + "span" + ">" + "用户名长度必需大于6小于30！");
    $("#username_right").hide();
    $(".error_warning_user").show();
}
function usernameNone2() {
    $("#username1_error").html("<" + "span class='error_icon'" + "></" + "span" + ">" + "手机号码输入不正确！");
    $("#username_right").hide();
    $(".error_warning_user").show();
}
function usernameNone3() {
    $("#username1_error").html("<" + "span class='error_icon'" + "></" + "span" + ">" + "邮箱输入不正确！");
    $("#username_right").hide();
    $(".error_warning_user").show();
}
function passwordNone() {
    $("#password1_error").html("<" + "span class='error_icon'" + "></" + "span" + ">" + "密码不能为空！");
    $("#password_right").hide();
    $(".error_warning_password").show();
}
function passwordNone1() {
    $("#password1_error").html("<" + "span class='error_icon'" + "></" + "span" + ">" + "密码长度必需大于6小于30！");
    $("#password_right").hide();
    $(".error_warning_password").show();
}
$(document).ready(function () {
    $("#weixinAdd").click(function () {
        var weixinName = $(".text_weixinName").val();
        $.ajax({
            type: "get",
            url: "/api2/weixinuer/add",
            data: {"weixinName": weixinName},
            success: function (data) {
                //返回正确操作
            }
        });
    });
})
$(document).ready(function () {
    $("#weixinName").click(function () {
        if (($("#valsesFirst").val()) != "") {
            logindata.localSettings.userstep = $("#valsesFirst").val();
            location.href = "step_1.html";
        } else {
            alert("绑定微信号不能为空！");
        }
    });
    $("#weixinName").click(function () {
        if (($("#valsesFirst").val()) != "") {
            logindata.localSettings.userstep1 = $("#valsesFirst").val();
            location.href = "step_1.html";
        } else {
            alert("绑定微信号不能为空！");
        }
    });
    $("#id1").click(function () {
        var node1 = document.getElementById("id1").innerHTML;
        //var node2= document.getElementById("id2").innerHTML;
        document.getElementById("id1").innerHTML = node1;
        //document.getElementById("id2").innerHTML = node1;
    });
    $("#id2").click(function () {
        var node1 = document.getElementById("id1").innerHTML;
        var node2 = document.getElementById("id2").innerHTML;
        document.getElementById("id1").innerHTML = node2;
        document.getElementById("id2").innerHTML = node1;
    });
})
$(document).ready(function () {
    $(".circel_step").mouseover(function () {
        var index = $(this).attr("index");
        var sharp = document.getElementById("step_line");
        if (index == 1) {
            sharp.style.left = "240px";
        }
        else if (index == 2) {
            sharp.style.left = "400px";
        }
        else if (index == 3) {
            sharp.style.left = "560px";
        }
        else if (index == 4) {
            sharp.style.left = "720px";
        }
        else if (index == 5) {
            sharp.style.left = "880px";
        }
        $(".step_img_form").addClass("hide");
        $(".word_tip").addClass("hide");
        $(".word_tip[index!='" + index + "']").removeClass("current");
        $(".word_tip[index='" + index + "']").addClass("current");
        $(".step_img_form[index!='" + index + "']").removeClass("current");
        $(".step_img_form[index='" + index + "']").addClass("current");
        $(".step_img[index!='" + index + "']").removeClass("current");
        $(".step_img[index='" + index + "']").addClass("current");
    });
})
/***********
 step_1.html页面  点击下一步事件
 ************/
$(document).ready(function () {
    $(".arrow_right").click(function () {
        var index1 = $(".word_tip.current").attr("index");
        var sharp1 = document.getElementById("step_line");
        if (index1 == 1) {
            sharp1.style.left = "400px";
        }
        else if (index1 == 2) {
            sharp1.style.left = "560px";
        }
        else if (index1 == 3) {
            sharp1.style.left = "720px";
        }
        else if (index1 == 4) {
            sharp1.style.left = "880px";
        }
        else if (index1 == 5) {
            sharp1.style.left = "240px";
        }
        if (index1 != 5) {
            index1 = parseInt(index1) + 1;
        } else {
            index1 = 1;
        }
        $(".step_img_form").addClass("hide");
        $(".word_tip").addClass("hide");
        $(".word_tip[index!='" + index1 + "']").removeClass("current");
        $(".word_tip[index='" + index1 + "']").addClass("current");
        $(".step_img_form[index!='" + index1 + "']").removeClass("current");
        $(".step_img_form[index='" + index1 + "']").addClass("current");
        $(".step_img[index!='" + index1 + "']").removeClass("current");
        $(".step_img[index='" + index1 + "']").addClass("current");
    });
})
/***********
 step_1.html页面  点击上一步事件
 ************/
$(document).ready(function () {
    $(".arrow_left").click(function () {
        var index1 = $(".word_tip.current").attr("index");
        var sharp1 = document.getElementById("step_line");
        if (index1 == 1) {
            sharp1.style.left = "880px";
        }
        else if (index1 == 2) {
            sharp1.style.left = "240px";
        }
        else if (index1 == 3) {
            sharp1.style.left = "400px";
        }
        else if (index1 == 4) {
            sharp1.style.left = "560px";
        }
        else if (index1 == 5) {
            sharp1.style.left = "720px";
        }
        if (index1 != 1) {
            index1 = parseInt(index1) - 1;
        } else {
            index1 = 5;
        }
        $(".step_img_form").addClass("hide");
        $(".word_tip").addClass("hide");
        $(".word_tip[index!='" + index1 + "']").removeClass("current");
        $(".word_tip[index='" + index1 + "']").addClass("current");
        $(".step_img_form[index!='" + index1 + "']").removeClass("current");
        $(".step_img_form[index='" + index1 + "']").addClass("current");
        $(".step_img[index!='" + index1 + "']").removeClass("current");
        $(".step_img[index='" + index1 + "']").addClass("current");
    });
})
/***********
 default.html页面  新建应用
 ************/
$(document).ready(function () {
    $(".login_opt_menu").hide();
    $(".app_list").click(function () {
        $(".login_opt_menu").toggle();
        addEvent(document.body, "mousedown", clickIndexOther);
    });
})
function clickIndexOther(el) {
    thisObj = el.target ? el.target : event.srcElement;
    do {
        if (thisObj.id == "popmenu" || thisObj.id == "app_list") {
            return;
        }
        if (thisObj.tagName == "BODY") {
            document.getElementById("popmenu").style.display = "none";
            return;
        }
        thisObj = thisObj.parentNode;
    } while (thisObj.parentNode);
}
function addEvent(obj, eventType, func) {
    if (obj.attachEvent) {
        obj.attachEvent("on" + eventType, func);
    }
    else {
        obj.addEventListener(eventType, func, false)
    }
}
/***********
 user_mange.html页面  用户管理
 ************/
$(document).ready(function () {
    $("#add_info_1").click(function () {
        $(".display_none").show();
        $("#add_info_1").hide();
    });
    $("#save").click(function () {
<<<<<<< HEAD
<<<<<<< HEAD
        var emailRegexp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        var phoneRegexp = /^1[3|5|8][0-9]\d{4,8}$/;
        var phone = $("[name = 'phone']").val();
        var email = $("[name = 'email']").val();
        var address = $("[name = 'address']").val();
        if ((phone == "") || (email == "") || (address == "")) {
            if (phone == "") {
                $("[name = 'phone']").focus();
                alert("电话号码不能为空");
            } else if (email == "") {
                $("[name = 'email']").focus();
                alert("邮箱不能为空");
            } else if (address == "") {
                $("[name = 'address']").focus();
                alert("地址不能为空");
            } else {
                $(".display_nones").show();
                $(".display_none").hide();
                $("#add_info_1").hide();
                $("#save").hide();
                $("#cancel").hide();
            }
        } else {
            var user = {
                phone: null,
                email: null,
                address: null
            }
            if (emailRegexp.test(text)) {
                user.email = text;
            }
            else if (phoneRegexp.test(text)) {
                user.phone = text;
            }
            else {
                user.address = text;
            }
        }
    });
    $("#cancel").click(function () {
        $(".display_none").hide();
        $("#add_info_1").show();
    });
    $("#add_info_2").click(function () {
        $(".display_nones").hide();
=======
        var phone = $("[name = 'phone']").val();
        var email = $("[name = 'email']").val();
        var address = $("[name = 'address']").val();
        if (phone == "") {
            alert("手机号码不能为空！");
            $("[name = 'phone']").focus();
            return false;
        } else if (phone.length != 11) {
            alert("手机号码不正确！");
            $("[name = 'phone']").focus();
            return false;
        } else if (!phone.match(/^1[3|4|5|8][0-9]\d{4,8}$/)) {
            alert("手机号码格式不正确！请重新输入！");
            $("[name = 'phone']").focus();
            return false;
        }
        if (email == "") {
            alert("邮箱不能为空！");
            $("[name = 'email']").focus();
            return false;
        } else if (!email.match(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/)) {
            alert("邮箱格式不正确！请重新输入！");
            $("[name = 'email']").focus();
            return false;
>>>>>>> 099ee3a50505b0a18b83c861154d4b3b9da6ae2b
=======
        if (($(".key_style").val()) != "") {
            $(".display_none").hide();
            $("#phone").show();
            $("#add_info_2").show();
        } else if (($(".value_style").val()) != "") {
            $(".display_none").hide();
            $("#email").show();
            $("#add_info_2").show();
        } else if ((($(".key_style").val()) || ($(".value_style").val())) != "") {
            $(".display_none").hide();
            $("#phone").show();
            $("#email").show();
            $("#add_info_2").show();
        } else {
            alert("key and value 不能为空！");
>>>>>>> 9224c7de27944b4f343c39cd0e173b242efd4a5f
        }
        if (address == "") {
            alert("地址不能为空！");
            return false;
        }
        $.ajax({

        })
        $(".display_none").hide();
        $(".display_nones").show();

    });
    $("#add_info_2").click(function () {
        $("#phone").hide();
        $("#add_info_2").hide();
>>>>>>> 9224c7de27944b4f343c39cd0e173b242efd4a5f
        $(".display_none").show();
        $("#save").show();
        $("#cancel").show();
    });
<<<<<<< HEAD
})
var selectall = true;
function checkAll(e, itemName) {
    var checkbox = document.getElementsByName(itemName);
    for (var i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = selectall;
    }
    selectall = !selectall;
}
=======
    $("#cancel").click(function () {
        if ((($("#phone").val() || ($("#email").val()))) != "") {
            $(".display_none").hide();
            $("#phone").show();
            $("#email").show();
            $("#add_info_2").show();
        } else if (($("#phone").val()) != "") {
            $(".display_none").hide();
            $("#phone").show();
            $("#add_info_2").show();
        } else if (($("#email").val()) != "") {
            $(".display_none").hide();
            $("#email").show();
            $("#add_info_2").show();
        } else {
            $(".display_none").hide();
            $("#phone").show();
            $("#add_info_2").show();
        }
    });
})

var selectall = true;
<<<<<<< HEAD
function checkAll(e, itemName) {
    var checkbox = document.getElementsByName(itemName);
    for (var i = 0; i < checkbox.length; i++) {
        checkbox[i].checked = selectall;
    }
    selectall = !selectall;
}
/*********************************
 change_info.html   修改密码
 **********************************/
$(document).ready(function () {
    $("#old_password").click(function(){
        $("#old_password").focus()
    });
    $("#old_password").blur(function () {
        var x = $("#old_password").val();
        var y = x.length;
        if (x == "") {
            $("#tip_shows").text("密码不能为空");
            $("#tip_show").show();
            $("#old_password").focus();
        } else if (y <= 5 || y >= 30){
            $("#tip_shows").html("长度必需大于6小于30");
            $("#tip_show").show();
            $("#old_password").focus();
        } else {
            $("#tip_show").hide();
        }
    });
    $("#new_password").click(function(){
        $("#new_password").focus();
    });
    $("#new_password").blur(function(){
        var a1 = $("#new_password").val();
        var b1 = a1.length;
        if(a1 == ""){
            $("#tip_hides").html("确认密码不能为空");
            $("#tip_hide").show();
            $("#new_password").focus();
        }else if (b1 <= 5 || b1 >= 30) {
            $("#tip_hides").html("长度必需大于6小于30");
            $("#tip_hide").show();
            $("#new_password").focus();
        }else {
            $("#tip_hide").hide();
        }
    });
    $("#repeat_password").click(function(){
        $("#repeat_password").focus();
    });
    $("#repeat_password").blur(function(){
        var x1 = $("#repeat_password").val();
        var y1 = x1.length;
        if(x1 == ""){
            $("#tip_nones").html("确认密码不能为空");
            $("#tip_none").show();
            $("#repeat_password").focus();
        }else if (y1 <= 5 || y1 >= 30) {
            $("#tip_nones").html("确认密码长度必需大于6小于30");
            $("#tip_none").show();
            $("#repeat_password").focus();
        }else if (x1 != $("#new_password").val()) {
            $("#repeat_password").focus();
            $("#tip_nones").html("输入的密码不一致!");
            $("#tip_none").show();
        }else {
            $("#tip_none").hide();
        }
    });
})
=======
function checkAll(e, itemName){
	var checkbox = document.getElementsByName(itemName);
	for (var i=0; i<checkbox.length; i++){
		checkbox[i].checked = selectall;	
	}
	selectall = !selectall;
}
>>>>>>> 9224c7de27944b4f343c39cd0e173b242efd4a5f
