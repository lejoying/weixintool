$(document).ready(function () {
    $("#messageAdd").click(function () {

        var message = $(".text_messageAdd").val();
        $.ajax({
            type: "get",
            url: "/api2/message/add",
            data: {"message": message},
            success: function (data) {
                //返回正确操作
            }
        });
    });
})
