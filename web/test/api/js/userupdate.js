$(document).ready(function () {
    $("#userUpdate").click(function () {

        var uid = $(".text_uid").val();
        var accountName = $(".text_accountName").val();
        var password = $(".text_password").val();
        var phone = $(".text_phone").val();
        var email = $(".text_email").val();

        $.ajax({
            type: "get",
            url: "/api2/account/modify",
            data: {"uid": uid, "accountName": accountName, "password": password, "phone": phone, "email": email},
            success: function (data) {
                //返回正确操作
            }
        });
    });
})
