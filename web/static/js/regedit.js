$(document).ready(function () {
    //缓存输入框元素，方便以后改名之类的，一改全改。
    var UsernameEl = $("#main_register_auth_account"),
        PasswordEl = $("#main_register_auth_password1"),
        RepasswdEl = $("#main_register_auth_password2"),
        AuthcodeEl = $("#main_register_invite_code"),
        TipsEl = $("#main_register_authTip");
    /**
     用户名
     */
    UsernameEl.blur(function () {
        var name = /^[^0-9].+$/;
        var a = $.trim(UsernameEl.val());
        var b = a.length;
        if (a == "") {
            TipsEl.html("用户名不能为空");
            $("#colu").show();
        } else if (!name.test(a)) {
            $("#main_register_auth_account").focus();
            TipsEl.html("用户名的首字母不能为数字");
            $("#colu").show();
        } else if (b <= 3 || b >= 30) {
            $("#main_register_auth_account").focus();
            TipsEl.html("用户名长度必需大于3小于30");
            $("#colu").show();
        } else {
            TipsEl.html("");
            $("#colu").show();
            $("#colu").hide();
        }
        $(this).removeClass("text").addClass("textfocus");
    });
    UsernameEl.focus(function () {
        $(this).removeClass("textfocus").addClass("text");
    });
    /**
     *  密码
     */
    PasswordEl.blur(function () {
        var x = PasswordEl.val();
        var y = x.length;
        if (x == '') {
            TipsEl.html("密码不能为空");
            $("#colu").show();
        } else if (y <= 5 || y >= 30) {
            $("#main_register_auth_password1").focus();
            TipsEl.html("密码长度必需大于6小于30");
            $("#colu").show();
        } else {
            TipsEl.html("");
            $("#colu").show();
            $("#colu").hide();
        }
        $(this).removeClass('textfocus').addClass('text');
    });
    PasswordEl.focus(function () {
        $(this).removeClass('text').addClass('textfocus');
    });
    /**
     * 确认密码
     */
    RepasswdEl.blur(function () {
        var a1 = RepasswdEl.val();
        var b1 = a1.length;
        if (a1 == '') {
            TipsEl.html("确认密码不能为空");
            $("#colu").show();
        } else if (b1 <= 5 || b1 >= 30) {
            $("#main_register_auth_password2").focus();
            TipsEl.html("长度必需大于6小于30");
            $("#colu").show();
        } else if (a1 != PasswordEl.val()) {
            $("#main_register_auth_password2").focus();
            TipsEl.html("输入的密码不一致!");
            $("#colu").show();
        } else {
            TipsEl.html("");
            $("#colu").show();
            $("#colu").hide();
        }
        $(this).removeClass('textfocus').addClass('text');
    });
    RepasswdEl.focus(function () {
        $(this).removeClass('text').addClass('textfocus');
    });
    /**
     * 验证码
     */
    AuthcodeEl.blur(function () {
        var a = AuthcodeEl.val();
        if (a == '') {
            TipsEl.html("邀请码不能为空");
            $("#colu").show();
        } else if (a != "code") {
            $("#main_register_invite_code").focus();
            TipsEl.html("邀请码输入不正确");
            $("#colu").show();
        } else if (a == "code") {
            TipsEl.html("");
            $("#colu").show();
            $("#colu").hide();
        }
        $(this).removeClass('textfocus').addClass('text');
    });
    AuthcodeEl.focus(function () {
        $(this).removeClass('text').addClass('textfocus');
    });
    /**
     * 提交按钮
     */
    $("#auth_register").click(function () {
        if (!UsernameEl.val()) {
            UsernameEl.focus();
        } else if (!PasswordEl.val()) {
            PasswordEl.focus();
        } else if (!RepasswdEl.val()) {
            RepasswdEl.focus();
        } else if (!AuthcodeEl.val()) {
            AuthcodeEl.focus();
        } else {
            alert("恭喜您：注册成功");
        }
    });
});

