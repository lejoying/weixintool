$(document).ready(function () {
    $("#weixinAdd").click(function () {

        var uid = $(".text_weixinUid").val();
        var accesskey = $(".text_weixinOpenID").val();
        var weixinOpenID = $(".text_weixinAccesskey").val();
        var weixinName = $(".text_weixinName").val();
        var token = $(".text_weixinToken").val();

        $.ajax({
            type: "get",
            url: "/api2/weixinuer/add",
            data: {"uid": uid, "accesskey": accesskey, "weixinOpenID": weixinOpenID,"weixinName": weixinName, "token":token },
            success: function (data) {
                //返回正确操作
            }
        });
    });
})
