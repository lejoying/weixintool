$(document).ready(function () {
    $("#userUpdate").click(function () {

        var uid = $(".text_uid").val();
        var oldpassword = $(".text_oldpassword").val();
        var newpassword = $(".text_newpassword").val();

        $.ajax({
            type: "get",
            url: "/api2/account/modify",
            data: { "uid": uid, "oldpassword": oldpassword, "newpassword": newpassword},
            success: function (data) {
                //返回正确操作
            }
        });
    });
})
