$(document).ready(function () {
    $("#messageAdd").click(function () {

        var weixinOpenID = $(".text_weixinOpenID").val();
        var phone = $(".text_phone").val();
        var email = $(".text_email").val();

        $.ajax({
            type: "get",
            url: "/api2/message/add",
            data: {"weixinOpenID": weixinOpenID ,"phone":phone ,"email":email },
            success: function (data) {
                //返回正确操作
            }
        });
    });
})




