/**
 * Date: 2013.04.15
 * requestHandles dispatch.
 */

var requestHandlers = {};

var globaldata = root.globaldata;


/**
 *  http://127.0.0.1:8061/api2/session/event?account=user1&sessionID=user1231325456546
 *  http://127.0.0.1:8061/api2/session/notify?account=user1&sessionID=user1231325456546&eventID=update
 *     post     JSON.stringify(event={eventID:"update", data,....})
 */
var session = require('./handlers/session');
requestHandlers.session = function (request, response, pathObject, getParam) {
    if (getParam == null) {
        return;
    }
    var operation = pathObject["operation"];
    if (operation == "event") {
        var uid = getParam["uid"];
        var sessionID = getParam["sessionID"];
        var eventID = getParam["eventID"];
        session.event(uid, sessionID, response);
    }
    else if (operation == "notify") {
        var uid = getParam["uid"];
        var sessionID = getParam["sessionID"];
        var eventID = getParam["eventID"];
        var eventStr = getParam["event"];
        var event;
        if (eventStr != null) {
            event = JSON.parse(eventStr);
        }
        session.notify(uid, sessionID, eventID, event, response);
    }
};


module.exports = requestHandlers;