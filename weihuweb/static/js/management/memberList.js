/**
 * Created with JetBrains WebStorm.
 * User: xiao
 * Date: 13-9-4
 * Time: 下午9:12
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    var pagesize = 4;
    var index = 1;
    var count = 0;
    getAllAccount(0, pagesize, count, index);
    function getAllAccount(start, end, count, index){
        count = count;
        index = index;
        $.ajax({
            type: "GET",
            url: "/api2/account/getnowpageaccount?",
            data: {
                start: start,
                end: end
            },
            success: function(serverData){
                if(serverData["提示信息"] == "获得分页注册用户成功"){
                    var memberlist = getTemplate("memberlist");
                    $(".userMessageList").html(memberlist.render(serverData["accounts"]));
                    $(".js_deleteAccount").each(function(i){
                        $($(".js_deleteAccount")[i]).click(function(){
                            $.ajax({
                                type: "GET",
                                url: "/api2/account/delete?",
                                data: {
                                    uid: this.name
                                },
                                success: function(serverData){
                                    if(serverData["提示信息"] == "删除注册用户成功"){
                                        $(".js_truser")[i].parentNode.removeChild($(".js_truser")[i]);
                                    }
                                }
                            });
                        });
                    });
                    $(".js_name").each(function(i){
                        $($(".js_name")[i]).html(unescape($($(".js_name")[i]).html()));
                    });
                    if(count == 0){
                        getPageData(getAllAccount, pagesize, count, index, serverData["count"]);
                    }
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