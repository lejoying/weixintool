/**
 * Created with JetBrains WebStorm.
 * User: Admin
 * Date: 13-9-5
 * Time: 下午4:29
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "/api2/app/getmyapp?",
        data: {
            weixinid: Request("weixinid"),
            appid: Request("appid")
        },
        success: function(serverData){
            if(serverData["提示信息"] == "获取应用信息成功"){
                var rData = serverData["r"];
                var main_privateapp = getTemplate("main_privateapp");
                $(".appExamplesList").html(main_privateapp.render(JSON.parse(rData.mydata)));

                $(".publicAppName").html(rData.app.name);
                $(".publicAppIntroduction").html(rData.app.description);
                $(".js_title").html(rData.app.name+" | 微信会员:"+Request("weixinname")+"  | 用户:"+Request("accountname"));
                for(var i=0;i<$(".receivetxt").length;i++){
                    var id = $($(".receivetxt")[i]).html();
                    $($(".receivetxt")[i]).html(id.substr(0,20)+"...");
                }
                $(".receiveimg img").css({
                    "width":"50px",
                    "height":"50px"
                });
            }
        }
    });
});
//根据id获取模版
function getTemplate(id) {
    var tenjin = nTenjin;
    var templateDiv = $('.templates #' + id).parent();
    var string = templateDiv.html();
    string = string.replace(/\<\!\-\-\?/g, "<?");
    string = string.replace(/\?\-\-\>/g, "?>");
    string = string.replace(/比较符号大于/g, ">");
    string = string.replace(/比较符号兄小于/g, "<");
    var template = new tenjin.Template();
    template.convert(string);
    return template;
}
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