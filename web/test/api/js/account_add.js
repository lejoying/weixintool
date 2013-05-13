$(document).ready(function () {
    $("#login").click(function () {

        var accountname = $(".text_accountname").val();
        var phone = $(".text_phone").val();
        var email = $(".text_email").val();
        var password = $(".text_password").val();
        var invite = $(".text_invite").val();


        $.ajax({
            type: "get",
            url: "/api2/account/add?",
            data: {"accountName": accountname, "phone": phone, "email": email, "password": password, "invite": invite},
            success: function (data) {
                //返回正确操作

            }
        });

    });
})