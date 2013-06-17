
$(".circel_ele").bind("dragover", handleDragOver);
$(".circel_ele").bind("dragend", handleDragEnd);

/******************************
 处理circel_ele
 *****************************/

$(".circel_ele").attr('draggable', 'true');

$(".circel_ele").bind("dragover", function (e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    $(this).remove();

    var circle= $(".circle_out");
    var amount1 = parseInt(circle.attr("amount"));
    if(amount1 <= 0){
        amount1 = 0;
    }
    circle.attr("amount", amount1 - 1);
});

$(".circel_ele").bind("dragend", function () {
    $(".circel_ele").removeClass("moving");
});
