$(document).ready(function () {
    $("#messageAdd").click(function () {

        var weixinOpenID = $(".text_weixinOpenID").val();
        var newId = $(".text_newId").val();
        var phone = $(".text_phone").val();
        var email = $(".text_email").val();

        $.ajax({
            type: "get",
            url: "/api2/message/adds?",
            data: {"weixinOpenID": weixinOpenID ,"phone":phone ,"email":email,"newId":newId },
            success: function (data) {
                //返回正确操作
            }
        });
    });

    $("#applyAdd").click(function () {

        var weixinOpenID = $(".text_weixinOpenID").val();
        var newAppName = $(".text_newAppName").val();
        var appIcon = $(".text_appIcon").val();
        var updateScript = $(".text_updateScript").val();
        var appScpecification = $(".text_appScpecification").val();

        $.ajax({
            type: "get",
            url: "/api2/apply/addtest?",
            data: {"weixinOpenID": weixinOpenID ,"newAppName":newAppName ,"appIcon":appIcon,"updateScript":updateScript,"appScpecification":appScpecification },
            success: function (data) {
                //返回正确操作
            }
        });
    });
    $("#leaveMessage").click(function () {

        var weixinOpenID = $(".text_weixinOpenID").val();

        $.ajax({
            type: "get",
            url: "/api2/message/leave?",
            data: {"weixinOpenID": weixinOpenID },
            success: function (data) {
                //返回正确操作
            }
        });
    });
})




