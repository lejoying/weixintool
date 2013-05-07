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
                $("[name='username1']").toggle();
                $("[name='username']").toggle();
            }
            if (isEmail(name)) {
                // alert("邮箱");
            }
            else if (isMobile(name)) {
                //alert("手机");
            }
            else {
                //alert("用户名");
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
                $("[name='password1']").toggle();
                $("[name='password']").toggle();
            }
        });
        $("#login").click(function () {
            if (($("[name='username1']").val() == "") || ($("[name='password1']").val() == "")) {
                $(".error_warning").toggle();
                $("#error_text").text("用户名或密码不能为空！");
            } else {
                var pwd = $("[name='password1']").val();
                $.ajax({ type: "get", url: "/api2/account/auth?", data: {accountName: $("[name='username1']").val(), password: hex_sha1("pwd")}, success: function (data) {
                    //返回正确操作
                    if (data[status] == "passed") {
                        alert("登录成功");
                    }
                    else if (data[status] == "failed") {
                        $(".error_warning").toggle();
                        $("#error_text").text("用户名或密码错误！");
                    } else {
                        alert("登录异常");
                    }
                }});
            }
        });
    }

)
;
function isEmail(str) {
    var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
    return reg.test(str);
}

function isMobile(str) {
    var mobile = /^1[3|5|8][0-9]\d{4,8}$/;
    return mobile.test(str);
}