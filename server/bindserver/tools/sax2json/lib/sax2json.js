// This is an a rip off of https://github.com/buglabs/node-xml2json
// all the credit goes to them, all the mistakes are mine


var sax = require('sax')

var isArray = require('util').isArray

module.exports = function toJson(xml, op, callback) {

    if (typeof op === 'function') {
        callback = op
        op = {}
    }

    var parser = sax.parser(false, op)
    // This object will hold the final result.
    var obj = currentObject = {}
    var ancestors = []

    var options = { //default configuration options
        object: false,
        reversible: false
    };

    for (var opt in op) {
        options[opt] = op[opt];
    }

    parser.onopentag = startElement;
    parser.ontext = text;
    parser.onclosetag = endElement;


    parser.oncdata = function (cdata) {
        cdata = cdata.trim()
        if (!cdata.length) {
            return
        }
        currentObject['$t'] = (currentObject['$t'] || "") + cdata;
    };

    parser.onend = function () {
        if (callback != null) {
            if (options.object) {
                callback(null, JSON.stringify(obj))
            }
            else {
                callback(null, obj)
            }
        }
    }

    parser.write(xml).close()

    function startElement(node) {
        var name = node.name
        var attrs = node.attributes
        if (!(name in currentObject)) {
            currentObject[name] = attrs
        }
        else if (!isArray(currentObject[name])) {
            // Put the existing object in an array.
            var newArray = [currentObject[name]]
            // Add the new object to the array.
            newArray.push(attrs)
            // Point to the new array.
            currentObject[name] = newArray
        }
        else {
            // An array already exists, push the attributes on to it.
            currentObject[name].push(attrs)
        }

        // Store the current (old) parent.
        ancestors.push(currentObject)

        // We are now working with this object, so it becomes the current parent.
        if (isArray(currentObject[name])) {
            // If it is an array, get the last element of the array.
            currentObject = currentObject[name][currentObject[name].length - 1]
        }
        else {
            // Otherwise, use the object itself.
            currentObject = currentObject[name]
        }
    }

    function text(data) {
        data = data.trim()
        if (!data.length) {
            return
        }
        currentObject['$t'] = (currentObject['$t'] || "") + data
    }

    function endElement(name) {
        // This should check to make sure that the name we're ending
        // matches the name we started on.
        var ancestor = ancestors.pop()
        if (!options.reversible) {
            if ((Object.keys(currentObject).length == 1) && ('$t' in currentObject)) {
                if (isArray(ancestor[name])) {
                    ancestor[name].push(ancestor[name].pop()['$t'])
                }
                else {
                    ancestor[name] = currentObject['$t']
                }
            }
        }

        currentObject = ancestor
    }
}
