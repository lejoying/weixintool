/**
 * Created with JetBrains WebStorm.
 * User: Admin
 * Date: 13-8-12
 * Time: 下午4:39
 * To change this template use File | Settings | File Templates.
 */
$(document).ready(function(){
    $(".weixinMemberEditBtn").click(function(){
        var name = document.getElementsByName("name")[0].value;
        var headimg = document.getElementsByName("headimg")[0].value;
        var intro = document.getElementsByName("intro")[0].value;
        alert(name+"\n"+headimg+"\n"+intro);
    });
});