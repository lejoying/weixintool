$(document).ready(function () {
    $("#username").click(function () {
        $("#username").toggle();
        $("#username1").toggle();
        $("#username1").focus();
        $("#username1").attr("class", "reg_input_focus");
    });
    $("#username1").blur(function () {
        var name = /^[^0-9].+$/;
        var a = $.trim($("#username1").val());
        var b = a.length;
        if (a == "") {
            $("#username_error").html("用户名不能为空");
            $("#name1_none").show();
        } else if (!name.test(a)) {
            $("#username1").focus();
            $("#username_error").html("用户名的首字母不能为数字");
            $("#name1_none").show();
        } else if (b <= 3 || b >= 30) {
            $("#username1").focus();
            $("#username_error").html("用户名长度必需大于3小于30");
            $("#name1_none").show();
        } else {
            $("#username_error").html("");
            $("#name1_none").show();
            $("#name1_none").hide();
        }
    });
    $("#password").focus(function () {
        $("#password").toggle();
        $("#password1").toggle();
        $("#password1").focus();
        $("#password1").attr("type", "password");
        $("#password1").attr("class", "reg_input_focus");
    });
    $("#password1").blur(function () {
        var x = $("#password1").val();
        var y = x.length;
        if (x == '') {
            $("#password_error").html("密码不能为空");
            $("#password1_none").show();
        } else if (y <= 5 || y >= 30) {
            $("#password1").focus();
            $("#password_error").html("密码长度必需大于6小于30");
            $("#password1_none").show();
        } else {
            $("#password_error").html("");
            $("#password1_none").show();
            $("#password1_none").hide();
        }
    });
    $("#pwd").focus(function () {
        $("#pwd").toggle();
        $("#pwd1").toggle();
        $("#pwd1").focus();
        $("#pwd1").attr("type", "password");
        $("#pwd1").attr("class", "reg_input_focus");
    });
    $("#pwd1").blur(function () {
        var a1 = $("#pwd1").val();
        var b1 = a1.length;
        if (a1 == '') {
            $("#pwd_error").html("确认密码不能为空");
            $("#pwd_none").show();
        } else if (b1 <= 5 || b1 >= 30) {
            $("#pwd1").focus();
            $("#pwd_error").html("长度必需大于6小于30");
            $("#pwd_none").show();
        } else if (a1 != $("#password1").val()) {
            $("#pwd1").focus();
            $("#pwd_error").html("输入的密码不一致!");
            $("#pwd_none").show();
        } else {
            $("#pwd_error").html("");
            $("#pwd_none").show();
            $("#pwd_none").hide();
        }
    });
    $("#phone").focus(function () {
        $("#phone").toggle();
        $("#phone1").toggle();
        $("#phone1").focus();
        $("#phone1").attr("class", "reg_input_focus");
    });
    $("#phone1").blur(function () {
        var pai = /^1[3|5|8][0-9]\d{4,8}$/;
        var a = $("#phone1").val();
        if (a == '') {
            $("#phone_error").html("手机号码不能为空");
            $("#phone_none").show();
        } else if (!pai.test(a)) {
            $("#phone1").focus();
            $("#phone_error").html("手机号码输入不正确");
            $("#phone_none").show();
        } else {
            $("#phone_error").html("");
            $("#phone_none").show();
            $("#phone_none").hide();
        }
    });
    $("#regedit").click(function () {
        if (!($("#username1").val())) {
            $("#username1").focus();
        } else if (!($("#password1").val())) {
            $("#password1").focus();
        } else if (!($("#pwd1").val())) {
            $("#pwd1").focus();
        } else if (!($("#phone1").val())) {
            $("#phone1").focus();
        }
        $.ajax({
            type: "get",
            url: "/api2/account/add?",
            data: {
                "accountName": $("#username1").val(), "phone": $("#phone1").val(), "password":  $("#password1").val() , "invite":"lejoying"
            },
            success: function (data) {
                //返回正确操作
                alert(data["提示信息"]);
                if (data["提示信息"] == "注册账号成功") {
                    alert("注册成功");
                }
                else if (data["提示信息"] == "注册账号失败") {
                    $(".error_warning").toggle();
                    $("#error_text").text("用户名或密码错误");
                } else {
                    alert("注册异常");
                }
            }
        });
    });
});

