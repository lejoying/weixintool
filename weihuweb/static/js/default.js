/**
 * Created with JetBrains WebStorm.
 * User: Admin
 * Date: 13-8-27
 * Time: 上午10:31
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    $.ajax({
        type:"GET",
        url:"",
        data:{},
        success:function(serverData){
            alert(serverData["count"]);
        }
    });
});
Date.prototype.format = function(format)
{
    var o =
    {
        "M+" : this.getMonth()+1, //month
        "d+" : this.getDate(),    //day
        "h+" : this.getHours(),   //hour
        "m+" : this.getMinutes(), //minute
        "s+" : this.getSeconds(), //second
        "q+" : Math.floor((this.getMonth()+3)/3),  //quarter
        "S" : this.getMilliseconds() //millisecond
    }
    if(/(y+)/.test(format))
        format=format.replace(RegExp.$1,(this.getFullYear()+""));
    for(var k in o)
        if(new RegExp("("+ k +")").test(format))
            format = format.replace(RegExp.$1,RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
    return format;
}