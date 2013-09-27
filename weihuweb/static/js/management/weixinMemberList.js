/**
 * Created with JetBrains WebStorm.
 * User: Admin
 * Date: 13-9-4
 * Time: 下午4:02
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    var pagesize = 10;
    var index = 1;
    var count = 0;
    getAllUser(0, pagesize, count, index);
    function getAllUser(start, end, count, index){
        count = count;
        index = index;
        $.ajax({
            type: "GET",
            url: "/api2/user/getnowpageuser?",
            data: {
                start: start,
                end: end
            },
            success: function(serverData){
                if(serverData["提示信息"] == "获得分页关注用户成功"){
                    var userlist = getTemplate("userlist");
                    $(".userMessageList").html(userlist.render(serverData["users"]));
                    for(var i=0;i<$(".idsubstr").length;i++){
                        var id = $($(".idsubstr")[i]).html();
                        $($(".idsubstr")[i]).html(id.substr(0,10)+"...");
                        var cityName = $($(".js_substrcity")[i]).html();
                        if(cityName != undefined){
                            var cy = "";
                            var arr = cityName.split(" ");
                            var ar1 = arr[0].split(":");
                            cy +=ar1[0]+" ";
                            if(arr[1] != undefined){
                                if(arr[1] != ""){
                                    var ar2 = arr[1].split(":");
                                    cy += ar2[0];
                                }
                                $($(".js_substrcity")[i]).html(cy);
                            }
                        }
                    }

                    $(".js_delete").each(function(i){
                        $($(".js_delete")[i]).click(function(){
                            var id = $(".js_delete")[i].name;
                            $.ajax({
                                type: "GET",
                                url: "/api2/user/delete?",
                                data: {
                                    userid: id
                                },
                                success: function(serverData){
                                    if(serverData["提示信息"] == "删除用户信息成功"){
                                        $(".js_truser")[i].parentNode.removeChild($(".js_truser")[i]);
                                        showBlackPage("删除成功","删除成功");
                                    }else{
                                        showBlackPage("删除失败","删除失败");
                                    }
                                }
                            });
                        });
                    });
                    if(count == 0){
                        getPageData(getAllUser, pagesize, count, index, serverData["count"]);
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