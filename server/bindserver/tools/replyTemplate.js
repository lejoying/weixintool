var fs = require('fs');
var tenjin = require('./nTenjin');

var StringDecoder = require('string_decoder').StringDecoder;
var decoder = new StringDecoder('utf8');

var templeteBuffer = fs.readFileSync('./bindserver/tools/replyTemplate.xml');

var replyTemplate = new tenjin.Template();
replyTemplate.convert(decoder.write(templeteBuffer));

if (typeof module !== 'undefined' && module.exports) {
    module.exports = replyTemplate;
}
