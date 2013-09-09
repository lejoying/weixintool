/**
 * Created with JetBrains WebStorm.
 * User: xiao
 * Date: 13-9-9
 * Time: 上午10:31
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    $.ajax({
        type:"GET",
        url:"/api2/account/getallcount?",
        success:function(serverData){
            if(serverData["提示信息"] == "获得所有注册用户数量成功"){
//                alert(serverData["count"]);
                $($(".sysNotice a")[0]).html(serverData["count"]);
            }
        }
    });
    $.ajax({
        type:"GET",
        url:"/api2/weixin/getbindcount?",
        success:function(serverData){
            if(serverData["提示信息"] == "获取绑定微信数量成功"){
//                alert(serverData["count"]);
                $($(".sysNotice a")[1]).html(serverData["count"]);
            }
        }
    });
    $.ajax({
        type:"GET",
        url:"/api2/app/getappcount?",
        success:function(serverData){
            if(serverData["提示信息"] == "获取微乎应用数量成功"){
//                alert("--"+serverData["offcount"]);
                $($(".messageOfNumber a")[0]).html(serverData["oncount"]);
                $($(".messageOfNumber a")[1]).html(serverData["offcount"]);
            }
        }
    });
    $.ajax({
        type:"GET",
        url:"/api2/app/getuserappcount?",
        success:function(serverData){
            if(serverData["提示信息"] == "获取个性化应用开启数量成功"){
//                alert("--"+serverData["count"]);
                $($(".messageOfNumber a")[2]).html(serverData["count"]);
                $($(".messageOfNumber a")[3]).html(parseInt($($(".sysNotice a")[1]).html())-parseInt(serverData["count"]));
            }
        }
    });
});

