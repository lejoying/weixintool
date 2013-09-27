var userid = new Base64().decode(Request("param") + "==");
var weixinname = "";
$(document).ready(function () {
    var nowpage = 1;
    var pagesize = 10;
    var weixinid = "";
    var count = "";
    var totalpage = 0;
    var nowWeixin = window.sessionStorage.getItem("nowWeixin");
    if (nowWeixin != null) {
        weixinid = JSON.parse(nowWeixin).weixinOpenID;
        weixinname = JSON.parse(nowWeixin).weixinName;
    }
    getmessageulist(nowpage, totalpage);

    function getmessageulist(nowpage, totalpage) {
        nowpage = nowpage;
        totalpage = totalpage;

        $.ajax({
            type: "GET",
            url: "/api2/weixin/getmessages",
            data: {
                weixinid: weixinid,
                userid: userid,
                nowpage: nowpage,
                pagesize: pagesize
            },
            success: function (data) {
                count = data.count;
                if (data["提示信息"] == "获取消息成功") {
                    var messagesDetail = getTemplate("messagesDetail");
                    $(".mainContern").html(messagesDetail.render(data));
                }
                getPageData(function next(from, pagesize, totalpage, nowpage) {
                    getmessageulist(nowpage, totalpage);
                }, pagesize, totalpage, nowpage, count);

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

//获取html页面传递过来的参数值
function Request(strName) {
    var strHref = window.document.location.href;
    var intPos = strHref.indexOf("?");
    var strRight = strHref.substr(intPos + 1);
    var arrTmp = strRight.split("&");
    for (var i = 0; i < arrTmp.length; i++) {
        var arrTemp = arrTmp[i].split("=");
        if (arrTemp[0].toUpperCase() == strName.toUpperCase()) return arrTemp[1];
    }
    return "";
}

function formattertime(millisecond) {
    var date = new Date(millisecond);
    var formattertime = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    return formattertime;
}