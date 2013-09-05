/**
 * Created with JetBrains WebStorm.
 * User: Admin
 * Date: 13-9-5
 * Time: 下午12:30
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    $.ajax({
        type: "GET",
        url: "/api2/app/getall?",
        data: {
            mold: "management",
            start: 0,
            end: 6
        },
        success: function(serverData){
            if(serverData["提示信息"] == "获得应用列表成功"){
                var main_publicapp = getTemplate("main_publicapp");
                $(".allAppsList").html(main_publicapp.render(serverData["apps"]));

                $(".publicAppsOperating input").each(function(i){
                    $($(".publicAppsOperating input")[i]).click(function(){
                        /*alert("----"+this.value);
                        var url = "";
                        if(this.checked == true){
                            url = "/api2/app/modifystatus?"
                        }else if(this.checked == false){
                            url = "/api2/app/modifystatus?"
                        }*/
                        $.ajax({
                            type: "GET",
                            url: "/api2/app/modifystatus?",
                            data:{
                                appid: this.value,
                                status: this.checked
                            },
                            success:function(serverData){
                                if(serverData["提示信息"] == "修改应用信息成功"){
                                    showBlackPage("设置成功","设置成功");
                                    if(serverData["app"].status == "true"){
                                        $(".publicAppsOperating input")[i].setAttribute("checked","true");
                                    }else{
                                        $(".publicAppsOperating input")[i].removeAttribute("checked");
                                    }
                                }else{
                                    showBlackPage("设置失败","设置失败");
                                }
                            }
                        });
                    });
                });
            }
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