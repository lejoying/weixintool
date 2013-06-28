$(document).ready(function () {
    $("#userUpdate").click(function () {

        var accountname = $(".text_accountname").val();
        var password = $(".text_password").val();

        $.ajax({
            type: "get",
            url: "/api2/account/modify",
            data: { "accountname": accountname, "password": password},
            success: function (data) {
                //返回正确操作
            }
        });
    });
})
