// JavaScript Document
$(document).ready(function(){
    var leftHeight=$(".mainContern").height();
    $(".sildLeft").css("height",leftHeight);
    var name = window.localStorage.getItem("nowWeixinName");
    if(name != null){
//        alert(name);
        $(".js_weixinNow").html(name.substr(0,8));
        $(".welcome").find("span").html(name.substr(0,8));
        $(".js_weixinNow").attr("title",name);
    }

    //发送Ajax请求，获取绑定的微信用户
    $.ajax({
        type:"GET",
        url:"/api2/weixin/getall?",
        data:{
            "uid":26
        },
        success:function(serverData){
//            alert(serverData["提示信息"]);
            for(var key in serverData["weixins"]){
//                alert(serverData["weixins"][key].weixinName);
                var li = document.createElement("li");
                var a = document.createElement("a");
                a.href = "javascript:;";
                a.appendChild(document.createTextNode(serverData["weixins"][key].weixinName));
                li.appendChild(a);
                $(".accountSwitching ul")[0].appendChild(li);
            }
            $(".accountSwitching ul li").click(function(){
                $(".accountSwitching").hide();
                location.href="default.html";
                window.localStorage.setItem("nowWeixinName",$(this).find("a").html());
            });

        }
    });

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
    if(thisObj.tagName == "BODY"){
        document.getElementById("accountSwitching").style.display = "none";
        return;
    }
    if(thisObj.id == "accountSwitching"||thisObj.id == "weixinNow"||(thisObj.parentNode).parentNode.parentNode.id=="accountSwitching"){
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