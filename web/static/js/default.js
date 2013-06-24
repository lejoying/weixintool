$(document).ready(function () {
    checkLogin();
    function checkLogin() {
        if (data.uid == "" || data.accesskey == "110") {
            location.href = "login.html";
        }
    }
});
