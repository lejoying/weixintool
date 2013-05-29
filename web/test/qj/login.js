
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
    $("[name='username']").click(function () {
        $("[name='username']").toggle();
        $("[name='username1']").toggle();
        $("[name='username1']").focus();
        $("[name='username1']").attr("class", "input_focus");
    });
    $("[name='username1']").blur(function () {
        var emailRegexp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        var phoneRegexp = /^1[3|5|8][0-9]\d{4,8}$/;
        var name = $("[name='username1']").val();
        var b = name.length;
        if (name == "") {
            usernameNone();
        } else if (b <= 5 || b >= 30) {
            usernameNone1();
        } else {
            $("#username_right").show();
            $(".error_warning_user").hide();
        }
    });
    $("[name='password']").focus(function () {
        $("[name='password']").toggle();
        $("[name='password1']").toggle();
        $("[name='password1']").focus();
        $("[name='password1']").attr("type", "password");
        $("[name='password1']").attr("class", "input_focus");
    });
    $("[name='password1']").blur(function () {
        var x = $("[name='password1']").val();
        var y = x.length;
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
//                        alert("登录成功123");
                    }
                    else if (data["提示信息"] == "账号登录失败") {
                        $(".error_warning").toggle();
                        $("#error_text").text("用户名或密码错误！");
                    } else {
//                        alert("登录异常");
                    }
                }
            });
        }
    });
})
function usernameNone() {
    $("[name='username1']").toggle();
    $("[name='username']").toggle();
    $("#username1_error").html("<" + "span class='error_icon'" + "></" + "span" + ">" + "用户名不能为空！");
    $("#username_right").hide();
    $(".error_warning_user").show();
}
function usernameNone1() {
    $("[name='username1']").toggle();
    $("[name='username']").toggle();
    $("#username1_error").html("<" + "span class='error_icon'" + "></" + "span" + ">" + "用户名长度必需大于6小于30！");
    $("#username_right").hide();
    $(".error_warning_user").show();
}
function usernameNone2() {
    $("[name='username1']").toggle();
    $("[name='username']").toggle();
    $("#username1_error").html("<" + "span class='error_icon'" + "></" + "span" + ">" + "手机号码输入不正确！");
    $("#username_right").hide();
    $(".error_warning_user").show();
}
function usernameNone3() {
    $("[name='username1']").toggle();
    $("[name='username']").toggle();
    $("#username1_error").html("<" + "span class='error_icon'" + "></" + "span" + ">" + "邮箱输入不正确！");
    $("#username_right").hide();
    $(".error_warning_user").show();
}
function passwordNone() {
    $("[name='password1']").toggle();
    $("[name='password']").toggle();
    $("#password1_error").html("<" + "span class='error_icon'" + "></" + "span" + ">" + "密码不能为空！");
    $("#password_right").hide();
    $(".error_warning_password").show();
}
function passwordNone1() {
    $("[name='password1']").toggle();
    $("[name='password']").toggle();
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
