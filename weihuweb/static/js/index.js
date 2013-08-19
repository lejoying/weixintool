// JavaScript Document
$(document).ready(function(){
    showBlackPage(60,"dfdfd");
    var leftHeight=$(".mainContern").height();
    $(".sildLeft").css("height",leftHeight);
    var nowAccount = window.localStorage.getItem("nowAccount");
    if(nowAccount != null){
        $(".userAccount span").html("欢迎"+unescape(JSON.parse(nowAccount).accountname));
    }else{
        location.href="/login.html";
    }
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
            "uid":JSON.parse(nowAccount).uid
        },
        success:function(serverData){
//            alert(serverData["提示信息"]);
            for(var key in serverData["weixins"]){
                window.sessionStorage.setItem("nowBindWeixins",JSON.stringify(serverData["weixins"]));
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
                if($(this).find("a").html() != "全部"){
                    window.localStorage.setItem("nowWeixinName",$(this).find("a").html());
                }
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
//背景变黑弹出窗口
function showBlackPage(clarity,tipword){
    var bWidth='100%';
    var bHeight=$("BODY").height()+87;
    //var bHeight=$(".content").offset().top+$(".content").height()+19;
    // var wWidth = 602;
    //var left = bWidth/2-wWidth/2-19;
    var back=document.createElement("div");
    back.id="blackbackcommon";
    var styleStr="top:0px;left:0;position:absolute;background:#000;z-index:21;width:"+bWidth+";height:"+bHeight+"px;opacity:0.2;";
    //styleStr+=(isIe)?"filter:alpha(opacity=0);":"opacity:0;";
    back.style.cssText=styleStr;
    document.body.appendChild(back);
    showBackground(back,clarity);
    var mesW=document.createElement("div");
    mesW.id="blackbackCommonWindow";
    mesW.innerHTML="<div class='prompted' id='promptedShow'><div class='tipWord'></div><div><a class='buttonblue changeSaveButton' href='javascript:closeBlackBackground();'>确定</a></div></div>" ;
    document.body.appendChild(mesW);
    $(".tipWord").html(tipword);
    var popWidth = parseInt($("#promptedShow").css("width"))+60;
    $("#promptedShow").css("margin-left",-(popWidth/2));
}
http://weixintool.com/change_info.html
// 显示弹出背景
    function showBackground(obj,endInt){
        var al=parseFloat(obj.style.opacity);al+=0.1;
        obj.style.opacity=al;
        if(al<(endInt/100)){setTimeout(function(){showBackground(obj,endInt)},1);}
    }
function closeBlackBackground(){
    $("#blackbackCommonWindow").remove();
    $("#blackbackcommon").remove();
}