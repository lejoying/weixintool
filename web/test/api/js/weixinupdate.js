$(document).ready(function () {
    $("#Update").click(function () {

        var weixinOpenID = $(".text_weixinOpenID").val();
        var weixinName = $(".text_weixinName").val();
        var password = $(".text_password").val();
        var phone = $(".text_phone").val();
        var email = $(".text_email").val();

        $.ajax({
            type: "get",
            url: "/api2/weixinuer/modify",
            data: {"weixinOpenID": weixinOpenID, "weixinName": weixinName, "password": password, "phone": phone, "email": email},
            success: function (data) {
                //返回正确操作
            }
        });
    });
})


$("#account_weixinUpdate").click(function () {

    window.alert("account_weixinUpdate");
    $.ajax({
        data: {
            "uid": data.uid,
            "type": "account",
            "accesskey": data.accesskey,
            "weixinOpenID": data.weixinOpenID,
            "weixinName": data.weixinName,
            "token": data.token
        },
        success: function (data) {
            RSA.setMaxDigits(38);
            app.account.uid = RSA.decryptedString(app.server.PbKey, data.uid);
            app.account.accessKey = RSA.decryptedString(app.server.PbKey, data.accessKey);
            app.account.weixinOpenID = RSA.decryptedString(app.server.PbKey, data.weixinOpenID);
            app.account.weixinName = RSA.decryptedString(app.server.PbKey, data.weixinName);
            app.account.token = RSA.decryptedString(app.server.PbKey, data.token);
            alert(JSON.stringify(data));
        },
        type: 'GET',
        url: ("/api2/weixinuer/add")
    });
});


$("#weixinDelete").click(function () {

    window.alert("weixinDelete");
    $.ajax({
        data: {
            "weixinOpenID": data.weixinOpenID
//            "weixinOpenID": "cfeasdfas"
        },
        success: function (data) {
            alert(JSON.stringify(data));
        },
        type: 'GET',
        url: ("/api2/weixinuer/delete")
    });
});


$(document).ready(function () {
    $("#weixinGetall").click(function () {

        var uid = $(".text_weixinUid").val();
        var accesskey = $(".text_weixinAccesskey").val();

        $.ajax({
            type: "get",
            url: "/api2/weixinuer/getall",
            data: {"uid": uid, "accesskey": accesskey},
            success: function (data) {
                //返回正确操作
            }
        });
    });
})





