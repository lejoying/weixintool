// JavaScript Document

$(document).ready(function(){
    $('.out_frame').bind({  
        mouseenter:function(){  
			var itemid = $(this).attr("itemid");
            $("#"+itemid).slideDown(150);
        },  
        mouseleave:function(){
			var itemid = $(this).attr("itemid");
            var subitem =String($("#"+itemid));
			var fatitem = String($(this));
            if(checkHover(fatitem,subitem)){
                $("#"+itemid).slideUp(150);
            }
        }  
    });
	$(".js_personality").click(function(){
		if($(".js_subitem").css("display")=="none"){
			$(".js_usermanger").animate({left:'250px'});
			$(".js_message").animate({left:'400px'});
			$(".js_weixin_user").animate({left:'550px'});
		}else{
			$(".js_usermanger").animate({left:'150px'});
			$(".js_message").animate({left:'300px'});
			$(".js_weixin_user").animate({left:'450px'});
		}
		$(".js_subitem").animate({
			width:'toggle'
		});
		addEvent(document.body,"mousedown",clickother);
	});
});
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
	if(thisObj.id == "js_subitem"||thisObj.id=="js_personality"){
		return;
	} 
	do{		
		if(thisObj.tagName == "BODY"){			
			if(document.getElementById("js_subitem")){
				document.getElementById("js_subitem").style.display = "none";
				$(".js_usermanger").animate({left:'150px'});
				$(".js_message").animate({left:'300px'});
				$(".js_weixin_user").animate({left:'450px'});
			}
			return;
		};
		thisObj = thisObj.parentNode;
	}while(thisObj.parentNode);
}