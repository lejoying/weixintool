/**
 * Created with JetBrains WebStorm.
 * User: xiao
 * Date: 13-9-4
 * Time: 下午9:12
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "/api2/account/getnowpageaccount?",
        data: {
            start: 0,
            end: 10
        },
        success: function(serverData){
//            alert(serverData["提示信息"]);
            var memberlist = getTemplate("memberlist");
            $(".userMessageList").html(memberlist.render(serverData["accounts"]));

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