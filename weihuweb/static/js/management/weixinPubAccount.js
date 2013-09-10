/**
 * Created with JetBrains WebStorm.
 * User: Admin
 * Date: 13-9-4
 * Time: 上午10:19
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    var pagesize = 6;
    var index = 1;
    var count = 0;
    getAllWeixin(0, pagesize);
    function getAllWeixin(start, end){
        $.ajax({
            type: "GET",
            url: "/api2/weixin/getnowpageweixin?",
            data:{
                start: start,
                end: end
            },
            success:function(serverData){
                if(serverData["提示信息"] == "获取绑定微信公众账号分页数据成功"){
                    var weixinlist = getTemplate("weixinlist");
                    $(".wixinMemberTable").html(weixinlist.render(serverData["weixins"]));
                    $(".js_switch").each(function(i){
                        $($(".js_switch")[i]).click(function(){
                            var flag = "";
                            if($($(".js_switch")[i]).html() == "关闭"){
                                flag = "false";
                            }else{
                                flag = "true";
                            }
                            var value = $(".js_switch")[i].name;
                            var array = value.split(",");
                            $.ajax({
                                type:"POST",
                                url:"/api2/weixin/modifyrelapro?",
                                data:{
                                    uid: parseInt(array[0]),
                                    weixinid: array[1],
                                    switch: flag
                                },
                                success:function(serverData){
                                    if(serverData["提示信息"] == "修改绑定微信开关成功"){
                                        if(serverData["r"].switch=="true"){
                                            showBlackPage("开启成功","开启成功");
                                            $($(".js_switch")[i]).html("关闭");
                                            $($(".js_switchstatus")[i]).html("已开启");
                                        }else{
                                            showBlackPage("关闭成功","关闭成功");
                                            $($(".js_switch")[i]).html("开启");
                                            $($(".js_switchstatus")[i]).html("已关闭");
                                        }
                                    }else if(serverData["提示信息"] == "修改绑定微信开关失败"){
                                        showBlackPage("设置失败","设置失败");
                                    }
                                }
                            });
                        });
                    });
                    $(".js_delete").each(function(i){
                        $($(".js_delete")[i]).click(function(){
                            var value = $(".js_delete")[i].name;
                            var array = value.split(",");
                            $.ajax({
                                type: "GET",
                                url: "/api2/weixin/delete?",
                                data: {
                                    uid: array[0],
                                    weixinid: array[1]
                                },
                                success: function(serverData){
                                    if(serverData["提示信息"] == "删除绑定微信成功"){
                                        $(".js_weixintr")[i].parentNode.removeChild($(".js_weixintr")[i]);
                                        showBlackPage("删除成功","删除成功");
                                    }else{
                                        showBlackPage("删除失败","删除失败");
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
                                    getAllWeixin((index-1)*pagesize, pagesize);
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