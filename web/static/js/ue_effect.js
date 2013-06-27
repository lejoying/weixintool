$(document).ready(function(){

    $(".js_account_information").html(data.accountname+", 已登录");
    $(".js_logout").click(function(){
        data.uid = "";
        data.accesskey = "110";
        saveLocalSettings();
        window.location.href="login.html";
    });
});
$(document).ready(function(){

	$(".js_personality").click(function(){
		if($(".js_subitem").css("display")=="none"){
			$(".js_usermanger").animate({left:'-10px'},100);
			$(".js_message").animate({left:'-10px'},200);
			$(".js_weixin_user").animate({left:'-10px'},300);
		}else{
			$(".js_usermanger").animate({left:'0px'},300);
			$(".js_message").animate({left:'0px'},200);
			$(".js_weixin_user").animate({left:'0px'},100);
		}
		$(".js_subitem").animate({width:'toggle'},200);
		addEvent(document.body,"mousedown",clickother);
	});
	$(".add_element").click(function(){
		window.location.href="personal_app.html";
	});
	$(".js_add_info").click(function(){
		var uid = $(this).attr("uid");
		$(this).hide();
		$("[useropeart="+uid+"]").show();
	});
	$(".js_save_button").click(function(){
		var uid = $(this).attr("save");
		var key = $("[userkey="+uid+"]").val();
		var value =$("[uservalue="+uid+"]").val();
        var index = $(".user_info[userid="+uid+"]li").length;
        alert(index);
		var user={};
		user[key]=value;
		if(key==""||value==""){
			alert("key或value不能为空");	
		}else{
			$.ajax({
				type:"get",
				url:"/api2/account/auth?",	
				data:{"uid":"nnnn", "accesskey":"XXXXXX" , "userid":uid,"user":user},
				success:function(data){
					//callback operate
					

				}
			});
			$("[useropeart="+uid+"]").hide();
			$("[uid="+uid+"]").show();	
		}	
	});
	$(".js_cansonl_button").click(function(){
		var uid = $(this).attr("cansonl");
		$("[useropeart="+uid+"]").hide();
		$("[uid="+uid+"]").show();
	});
    /*************************************** ***************************************
     * popmenu
     *************************************** ***************************************/
    $(".login_opt_menu").hide();
    $(".app_list").click(function () {
        $(".login_opt_menu").animate({height: 'toggle'},200);
        addEvent(document.body, "mousedown", clickIndexOther);
    });
    $(".circle_out .circle_in p").click(function (){
        moveElement();
    });
    /*************************************** ***************************************
     * bind step
     *************************************** ***************************************/
    $(".circel_step").mouseover(function () {
        var index = $(this).attr("index");
        var sharp = document.getElementById("step_line");
        if (index == 1) {
            sharp.style.left = "240px";
        }
        else if (index == 2) {
            sharp.style.left = "400px";
        }
        else if (index == 3) {
            sharp.style.left = "560px";
        }
        else if (index == 4) {
            sharp.style.left = "720px";
        }
        else if (index == 5) {
            sharp.style.left = "880px";
        }
        $(".step_img_form").addClass("hide");
        $(".word_tip").addClass("hide");
        $(".word_tip[index!='" + index + "']").removeClass("current");
        $(".word_tip[index='" + index + "']").addClass("current");
        $(".step_img_form[index!='" + index + "']").removeClass("current");
        $(".step_img_form[index='" + index + "']").addClass("current");
        $(".step_img[index!='" + index + "']").removeClass("current");
        $(".step_img[index='" + index + "']").addClass("current");
    });
    /***********
     step_1.html页面  点击下一步事件
     ************/
    $(".arrow_right").click(function () {
        var index1 = $(".word_tip.current").attr("index");
        var sharp1 = document.getElementById("step_line");
        if (index1 == 1) {
            sharp1.style.left = "400px";
        }
        else if (index1 == 2) {
            sharp1.style.left = "560px";
        }
        else if (index1 == 3) {
            sharp1.style.left = "720px";
        }
        else if (index1 == 4) {
            sharp1.style.left = "880px";
        }
        else if (index1 == 5) {
            sharp1.style.left = "240px";
        }
        if (index1 != 5) {
            index1 = parseInt(index1) + 1;
        }
        else {
            index1 = 1;
        }
        $(".step_img_form").addClass("hide");
        $(".word_tip").addClass("hide");
        $(".word_tip[index!='" + index1 + "']").removeClass("current");
        $(".word_tip[index='" + index1 + "']").addClass("current");

        $(".step_img_form[index!='" + index1 + "']").removeClass("current");

        $(".step_img_form[index='" + index1 + "']").addClass("current");
        $(".step_img_form[index='" + index1 + "']").css("left","1100px");
        $(".step_img_form[index='" + index1 + "']").animate({left:'0'});

        $(".step_img[index!='" + index1 + "']").removeClass("current");

        $(".step_img[index='" + index1 + "']").addClass("current");
        $(".step_img[index='" + index1 + "']").css("left","1100px");
        $(".step_img[index='" + index1 + "']").animate({left:'0'});
    });

    /***********
     step_1.html页面  点击上一步事件
     ************/

    $(".arrow_left").click(function () {
        var index1 = $(".word_tip.current").attr("index");
        var sharp1 = document.getElementById("step_line");
        if (index1 == 1) {
            sharp1.style.left = "880px";
        }
        else if (index1 == 2) {
            sharp1.style.left = "240px";
        }
        else if (index1 == 3) {
            sharp1.style.left = "400px";
        }
        else if (index1 == 4) {
            sharp1.style.left = "560px";
        }
        else if (index1 == 5) {
            sharp1.style.left = "720px";
        }
        if (index1 != 1) {
            index1 = parseInt(index1) - 1;
        }
        else {
            index1 = 5;
        }
        $(".step_img_form").addClass("hide");
        $(".word_tip").addClass("hide");
        $(".word_tip[index!='" + index1 + "']").removeClass("current");
        $(".word_tip[index='" + index1 + "']").addClass("current");
        $(".word_tip[index='" + index1 + "']").css("left","-1100px");
        $(".word_tip[index='" + index1 + "']").animate({left:'0'});

        $(".step_img_form[index!='" + index1 + "']").removeClass("current");
        $(".step_img_form[index='" + index1 + "']").addClass("current");
        $(".step_img_form[index='" + index1 + "']").css("left","-1100px");
        $(".step_img_form[index='" + index1 + "']").animate({left:'0'});

        $(".step_img[index!='" + index1 + "']").removeClass("current");
        $(".step_img[index='" + index1 + "']").addClass("current");
        $(".step_img[index='" + index1 + "']").css("left","-1100px");
        $(".step_img[index='" + index1 + "']").animate({left:'0'});
    });

});
function moveElement(){
    $(".circle_out .circle_in p").bind("click" , function(){
        var $removeElement = $(this).parent().parent().remove();
        $removeElement.insertAfter($(".weixin_user"));
        moveElement();
    });
}
/**
* 用于检查一个对象是否包含在另外一个对象中
* @method contains
* @param {string} parentNode 父节点
* @param {string} childNode 子节点
 **/
