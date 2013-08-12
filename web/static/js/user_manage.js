$(document).ready(function () {
    checkLogin();
    function checkLogin() {
        if (data.uid == "" || data.accesskey == "110") {
            location.href = "login.html";
        }
    }
    getUsers();
});

$(document).ready(function () {
        location.href = "personal_app.html";
    });
});
