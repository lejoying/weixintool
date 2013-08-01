requestAnimationFrame = window.webkitRequestAnimationFrame;

function animate(element, name, from, to, time, callback) {
    time = time || 800; // The default value is 0.8 second
    var startTime = new Date;
    callback = callback || {
        onStart: function () {
        },
        onEnd: function () {
        } };
    callback.onStart();

    function transform(timestamp) {
        var progress = timestamp - startTime;
        if (progress >= time) {
            element.style[name] = to + 'px';
            callback.onEnd();
            return;
        }

        var now = (to - from) * (progress / time);
        element.style[name] = now.toFixed() + 'px';
        requestAnimationFrame(transform);
    }

//    -webkit-transform: translate(100px, -200px) skewY(-5deg) scale(0.5, 0.5) rotate(10deg);
    element.style[name] = from + 'px';

    requestAnimationFrame(transform);
}

function animateTransform(element, fromState, toState, time, callback) {
    time = time || 800; // The default value is 0.8 second
    var startTime = new Date;
    callback = callback || {
        onStart: function () {
        },
        onEnd: function () {
        } };
    callback.onStart();

    var state = new State();

    function transform(timestamp) {
        var progress = timestamp - startTime;
        if (progress >= time) {
            element.style.webkitTransform = parseState(toState);
            callback.onEnd();
            console.log(parseState(toState));
            return;
        }
        var progressRate = progress / time;

        state.translate = {x: (toState.translate.x - fromState.translate.x) * progressRate + fromState.translate.x, y: (toState.translate.y - fromState.translate.y) * progressRate + fromState.translate.y};
        state.rotate = {r: (toState.rotate.r - fromState.rotate.r) * progressRate + fromState.rotate.r};
        state.scale = {x: (toState.scale.x - fromState.scale.x) * progressRate + fromState.scale.x, y: (toState.scale.y - fromState.scale.y) * progressRate + fromState.scale.y};

        element.style.webkitTransform = parseState(state);
        requestAnimationFrame(transform);
    }

    element.style.webkitTransform = parseState(fromState);

    requestAnimationFrame(transform);
}

function State(state) {
    if (state != null) {
        this.translate = {x: state.translate.x, y: state.translate.y};
        this.rotate = {r: state.rotate.r};
        this.scale = {x: state.scale.x, y: state.scale.y};
    } else {
        this.translate = {x: 0, y: 0};
        this.rotate = {r: 0};
        this.scale = {x: 1, y: 1};
    }
}

function parseState(state) {
    var str = "translate(" + state.translate.x + "px, " + state.translate.y + "px) scale(" + state.scale.x + ", " + state.scale.y + ") rotate(" + state.rotate.r + "deg)"
    return str;
}