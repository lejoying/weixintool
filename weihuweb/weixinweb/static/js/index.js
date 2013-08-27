/**
 * Created with JetBrains WebStorm.
 * User: CC
 * Date: 13-8-26
 * Time: 下午12:09
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    $(".js_iconOperater").click(function(){
        $(".js_operaterBox").toggle(50);
        addEvent(document.body,"mousedown",clickother);
    });
    $(".chatListColumn").click(function(){
        var name = $(this).find(".name").html();
        $(".chatListColumn.activeColumn").removeClass("activeColumn");
        $(this).addClass("activeColumn");
        $(".activeChatVernier").animate({top:this.offsetTop-this.parentNode.offsetTop},200)
        $(".chat.lightBorder").css({visibility:"visible"});
        $("#messagePanelTitle").html(name);
    });
    var moused = false;
    $("#scrollbarLeft").mousedown(function(){
        //alert(1);
        var moused = true;
    });
//    $(".listContent").mouseover(function(){
//        $(".scrollbar").animate({opacity:"1"});
//    });
//    $(".listContent").mouseout(function(){
//        $(".scrollbar").animate({opacity:"0"});
//    });
});
$(document).mousemove(function(e){
    //alert(e.pageY);
    if(moused==true){
        alert(e.pageX);
    }
});
window.onload = function(){
    $(".listContentWrap").height(document.body.clientHeight-245);
    $(".chatContainer").height(document.body.clientHeight-245+120);
    $(".chatScorll").height(document.body.clientHeight-245-40-60+120);
}
window.onresize = function(){
    $(".listContentWrap").height(document.body.clientHeight-245);
    $(".chatContainer").height(document.body.clientHeight-245+120);
    $(".chatScorll").height(document.body.clientHeight-245-40-60+120);
}
//添加点击空白处关闭弹出框事件
function addEvent(obj,eventType,func){
    if(obj.attachEvent){obj.attachEvent("on" + eventType,func);}
    else{obj.addEventListener(eventType,func,false)}
}
function clickother(el){
    thisObj = el.target?el.target:event.srcElement;
    if(thisObj.tagName == "BODY"){
        document.getElementById("operaterBox").style.display = "none";
        return;
    }
    if(thisObj.id == "operaterBox "||thisObj.id == "iconOperater"||(thisObj.parentNode).parentNode.parentNode.id=="operaterBox "){
        return;
    }
    do{
        if(thisObj.tagName == "BODY"){
            if(document.getElementById("operaterBox")){
                document.getElementById("operaterBox").style.display = "none";
                return;
            }
        };
        thisObj = thisObj.parentNode;
    }while(thisObj.parentNode);
}