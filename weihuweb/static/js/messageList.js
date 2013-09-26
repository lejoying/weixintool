$(document).ready(function(){
    var nowpage = 1;
    var pagesize = 10;
    var weixinid = "";
    var nowWeixin = window.sessionStorage.getItem("nowWeixin");
    if(nowWeixin != null){
        weixinid = JSON.parse(nowWeixin).weixinOpenID;
    }
    getmessageulist();
    function getmessageulist(){
        $.ajax({
            type:"GET",
            url:"/api2/weixin/getmessageulist",
            data:{
                weixinid :weixinid,
                nowpage:nowpage,
                pagesize:pagesize
            },
            success:function(data){
                if(data["提示信息"]=="获取用户列表成功"){
                    var message_ulist = getTemplate("weixin_user");
                    $(".userMessageList").html(message_ulist.render(data["users"]));
                }
            }
        });
    }
})

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