function contains(parentNode, childNode) {
    if (parentNode.contains) {
        return parentNode != childNode && parentNode.contains(childNode); }
    else {
        //return !!(parentNode.compareDocumentPosition(childNode) & 16);
    }
}
/**
 * 用于检查鼠标是否真正从外部移入或者移出对象的
 * @method checkHover
 * @param {string} e 当前的事件对象
 * @param {string} target 目标对象
 * @param {string} relatedTarget 属性代表的就是鼠标刚刚离开的那个节点，当触发mouseout事件时它代表的是鼠标移向的那个对象。
 * 由于MSIE不支持这个属性，不过它有代替的属性，分别是 fromElement和toElement
 */
function checkHover(e,target){
    var rel = getEvent(e).relatedTarget ,
        from = getEvent(e).fromElement ,
        to = getEvent(e).toElement;
    if (getEvent(e).type=="mouseover")  {
        return !contains(target,rel||from) && !( (rel||from)===target );
    } else {
        return !contains(target,rel||to) && !( (rel||to)===target );
    }
}

/**
 * 用于在MSIE或者FF下返回一个可用的event对象
 * @method getEvent
 * @param {string} e 当前的事件对象
 */

function getEvent(event) {
    var ev = event || window.event;
    if (!ev) {
            var c = this.getEvent.caller;
            while (c) {
                    ev = c.arguments[0];
        if (ev && (Event == ev.constructor || MouseEvent  == ev.constructor)) {
            break;
        }
        c = c.caller;
            }
    }
    return ev;
}
//添加点击空白处关闭弹出框事件
function addEvent(obj,eventType,func){
	if(obj.attachEvent){obj.attachEvent("on" + eventType,func);}
	else{obj.addEventListener(eventType,func,false)}
}
function clickother(el){
	thisObj = el.target?el.target:event.srcElement;
	if(thisObj.id == "js_subitem"||thisObj.id=="js_personality"||thisObj.id=="a_appstore"||thisObj.id=="a_myapp"){
		return;
	} 
	do{		
		if(thisObj.tagName == "BODY"){			
			if(document.getElementById("js_subitem")){
				document.getElementById("js_subitem").style.display = "none";
                $(".js_usermanger").animate({left:'0px'},300);
                $(".js_message").animate({left:'0px'},200);
                $(".js_weixin_user").animate({left:'0px'},100);
			}
			return;
		};
		thisObj = thisObj.parentNode;
	}while(thisObj.parentNode);
}
function clickIndexOther(el) {
    thisObj = el.target ? el.target : event.srcElement;
    do {
        if (thisObj.id == "popmenu" || thisObj.id == "app_list") {
            return;
        }
        if (thisObj.tagName == "BODY") {
            document.getElementById("popmenu").style.display = "none";
            return;
        }
        thisObj = thisObj.parentNode;
    } while (thisObj.parentNode);
}
function addEvent(obj, eventType, func) {
    if (obj.attachEvent) {
        obj.attachEvent("on" + eventType, func);
    }
    else {
        obj.addEventListener(eventType, func, false)
    }
}
