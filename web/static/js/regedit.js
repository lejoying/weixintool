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
//    $("#username1").focus();
    $("#username1").click(function () {
        $("#username1").focus();
        $("#username1").attr("class", "reg_input_focus");
    });
    $("#username1").blur(function () {
        var name = /^[0-9].*$/;
        var a = $.trim($("#username1").val());
        var b = a.length;
		$("#username1").attr("class", "reg_input_text");
        if (a == "") {
            $("#username_error").html("用户名不能为空");
            $("#name1_none").show();
            $("#name_icon").hide();
        } else if (name.test(a)) {
            $("#username1").focus();
            $("#username_error").html("用户名的首字母不能为数字");
            $("#name1_none").show();
            $("#name_icon").hide();
        } else if (b <= 3 || b >= 30) {
            $("#username1").focus();
            $("#username_error").html("用户名长度必需大于3小于30");
            $("#name1_none").show();
            $("#name_icon").hide();
        } else {
            $("#username_error").html("");
            $("#name_icon").show();
            $("#name1_none").show();
            $("#name1_none").hide();
        }
    });
    $("#password1").click(function () {
        $("#password1").focus();
        $("#password1").attr("class", "reg_input_focus");
    });
    $("#password1").blur(function () {
        var x = $("#password1").val();
        var y = x.length;
		$("#password1").attr("class", "reg_input_text");
        if (x == '') {
            $("#password_error").html("密码不能为空");
            document.getElementById("password1_none").style.display="inline-block";
            $("#password1_none").show();
            $("#word_icon").hide();
        } else if (y <= 5 || y >= 30) {
            $("#password1").focus();
            $("#password_error").html("长度必需大于6小于30");
            document.getElementById("password1_none").style.display="inline-block";
            //$("#password1_none").show();
            $("#word_icon").hide();
        } else {
            $("#password_error").html("");
            $("#word_icon").show();
            $("#password1_none").show();
            $("#password1_none").hide();
        }
    });
    $("#pwd1").click(function () {
        $("#pwd1").focus();
        $("#pwd1").attr("class", "reg_input_focus");
    });
    $("#pwd1").blur(function () {
        var a1 = $("#pwd1").val();
        var b1 = a1.length;
		$("#pwd1").attr("class", "reg_input_text");
        if (a1 == '') {
            $("#pwd_error").html("确认密码不能为空");
            document.getElementById("pwd_none").style.display="inline-block";
            $("#pwd_none").show();
            $("#pwd_icon").hide();
        } else if (b1 <= 5 || b1 >= 30) {
            $("#pwd1").focus();
            $("#pwd_error").html("长度必需大于6小于30");
            $("#pwd_none").show();
            $("#pwd_icon").hide();
        } else if (a1 != $("#password1").val()) {
            $("#pwd1").focus();
            $("#pwd_error").html("输入的密码不一致!");
            $("#pwd_none").show();
            $("#pwd_icon").hide();
        } else {
            $("#pwd_error").html("");
            $("#pwd_icon").show();
            $("#pwd_none").show();
            $("#pwd_none").hide();
        }
    });
    $("#phone1").click(function () {
        $("#phone1").focus();
        $("#phone1").attr("class", "reg_input_focus");
    });
    $("#phone1").blur(function () {
        var pai = /^1[3|5|8][0-9]\d{8}$/;
        var a = $("#phone1").val();
		$("#phone1").attr("class", "reg_input_text");
        if (a == '') {
            $("#phone_error").html("手机号码不能为空");
            $("#phone_none").show();
            $("#phone_icon").hide();
        } else if (!pai.test(a)) {
            $("#phone1").focus();
            $("#phone_error").html("手机号码输入不正确");
            $("#phone_none").show();
            $("#phone_icon").hide();
        } else {
            $("#phone_error").html("");
            $("#phone_icon").show();
            $("#phone_none").show();
            $("#phone_none").hide();
        }
    });

    $("#register").click(function () {

        var password1 = $("[name='password1']").val();
        var password = hex_sha1(password1);

        if (!($("#username1").val())) {
            $("#username1").focus();
        } else if (!($("#password1").val())) {
            $("#password1").focus();
        } else if (!($("#pwd1").val())) {
            $("#pwd1").focus();
        } else if (!($("#phone1").val())) {
            $("#phone1").focus();
        } else{
            $.ajax({
                type: "get",
                url: "/api2/account/add?",
                data: {
                    "accountName": $("#username1").val(), "phone": $("#phone1").val(), "password": password, "invite": "lejoying"
                },
                success: function (data) {
                    //返回正确操作
                    alert(data["提示信息"]);
                    if (data["提示信息"] == "注册账号成功") {
                        alert("注册成功");
                        location.href = "step.html";
                    }
                    else if (data["提示信息"] == "注册账号失败") {
                        $(".error_warning").toggle();
                        $("#error_text").text("用户名或密码错误");
                    } else {
                        alert("注册异常");
                    }
                }
            });
        }
        logindata.localSettings.username = $("[name='username2']").val();
        window.localStorage.localSettings = $("[name='username2']").val();
    });
});

