/**
 * Date: 2013.04.15
 * session:
 *  http://127.0.0.1:8061/api2/session/event?account=user1&sessionID=user1231325456546
 *  http://127.0.0.1:8061/api2/session/notify?account=user1&sessionID=user1231325456546&eventid=update
 *     post     JSON.stringify(event={eventID:"update", data,....})
 */

var session = {};

var access = 0;

var sessionPool = {};
var accountSession = {};

session.event = function (uid, sessionID, response) {
    response.asynchronous = 1;

    var sessionResponse = sessionPool[sessionID];
    if (sessionResponse != null) {
        sessionResponse.end();
    }

    sessionPool[sessionID] = response;
    accountSession[uid] = accountSession[uid] || [];
    accountSession[uid][sessionID] = response;
}

session.notify = notify;
function notify(uid, sessionID, eventID, event, response) {

    event = event || {eventID: eventID};
    if (sessionID == "*") {
        var sessions = accountSession[uid];
        for (var sessionID in sessions) {
            var sessionResponse = sessions[sessionID];
            sessionResponse.write(JSON.stringify(event));
            sessionResponse.end();
        }
    }
    else {
        var sessionResponse = sessionPool[sessionID];
        sessionResponse.write(JSON.stringify(event));
        sessionResponse.end();
    }

    response.write(JSON.stringify({
        "information": "notify success"
    }));
    response.end();
}

module.exports = session;