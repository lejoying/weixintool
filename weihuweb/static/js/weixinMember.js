$(document).ready(function(){
    var pagesize = 7;
    var index = 1;
    var count = 0;
    var weixinid = "";
    var nowWeixin = window.sessionStorage.getItem("nowWeixin");
    if(nowWeixin != null){
        weixinid = JSON.parse(nowWeixin).weixinOpenID;
        getAllWeixinUser(0, pagesize, count, index);
        $(".weixinMemberTitle div span").html(JSON.parse(nowWeixin).weixinName);
    }
    //发送Ajax请求,获取微信会员列表信息并显示
    function getAllWeixinUser(start, end, count, index){
        count = count;
        index = index;
        $.ajax({
            type:"GET",
            url:"/api2/user/getall?",
            data:{
                "weixinopenid":weixinid,
                "start":start,
                "end": end
            },
            success:function(serverData){
                if(serverData["提示信息"] == "获得所有关注用户成功"){
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
                    if(count == 0){
                        getPageData(getAllWeixinUser, pagesize, count, index, serverData["count"]);
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
