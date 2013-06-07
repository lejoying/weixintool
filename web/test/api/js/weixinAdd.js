$(document).ready(function () {
    $("#weixinAdd").click(function () {

        var uid = $(".text_weixinUid").val();
        var weixinName = $(".text_weixinName").val();

        $.ajax({
            type: "get",
            url: "/api2/message/add",
            data: {"uid": uid, "weixinName": weixinName },
            success: function (data) {
                //返回正确操作
            }
        });
    });
    $("#addrel").click(function () {

        var weixinName = $(".text_weixinName").val();
        var newAppName = $(".text_newAppName").val();

        $.ajax({
            type: "get",
            url: "/api2/message/addrel",
            data: {"weixinName": weixinName, "newAppName": newAppName },
            success: function (data) {
                //返回正确操作
            }
        });
    });
})
