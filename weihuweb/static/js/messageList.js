$(document).ready(function(){
    var weixinid = "";
    var nowpage = 1;
    var pagesize = 10;
    var count;
    var totalpage = 0;
    var nowWeixin = window.sessionStorage.getItem("nowWeixin");
    if(nowWeixin != null){
        weixinid = JSON.parse(nowWeixin).weixinOpenID;
    }
    getmessageulist(nowpage,totalpage);

    function getmessageulist(nowpage,totalpage){
        nowpage = nowpage;
        totalpage = totalpage;
        $.ajax({
            type:"GET",
            url:"/api2/weixin/getmessageulist",
            data:{
                weixinid :weixinid,
                nowpage:nowpage,
                pagesize:pagesize
            },
            success:function(data){
                count = data.count;
                if(data["提示信息"]=="获取用户列表成功"){
                    var userList = getTemplate("userList");
                    $(".mainContern").html(userList.render(data["users"]));
                    getPageData(function next(from, pagesize, totalpage, nowpage) {
                        getmessageulist(nowpage, totalpage);
                    }, pagesize, totalpage, nowpage, count);
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


