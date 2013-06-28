$(document).ready(function () {

    $(".js_account_information").html(data.accountname + ", 已登录");
    $(".js_logout").click(function () {
        data.uid = "";
        data.accesskey = "110";
        saveLocalSettings();
        window.location.href = "login.html";
    });
    getWeixinName();
});
$(document).ready(function(){
   $(".js_personal_input").blur(function(){
        var oldPassword = $(".js_personal_input").val();

        if(oldPassword==""||oldPassword==null){
            $(".js_oldpassword").show();
            $(".js_oldpassword .js_error").html("请输入原密码");
        }else{
            $(".js_oldpassword").hide();
        }
    });
    $(".js_password_second,.js_password_first").blur(function(){
        var passwordPlaint1 = $(".js_password_first").val();
        var passwordPlaint2 = $(".js_password_second").val();
        var password = hex_sha1(passwordPlaint1);
        if(passwordPlaint1!=passwordPlaint2||passwordPlaint1==""||passwordPlaint2==""||passwordPlaint1==null||passwordPlaint2==null){
            $(".js_newpassword").show();
            $(".js_newpassword .js_error").html("两次输入的密码不一致");
            showBlackPage(40,"修改成功");
            $(".js_changeSaveButton").bind("click",function(){
                closeBlackBackground();
            });
        }else{
            $(".js_newpassword").hide();
        }
    });

    $(".js_change_passwrod").click(function(){
        var oldPassword = $(".js_personal_input").val();
        var passwordPlaint2 = $(".js_password_second").val();
        var password = hex_sha1(passwordPlaint1);
        $.ajax({
            type:"get",
            url:"/api2/account/modify?",
            data:{"uid":"nnnn", "accesskey":"XXXXXX" , "account":user},
            success:function(data){
                if( serverData["提示信息"] == "修改成功"){
                    showBlackPage(40,"修改成功");
                    $(".js_changeSaveButton").bind("click",function(){
                        closeBlackBackground();
                    });
                }
            }
        });
    });
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
    $(".add_element").click(function () {
        window.location.href = "personal_app.html";
    });
    $(".js_add_info").click(function () {
        var uid = $(this).attr("uid");
        $(this).hide();
        $("[useropeart=" + uid + "]").show();
    });
    $(".js_save_button").click(function () {
        var uid = $(this).attr("save");
        var key = $("[userkey=" + uid + "]").val();
        var value = $("[uservalue=" + uid + "]").val();
        var index = $(".user_info[userid=" + uid + "]li").length;
		var user={};
		user[key]=value;
		if(key==""||value==""){
            showBlackPage(40,"key或value不能为空");
		}else{
			$.ajax({
				type:"get",
				url:"/api2/account/auth?",	
				data:{"uid":"nnnn", "accesskey":"XXXXXX" , "userid":uid,"user":user},
				success:function(data){
					//callback operate
					


                }
            });
            $("[useropeart=" + uid + "]").hide();
            $("[uid=" + uid + "]").show();
        }
    });
    $(".js_cansonl_button").click(function () {
        var uid = $(this).attr("cansonl");
        $("[useropeart=" + uid + "]").hide();
        $("[uid=" + uid + "]").show();
    });
    /*************************************** ***************************************
     * popmenu
     *************************************** ***************************************/
    $(".login_opt_menu").hide();
    $(".app_list").click(function () {
        addEvent(document.body, "mousedown", clickIndexOther);
    });
    $(".circle_in p").click(function (){
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

        $(".step_img[index!='" + index1 + "']").removeClass("current");

        $(".step_img[index='" + index1 + "']").addClass("current");
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

        $(".step_img_form[index!='" + index1 + "']").removeClass("current");
        $(".step_img_form[index='" + index1 + "']").addClass("current");

        $(".step_img[index!='" + index1 + "']").removeClass("current");
        $(".step_img[index='" + index1 + "']").addClass("current");
    });

});
        var weixinName = $(this).html();
        var $removeElement = $(this).parent().parent().remove();
        $removeElement.insertAfter($(".weixin_user"));
        $(".weixin_user span").html(weixinName);
        moveElement();
    });
}
/**
 **/
