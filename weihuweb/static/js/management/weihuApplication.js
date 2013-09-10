/**
 * Created with JetBrains WebStorm.
 * User: Admin
 * Date: 13-9-5
 * Time: 下午12:30
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    var pagesize = 4;
    var index = 1;
    var count = 0;
    getAllApp(0, pagesize);
    function getAllApp(start, end){
        $.ajax({
            type: "GET",
            url: "/api2/app/getall?",
            data: {
                mold: "management",
                start: start,
                end: end
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
                    if(count == 0){
                        count = Math.ceil(serverData["count"]/pagesize);
                        $($(".pagination a")[1]).hide();
                        $($(".pagination a")[9]).attr("value",count);
                        $(".pagination a").each(function(i){
                            var now = 0;
                            if($($(".pagination a")[i]).attr("value")>count){
                                $($(".pagination a")[i]).attr("class","unclick");
                                return true;
                            }
                            $($(".pagination a")[i]).click(function(){
                                if(i != 1 && i != 8){
                                    now = index;
                                    index = $($(".pagination a")[i]).attr("value");
                                }
                                $($(".pagination a")[7]).html(Math.ceil(index/10)*10);
                                $($(".pagination a")[7]).attr("value",(index/10)*10);
                                if(i == 1){
                                    now = index;
                                    if(index-1>0){
                                        index--;
                                    }else{
                                        index = 1;
                                    }
                                }
                                if(i == 8){
                                    now = index;
                                    if(index+1<count){
                                        index++;
                                    }else{
                                        index = count;
                                    }
                                }
                                if(index > 1){
                                    $($(".pagination a")[1]).show();
                                }else{
                                    $($(".pagination a")[1]).hide();
                                }
//                                alert(index);
                                /*if(index-1<=0){
                                 index = 1;
                                 }
                                 $($(".pagination a")[1]).attr("value",index-1);
                                 $($(".pagination a")[1]).attr("value",index-1);
                                 $($(".pagination a")[8]).attr("value",index+1);*/
                                if(count>=5){
                                    if(i==5 || i==6 || i == 8){
                                        if(index<count && index>2){
                                            for(var x=2;x<7;x++){
                                                $($(".pagination a")[x]).html(index-4+x);
                                                $($(".pagination a")[x]).attr("value",index-4+x);
                                                $($(".pagination a")[x]).attr("title",index-4+x);
                                            }
                                        }
                                    }
                                    if(i==2 || i==3 || i==1){
                                        if(index>1 && index>2){
                                            for(var x=2;x<7;x++){
                                                $($(".pagination a")[x]).html(index-4+x);
                                                $($(".pagination a")[x]).attr("value",index-4+x);
                                                $($(".pagination a")[x]).attr("title",index-4+x);
                                            }
                                        }
                                    }
                                }
                                $(".pagination a").each(function(j){
                                    $(".pagination a")[j].removeAttribute("class");
                                    if($($(".pagination a")[j]).html() == index){
                                        $($(".pagination a")[j]).attr("class","pageSelected");
                                    }
                                    if($($(".pagination a")[j]).attr("value")>count){
                                        $($(".pagination a")[j]).attr("class","unclick");
                                        return true;
                                    }
                                });
                                if(now != index){
                                    getAllApp((index-1)*pagesize, pagesize);
                                }
                            });
                        });
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