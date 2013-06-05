$(document).ready(function () {
    $("#weixinAdd").click(function () {

        var uid = $(".text_weixinUid").val();
//        var accesskey = $(".text_weixinOpenID").val();
//        var weixinOpenID = $(".text_weixinAccesskey").val();
        var weixinName = $(".text_weixinName").val();
//        var token = $(".text_weixinToken").val();

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
