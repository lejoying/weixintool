$(document).ready(function () {
    var lastShownAccountBox = $(".login_form[box='register']");
    $("#register").click(function () {
        var registerBox = $(".login_form[box='register']");
        var toState = new State();
        toState.scale.x = 0.28483920367534454;
        toState.scale.y = 0.1634920634920635;
        var fromState = new State();
        animateTransform(registerBox[0], fromState, toState, 200, {
            onStart: function () {
            },
            onEnd: function () {
                var fromState1 = new State(toState);
                var toState1 = new State(toState);
                toState1.translate.x = 600;
                toState1.translate.y = -305;
                animateTransform(registerBox[0], fromState1, toState1, 150, {
                    onStart: function () {
                    },
                    onEnd: function () {
                        registerBox.addClass("hide");
                        lastShownAccountBox = registerBox;
                        var account_informationBox = $(".login_user[box='account_information']");
                        account_informationBox.removeClass("hide");

                    }
                });
            }
        });
    });

    $("#to_login").click(function () {
        var registerBox = $(".login_form[box='register']");
        var toState = new State();
        toState.translate.y = -2000;
        var fromState = new State();
        animateTransform(registerBox[0], fromState, toState, 400, {
            onStart: function () {
            },
            onEnd: function () {
                registerBox.addClass("hide");
                var loginBox = $(".login_form[box='login']");
                loginBox.removeClass("hide");
                var fromState1 = new State(toState);
                fromState1.translate.y = -2000;
                var toState1 = new State(toState);
                toState1.translate.y = 0;
                animateTransform(loginBox[0], fromState1, toState1, 400);
            }
        });
    });
    $("#to_register").click(function () {
        var loginBox = $(".login_form[box='login']");
        var toState = new State();
        toState.translate.y = -2000;
        var fromState = new State();
        animateTransform(loginBox[0], fromState, toState, 400, {
            onStart: function () {
            },
            onEnd: function () {
                loginBox.addClass("hide");
                var registerBox = $(".login_form[box='register']");
                registerBox.removeClass("hide");
                var fromState1 = new State(toState);
                fromState1.translate.y = -2000;
                var toState1 = new State(toState);
                toState1.translate.y = 0;
                animateTransform(registerBox[0], fromState1, toState1, 400);
            }
        });
    });
    $(".login_user[box='account_information']").click(function () {
        $(this).addClass("hide");
        lastShownAccountBox.removeClass("hide");
        var toState = new State();
        toState.scale.x = 0.33962264150943394;
        toState.scale.y = 0.23684210526315788;
        var fromState = new State();
        fromState.translate.x = 638;
        fromState.translate.y = -332;
        fromState.scale.x = 0.33962264150943394;
        fromState.scale.y = 0.23684210526315788;
        animateTransform(lastShownAccountBox[0], fromState, toState, 200, {
            onStart: function () {
            },
            onEnd: function () {
                var fromState1 = new State(toState);
                var toState1 = new State(toState);
                fromState1.scale.x = 0.33962264150943394;
                fromState1.scale.y = 0.23684210526315788;
                toState1.scale.x = 1;
                toState1.scale.y = 1;
                animateTransform(lastShownAccountBox[0], fromState1, toState1, 150);
            }
        });
    });
});