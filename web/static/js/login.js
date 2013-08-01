<<<<<<< HEAD
$(document).ready(function(){
    $("[name='username']").click(function(){
        $("[name='username']").toggle();
        $("[name='username1']").toggle();
        $("[name='username1']").focus();
        $("[name='username1']").attr("class","input_focus");
    });
    $("[name='username1']").blur(function(){
        if($("[name='username1']").val()==""){
            $("[name='username1']").toggle();
            $("[name='username']").toggle();
        }
    });
    $("[name='password']").click(function(){
        $("[name='password']").toggle();
        $("[name='password1']").toggle();
        $("[name='password1']").focus();
        $("[name='password1']").attr("type","password");
        $("[name='password1']").attr("class","input_focus");
    });
    $("[name='password1']").blur(function(){
        if($("[name='password1']").val()==""){
            $("[name='password1']").toggle();
            $("[name='password']").toggle();
        }
    });
     $("#login").click(function(){
         if(($("[name='username1']").val()=="") || ($("[name='password1']").val()=="")){
               $(".error_warning").toggle();
               $("#error_text").text("用户名或密码不能为空！");
         } else{
             $.ajax({ type:"post",url:"/api2/accont/outh?",data:{accent:$("[name='username1']").val() , password:$("[name='password1']").val()},success:function(){
                 //返回正确操作
             }});
         }
     });
});
=======
$(document).ready(function () {
    checkLogin();
    function checkLogin() {
        if (data.uid != "" && data.accesskey != "110" && data.uid != null && data.accesskey != null) {
            location.href = "default.html";
        }
    }
});

$(document).ready(function () {

    /*************************************** ***************************************
     * register
     *************************************** ***************************************/
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
            $("#username_error").html("注册信息出错！");
        }
        else {

            if (!phoneRegexp.test(phone) || accountname.length < 2) {
                $(".error_warning").show();
                $("#username_error").html("注册信息出错！");
            } else {
                var user = {
                    accountname: accountname,
                    phone: phone,
                    email: null,
                    password: password,
                    invite: "lejoying"
                }
                $.ajax({
                        type: "GET",
                        url: "/api2/account/add?",
                        data: user,
                        success: function (serverData) {
                            if (serverData["提示信息"] == "注册账号成功") {
                                data.uid = serverData.uid;
                                data.accesskey = serverData.accesskey;
                                data.accountname = serverData.accountname;
                                saveLocalSettings();
                                location.href = "default.html";
                            }
                            else if (serverData["提示信息"] == "注册账号失败") {
                                $(".error_warning").show();
                                $("#username_error").html("注册不成功！");
                            }
                        }
                    }
                );
            }

        }
    });

    /*************************************** ***************************************
     * login
     *************************************** ***************************************/
    $("#login").click(function () {

        var emailRegexp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        var phoneRegexp = /^1[3|5|8][0-9]\d{4,8}$/;


        var accountStr = $(".js_account_str").val();
        var passwordPlaint = $(".js_password").val();
        var password = hex_sha1(passwordPlaint);

        if ((accountStr == "") || (password == "")) {
            $(".error_warning").show();
            $("#username_error").html("<" + "span class='error_icon'" + "></" + "span" + ">" + "用户名或密码不能为空！");
        }
        else {
            var user = {
                accountname: null,
                phone: null,
                email: null,
                password: password
            }
            if (emailRegexp.test(accountStr)) {
                user.email = accountStr;
            }
            else if (phoneRegexp.test(accountStr)) {
                user.phone = accountStr;
            }
            else {
                user.accountname = accountStr;
            }
            $.ajax({
                type: "GET",
                url: "/api2/account/auth?",
                data: user,
                success: function (serverData) {
                    if (serverData["提示信息"] == "账号登录成功") {
                        data.uid = serverData.uid;
                        data.accesskey = serverData.accesskey;
                        data.accountname = serverData.accountname;
                        saveLocalSettings();
                        location.href = "default.html";
                    }
                    else if (serverData["提示信息"] == "账号登录失败") {
                        $(".error_warning").show();
                        $("#error_text").text("用户名或密码错误！");
                    }
                }
            });
        }
    });

    $(".js_password").keyup(function () {
        if (event.keyCode == 13) {
            $("#login").trigger("click");
        }
    });


});


>>>>>>> weihu
