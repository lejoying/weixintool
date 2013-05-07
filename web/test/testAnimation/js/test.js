$(document).ready(function () {
        $("#login").click(function () {
            var box = $(".body_content");
            animate(box[0], "left", 10, 500, 200);
        });

        $("#register").click(function () {
            var box = $(".body_content");
            var toState = new State();
//            toState.translate.x = 385;
//            toState.translate.y = -258;
            toState.scale.x = 0.33962264150943394;
            toState.scale.y = 0.23684210526315788;
            var fromState = new State();
            animateTransform(box[0], fromState, toState, 400,
                {
                    onStart: function () {
                    },
                    onEnd: function () {
                        var fromState1 = new State(toState);
                        var toState1 = new State(toState);
                        toState1.translate.x = 385;
                        toState1.translate.y = -258;
                        toState1.rotate.r = 1080;
                        animateTransform(box[0], fromState1, toState1, 400);
                    }
                }
            );



        });
    }
);