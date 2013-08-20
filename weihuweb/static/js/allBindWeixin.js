/**
 * Created with JetBrains WebStorm.
 * User: Admin
 * Date: 13-8-13
 * Time: 上午10:57
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    //从window.localStorage中获取当前登录用户的信息
    var nowAccount = window.localStorage.getItem("nowAccount");
    if(nowAccount != null){
        //发送Ajax请求，获取绑定的微信用户
        $.ajax({
            type:"GET",
            url:"/api2/weixin/getall?",
            data:{
                "uid":JSON.parse(nowAccount).uid
            },
            success:function(serverData){
                var bind_weixin = getTemplate("bind_weixin");
                $(".allAppsList").html(bind_weixin.render(serverData["weixins"]));
                $(".publicAppsOperating input").click(function(){
                    alert(this.checked);
                    $.ajax({
                        type:"post",
                        url:"/api2/weixin/switch?",
                        data:{
                            accountid:11,
                            weixinid:11,
                            switch:this.checked
                        },
                        success:function(serverData){
                            alert(serverData["提示信息"]);
                        }
                    });
                });
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