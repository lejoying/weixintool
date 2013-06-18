//$(".circel_ele").bind("dragover", handleDragOver);
//$(".circel_ele").bind("dragend", handleDragEnd);

/******************************
处理circel_ele
*****************************/

//$(".circel_ele").attr('draggable', 'true');

$(".circel_ele").bind("drag", function (e) {
//    if (e.preventDefault) {
//        e.preventDefault();
//    }
            $(this).remove();

    var circle= $(".circle_out");
    var amount1 = parseInt(circle.attr("amount"));
    circle.attr("amount", amount1 - 1);
    //先删除所有ele
    var all = $(".circel_ele");
    all.remove();
    //重新排列
    for(var i=1; i<amount1; i++){
        var button1=document.createElement("div");
        button1.setAttribute("class","circel_ele circel_ele_"+(i));
        button1.setAttribute("title","微信订餐管理");
        button1.setAttribute('draggable', 'true');
        var img1 = document.createElement("img");
        img1.setAttribute("src","/static/images/face.jpg");
        $(button1).append(img1);
        circle.append(button1);
        $(button1).bind("drag", function (e) {
            $(button1).remove();
            var circle= $(".circle_out");
            var amount1 = parseInt(circle.attr("amount"));
            circle.attr("amount", amount1 - 1);
            //先删除所有ele
            var all = $(".circel_ele");
            all.remove();
            //重新排列
            for(var i=1; i<amount1; i++){
                var button1=document.createElement("div");
                button1.setAttribute("class","circel_ele circel_ele_"+(i));
                button1.setAttribute("title","微信订餐管理");
                button1.setAttribute('draggable', 'true');
                var img1 = document.createElement("img");
                img1.setAttribute("src","/static/images/face.jpg");
                $(button1).append(img1);
                circle.append(button1);

            }
        });
    }
});
//$(".circel_ele").bind("dragend", function () {
//    $(".circel_ele").removeClass("moving");
//});
