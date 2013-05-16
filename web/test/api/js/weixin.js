
$(document).ready(function () {
    $("#Update").click(function () {

        var weixinOpenID = $(".text_weixinOpenID").val();
        var weixinName = $(".text_weixinName").val();
        var token = $(".text_token").val();
        var invite = $(".text_invite").val();

        $.ajax({
            type: "get",
            url: "/api2/weixinuer/modify",
            data: {"weixinOpenID": weixinOpenID, "weixinName": weixinName, "token": token,"invite": invite},
            success: function (data) {
                //返回正确操作
            }
        });
    });
})

$("#weixinAdd").click(function () {

    window.alert("weixinAdd");
    $.ajax({
        data: {
            "uid": "account",
            "accesskey":"2013",
            "weixinOpenID":"555578",
            "weixinName":"chris",
            "token":"gaike"
        },
        success: function (data) {
            alert(JSON.stringify(data));
        },
        type: 'GET',
        url: ("/api2/weixinuer/add")
    });
});

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
            "weixinOpenID": "555578"
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

        var weixinOpenID = $(".text_weixinOpenID").val();
        var weixinName = $(".text_weixinName").val();
        var token = $(".text_token").val();
        var invite = $(".text_invite").val();
        var uid = $(".text_uid").val();
        var phone = $(".text_phone").val();
        var accountName = $(".text_accountName").val();

        $.ajax({
            type: "get",
            url: "/api2/weixinuer/getall",
//            data: {"weixinOpenID": weixinOpenID, "weixinName": weixinName, "token": token,"invite": invite},
            data: {"weixinOpenID": weixinOpenID, "weixinName": weixinName, "token": token,"invite": invite,"uid": uid, "phone": phone, "accountName": accountName},
            success: function (data) {
                //返回正确操作
            }
        });
    });
})
