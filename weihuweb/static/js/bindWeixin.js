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
});