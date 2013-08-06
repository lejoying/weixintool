// JavaScript Document
$(document).ready(function(){
	$("#accountSetting").click(function(){
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
	});


    $("#js_bindWeixinNext1").click(function(){
        var weixinName = $(".js_inputWeixinNum").val().trim();
        if(weixinName == ""){
           /* $(".errorPrompt").show();
            $(".errorPrompt").val("--");*/
            alert("微信帐号不能为空");
            return;
        }
        $.ajax({
            type: "GET",
            url: "/api2/weixin/bindingtoken?",
            data: {
                "uid":29,
                "weixinName": weixinName
            },
            success: function (serverData) {
                if (serverData["提示信息"] == "微信公众账号正在绑定") {
//                   alert(serverData.token);
                    $(".js_bindStepOne").hide();
                    $(".js_bindStepTwo").show();
                    $("#pwdSetting").addClass("settingClick");
                    $("#accountSetting").removeClass("settingClick");


                    $(".js_token").val(serverData.token);
                    $(".js_bindurl").val("http://bindwx.lejoying.com/");

                }
            }
        })
    });
    $("#js_bindWeixinNext2").click(function(){
        alert("---");
        connection();
    });
    function connection(){
        $.ajax({
            url:"",
            type:"POST",
            dataType:"json",
            success:function(response){
                connection();
            },
            error:function(){
                connection();
            },
            complete:function(){
                connection();
            }
        });
    }
});