$(document).ready(function(){
//    window.sessionStorage.clear();
    var nowWeixin = window.sessionStorage.getItem("nowWeixin");
    if(nowWeixin != null){
        getNewUserCount(JSON.parse(nowWeixin).weixinOpenID);
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
    var nowAccount = window.localStorage.getItem("nowAccount");
    //发送Ajax请求，获取绑定的微信用户
    $.ajax({
        type:"POST",
        url:"/api2/weixin/getall?",
        data:{
            "uid":JSON.parse(nowAccount).uid,
            "start":0,
            "end":"*"
        },
        success:function(serverData){
//            alert(serverData["提示信息"]);
            if(serverData["提示信息"] == "获取所有绑定微信公众账号成功"){
                window.sessionStorage.setItem("nowBindWeixins",JSON.stringify(serverData["weixins"]));
                getAllWeixin(serverData["weixins"]);
            }else{
                var url = window.location.href;
                url = url.substr(url.lastIndexOf("/")+1);
                if(url != "bindWeixin.html"){
                    location.href = "/page/bindWeixin.html";
                }
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
        url:"/api2/weixin/getnewusercount?",
        data:{
            weixinid: weixinid,
            time: new Date().format("yy-MM-dd")
        },
        success:function(serverData){
            if(serverData["提示信息"] == "获取今日新增会员数量成功"){
                $($(".sysNotice a")[0]).html(serverData["count"]+"位朋友");
            }
        }
    });
}

