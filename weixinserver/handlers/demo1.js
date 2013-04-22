/**
 * Date: 2013.04.15
 *  http://127.0.0.1:8061/api2/access/get
 *  http://127.0.0.1:8061/api2/access/reset?i=0
 */

var demo1 = {};

var access = 0;
demo1.get = function (response) {
    access++;
    response.write(JSON.stringify({
        "information":"/api2/access/get success",
        "access":access
    }));
}

demo1.reset = function (i, response) {
    access = i;
    response.write(JSON.stringify({
        "information":"api2/access/reset success",
        "access":access
    }));
}

module.exports = demo1;