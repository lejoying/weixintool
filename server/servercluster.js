/**
 * Date: 2013.04.15
 * The simplest framework for RESTful api server.
 * Run "$ sudo node servercluster.js" to start the servers below.
 *
 * If you want to start several servers parallelly as a cluster, add the new servers as the form of "server0".
 */

var serverSetting = require('./settings.js')

var server0 = require('./weixinserver/main.js');//8062
//var server1 = require('./server1/main.js');


var server1 = require('./bindserver/main.js');//8064

var server3 = require('./pushserver/main.js');//8065

var server4 = require('./imageupload/index.js');//8066