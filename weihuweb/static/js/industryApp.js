$(document).ready(function(){
    var pagesize = 5;
    var index = 1;
    var count = 0;
    var weixinid = "";
    var nowWeixin = window.sessionStorage.getItem("nowWeixin");
    if(nowWeixin != null){
        weixinid = JSON.parse(nowWeixin).weixinOpenID;
        getAllApps(0, pagesize, count, index);
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
                "type":"industry",
                "filter":"ALL",
                "status": "true",
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