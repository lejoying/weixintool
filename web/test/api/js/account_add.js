$(document).ready(function () {
    $("#login").click(function () {

        var accountname = $(".text_accountname").val();
        var phone = $(".text_phone").val();
        var email = $(".text_email").val();
        var password = $(".text_password").val();
        var invite = $(".text_invite").val();


        $.ajax({
            type: "get",
            url: "/api2/account/add?",
            data: {"accountName": accountname, "phone": phone, "email": email, "password": password, "invite": invite},
            success: function (data) {
                //返回正确操作

            }
        });

    });
})

$("#account_exist").click(function () {

    window.alert("test_exist");
    $.ajax({
        data: {
            "accountName": "aaabbbccc",
            "password": hex_sha1("123"),
            "phone":"18691171987",
            "email":"avasf@163.com"
        },
        success: function (data) {
            RSA.setMaxDigits(38);
            app.server.PbKey = RSA.RSAKey(data.PbKey);
            app.account.uid = RSA.decryptedString(app.server.PbKey, data.uid);
            app.account.accessKey = RSA.decryptedString(app.server.PbKey, data.accessKey);
            alert(JSON.stringify(data));
        },
        type: 'GET',
        url: ("/api2/account/exist")
    });
});


$("#account_auth").click(function () {

    window.alert("account_auth");
    $.ajax({
        data: {
            "accountName": "aaabbbccc",
            "email":"asdga@sdf.com",
            "phone":"18609878987"
        },
        success: function (data) {
            RSA.setMaxDigits(38);
            app.account.uid = RSA.decryptedString(app.server.PbKey, data.uid);
            app.account.accessKey = RSA.decryptedString(app.server.PbKey, data.accessKey);
            alert(JSON.stringify(data));
        },
        type: 'GET',
        url: ("/api2/account/auth")
    });
});
