//String.format = function (src) {
//    if (arguments.length == 0) return null;
//    var args = Array.prototype.slice.call(arguments, 1);
//    return src.replace(/\{(\d+)\}/g, function (m, i) {
//        return args[i];
//    });
//};
//
//
//var dragSrcEl1 = null;
//
//function handleDragStart(e) {
//    dragSrcEl1 = this;
//
//    this.classList.add('moving');
//}
//
//function handleDragOver(e) {
//    if (e.preventDefault) {
//        e.preventDefault(); // Necessary. Allows us to drop.
//    }
//
//    return false;
//}
//
//function handleDragEnter(e) {
//    this.classList.add('over');
//}
//
//function handleDragLeave(e) {
//    this.classList.remove('over');  // this / e.target is previous target element.
//}
//
//function handleDrop(e) {
//    // this/e.target is current target element.
//    if (e.stopPropagation) {
//        e.stopPropagation(); // Stops some browsers from redirecting.
//    }
//
//    // Don't do anything if dropping the same column we're dragging.
//    if (dragSrcEl1 != this) {
//        // Set the source column's HTML to the HTML of the column we dropped on.
//        var innerHTML = dragSrcEl1.innerHTML;
//        dragSrcEl1.innerHTML = this.innerHTML;
//        this.innerHTML = innerHTML;
//    }
//
//    return false;
//}
//
//function handleDragEnd(e) {
//    // this/e.target is the source node.
//    this.style.opacity = '0.9';
//    [].forEach.call(cols, function (col) {
//        col.classList.remove('over');
//        col.classList.remove('moving');
//    });
//    $(".circle_out").removeClass("over");
//    $(".circle_out").removeClass("moving");
//}

var cols = document.querySelectorAll('.out_frame');
[].forEach.call(cols, function (col) {
    col.setAttribute('draggable', 'true');

});


//$(".circel_ele").bind("dragstart", handleDragStart);
//$(".circel_ele").bind("dragenter", handleDragEnter);
$(".circel_ele").bind("dragover", handleDragOver);
//$(".circel_ele").bind("dragleave", handleDragLeave);
//$(".circel_ele").bind("drop", handleDrop);
$(".circel_ele").bind("dragend", handleDragEnd);

/******************************
 处理circel_ele
 *****************************/

$(".circel_ele").attr('draggable', 'true');

$(".circel_ele").bind("dragover", function (e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
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
//    $(".circel_ele").removeClass("over");
    $(".circel_ele").removeClass("moving");

});
