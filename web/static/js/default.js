$(document).ready(function () {
    checkLogin();
    function checkLogin() {
        if (data.uid == "" || data.accesskey == "110") {
            location.href = "login.html";
        }
    }
    getWeixins();
});

$(document).ready(function () {
    $(".out_frame_add").click(function () {
        location.href = "personal_app.html";
    });
});
