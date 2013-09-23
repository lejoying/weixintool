$(document).ready(function(){
    var nowAccount = window.localStorage.getItem("nowAccount");
    var obj = {};
    $.ajax({
        type:"GET",
        url:"/api2/account/getbyid?",
        data:{
            uid: JSON.parse(nowAccount).uid
        },
        success:function(serverData){
            if(serverData["提示信息"] == "获取用户信息成功"){
                obj = serverData["account"];
                judgeProperty(unescape(obj.accountname),"accountname");
                judgeProperty(obj.nickName,"nickName");
                judgeProperty(obj.phone,"phone");
                judgeProperty(obj.weibo,"weibo");
            }
        }
    });
	$("#accountSetting").click(function(){
		$(".js_pwdSettingBody").hide();
		$(".js_accountSettingBody").show();
		$("#accountSetting").addClass("settingClick");
		$("#pwdSetting").removeClass("settingClick");
	});

	$($(".settingSaveBtn")[0]).click(function(){
        obj.nickName = domByName("nickName").value.trim();
        obj.phone = domByName("phone").value.trim();
        obj.weibo = domByName("weibo").value.trim();
        if(domByName("phone").value.trim() != ""){
            var phoneRegexp = /^[1][358]\d{9}$/;
            if(!phoneRegexp.test(domByName("phone").value.trim())){
                alert("手机号码格式不正确");
                return;
            }
        }
        $.ajax({
            type: "POST",
            url: "/api2/account/modifyaccount?",
            data:{
                uid: obj.uid,
                account: JSON.stringify(obj)
            },
            success: function(serverData){
                if(serverData["提示信息"] == "修改用户信息成功"){
                    location.href = window.history.back();
                }
            }
        });
    });
	$("#pwdSetting").click(function(){
		$(".js_accountSettingBody").hide();
		$(".js_pwdSettingBody").show();
		$("#pwdSetting").addClass("settingClick");
		$("#accountSetting").removeClass("settingClick");
	});
});
//根据对象的属性和指定的name，给指定的name对应的Dom节点对象赋值
function judgeProperty(proName,eleName){
    if(proName != undefined){
        domByName(eleName).value = proName;
    }
}
//获取指定name的Dom节点对象
function domByName(eleName){
    return document.getElementsByName(eleName)[0];
}