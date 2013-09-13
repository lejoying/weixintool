/**
 * Created with JetBrains WebStorm.
 * User: Admin
 * Date: 13-8-21
 * Time: 下午2:43
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    var pagesize = 3;
    var index = 1;
    var count = 0;
    var weixinid = "";
    var nowBindWeixins = window.sessionStorage.getItem("nowBindWeixins");
    if(nowBindWeixins != null){
        var nowWeixinName = window.localStorage.getItem("nowWeixinName");
        for(var key in JSON.parse(nowBindWeixins)){
            if(JSON.parse(nowBindWeixins)[key].weixinName == nowWeixinName){
                weixinid = JSON.parse(nowBindWeixins)[key].weixinOpenID;
                getAllApps(0, pagesize, count, index);
            }
        }
    }

    function getAllApps(start, end, count, index){
        count = count;
        index = index;
           //从window.localStorage中获取当前登录用户的信息
        var nowAccount = window.localStorage.getItem("nowAccount");
        //发送Ajax请求，获取绑定的微信用户
        $.ajax({
            type:"GET",
            url:"/api2/app/getall?",
            data:{
                "uid":JSON.parse(nowAccount).uid,
                "weixinOpenID":weixinid,
                "type":"public",
                "filter":"ALL",
                "status":true,
                "start": start,
                "end": end
            },
            success:function(serverData){
                var main_publicapp = getTemplate("main_publicapp");
                $(".allAppsList").html(main_publicapp.render(serverData["apps"]));

                $(".publicAppsOperating input").each(function(i){
                    $($(".publicAppsOperating input")[i]).click(function(){
                        var url = "";
                        var href = $(".publicAppsOperating a")[i].href;
                        var aurl = href.substr(0,href.lastIndexOf("=")+1);
                        if(this.checked == true){
                            $(".publicAppsOperating a")[i].href = aurl+this.checked;
                            url = "/api2/weixin/bindapp?"
                        }else if(this.checked == false){
                            $(".publicAppsOperating a")[i].href = aurl+"undefined";
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
                                if(serverData["提示信息"] == "微信公众账号添加应用成功" || serverData["提示信息"] == "微信公众账号移除应用成功"){
                                    showBlackPage("设置成功","设置成功");
                                }else{
                                    showBlackPage("设置失败","设置失败");
                                }
                            }
                        });
                    });
                });
                if(count == 0){
                    getPageData(getAllApps, pagesize, count, index, serverData["count"]);
                }
            }
        });
    }
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