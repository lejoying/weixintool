$(document).ready(function () {

    $("#register").click(function () {
        var emailRegexp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        var phoneRegexp = /^1[3|5|8][0-9]\d{4,8}$/;

        var accountname = $("#accountname").val();
        var phone = $("#phone").val();
        var passwordPlaint1 = $("#password1").val();
        var passwordPlaint2 = $("#password2").val();
        var password = hex_sha1(passwordPlaint1);
        if ((accountname == "") || (password == "") || passwordPlaint1 != passwordPlaint2) {
            $(".error_warning").show();
            $("#username_error").html("<" + "span class='error_icon'" + "></" + "span" + ">" + "注册信息出错！");
        }
        else {

            if (!phoneRegexp.test(phone) || accountname.length < 2) {
                $(".error_warning").show();
                $("#username_error").html("<" + "span class='error_icon'" + "></" + "span" + ">" + "注册信息出错！");
            } else {
                var user = {
                    accountname: accountname,
                    phone: phone,
                    email: null,
                    password: password,
                    invite: "lejoying"
                }
                $.ajax({
                        type: "get",
                        url: "/api2/account/add?",
                        data: user,
                        success: function (serverData) {
                            if (serverData["提示信息"] == "注册账号成功") {
                                data.uid = serverData.uid;
                                data.accesskey = serverData.accesskey;
                                saveLocalSettings();
                                location.href = "default.html";
                            }
                            else if (serverData["提示信息"] == "注册账号失败") {
                                $(".error_warning").show();
                                $("#username_error").html("<" + "span class='error_icon'" + "></" + "span" + ">" + "注册不成功！");
                            }
                        }
                    }
                )
                ;
            }

        }
    })
    ;
})
;