$(document).ready(function(){
	$("#accountSetting").click(function(){
		$(".js_pwdSettingBody").hide();
		$(".js_accountSettingBody").show();
		$("#accountSetting").addClass("settingClick");
		$("#pwdSetting").removeClass("settingClick");
	});
	$("#pwdSetting").click(function(){
		$(".js_accountSettingBody").hide();
		$(".js_pwdSettingBody").show();
		$("#pwdSetting").addClass("settingClick");
		$("#accountSetting").removeClass("settingClick");
	});
});