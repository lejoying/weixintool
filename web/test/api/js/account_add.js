$(document).ready(function () {
    $("#regedit").click(function () {

        var accountname = $(".text_accountname").val();
        var phone = $(".text_phone").val();
        var passwordpp = $(".text_password").val();
        var password = hex_sha1(passwordpp);

        $.ajax({
            type: "get",
            url: "/api2/account/add?",
            data: {"accountName": accountname, "phone": phone,  "password": password, "invite": "lejoying"},
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
            "accountName": "asdfasdf",
            "password": hex_sha1("123"),
            "phone": "18691171987",
            "email": "avasf@163.com"
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

$("#accoundLogin").click(function () {

    window.alert("accoundLogin");

    var accountName = $(".text_accountUid").val();
    var phone = $(".text_phone").val();
    var email = $(".text_email").val();
    var password = $(".text_accountPwd").val();

    $.ajax({
        data: {
            "accountName":accountName,
            "email": email,
            "password": hex_sha1(password),
            "phone": phone
        },
        success: function (data) {
            RSA.setMaxDigits(38);
            app.account.uid = RSA.decryptedString(app.server.PbKey, data.uid);
            app.account.accessKey = RSA.decryptedString(app.server.PbKey, data.accessKey);
            app.localSettings.accountName = data.accountName;
            alert(JSON.stringify(data));
        },
        type: 'GET',
        url: ("/api2/account/auth")
    });
});
