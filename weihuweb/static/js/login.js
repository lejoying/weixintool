$(document).ready(function(){
	$("#login").click(function(){
        $(".js_errorPrompt").removeClass("show");
        $(".js_regeditBody").addClass("hide");
        $(".js_loginBody").removeClass("hide");
		$(".js_login").addClass("redbg");
        $(".js_login").removeClass("blackbg") ;
		$(".js_regedit").addClass("blackbg");
        $(".js_regedit").removeClass("redbg");
	});
	$("#regedit").click(function(){
        $(".js_errorPrompt").removeClass("show");
        $(".js_regeditBody").removeClass("hide");
        $(".js_loginBody").addClass("hide");
		$(".js_regedit").addClass("redbg");
        $(".js_regedit").removeClass("blackbg");
		$(".js_login").addClass("blackbg");
        $(".js_login").removeClass("redbg");
	});
    $(".js_login_btn").click(function(){
        $(".js_errorPrompt").html("");
        var accountname = $(".js_email").val();
        var password = $(".js_password").val();

        if(accountname==""||password==""){
            $(".js_errorPrompt").addClass("show");
            $(".js_errorPrompt").html("您输入的用户名或密码不能为空");
        }
        $.ajax({
            type: "GET",
            url: "/api2/account/auth?",
            data: {
                "accountname": accountname, "password": hex_sha1(password)
            },
            success: function (serverData) {
                if (serverData["提示信息"] == "微信公众账号正在绑定") {
                    data.bindingWeixinName = weixinName;
                    data.bindingToken = serverData.token;
                    location.href = "step_1.html";
                }else if (serverData["提示信息"] == "账号登录成功") {
                    location.href = "default.html";
                }else if(serverData["提示信息"] == "账号登录失败"){
                    $(".js_errorPrompt").addClass("show");
                    $(".js_errorPrompt").html(serverData["失败原因"]);
                }
            }
        });
    });
    $(".js_regedit_btn").click(function(){
        $(".js_errorPrompt").html("");
        var accountname = $(".js_reg_email").val();
        var nickname = $(".js_nick_name").val();
        var password = $(".js_regpasswrod").val();
        var oncepassword = $(".js_oncepassword").val();
        var emailRegexp = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
        if(accountname.trim()==""||password.trim()==""){
            $(".js_errorPrompt").addClass("show");
            $(".js_errorPrompt").html("您输入的用户名或密码不能为空");
            return;
        }
        if (!emailRegexp.test(accountname)){
            $(".js_errorPrompt").addClass("show");
            $(".js_errorPrompt").html("请输入正确的邮箱");
            return;
        }
        if(nickname==""){
            $(".js_errorPrompt").addClass("show");
            $(".js_errorPrompt").html("昵称不能为空");
            return;
        }
        if(password.length<6){
            $(".js_errorPrompt").addClass("show");
            $(".js_errorPrompt").html("密码长度不能小于6位");
            return;
        }
        if(password!=oncepassword){
            $(".js_errorPrompt").addClass("show");
            $(".js_errorPrompt").html("您输入的密码与确认密码不同");
            return;
        }
        $.ajax({
            type: "GET",
            url: "/api2/account/exist?",
            data: {
                "accountname": accountname
            },
            success: function (serverData) {
                if (serverData["提示信息"] == "用户名存在") {
                    $(".js_errorPrompt").addClass("show");
                    $(".js_errorPrompt").html(serverData["失败原因"]);
                }
                else{
                    $.ajax({
                        type: "GET",
                        url: "/api2/account/add?",
                        data: {
                            "accountname": accountname, "nickname": nickname, "password": hex_sha1(password)//, "phone": "15210721340"
                        },
                        success: function (serverData) {
                            if (serverData["提示信息"] == "注册账号成功") {
                                $(".loginFrame").animate({left:'-2000px'},600);
                                $(".registSuccess").animate({left:'280px'},600);
                            }
                        }
                    });
                }
            }
        });
    });
});