$(document).ready(function(){
	/*$("#accountSetting").click(function(){
		$(".js_bindStepTwo").hide();
		$(".js_bindStepOne").show();
		$("#accountSetting").addClass("settingClick");
		$("#pwdSetting").removeClass("settingClick");
	});
	$("#pwdSetting").click(function(){
		$(".js_bindStepOne").hide();
		$(".js_bindStepTwo").show();
		$("#pwdSetting").addClass("settingClick");
		$("#accountSetting").removeClass("settingClick");
	});*/
    $($(".bindWeixinOpt")[2]).click(function(){
        $(".js_bindStepTwo").hide();
        $(".js_bindStepThree").hide();
        $(".js_bindStepOne").show();
        $($(".js_pwdSetting")[0]).find("a").addClass("settingClick");
        $("#accountSetting").removeClass("settingClick");
        window.scrollTo(20,20);
    });
    $($(".bindWeixinOpt")[1]).click(function(){
        $(".js_bindStepTwo").hide();
        $(".js_bindStepThree").hide();
        $(".js_bindStepOne").hide();
        $($(".js_pwdSetting")[1]).find("a").removeClass("settingClick");
        $($(".js_pwdSetting")[2]).find("a").addClass("settingClick");
    });

    var obj = JSON.parse(window.localStorage.getItem("nowAccount"));
    $("#js_bindWeixinNext1").click(function(){
        var weixinName = $(".js_inputWeixinNum").val().trim();
        if(weixinName == ""){
            alert("微信帐号不能为空");
            return;
        }
        $.ajax({
            type: "GET",
            url: "/api2/weixin/bindingtoken?",
            data: {
                "uid":obj.uid,
                "weixinName": weixinName
            },
            success: function (serverData) {
                if (serverData["提示信息"] == "微信公众账号正在绑定") {
                    $(".js_bindStepOne").hide();
                    $(".js_bindStepThree").hide();
                    $(".js_bindStepTwo").show();
                    $($(".js_pwdSetting")[0]).find("a").removeClass("settingClick");
                    $($(".js_pwdSetting")[1]).find("a").addClass("settingClick");
                    $(".js_token").val(serverData.token);
                    $(".js_bindurl").val("http://bindwx.lejoying.com/");
                    connection();
                }
            }
        })
    });
    function connection(){
        $.ajax({
            type:"GET",
            url:"/api2/session/event?",
            data:{
                "uid":obj.uid,
                "sessionID": obj.uid
            },
            success:function(serverData){
                    connection();
                    alert(serverData);
            },
            error:function(XMLHttpRequest, textStatus, errorThrown){
                connection();
            }
        });
    }
});