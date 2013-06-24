$(document).ready(function () {
//    initializeData();
    checkLogin();
    function checkLogin() {
        if (data.uid == "" || data.accesskey == "110") {
            location.href = "login.html";
//            alert("jump")
        }
    }
});
