$(document).ready(function () {
    $("#messageAdd").click(function () {

        var message = $(".text_messageAdd").val();

        var now = new Date();
        var sha_verification = sha1.hex_sha1(now.toString());
        var verificationStr = sha_verification.substr(0, 5);
        var verificationNum = Math.floor(parseInt(verificationStr, 16) / 1.048577);
        var verification = verificationNum.toString();
        if (verificationNum < 100000) {
            verification = verificationNum.toPrecision(6).split(".")[1].concat(verificationNum);
        }

        $.ajax({
            type: "get",
            url: "/api2/message/add",
            data: {"message": message ,"verification":verification },
            success: function (data) {
                //返回正确操作
            }
        });
    });
})




