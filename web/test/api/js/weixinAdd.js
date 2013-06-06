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
})
