/**
 * Created with JetBrains WebStorm.
 * User: Admin
 * Date: 13-8-9
 * Time: 上午11:12
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    var pagesize = 4;
    var index = 1;
    var count = 3;
    var nowBindWeixins = window.sessionStorage.getItem("nowBindWeixins");
    var nowWeixinName = window.localStorage.getItem("nowWeixinName");
    var weixinid = "";
    if(nowBindWeixins != null){
        for(var key in JSON.parse(nowBindWeixins)){
            if(JSON.parse(nowBindWeixins)[key].weixinName == nowWeixinName){
                weixinid = JSON.parse(nowBindWeixins)[key].weixinOpenID;
                getAllWeixinUser(JSON.parse(nowBindWeixins)[key].weixinOpenID, 0, pagesize);
            }
        }
    }
    if(nowWeixinName != null){
        $(".weixinMemberTitle div span").html(nowWeixinName);
    }
    //发送Ajax请求,获取微信会员列表信息并显示
    function getAllWeixinUser(weixinOpenID, start, end){
        $.ajax({
            type:"GET",
            url:"/api2/user/getall?",
            data:{
                "weixinopenid":weixinOpenID,
                start:start,
                end: end
            },
            success:function(serverData){
                if(serverData["提示信息"] == "获得所有关注用户成功"){
                    count = Math.ceil(serverData["count"]/pagesize);
//                    alert(count);
                    var weixin_user = getTemplate("weixin_user");
                    $(".wixinMemberTable").html(weixin_user.render(serverData["users"]));
                    $($(".pagination a")[9]).attr("value",count);
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
                    $(".pagination a").each(function(i){
                        if($($(".pagination a")[i]).attr("value")>count){
                            $($(".pagination a")[i]).attr("class","unclick");
                            return true;
                        }
                        $($(".pagination a")[i]).click(function(){
                            if(i != 1 && i != 8){
                                index = $($(".pagination a")[i]).attr("value");
                            }
                            $($(".pagination a")[7]).html(Math.ceil(index/10)*10);
                            $($(".pagination a")[7]).attr("value",(index/10)*10);
                            if(i == 1){
                                if(index-1>0){
                                    index--;
                                }else{
                                    index = 1;
                                }
                            }
                            if(i == 8){
                                if(index+1<count){
                                    index++;
                                }else{
                                    index = count;
                                }
                            }
                            /*if(index-1<=0){
                             index = 1;
                             }
                             $($(".pagination a")[1]).attr("value",index-1);
                             $($(".pagination a")[1]).attr("value",index-1);
                             $($(".pagination a")[8]).attr("value",index+1);*/
                            if(count>=5){
                                if(i==5 || i==6){
                                    for(var x=2;x<7;x++){
                                        $($(".pagination a")[x]).html(index-4+x);
                                        $($(".pagination a")[x]).attr("value",index-4+x);
                                        $($(".pagination a")[x]).attr("title",index-4+x);
                                    }
                                }
                                if(i==2 || i==3){
                                    if(index>2){
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
                            getAllWeixinUser(weixinid, (index-1)*pagesize, pagesize);
                        });
                    });
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
