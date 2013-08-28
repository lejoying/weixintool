/**
 * Created with JetBrains WebStorm.
 * User: xiao
 * Date: 13-8-27
 * Time: 上午10:31
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){

    //获取当前微信用户的ID
    var weixinid = "";
    var nowBindWeixins = window.sessionStorage.getItem("nowBindWeixins");
    if(nowBindWeixins != null){
        var nowWeixinName = window.localStorage.getItem("nowWeixinName");
        for(var key in JSON.parse(nowBindWeixins)){
            if(JSON.parse(nowBindWeixins)[key].weixinName == nowWeixinName){
                weixinid = JSON.parse(nowBindWeixins)[key].weixinOpenID;
                getNewUserCount(weixinid);
                break;
            }
        }
    }
    $.ajax({
        type:"GET",
        url:"/api2/app/getappscount?",
        data:{
            type: "public"
        },
        success:function(serverData){
            if(serverData["提示信息"] == "获取应用数量成功"){
//                alert(serverData["count"]);
                $($(".sysNotice span")[0]).html(serverData["count"]);
            }
        }
    });
});
function getNewUserCount(weixinid){
    Date.prototype.format = function(format){
        var o ={
            "M+" : this.getMonth()+1, //month
            "d+" : this.getDate(),    //day
            "h+" : this.getHours(),   //hour
            "m+" : this.getMinutes(), //minute
            "s+" : this.getSeconds(), //second
            "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
            "S" : this.getMilliseconds() //millisecond
        }
        if(/(y+)/.test(format))
            format=format.replace(RegExp.$1,(this.getFullYear()+""));
        for(var k in o)
            if(new RegExp("("+ k +")").test(format))
                format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
        return format;
    }
    $.ajax({
        type:"GET",
        url:"/api2/weixin/newusercount?",
        data:{
            weixinid: weixinid,
            time: new Date().format("yy-MM-dd")
        },
        success:function(serverData){
            if(serverData["提示信息"] == "获取今日新增会员数量成功"){
                $($(".sysNotice a")[0]).html(serverData["count"]+"位朋友");
            }
            var appcount = window.sessionStorage.getItem("appcount");
            if(appcount != null){
                $($(".sysNotice span")[1]).html(appcount-1);
            }
        }
    });
}

