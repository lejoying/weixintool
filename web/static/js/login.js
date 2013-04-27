$(document).ready(function(){
    $("[name='username']").click(function(){
        $("[name='username']").toggle();
        $("[name='username1']").toggle();
        $("[name='username1']").focus();
        $("[name='username1']").attr("class","input_focus");
    });
    $("[name='username1']").blur(function(){
        if($("[name='username1']").val()==""){
            $("[name='username1']").toggle();
            $("[name='username']").toggle();
        }
    });
    $("[name='password']").click(function(){
        $("[name='password']").toggle();
        $("[name='password1']").toggle();
        $("[name='password1']").focus();
        $("[name='password1']").attr("type","password");
        $("[name='password1']").attr("class","input_focus");
    });
    $("[name='password1']").blur(function(){
        if($("[name='password1']").val()==""){
            $("[name='password1']").toggle();
            $("[name='password']").toggle();
        }
    });
     $("#login").click(function(){
         if(($("[name='username1']").val()=="") || ($("[name='password1']").val()=="")){
               $(".error_warning").toggle();
               $("#error_text").text("用户名或密码不能为空！");
         } else{
             $.ajax({ type:"post",url:"/api2/accont/outh?",data:{accent:$("[name='username1']").val() , password:$("[name='password1']").val()},success:function(){
                 //返回正确操作
             }});
         }
     });
});