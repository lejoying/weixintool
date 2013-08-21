/**
 * Created with JetBrains WebStorm.
 * User: Admin
 * Date: 13-8-21
 * Time: 下午2:43
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    var weixinid = "";
    var nowBindWeixins = window.sessionStorage.getItem("nowBindWeixins");
    if(nowBindWeixins != null){
        var nowWeixinName = window.localStorage.getItem("nowWeixinName");
        for(var key in JSON.parse(nowBindWeixins)){
            if(JSON.parse(nowBindWeixins)[key].weixinName == nowWeixinName){
                weixinid = JSON.parse(nowBindWeixins)[key].weixinOpenID;
            }
        }
    }
    $(".publicAppsOperating input").each(function(i){
//        alert($(".publicAppsOperating input")[i].value);
    });
    $(".publicAppsOperating input").each(function(i){
        $($(".publicAppsOperating input")[i]).click(function(){
            var url = "";
            if(this.checked == true){
                url = "/api2/weixin/bindapp?"
            }else if(this.checked == false){
                url = "/api2/weixin/unbindapp?"
            }
            $.ajax({
                type: "GET",
                url: url,
                data:{
                    weixinopenid: weixinid,
                    appid: this.value
                },
                success:function(serverData){
                    alert(serverData["提示信息"]);
                }
            });
        });
    });
});