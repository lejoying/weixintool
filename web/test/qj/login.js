$(document).ready(function () {
    $("[name='username']").click(function () {
        $("[name='username']").toggle();
        $("[name='username1']").toggle();
        $("[name='username1']").focus();
        $("[name='username1']").attr("class", "input_focus");
    });
    $("[name='username1']").blur(function () {
        var name = $("[name='username1']").val();
        if (name == "") {
            usernameNone();
        }else{
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
        if ($("[name='password1']").val() == "") {
            passwordNone();
        } else {
            $("#password_right").show();
			$(".error_warning_password").hide();
        }
    });
    $("#login").click(function () {

        var emailRegexp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        var phoneRegexp = /^1[3|5|8][0-9]\d{4,8}$/;

        var text = $("[name='username1']").val();
        var passwordPlaint = $("[name='password1']").val();
        var password = hex_sha1(passwordPlaint);

        if ((text == "") || (password == "")) {
            $(".error_warning").toggle();
            $("#username_error").html("<"+"span class='error_icon'"+"></"+"span"+">"+"用户名密码不能为空！");
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
                    if (data["提示信息"] == "账号登录成功") {
                        alert("登录成功");
                    }
                    else if (data["提示信息"] == "账号登录失败") {
                        $(".error_warning").toggle();
                        $("#error_text").text("用户名或密码错误！");
                    } else {
                        alert("登录异常");
                    }
                }
            });
        }
    });
})
function usernameNone(){
	$("[name='username1']").toggle();
	$("[name='username']").toggle();
	$("#username_error").html("<"+"span class='error_icon'"+"></"+"span"+">"+"用户名不能为空！");
	$("#username_right").hide();
	$(".error_warning_user").show();
}
function passwordNone(){
	$("[name='password1']").toggle();
	$("[name='password']").toggle();
	$("#password_error").html("<"+"span class='error_icon'"+"></"+"span"+">"+"密码不能为空！");
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
        $(".word_tip[index!='" + index + "']").removeClass("current");
        $(".word_tip[index='" + index + "']").addClass("current");
        $(".step_img_form[index!='" + index + "']").removeClass("current");
        $(".step_img_form[index='" + index + "']").addClass("current");
        $(".step_img[index!='" + index + "']").removeClass("current");
        $(".step_img[index='" + index + "']").addClass("current");
    });
})