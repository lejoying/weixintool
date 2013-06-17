String.format = function (src) {
    if (arguments.length == 0) return null;
    var args = Array.prototype.slice.call(arguments, 1);
    return src.replace(/\{(\d+)\}/g, function (m, i) {
        return args[i];
    });
};


var dragSrcEl = null;

function handleDragStart(e) {
    // Target (this) element is the source node.
    this.style.opacity = '0.2';

    dragSrcEl = this;

    //        e.dataTransfer.effectAllowed = 'move';
    //        e.dataTransfer.setData('text/html', this.innerHTML);
    this.classList.add('moving');
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }

    //        e.dataTransfer.dropEffect = 'move';  // See the section on the DataTransfer object.

    return false;
}

function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
}

function handleDragLeave(e) {
    this.classList.remove('over');  // this / e.target is previous target element.
}

function handleDrop(e) {
    // this/e.target is current target element.
    alert("drop");
    if (e.stopPropagation) {
        e.stopPropagation(); // Stops some browsers from redirecting.
    }

    // Don't do anything if dropping the same column we're dragging.
    if (dragSrcEl != this) {
        // Set the source column's HTML to the HTML of the column we dropped on.
        var innerHTML = dragSrcEl.innerHTML;
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = innerHTML;
    }

    return false;
}

function handleDragEnd(e) {
    // this/e.target is the source node.
    this.style.opacity = '0.9';
    [].forEach.call(cols, function (col) {
        col.classList.remove('over');
        col.classList.remove('moving');
    });
    $(".circle_out").removeClass("over");
    $(".circle_out").removeClass("moving");

    var oHead = document.getElementsByTagName('HEAD').item(0);
    var oScript= document.createElement("script");
    oScript.type = "text/javascript";
    oScript.src="/static/js/drag_out.js";
    oHead.appendChild( oScript);



}

var cols = document.querySelectorAll('.out_frame');
[].forEach.call(cols, function (col) {
    col.setAttribute('draggable', 'true');

    //            col.addEventListener('drop', handleDrop, false);
    //            col.addEventListener('dragend', handleDragEnd, false);
});


$(".out_frame").bind("dragstart", handleDragStart);
$(".out_frame").bind("dragenter", handleDragEnter);
$(".out_frame").bind("dragover", handleDragOver);
$(".out_frame").bind("dragleave", handleDragLeave);
$(".out_frame").bind("drop", handleDrop);
$(".out_frame").bind("dragend", handleDragEnd);


/******************************
 处理circle_out
 *****************************/

$(".circle_out").attr('draggable', 'true');


$(".circle_out").click(function () {
    alert("click me");
});


$(".circle_out").bind("dragstart", function (e) {
    dragSrcEl = this;
});

$(".circle_out").bind("dragover", function (e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }
    $(this).addClass("over");
});
$(".circle_out").bind("dragleave", function () {
    $(this).removeClass("over");
});

//
$(".circle_out").bind("drop", function (arg) {
    if ($(dragSrcEl).hasClass("out_frame")) {
        append_circle($(this));
    }
});

$(".circle_out").bind("dragend", function () {
    $(".circle_out").removeClass("over");
    $(".circle_out").removeClass("moving");

});
function append_circle(circle) {
    var amount = parseInt(circle.attr("amount"));
    var str1 = '<div class="circel_ele circel_ele_{0} " title="微信订餐管理"><img src="/static/images/face.jpg"/></div>';

    $(".circel_ele").click(function () {
        //    alert($(this));
        //$(this).remove();
        //    alert("click me");
    });
    var str = String.format(str1, amount + 1);
    circle.append(str);
    circle.attr("amount", amount + 1);
}

/******************************
 处理circel_ele
 *****************************/

$(".circel_ele").attr('draggable', 'true');

$(".circel_ele").click(function () {
//    alert($(this));
    $(this).remove();
//    alert("click me");
});


$(".circel_ele").bind("dragstart", function (e) {
    dragSrcEl = this;
});


$(".circel_ele").bind("dragover", function (e) {
    if (e.preventDefault) {
        e.preventDefault(); // Necessary. Allows us to drop.
    }
    $(this).addClass("over");
});
$(".circel_ele").bind("dragleave", function () {
    $(this).removeClass("over");
});

//
$(".circel_ele").bind("drop", function () {
    remove_circle($(this));
});

$(".circel_ele").bind("dragend", function () {
    $(".circel_ele").removeClass("over");
    $(".circel_ele").removeClass("moving");

});
function remove_circle(circle) {
    alert("remove_circle");
}
