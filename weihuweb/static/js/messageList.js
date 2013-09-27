var weixinid = "";
var nowpage = 1;
var pagesize = 10;
var count;
$(document).ready(function(){
    var nowWeixin = window.sessionStorage.getItem("nowWeixin");
    if(nowWeixin != null){
        weixinid = JSON.parse(nowWeixin).weixinOpenID;
    }
    getmessageulist(weixinid,nowpage,pagesize);
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

function firstpage(){
    nowpage = 1;
    getmessageulist(weixinid,nowpage,pagesize);
}

function pageup(){
    if(nowpage!=1){
        nowpage-=1;
    }
    getmessageulist(weixinid,nowpage,pagesize);
}

function pagedown(){
    var totalpage = count%pagesize==0?count/pagesize:Math.floor(count/pagesize)+1;
    if(nowpage<totalpage){
        nowpage+=1;
    }
    getmessageulist(weixinid,nowpage,pagesize);
}

function lastpage(){
    var totalpage = count%pagesize==0?count/pagesize:Math.floor(count/pagesize)+1;
    nowpage = totalpage;
    getmessageulist(weixinid,nowpage,pagesize);
}

function getmessageulist(weixinid,nowpage,pagesize){
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
                $(".userMessageList").html(userList.render(data["users"]));
            }
        }
    });
}