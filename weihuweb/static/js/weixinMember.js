/**
 * Created with JetBrains WebStorm.
 * User: Admin
 * Date: 13-8-9
 * Time: 上午11:12
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){

    //发送Ajax请求,获取微信会员列表信息并显示
    $.ajax({
        type:"GET",
        url:"/api2/user/getall?",
        data:{
            "weixinopenid":"gh_4ca500089167"
        },
        success:function(serverData){
           if(serverData["提示信息"] == "获得所有关注用户成功"){
               for(var i=0;i<8;i++){
//                   alert(serverData["users"][i].id!=undefined);
                   var tr = document.createElement("tr")
                   var td1 = document.createElement("td");
                   var tn1,tn2,tn3,tn4;
                   if(serverData["users"][i].id!=undefined){
                       tn1 = document.createTextNode(serverData["users"][i].id.substr(0,10));
                       td1.appendChild(tn1);
                   }
                   var td2 = document.createElement("td");
                   if(serverData["users"][i].nickName!=undefined){
                       tn2 = document.createTextNode(serverData["users"][i].nickName.substr(0,10));
                       td2.appendChild(tn2);
                   }
                   var td3 = document.createElement("td");
                   if(serverData["users"][i].city!=undefined){
                       tn3 = document.createTextNode(serverData["users"][i].city.substr(0,10));
                       td3.appendChild(tn3);
                   }
                   var td4 = document.createElement("td")
                   if(serverData["users"][i].time!=undefined){
                       tn4 = document.createTextNode(serverData["users"][i].time.substr(0,10));
                       td4.appendChild(tn4);
                   }
                   var td5 = document.createElement("td");
                   var a1 = document.createElement("a");
                   a1.href="javascript:;";
                   a1.appendChild(document.createTextNode("删除"));
                   a1.setAttribute("href","javascript:;");
                   var a2 = document.createElement("a");
                   if(serverData["users"][i].id!=undefined)
                   a2.href="weixinMemberEdit.html?id="+serverData["users"][i].id;
                   a2.appendChild(document.createTextNode("编辑"));
                   var a3 = document.createElement("a");
                   a3.href="javascript:;";
                   a3.appendChild(document.createTextNode("消息列表"));
                   var a4 = document.createElement("a");
                   a4.href="javascript:;";
                   a4.appendChild(document.createTextNode("回复"));
                   var t1 = document.createTextNode(" | ");
                   var t2 = document.createTextNode(" | ");
                   var t3 = document.createTextNode(" | ");
//                   var tn5 = document.createTextNode("删除 | 编辑 | 消息列表 | 回复");
                   td5.appendChild(a1);
                   td5.appendChild(t1);
                   td5.appendChild(a2);
                   td5.appendChild(t2);
                   td5.appendChild(a3);
                   td5.appendChild(t3);
                   td5.appendChild(a4);

                   tr.appendChild(td1);
                   tr.appendChild(td2);
                   tr.appendChild(td3);
                   tr.appendChild(td4);
                   tr.appendChild(td5);

                   $(".wixinMemberTable table")[0].appendChild(tr);
               }
           }
        }
    });
});
