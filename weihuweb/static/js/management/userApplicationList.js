/**
 * Created with JetBrains WebStorm.
 * User: Admin
 * Date: 13-9-5
 * Time: 下午3:27
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    var pagesize = 5;
    var index = 1;
    var count = 0;
    getAppData(0, pagesize, count, index);
    function getAppData(start, end, count, index){
        count = count;
        index = index;
        $.ajax({
            type: "GET",
            url: "/api2/app/getprivateapp?",
            data: {
                start: start,
                end: end
            },
            success: function(serverData){
                if(serverData["提示信息"] == "获得用户个性化设置成功"){
                    var main_publicapp = getTemplate("main_publicapp");
                    $(".allAppsList").html(main_publicapp.render(serverData["rs"]));

                    $(".js_delete").each(function(i){
                        $($(".js_delete")[i]).click(function(){
                            var array = $(".js_delete")[i].name.split(",");
                            var obj = {};
                            obj.power = false
                            $.ajax({
                                type: "GET",
                                url: "/api2/app/myappmodify?",
                                data: {
                                    weixinid: array[0],
                                    appid: array[1],
                                    r: JSON.stringify(obj)
                                },
                                success: function(serverData){
                                    if(serverData["提示信息"] == "获取应用信息成功"){}
                                }
                            });
                            $(".js_lidata")[i].parentNode.removeChild($(".js_lidata")[i]);

                            getAppData(0, pagesize);
                        });
                    });
                    if(count == 0){
                        getPageData(getAppData, pagesize, count, index, serverData["count"]);
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