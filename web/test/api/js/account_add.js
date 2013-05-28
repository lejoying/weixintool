$(document).ready(function () {
    $("#login").click(function () {

        var accountname = $(".text_accountname").val();
        var phone = $(".text_phone").val();
        var email = $(".text_email").val();

        var passwordpp = $(".text_password").val();
        var password = hex_sha1(passwordpp);
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
//var app = {};
//
//app.serverUrl = "http://127.0.0.1/test/api/step.html";
//
//
//
//app.localSettings = {};
//window.alert("kdj");
//window.onbeforeunload = function () {
//    window.localStorage.localSettings = JSON.stringify(app.localSettings);
//};
//
//function saveLocalSettings() {
//    window.localStorage.localSettings = JSON.stringify(app.localSettings);
//}
//
//$(document).ready(function () {
//    if (window.localStorage.localSettings != null) {
//        app.localSettings = JSON.parse(window.localStorage.localSettings);
//    }
//});
//$(document).ready(function () {
////        var area = $("body");
////        app.accountName["body"]("None", area);
//    app.accountname();
//    accountname();
//});
$("#accoundLogin").click(function () {

    window.alert("accoundLogin");

//    var phone = "18691171987";
//    var password = "123456";


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
