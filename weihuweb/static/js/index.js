// JavaScript Document
$(document).ready(function(){
	$(".js_weixinNow").click(function(){
		$(".accountSwitching").toggle();
		addEvent(document.body,"mousedown",clickother);
	});
});
//添加点击空白处关闭弹出框事件
function addEvent(obj,eventType,func){
	if(obj.attachEvent){obj.attachEvent("on" + eventType,func);}
	else{obj.addEventListener(eventType,func,false)}
}
function clickother(el){
	thisObj = el.target?el.target:event.srcElement;
	if(thisObj.id == "accountSwitching"||thisObj.id == "weixinNow"||thisObj!==this){
		return;
	} 
	do{		
		if(thisObj.tagName == "BODY"){			
			if(document.getElementById("accountSwitching")){
				document.getElementById("accountSwitching").style.display = "none";
				return;
			}
		};
		thisObj = thisObj.parentNode;
	}while(thisObj.parentNode);
}