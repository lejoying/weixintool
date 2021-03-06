$(document).ready(function(){
    var pagesize = 5;
    var index = 1;
    var count = 0;
    getAllBindWeixin(0, pagesize, count, index);
    function getAllBindWeixin(start, end, count, index){
        count = count;
        index = index;
        var nowAccount = window.localStorage.getItem("nowAccount");
        if(nowAccount != null){
            //发送Ajax请求，获取绑定的微信用户
            $.ajax({
                type:"GET",
                url:"/api2/weixin/getall?",
                data:{
                    "uid":JSON.parse(nowAccount).uid,
                    "start":start,
                    "end": end
                },
                success:function(serverData){
                    if(serverData["提示信息"] == "获取所有绑定微信公众账号成功"){
                        var bind_weixin = getTemplate("bind_weixin");
                        $(".allAppsList").html(bind_weixin.render(serverData["weixins"]));
                        $(".publicAppsOperating input").each(function(i){
                            $($(".publicAppsOperating input")[i]).click(function(){
                                $.ajax({
                                    type:"post",
                                    url:"/api2/weixin/modifyrelapro?",
                                    data:{
                                        uid: JSON.parse(nowAccount).uid,
                                        weixinid: this.value,
                                        switch: this.checked
                                    },
                                    success:function(serverData){
                                        if(serverData["提示信息"] == "修改绑定微信开关成功"){
                                            if(serverData["r"].switch=="true"){
                                                showBlackPage("开启成功","开启成功");
                                            }else{
                                                showBlackPage("关闭成功","关闭成功");
                                            }
                                        }else if(serverData["提示信息"] == "修改绑定微信开关失败"){
                                            showBlackPage("设置失败","设置失败");
                                        }
                                    }
                                });
                            });
                        });
                        if(count == 0){
                            getPageData(getAllBindWeixin, pagesize, count, index, serverData["count"]);
                        }
                    }
                }
            });
        }
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