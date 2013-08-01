var phonePattern = "/^(13|15|18)/d{9}$/";//手机号码
var emailPattern = /^[0-9a-zA-Z]+@([0-9a-z]+.)+[a-z]{2,4}$/;//电子邮件


var app = {};
app.server = {};
app.account = {};

$(document).ready(function () {
    $("#test1").click(function () {
        window.alert("click");
        $.ajax({
            data:{"text":"abc"},
            success:function (data) {
                RSA.setMaxDigits(38);
                app.server.PbKey = RSA.RSAKey(data.PbKey);
                app.account.uid = RSA.decryptedString(app.server.PbKey, data.uid);
                app.account.accessKey = RSA.decryptedString(app.server.PbKey, data.accessKey);
//                alert(JSON.stringify(data));
            },
            type:'GET',
            url:("http://www.auth6.com/api2/account/auth")
        });
    });


    //注册
    $("#auth_register").click(function () {

            var account = $("#accountName").val();
            var password1 = $("#password1").val();
            var password2 = $("#password2").val();
            var phone = $("#phone").val();
            var email = $("#email").val();
            var invite = $("#invite_code").val();
            if (account.length < 3) {
                $("#main_register_authTip").show();
                $("#main_register_authTip").html("注册失败：" + "非法用户名。");
                return;
            }
            if (password2.length < 6) {
                $("#main_register_authTip").show();
                $("#main_register_authTip").html("注册失败：" + "密码必须大于6位。");
                return;
            }
            if (password1 != password2) {
                $("#main_register_authTip").show();
                $("#main_register_authTip").html("注册失败：" + "密码不一致。");
                return;
            }

            if (password1 != password2) {
                $("#main_register_authTip").show();
                $("#main_register_authTip").html("注册失败：" + "密码不一致。");
                return;
            }


            $.ajax({
                data:{
                    "accountName":account,
                    "password":hex_sha1("password1"),
                    "phone":phone,
                    "email":email,
                    "invite":invite
                },
                success:function (data) {
                    if (data["提示信息"] == "账户注册成功") {
                        RSA.setMaxDigits(38);
                        app.server.PbKey = RSA.RSAKey(data.PbKey);
                        app.account.uid = RSA.decryptedString(app.server.PbKey, data.uid);
                        app.account.accessKey = RSA.decryptedString(app.server.PbKey, data.accessKey);
                        app.account.password = RSA.RSAKey(app.server.PbKey);
                    }
                    else {
                        $("#main_register_authTip").show();
                        $("#main_register_authTip").html("注册失败：" + data["提示信息"]);
                    }
                },
                type:'GET',
                url:("/api2/account/add")
            });
        }
    );


});