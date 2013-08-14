/**
 * Created with JetBrains WebStorm.
 * User: Admin
 * Date: 13-8-13
 * Time: 上午10:57
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    //从window.localStorage中获取当前登录用户的信息
    var nowAccount = window.localStorage.getItem("nowAccount");
    if(nowAccount != null){
        //发送Ajax请求，获取绑定的微信用户
        $.ajax({
            type:"GET",
            url:"/api2/weixin/getall?",
            data:{
                "uid":JSON.parse(nowAccount).uid
            },
            success:function(serverData){
    //            alert(serverData["提示信息"]);
                for(var key in serverData["weixins"]){
    //                alert(serverData["weixins"][key].weixinName);
                    var li = document.createElement("li");
                    var div1 = document.createElement("div");
                    div1.className = "appsImg";
                    var img = document.createElement("img");
                    img.src = "/static/images/app/6.jpg";
                    div1.appendChild(img);
                    li.appendChild(div1);

                    var div2 = document.createElement("div");
                    div2.className = "appsSummary";
                    var div2_1 = document.createElement("div");
                    div2_1.className = "publicAppExplanation";
                    var span1 = document.createElement("span");
                    span1.className = "publicAppName";
                    if(serverData["weixins"][key].weixinName != undefined)
                        span1.appendChild(document.createTextNode(serverData["weixins"][key].weixinName));
                    var span2 = document.createElement("span");
                    var sa = document.createElement("a");
                    sa.href = "/page/weixinAccountSetting.html?id="+key;
                    sa.appendChild(document.createTextNode("设置"));
                    var div2_2 = document.createElement("div");
                    div2_2.className = "publicAppIntroduction";
                    if(serverData["weixins"][key].intro != undefined)
                        div2_2.appendChild(document.createTextNode(serverData["weixins"][key].intro));
                    span2.appendChild(sa);
                    div2_1.appendChild(span1);
                    div2_1.appendChild(span2);
                    div2.appendChild(div2_1);
                    div2.appendChild(div2_2);
                    li.appendChild(div2);

                    var div3 = document.createElement("div");
                    div3.className = "publicAppsOperating";
                    var div3_1 = document.createElement("div");
                    div3_1.className = "switch publicAppSwitch demo3";
                    var input = document.createElement("input");
                    input.type = "checkbox";
                    var label = document.createElement("label");
                    var i = document.createElement("i");
                    var a = document.createElement("a");
                    a.className = "publicAppFull";
                    a.href = "publicAppDetail.html?id="+key;
                    a.appendChild(document.createTextNode("进入"));
                    div3_1.appendChild(input);
                    label.appendChild(i);
                    div3_1.appendChild(label);
                    div3.appendChild(div3_1);
                    div3.appendChild(a);
                    li.appendChild(div3)
                    $(".allAppsList ul")[0].appendChild(li);
                }
                /*var link = document.createElement("link");
                link.href = "/static/css/web_style.css";
                link.type = "text/css";
                link.rel = "stylesheet";
                $("head")[0].appendChild(link);*/
            }
        });
    }
});