var push = {};

var ajax = require('./ajax');

push.notify = function (uid, sessionID, event) {
    ajax.ajax({
        data: {
            uid: uid,
            sessionID: sessionID,
            event: JSON.stringify(event)
        },
        type: 'POST',
        url: "http://127.0.0.1:8065/api2/session/notify",
        success: function (dataStr) {
            var data = JSON.parse(dataStr);
            if (data["提示信息"] == "定时发布器尚未正常运行") {
                startPublishing();
            }
        }
    });
}


if (typeof module !== 'undefined' && module.exports) {
    module.exports = push;
}