function contains(parentNode, childNode) {
    if (parentNode.contains) {
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
    var rel = getEvent(e).relatedTarget ,
        from = getEvent(e).fromElement ,
        to = getEvent(e).toElement;
    } else {
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
        }
    }
    return ev;
}
//添加点击空白处关闭弹出框事件
}
function clickother(el) {
    thisObj = el.target ? el.target : event.srcElement;
    if (thisObj.id == "js_subitem") {
        return;
    } else if (thisObj.id == "js_personality") {
        return;
    } else if (thisObj.id == "a_appstore") {
        alert(33);


    } else if (thisObj.id == "a_myapp") {
        return;
    }
    do {
        if (thisObj.tagName == "BODY") {
            if (document.getElementById("js_subitem")) {
                document.getElementById("js_subitem").style.display = "none";
                $(".js_usermanger").animate({left: '0px'}, 300);
                $(".js_message").animate({left: '0px'}, 200);
                $(".js_weixin_user").animate({left: '0px'}, 100);
            }
            return;
        }
        thisObj = thisObj.parentNode;
    } while (thisObj.parentNode);
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
//背景变黑弹出窗口
function showBlackPage(clarity,tipword){
    var bWidth='100%';
    var bHeight=$(".mange_outform").offset().top+$(".mange_outform").height()+19;
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
    mesW.innerHTML="<div class='prompted' id='promptedShow'><div class='tipWord'></div><div><a class='buttonblue changeSaveButton js_changeSaveButton' href='javascript:;'>确定</a></div></div>" ;
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


function click_a_bindapp(){
    $(".circle_out").click(function () {
        var a = $(this).attr("weixinOpenID");
        $.ajax({
            type: "get",
            url: "/api2/app/getall?",
            data: {
//            uid: data.uid,
//            accesskey: data.accesskey,
                weixinOpenID: $(this).attr("weixinOpenID"),
                filter: "BIND"
            },
            success: function (serverData) {
                console.log(serverData);
                data.apps = serverData.apps;
                var nTemplate = getTemplate("app_list");
                var innerHtml = nTemplate.template.render();
                nTemplate.templateDiv.html(innerHtml);
                nTemplate.templateDiv.removeClass("hide");
                registerAppListEvent();
            }
        });
    });
}

//$($(".circle_out")[0]).click(function(){
//    alert("shf");
//    $(this);
//} );
//function click_a_allapp() {
//    alert("djsfvjksd");
//    $.ajax({
//        type: "get",
//        url: "/api2/app/getall?",
//        data: {
////            uid: data.uid,
////            accesskey: data.accesskey,
////            weixinopenid: data.weixinopenid,
//            filter: "ALL"
//        },
//        success: function (serverData) {
//            console.log(serverData);
//            data.apps = serverData.apps;
//            var nTemplate = getTemplate("app_list");
//            var innerHtml = nTemplate.template.render();
//            nTemplate.templateDiv.html(innerHtml);
//            nTemplate.templateDiv.removeClass("hide");
//            registerAppListEvent();
//        }
//    });
//}

//function click_a_myapp(data) {
////    alert("djsfvjksd");
//    $.ajax({
//        type: "get",
//        url: "/api2/app/getall?",
//        data: {
//            uid: data.uid,
//            filter: "OWN"
//        },
//        success: function (serverData) {
//            console.log(serverData);
//            data.apps = serverData.apps;
//            var nTemplate = getTemplate("app_list");
//            var innerHtml = nTemplate.template.render();
//            nTemplate.templateDiv.html(innerHtml);
//            nTemplate.templateDiv.removeClass("hide");
//            registerAppListEvent();
//        }
//    });
//}
//function click_a_bindapp(data) {
//    alert("djsfvjksd");
//    $.ajax({
//        type: "get",
//        url: "/api2/app/getall?",
//        data: {
////            uid: data.uid,
////            accesskey: data.accesskey,
//            weixinOpenID: data.weixinOpenID,
//            filter: "BIND"
//        },
//        success: function (serverData) {
//            console.log(serverData);
//            data.apps = serverData.apps;
//            var nTemplate = getTemplate("app_list");
//            var innerHtml = nTemplate.template.render();
//            nTemplate.templateDiv.html(innerHtml);
//            nTemplate.templateDiv.removeClass("hide");
//            registerAppListEvent();
//        }
//    });
//}