/**
 * Created with JetBrains WebStorm.
 * User: Admin
 * Date: 13-8-27
 * Time: 下午1:47
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    if((Request("rela") == "true")){
        $(".myappswitch input")[0].checked = "true";
    }
    //获取当前微信用户的ID
    var weixinid = "";
    var nowBindWeixins = window.sessionStorage.getItem("nowBindWeixins");
    if(nowBindWeixins != null){
        var nowWeixinName = window.localStorage.getItem("nowWeixinName");
        for(var key in JSON.parse(nowBindWeixins)){
            if(JSON.parse(nowBindWeixins)[key].weixinName == nowWeixinName){
                weixinid = JSON.parse(nowBindWeixins)[key].weixinOpenID;
                break;
            }
        }
    }
    $.ajax({
        type:"GET",
        url:"/api2/app/getbyid?",
        data:{
            appid: Request("id")
        },
        success:function(serverData){
            $($(".myappTitle span")[1]).html(serverData["app"].name);
//            alert(serverData["app"].description);
            if(serverData["app"].description.split("\n").length>0){
                var intro = serverData["app"].description.split("\n");
                for(var i=0;i<intro.length;i++){
                    var span = document.createElement("p");
                    span.appendChild(document.createTextNode(intro[i]))
                    $(".appExamples")[0].appendChild(span);
                }
            }else{
                $(".appExamples").html(serverData["app"].description);
            }
        }
    });
    $(".myappswitch input").click(function(){
        var url = "";
        var href = window.document.location.href;
        var aurl = href.substr(0,href.lastIndexOf("=")+1);
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
                appid: Request("id")
            },
            success:function(serverData){
                if(serverData["提示信息"] == "微信公众账号添加应用成功" || serverData["提示信息"] == "微信公众账号移除应用成功"){
                    showBlackPage("设置成功","设置成功");
                }else{
                    showBlackPage("设置失败","设置失败");
                }
            }
        });
        window.location.href=aurl+this.checked;
    });
});
//获取html页面传递过来的参数值
function Request(strName)
{
    var strHref = window.document.location.href;
    var intPos = strHref.indexOf("?");
    var strRight = strHref.substr(intPos + 1);
    var arrTmp = strRight.split("&");
    for(var i = 0; i < arrTmp.length; i++){
        var arrTemp = arrTmp[i].split("=");
        if(arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1];
    }
    return "";
}