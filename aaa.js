(function(b, c) {
    function f(a, b) {
        var c = a.substr(a.lastIndexOf(".")).toLowerCase();
        return b[c]
    }
    b.htmlEncode = function(a) {
        return a && a.replace ? a.replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\'/g, "&#39;") : a
    };
    b.htmlDecode = function(a) {
        return a && a.replace ? a.replace(/&nbsp;/gi, " ").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'").replace(/&amp;/gi, "&") : a
    };
    b.hrefEncode = function(a) {
        return"zh_CN" == document.lang ? a.replace(/(((http|https|ftp):\/\/)|www\.)[-\w.]+(:\d+)?(\/([\w\/_=.%-~]*(\?[^\s\u4e00-\u9fa5]+)?)?)?(#[\d\w_-]+)?/ig, function(a) {
            var c = WebMM.model("account");
            return'<a target="_blank" href="' + ("/cgi-bin/mmwebwx-bin/webwxcheckurl?uin=" + c.getUin() + "&sid=" + encodeURIComponent(c.getSid()) + "&skey=" + encodeURIComponent(c.getSkey()) + "&deviceid=" + encodeURIComponent(WebMM.getDeviceId()) + "&opcode=2&requrl=" + encodeURIComponent((0 == a.indexOf("http") ? "" : "http://") + b.clearHtmlStr(a)) + "&scene=1&username=" + c.getUserName()) + '">' + a + "</a>"
        }) : a.replace(/(((http|https|ftp):\/\/)|www\.)[-\w.]+(:\d+)?(\/([\w\/_=.%-~]*(\?[^\s\u4e00-\u9fa5]+)?)?)?(#[\d\w_-]+)?/ig, function(a) {
            return'<a target="_blank" href="' + (0 == a.indexOf("http") ? "" : "http://") + b.clearHtmlStr(a) + '">' + a + "</a>"
        })
    };
    b.isUrl = function(a) {
        return/(((http|https|ftp):\/\/)|www\.)[-\w.]+(:\d+)?(\/([\w\/_=.%-~]*(\?[^\s\u4e00-\u9fa5]+)?)?)?(#[\d\w_-]+)?/ig.test(a)
    };
    b.regFilter = function() {
        var a = /([\^\.\[\$\(\)\|\*\+\?\{\\])/ig;
        return function(b) {
            return b.replace(a, "\\$1")
        }
    }();
    b.getAsciiStr = function(a) {
        return(a || "").replace(/\W/g, "")
    };
    b.clearHtmlStr = function(a) {
        return a ? a.replace(/<[^>]*>/g, "") : a
    };
    b.clearLinkTag = function(a) {
        return a ? a.replace(/<a[^>]*>/g, "") : a
    };
    b.formatNum = function(a, b) {
        var c = (isNaN(a) ? 0 : a).toString(), d = b - c.length;
        return 0 < d ? [Array(d + 1).join("0"), c].join("") : c
    };
    b.numToStr = function(a, b) {
        for(var c = "" + a.toFixed(b), d = /(-?\d+)(\d{3})/;d.test(c);) {
            c = c.replace(d, "$1,$2")
        }
        return c
    };
    b.numToTimeStr = function(a, h) {
        return b.tmpl(h, {SS:b.formatNum(parseInt(a) % 60, 2), MM:b.formatNum(parseInt(a / 60) % 60, 2), HH:b.formatNum(parseInt(a / 3600) % 60, 2)})
    };
    b.formatDate = function(a, h) {
        var c = a instanceof Date ? a : new Date(a), d = b.formatNum;
        return h.replace(/YYYY/g, d(c.getFullYear(), 4)).replace(/MM/g, d(c.getMonth() + 1, 2)).replace(/DD/g, d(c.getDate(), 2)).replace(/hh/g, d(c.getHours(), 2)).replace(/mm/g, d(c.getMinutes(), 2)).replace(/ss/g, d(c.getSeconds(), 2))
    };
    b.endsWith = function(a, b) {
        return-1 !== a.indexOf(b, a.length - b.length)
    };
    b.getAsiiStrLen = function(a) {
        return(a || "").replace(/[^\x00-\xFF]/g, "aa").length
    };
    b.stripStr = function(a, b) {
        var c = 0, d, e;
        d = 0;
        for(e = a.length;d < e && c < b;d++) {
            128 > a.charCodeAt(d) ? c++ : c += 2
        }
        return a.substr(0, d)
    };
    b.subAsiiStr = function(a, c, d, e) {
        for(var g = function(a) {
            return a
        }, f = e ? htmlEncode : g, a = (e ? htmlDecode : g)(b.trim((a || "").toString())), d = d || "", e = Math.max(c - d.length, 1), g = a.length, n = 0, m = -1, q, p = 0;p < g;p++) {
            if(q = a.charCodeAt(p), n += 35 == q || 87 == q ? 1.2 : 255 < q ? 1.5 : 1, -1 == m && n > e && (m = p), n > c) {
                return f(a.substr(0, m)) + d
            }
        }
        return f(a)
    };
    b.parseURLParam = function(a) {
        var c = a.indexOf("?"), a = -1 < c ? a.slice(c + 1) : "", d = {};
        a && b(a.split("&")).each(function(a, b) {
            var c = b.split("=");
            2 == c.length && (d[c[0]] = c[1])
        });
        return d
    };
    b.isArr = Array.isArray || function(a) {
        return"[object Array]" == Object.prototype.toString.call(a)
    };
    b.isObj = function(a) {
        return"object" === typeof a
    };
    var g = 0, e = document.title;
    b.flashTitle = function(a) {
        c.qplus && c.qplus.window.flashWindow && qplus.window.flashWindow();
        clearInterval(g);
        document.title = a;
        g = setInterval(function() {
            document.title = document.title == e ? a : e
        }, 1500)
    };
    b.stopFlashTitle = function() {
        clearInterval(g);
        setTimeout(function() {
            document.title = e
        }, 1E3)
    };
    b.form = function(a, c) {
        var d = c || {}, e = b(document.createElement("form"));
        e.attr("method", "post").attr("action", a);
        for(var g in d) {
            e.append('<input type="hidden" name="' + g + '" value="' + d[g] + '">')
        }
        document.body.appendChild(e[0]);
        e.submit()
    };
    b.fn.getFormParam = function() {
        var a = this, b = {};
        a.size() && ["input", "textarea", "select"].forEach(function(c) {
            a.find(c).forEach(function(a) {
                if(a.name && ("radio" != a.type && "checkbox" != a.type || a.checked)) {
                    b[a.name] = (a.value || "").trim()
                }
            })
        });
        return b
    };
    b.extend2 = function() {
        for(var a = {}, c = 0, d = arguments.length;c < d;c++) {
            b.extend(a, arguments[c])
        }
        return a
    };
    b.safe = function(a, b, c) {
        try {
            return a && a.apply(c || this, b || []), 0
        }catch(d) {
            return Log.e("JS Function: $.safe, e.stack: " + d.stack), -1
        }
    };
    b.getCookie = function(a) {
        return RegExp(["(?:; )?", b.regFilter(a), "=([^;]*);?"].join("")).test(document.cookie) && decodeURIComponent(RegExp.$1)
    };
    b.fn.insertTextToInput = function(a) {
        var b = this[0];
        if(document.selection) {
            b.focus(), document.selection.createRange().text = a
        }else {
            if("number" == typeof b.selectionStart) {
                var c = b.selectionStart, d = b.value;
                b.value = d.substr(0, b.selectionStart) + a + d.substr(b.selectionEnd);
                b.selectionStart = b.selectionEnd = c + a.length
            }else {
                b.value += a
            }
        }
        return this
    };
    b.clone = function(a) {
        return b.extend(!0, {}, {v:a}).v
    };
    b.getExt = function(a) {
        return a.substr(a.lastIndexOf(".") + 1).toLowerCase()
    };
    b.getFileName = function(a) {
        a = b.trim(a).split("\\");
        return a[a.length - 1]
    };
    var d = {".bmp":1, ".png":1, ".jpeg":1, ".jpg":1, ".gif":2};
    b.isImg = function(a) {
        return!!f(b.trim(a) || "", d)
    };
    b.isGif = function(a) {
        return 2 == f(b.trim(a) || "", d)
    };
    b.getSizeDesc = function(a) {
        if(b.isNumeric(a)) {
            return 0 < a >> 20 ? "" + Math.round(10 * a / 1048576) / 10 + "MB" : 0 < a >> 9 ? "" + Math.round(10 * a / 1024) / 10 + "KB" : "" + a + "B"
        }
    };
    b.computeVoiceNodeWidth = function(a) {
        return 2E3 > a ? 80 : 1E4 > a ? 80 + 10 * (a - 2E3) / 1E3 : 6E4 > a ? 160 + 10 * (a - 1E4) / 1E4 : 220
    };
    b.fn.isShow = function() {
        return 0 < this.length && "none" != this.css("display")
    };
    b.canPlayH264 = !!document.createElement("video").canPlayType;
    b.fn.insertTextToInput = function(a) {
        var b = this[0];
        if(!b || "TEXTAREA" != b.tagName && "INPUT" != b.tagName) {
            return this
        }
        if(document.selection) {
            b.focus(), document.selection.createRange().text = a
        }else {
            if("number" == typeof b.selectionStart) {
                var c = b.selectionStart, d = b.value;
                b.value = d.substr(0, b.selectionStart) + a + d.substr(b.selectionEnd);
                b.selectionStart = b.selectionEnd = c + a.length
            }else {
                b.value += a
            }
        }
        return this
    };
    b.fn.moveToInputEnd = function() {
        var a = this[0];
        if(!a || "TEXTAREA" != a.tagName && "INPUT" != a.tagName) {
            return this
        }
        a.focus();
        var b = a.value.length;
        document.selection ? (a = a.createTextRange(), a.moveStart("character", b), a.collapse(), a.select()) : "number" == typeof a.selectionStart && (a.selectionStart = a.selectionEnd = b);
        return this
    };
    b.fn.setDblClickNoSel = function() {
        function a() {
            return(_aoDomObj.getAttribute(c) || "").toString().split(",")
        }
        var c = "__MoUSeDoWnnoSEL__";
        _aoDomObj = this[0];
        1 == a().length && (_aoDomObj.setAttribute(c, [0, "up"]), this.bind("mousedown", function(d) {
            var e = b.now(), g = parseInt(a()[0]);
            _aoDomObj.setAttribute(c, [e, "down"]);
            500 > e - g && d.preventDefault()
        }), this.bind("mouseup", function() {
            var b = a()[0];
            _aoDomObj.setAttribute(c, [b, "up"])
        }), this.bind("selectstart", function(b) {
            "up" == a().pop() && b.preventDefault()
        }));
        return this
    };
    b.isiOS = function() {
        var a = navigator.platform;
        return"iPad" === a || "iPhone" === a || "iPod" === a
    };
    b.isChrome = function() {
        var a = navigator.userAgent.toLowerCase(), b = navigator.appVersion.toLowerCase(), c = -1 < a.indexOf("applewebkit"), b = c ? -1 != b.indexOf("qqbrowser") ? 1 : 0 : 0;
        return c && !b && -1 < a.indexOf("chrome") && 0 > a.indexOf("se 2.x metasr 1.0")
    };
    b.evalVal = function(a) {
        var h = "a" + b.now();
        b.globalEval(["(function(){try{window.", h, "=", a, ";}catch(_oError){}})();"].join(""));
        a = c[h];
        c[h] = null;
        return a
    };
    b.genImgCentralStyle = function(a) {
        var c = b(a), d = a.width, a = a.height, e = c.parent().width(), g = c.parent().height();
        debug("width:" + d + ", height:" + a);
        var f = d / a;
        f > e / g ? (a = g, d = f * a, c.css({height:a, width:d, top:0, left:(e - d) / 2, visibility:"inherit"}).show()) : (d = e, a = d / f, c.css({height:a, width:d, top:(g - a) / 2, left:0, visibility:"inherit"}).show())
    };
    b.transform = function(a, b, c) {
        var d = b.position();
        a.animate({left:d.left, top:d.top, width:b.width(), height:b.height()}, c)
    };
    b.selectText = function(a, b, c) {
        b = b || 0;
        c = c || a.value.length;
        if(a.createTextRange) {
            var d = a.value.length, a = a.createTextRange();
            a.moveStart("character", b);
            a.moveEnd("character", c - d);
            a.select()
        }else {
            a.setSelectionRange(b, c), a.focus()
        }
    };
    b.setInputLength = function(a, c) {
        a.off("keydown").on("keydown", function(a) {
            a = a.keyCode;
            if(b.getAsiiStrLen(this.value) >= c && 8 != a && 37 != a && 39 != a) {
                return!1
            }
        });
        return a
    };
    b.getURLFromFile = function(a) {
        var b = a.name || a.fileName || "";
        if(".gif" == b.substr(b.lastIndexOf(".")).toLowerCase()) {
            return null
        }
        b = null;
        void 0 != window.createObjectURL ? b = window.createObjectURL(a) : void 0 != window.URL ? b = window.URL.createObjectURL(a) : void 0 != window.webkitURL && (b = window.webkitURL.createObjectURL(a));
        return b
    };
    b.isLowerBrowser = function() {
        var a = navigator.userAgent;
        _tridentVer = a.match(/Trident\/(.*?);/);
        _IEVer = a.match(/MSIE(.*?);/);
        if(!_tridentVer) {
            return!_IEVer || 1 < _IEVer.length && 8 < parseInt(_IEVer[1]) ? !1 : !0
        }
        _tridentVer = parseInt(_tridentVer[1]);
        return 4 < _tridentVer ? !1 : !0
    }
})(jQuery, this);
(function() {
    Array.prototype.every || (Array.prototype.every = function(b, c) {
        if(void 0 === this || null === this) {
            throw new TypeError;
        }
        var f = Object(this), g = f.length >>> 0;
        if("function" !== typeof b) {
            throw new TypeError;
        }
        for(var e = 0;e < g;e++) {
            if(e in f && !b.call(c, f[e], e, f)) {
                return!1
            }
        }
        return!0
    });
    Array.prototype.filter || (Array.prototype.filter = function(b, c) {
        if(this === void 0 || this === null) {
            throw new TypeError;
        }
        var f = Object(this), g = f.length >>> 0;
        if(typeof b !== "function") {
            throw new TypeError;
        }
        for(var e = [], d = 0;d < g;d++) {
            if(d in f) {
                var a = f[d];
                b.call(c, a, d, f) && e.push(a)
            }
        }
        return e
    });
    Array.prototype.forEach || (Array.prototype.forEach = function(b, c) {
        if(this === void 0 || this === null) {
            throw new TypeError;
        }
        var f = Object(this), g = f.length >>> 0;
        if(typeof b !== "function") {
            throw new TypeError;
        }
        for(var e = 0;e < g;e++) {
            e in f && b.call(c, f[e], e, f)
        }
    });
    Array.prototype.indexOf || (Array.prototype.indexOf = function(b) {
        if(this === void 0 || this === null) {
            throw new TypeError;
        }
        var c = Object(this), f = c.length >>> 0;
        if(f === 0) {
            return-1
        }
        var g = 0;
        if(arguments.length > 0) {
            g = Number(arguments[1]);
            g !== g ? g = 0 : g !== 0 && (g !== Infinity && g !== -Infinity) && (g = (g > 0 || -1) * Math.floor(Math.abs(g)))
        }
        if(g >= f) {
            return-1
        }
        for(g = g >= 0 ? g : Math.max(f - Math.abs(g), 0);g < f;g++) {
            if(g in c && c[g] === b) {
                return g
            }
        }
        return-1
    });
    Array.isArray = Array.isArray || function(b) {
        return Object.prototype.toString.call(b) === "[object Array]"
    };
    Array.prototype.lastIndexOf || (Array.prototype.lastIndexOf = function(b) {
        if(this === void 0 || this === null) {
            throw new TypeError;
        }
        var c = Object(this), f = c.length >>> 0;
        if(f === 0) {
            return-1
        }
        var g = f;
        if(arguments.length > 1) {
            g = Number(arguments[1]);
            g !== g ? g = 0 : g !== 0 && (g !== Infinity && g !== -Infinity) && (g = (g > 0 || -1) * Math.floor(Math.abs(g)))
        }
        for(f = g >= 0 ? Math.min(g, f - 1) : f - Math.abs(g);f >= 0;f--) {
            if(f in c && c[f] === b) {
                return f
            }
        }
        return-1
    });
    Array.prototype.map || (Array.prototype.map = function(b, c) {
        if(this === void 0 || this === null) {
            throw new TypeError;
        }
        var f = Object(this), g = f.length >>> 0;
        if(typeof b !== "function") {
            throw new TypeError;
        }
        for(var e = Array(g), d = 0;d < g;d++) {
            d in f && (e[d] = b.call(c, f[d], d, f))
        }
        return e
    });
    Array.prototype.reduce || (Array.prototype.reduce = function(b) {
        if(this === void 0 || this === null) {
            throw new TypeError;
        }
        var c = Object(this), f = c.length >>> 0;
        if(typeof b !== "function") {
            throw new TypeError;
        }
        if(f == 0 && arguments.length == 1) {
            throw new TypeError;
        }
        var g = 0, e;
        if(arguments.length >= 2) {
            e = arguments[1]
        }else {
            do {
                if(g in c) {
                    e = c[g++];
                    break
                }
                if(++g >= f) {
                    throw new TypeError;
                }
            }while(1)
        }
        for(;g < f;) {
            g in c && (e = b.call(void 0, e, c[g], g, c));
            g++
        }
        return e
    });
    Array.prototype.reduceRight || (Array.prototype.reduceRight = function(b) {
        if(this === void 0 || this === null) {
            throw new TypeError;
        }
        var c = Object(this), f = c.length >>> 0;
        if(typeof b !== "function") {
            throw new TypeError;
        }
        if(f === 0 && arguments.length === 1) {
            throw new TypeError;
        }
        var f = f - 1, g;
        if(arguments.length >= 2) {
            g = arguments[1]
        }else {
            do {
                if(f in this) {
                    g = this[f--];
                    break
                }
                if(--f < 0) {
                    throw new TypeError;
                }
            }while(1)
        }
        for(;f >= 0;) {
            f in c && (g = b.call(void 0, g, c[f], f, c));
            f--
        }
        return g
    });
    Array.prototype.some || (Array.prototype.some = function(b, c) {
        if(this === void 0 || this === null) {
            throw new TypeError;
        }
        var f = Object(this), g = f.length >>> 0;
        if(typeof b !== "function") {
            throw new TypeError;
        }
        for(var e = 0;e < g;e++) {
            if(e in f && b.call(c, f[e], e, f)) {
                return true
            }
        }
        return false
    });
    Date.now || (Date.now = function() {
        return+new Date
    });
    Date.prototype.toJSON || (Date.prototype.toJSON = function() {
        if(typeof this.toISOString !== "function") {
            throw new TypeError;
        }
        return this.toISOString()
    });
    Date.prototype.toUTCString || (Date.prototype.toUTCString = function() {
        var b = function(b) {
            return(b = b + "", b.length == 2) ? b : "0" + b
        };
        return function() {
            var c = [this.getUTCFullYear(), b(this.getUTCMonth() + 1), b(this.getUTCDate())].join("-"), f = [b(this.getUTCHours()), b(this.getUTCMinutes()), b(this.getUTCSeconds())].join(":") + "." + this.getMilliseconds();
            return[c, f].join("T") + "Z"
        }
    }());
    Function.prototype.bind || (Function.prototype.bind = function(b) {
        var c = [].slice, f = c.call(arguments, 1), g = this, e = function() {
        }, d = function() {
            return g.apply(this instanceof e ? this : b || {}, f.concat(c.call(arguments)))
        };
        e.prototype = g.prototype;
        d.prototype = new e;
        return d
    });
    Object.keys || (Object.keys = function(b) {
        if(b !== Object(b)) {
            throw new TypeError("Object.keys called on non-object");
        }
        var c = [], f;
        for(f in b) {
            Object.prototype.hasOwnProperty.call(b, f) && c.push(f)
        }
        return c
    });
    String.prototype.trim || (String.prototype.trim = function() {
        for(var b = this.replace(/^\s\s*/, ""), c = /\s/, f = b.length;c.test(b.charAt(--f));) {
        }
        return b.slice(0, f + 1)
    });
    String.prototype.endsWith || (String.prototype.endsWith = function(b) {
        return this.indexOf(b, this.length - b.length) !== -1
    });
    String.prototype.format || (String.prototype.format = String.prototype.f = function() {
        for(var b = this, c = arguments.length;c--;) {
            b = b.replace(RegExp("\\{" + c + "\\}", "gm"), arguments[c])
        }
        return b
    })
})();
(function(b, c, f) {
    var g = {};
    b.getTmplStr = function(b) {
        return document.getElementById(b).innerHTML
    };
    b.tmpl = function d(a, c) {
        var i = !/\W/.test(a) ? g[a] = g[a] || d(b.getTmplStr(a)) : new Function("obj", "var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('" + a.replace(/[\r\t\n]/g, " ").split("<#").join("\t").replace(/((^|#>)[^\t]*)'/g, "$1\r").replace(/\t=(.*?)#>/g, "',$1,'").split("\t").join("');").split("#>").join("p.push('").split("\r").join("\\'") + "');}return p.join('');");
        return c != f ? i.call(c, c) : i
    }
})(jQuery, this);
(function(b, c, f) {
    function g(b, a, c) {
        var i, b = b.prototype != f ? b.prototype : b;
        a.exec ? i = function(b) {
            return a.exec(b)
        } : a.call && (i = function(b) {
            return a.call(this, b)
        });
        if(i) {
            var g = [], l;
            for(l in b) {
                i(l) && g.push(e(b, l, c))
            }
            return g
        }
        return e(b, a, c)
    }
    function e(b, a, c) {
        var i = b[a];
        !i && (i = function() {
        });
        return b[a] = c(i, a)
    }
    b.extend(b.aop = {}, {before:function(b, a, c) {
        return g(b, a, function(a) {
            return function() {
                return a.apply(this, c.apply(this, arguments) || arguments)
            }
        })
    }, after:function(b, a, c) {
        return g(b, a, function(a) {
            return function() {
                return c.apply(this, a.apply(this, arguments) || arguments)
            }
        })
    }, around:function(b, a, c) {
        return g(b, a, function(a, b) {
            return function() {
                return c.call(this, arguments, a, b)
            }
        })
    }, exception:function(b, a, c) {
        return g(b, a, function(a) {
            return function() {
                try {
                    return a.apply(this, arguments)
                }catch(b) {
                    c.apply(this, [b])
                }
            }
        })
    }})
})(jQuery, this);
JSON = {};
(function() {
    function b(a) {
        return 10 > a ? "0" + a : a
    }
    function c(a) {
        e.lastIndex = 0;
        return e.test(a) ? '"' + a.replace(e, function(a) {
            var b = h[a];
            return"string" === typeof b ? b : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }) + '"' : '"' + a + '"'
    }
    function f(b, h) {
        var e, g, m, q, p = d, r, o = h[b];
        o && ("object" === typeof o && "function" === typeof o.toJSON) && (o = o.toJSON(b));
        "function" === typeof i && (o = i.call(h, b, o));
        switch(typeof o) {
            case "string":
                return c(o);
            case "number":
                return isFinite(o) ? "" + o : "null";
            case "boolean":
                ;
            case "null":
                return"" + o;
            case "object":
                if(!o) {
                    return"null"
                }
                d += a;
                r = [];
                if("[object Array]" === Object.prototype.toString.apply(o)) {
                    q = o.length;
                    for(e = 0;e < q;e += 1) {
                        r[e] = f(e, o) || "null"
                    }
                    m = 0 === r.length ? "[]" : d ? "[\n" + d + r.join(",\n" + d) + "\n" + p + "]" : "[" + r.join(",") + "]";
                    d = p;
                    return m
                }
                if(i && "object" === typeof i) {
                    q = i.length;
                    for(e = 0;e < q;e += 1) {
                        "string" === typeof i[e] && (g = i[e], (m = f(g, o)) && r.push(c(g) + (d ? ": " : ":") + m))
                    }
                }else {
                    for(g in o) {
                        Object.prototype.hasOwnProperty.call(o, g) && (m = f(g, o)) && r.push(c(g) + (d ? ": " : ":") + m)
                    }
                }
                m = 0 === r.length ? "{}" : d ? "{\n" + d + r.join(",\n" + d) + "\n" + p + "}" : "{" + r.join(",") + "}";
                d = p;
                return m
        }
    }
    "function" !== typeof Date.prototype.toJSON && (Date.prototype.toJSON = function() {
        return isFinite(this.valueOf()) ? this.getUTCFullYear() + "-" + b(this.getUTCMonth() + 1) + "-" + b(this.getUTCDate()) + "T" + b(this.getUTCHours()) + ":" + b(this.getUTCMinutes()) + ":" + b(this.getUTCSeconds()) + "Z" : null
    }, String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function() {
        return this.valueOf()
    });
    var g = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, e = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, d, a, h = {"\u0008":"\\b", "\t":"\\t", "\n":"\n", "\u000c":"\\f", "\r":"\r", '"':'\\"', "\\":"\\\\"}, i;
    "function" !== typeof JSON.stringify && (JSON.stringify = function(b, c, h) {
        var e;
        a = d = "";
        if(typeof h === "number") {
            for(e = 0;e < h;e = e + 1) {
                a = a + " "
            }
        }else {
            typeof h === "string" && (a = h)
        }
        if((i = c) && typeof c !== "function" && (typeof c !== "object" || typeof c.length !== "number")) {
            throw Error("JSON.stringify");
        }
        return f("", {"":b})
    });
    "function" !== typeof JSON.parse && (JSON.parse = function(a, b) {
        function c(a, h) {
            var d, i, e = a[h];
            if(e && typeof e === "object") {
                for(d in e) {
                    if(Object.prototype.hasOwnProperty.call(e, d)) {
                        i = c(e, d);
                        i !== void 0 ? e[d] = i : delete e[d]
                    }
                }
            }
            return b.call(a, h, e)
        }
        var h, a = "" + a;
        g.lastIndex = 0;
        g.test(a) && (a = a.replace(g, function(a) {
            return"\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
        }));
        if(/^[\],:{}\s]*$/.test(a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
            h = eval("(" + a + ")");
            return typeof b === "function" ? c({"":h}, "") : h
        }
        throw new SyntaxError("JSON.parse");
    })
})();
(function(b, c) {
    function f() {
        return this.__instance__ || (this.__instance__ = new this)
    }
    function g(b) {
        return Class.call(this, b)
    }
    c.Class = function(c) {
        var d = "function" == typeof this ? this : function() {
        }, a = function() {
            function a(c, d) {
                c.Super && a(c.Super, d);
                c.init && c.init.apply(d, b)
            }
            var b = arguments;
            this.Root = d.__base__;
            this.Super = d.prototype;
            a(this, this)
        };
        a.prototype = b.extend2({}, d.prototype || {}, c);
        a.__base__ = d.__base__ || a.prototype;
        a.GetStaticInstance = f;
        a.Inherit = g;
        return a
    }
})(jQuery, this);
(function(b) {
    var c = {}, f = {}, g = function(d, a, h, i) {
        var e = 3E4;
        developMode && (e = 6E4);
        b.ajax(b.extend({url:(0 < d.indexOf("?") ? d + "&" : d + "?") + "r=" + b.now(), data:JSON.stringify(a), type:"post", contentType:"application/json; charset=utf-8", dataType:"json", timeout:e, beforeSend:function() {
            return h.onbefore && h.onbefore()
        }, success:function(a) {
            if(!a || "0" == a.retcode || a.BaseResponse && 0 === a.BaseResponse.Ret) {
                h.onsuccess && h.onsuccess(a)
            }else {
                var b = a && a.BaseResponse || {}, a = b.Ret || b.retcode || a && a.retcode || -1;
                (!c.globalExceptionHandler || !c.globalExceptionHandler(a)) && h.onerror && h.onerror(a, b.ErrMsg)
            }
        }, error:function(a, b) {
            h.onerror && h.onerror(b, a.status)
        }, complete:function() {
            h.oncomplete && h.oncomplete()
        }}, i))
    }, e = Class({_mbSending:!1, _moQueue:[], init:function(b, a) {
        this.queueId = b;
        this.options = a
    }, send:function(d, a, h) {
        c && c.wait && returun;
        var i = this, h = h || {};
        !i.queueId || i.options && i.options.noDelay ? g(d, a, h, i.options) : (b.aop.before(h, "oncomplete", function() {
            i._mbSending = !1;
            i._fSend(i._moQueue.shift())
        }), i._moQueue.push({url:d, data:a, callback:h}), 10 < i._moQueue.length && (i._mbSending = !1), i._mbSending || i._fSend(i._moQueue.shift()))
    }, clear:function() {
        this._moQueue = []
    }, _fSend:function(b) {
        b && g(b.url, b.data, b.callback, this.options)
    }});
    b.netQueue = function(b, a) {
        return f[b] || (f[b || "__not_defined__"] = new e(b, a || {}))
    };
    b.netQueueSetting = function(d) {
        b.extend(c, d)
    }
})(jQuery, this);
(function(b, c) {
    function f(a) {
        var a = a.dataTransfer.types, c = !1;
        if(null === a) {
            return!0
        }
        b.each(a, function(a, b) {
            "Files" == b && (c = !0)
        });
        return c
    }
    function g(a) {
        var b = "--" + d + "\r\n", b = b + ("Content-Disposition: form-data; name='upload'; filename='" + a + "'\r\n") + "Content-Type: application/octet-stream\r\n\r\n" + (bin + "\r\n");
        return b += "--" + d + "--"
    }
    function e(a, c, d, i, e) {
        var g = h ? h() : new XMLHttpRequest;
        g.open("POST", a, !0);
        g.onabort = g.onerror = function() {
            c.onerror && c.onerror(g.responseText, g.status, d, e)
        };
        g.onload = function() {
            var a = JSON.parse(g.responseText);
            "0" == a.BaseResponse.Ret ? c.onsuccess && c.onsuccess(d, i, b.extend(a, {LocalId:e}), g.status) : c.onerror && c.onerror(g.responseText, g.status, d, e)
        };
        g.onloadend = function() {
            c.oncomplete && c.oncomplete(e)
        };
        if(g.upload || g) {
            (g.upload || g).onprogress = function(a) {
                c.onprogress && c.onprogress(e, (a.loaded || a.position) / (a.total || a.totalSize))
            }
        }
        return g
    }
    var d = "xxxxxxxxx", a = {ondocover:function() {
    }, ondocleave:function() {
    }, ontargetover:function() {
    }, ontargetdrop:function() {
    }, ontargetleave:function() {
    }}, h = null, i = function() {
    };
    _fDragFileUpload = function(h, l, j, n) {
        i = function(a) {
            var h = e(l(), n, a.toUserName, a.name, a.localId);
            if(c.FormData) {
                var i = new FormData;
                i.append("uploadmediarequest", JSON.stringify({BaseRequest:j(), ClientMediaId:"" + b.now(), TotalLen:a.size, StartPos:0, DataLen:a.size, MediaType:4}));
                i.append("filename", a);
                h.send(i)
            }else {
                if(c.FileReader) {
                    var f = new FileReader;
                    this.loadEnd = function() {
                        var b = f.result;
                        null != h.sendAsBinary ? (h.setRequestHeader("content-type", "multipart/form-data; boundary=" + d), h.sendAsBinary(g(a.name, b))) : (h.setRequestHeader("BASE64", 1), h.setRequestHeader("UP-FILENAME", a.name), h.setRequestHeader("UP-SIZE", a.size), h.setRequestHeader("UP-TYPE", a.type), h.send(b))
                    };
                    this.loadError = function(a) {
                        switch(a.target.error.code) {
                            case a.target.error.NOT_FOUND_ERR:
                                document.getElementById(status).innerHTML = "File not found!";
                                break;
                            case a.target.error.NOT_READABLE_ERR:
                                document.getElementById(status).innerHTML = "File not readable!";
                                break;
                            case a.target.error.ABORT_ERR:
                                break;
                            default:
                                document.getElementById(status).innerHTML = "Read error."
                        }
                    };
                    this.loadProgress = function(a) {
                        a.lengthComputable && (a = Math.round(100 * a.loaded / a.total), document.getElementById(status).innerHTML = "Loaded : " + a + "%")
                    };
                    f.addEventListener ? (f.addEventListener("loadend", this.loadEnd, !1), null != status && (f.addEventListener("error", this.loadError, !1), f.addEventListener("progress", this.loadProgress, !1))) : (f.onloadend = this.loadEnd, null != status && (f.onerror = this.loadError, f.onprogress = this.loadProgress));
                    i = null;
                    a.webkitSlice ? i = a.webkitSlice(0, 1025) : a.mozSlice && (i = a.mozSlice(0, 1025));
                    i ? f.readAsBinaryString(i) : f.readAsBinaryString(a)
                }else {
                    h = new XMLHttpRequest, h.open("POST", targetPHP + "?up=true", !0), h.setRequestHeader("UP-FILENAME", a.name), h.setRequestHeader("UP-SIZE", a.size), h.setRequestHeader("UP-TYPE", a.type), h.send(a), status && (document.getElementById(status).innerHTML = "Loaded : 100%")
                }
            }
        };
        h = document.getElementById(h);
        "draggable" in h && (h.addEventListener("dragover", function(b) {
            b.preventDefault();
            a.ontargetover()
        }, !0), h.addEventListener("drop", function(c) {
            c.preventDefault();
            for(var c = c.dataTransfer.files, h = 0, d = c.length;h < d;h++) {
                var e = c[h], g = a.ontargetdrop(e.name || e.fileName, e.size || e.fileSize, 3145728 < e.size ? "" : b.getURLFromFile(e));
                g && g.localId && (e.localId = g.localId, e.toUserName = g.toUserName, i(e))
            }
            if(!c.length) {
                a.ontargetdrop()
            }
        }, !1), h.addEventListener("dragleave", function() {
            a.ontargetleave()
        }, !1), c.addEventListener("dragover", function(b) {
            b.stopPropagation();
            b.preventDefault();
            if(f(b)) {
                a.ondocover()
            }
        }, !1), c.addEventListener("dragleave", function(b) {
            b.stopPropagation();
            b.preventDefault();
            a.ondocleave()
        }, !1), c.addEventListener("drop", function(b) {
            b.stopPropagation();
            b.preventDefault();
            a.ondocleave()
        }, !1))
    };
    b.setDragFileUploadOption = function(c, d) {
        h = c;
        b.extend(a, d)
    };
    b.dragFileUpload = _fDragFileUpload;
    b.uploadFileByForm = function(c) {
        for(var c = c.target.files, h = 0, d = c.length;h < d;h++) {
            var e = c[h], g = a.ontargetdrop(e.name || e.fileName, e.size || e.fileSize, 3145728 < e.size ? "" : b.getURLFromFile(e));
            e.localId = g.localId;
            e.toUserName = g.toUserName;
            i(e)
        }
    }
})(jQuery, this);
(function(b) {
    b.setCookie = function(c, f, g, e, d, a) {
        c && (document.cookie = b.tmpl(["<#=name#>=<#=value#>; ", !g ? "" : "expires=<#=expires#>; ", "path=<#=path#>; domain=<#=domain#>; ", !a ? "" : "<#=secure#>"].join(""), {name:c, value:(f || "").replace(/%/ig, "%25").replace(/=/ig, "%3D").replace(/;/ig, "%3B"), expires:g && g.toGMTString(), path:e || "/", domain:d || document.domain, secure:a ? "secure" : ""}));
        return this
    };
    b.getCookie = function(c) {
        return RegExp(["(\\b|\\s|^|;)", b.regFilter(c), "=([^;]*);?"].join("")).test(document.cookie) && decodeURIComponent(RegExp.$2) || ""
    };
    b.delCookie = function(b, f, g) {
        return this.setCookie(b, "", new Date(0), f, g)
    }
})(jQuery, this);
(function(b, c, f) {
    var g = "", e = [], d = [];
    b.hashChange = function(a) {
        if(b.isFunction(a)) {
            e.push(a)
        }else {
            for(var a = 0, c = e.length;a < c;a++) {
                e[a](g)
            }
        }
    };
    b.hash = function(a) {
        if(a != f) {
            if((a = a.replace(/^#/, "")) && a != g) {
                d.unshift(g = a), 10 < d.length && d.pop(), b.hashChange()
            }
            return this
        }
        return g
    };
    b.history = b.extend(d, {pushState:function() {
    }, back:function() {
        var a = this.shift();
        g = this[0] || "";
        a != g && b.hashChange()
    }})
})(jQuery, this);
(function(b, c) {
    "function" === typeof define && define.amd ? define(["jquery"], c) : b.jQuery ? c(b.jQuery) : c(b.Zepto)
})(this, function(b, c) {
    b.fn.jPlayer = function(a) {
        var h = "string" === typeof a, d = Array.prototype.slice.call(arguments, 1), e = this, a = !h && d.length ? b.extend.apply(null, [!0, a].concat(d)) : a;
        if(h && "_" === a.charAt(0)) {
            return e
        }
        h ? this.each(function() {
            var h = b(this).data("jPlayer"), g = h && b.isFunction(h[a]) ? h[a].apply(h, d) : h;
            if(g !== h && g !== c) {
                return e = g, !1
            }
        }) : this.each(function() {
            var c = b(this).data("jPlayer");
            c ? c.option(a || {}) : b(this).data("jPlayer", new b.jPlayer(a, this))
        });
        return e
    };
    b.jPlayer = function(a, c) {
        if(arguments.length) {
            this.element = b(c);
            this.options = b.extend(!0, {}, this.options, a);
            var d = this;
            this.element.bind("remove.jPlayer", function() {
                d.destroy()
            });
            this._init()
        }
    };
    "function" !== typeof b.fn.stop && (b.fn.stop = function() {
    });
    b.jPlayer.emulateMethods = "load play pause";
    b.jPlayer.emulateStatus = "src readyState networkState currentTime duration paused ended playbackRate";
    b.jPlayer.emulateOptions = "muted volume";
    b.jPlayer.reservedEvent = "ready flashreset resize repeat error warning";
    b.jPlayer.event = {};
    b.each("ready flashreset resize repeat click error warning loadstart progress suspend abort emptied stalled play pause loadedmetadata loadeddata waiting playing canplay canplaythrough seeking seeked timeupdate ended ratechange durationchange volumechange".split(" "), function() {
        b.jPlayer.event[this] = "jPlayer_" + this
    });
    b.jPlayer.htmlEvent = "loadstart abort emptied stalled loadedmetadata loadeddata canplay canplaythrough ratechange".split(" ");
    b.jPlayer.pause = function() {
        b.each(b.jPlayer.prototype.instances, function(a, b) {
            b.data("jPlayer").status.srcSet && b.jPlayer("pause")
        })
    };
    b.jPlayer.timeFormat = {showHour:!1, showMin:!0, showSec:!0, padHour:!1, padMin:!0, padSec:!0, sepHour:":", sepMin:":", sepSec:""};
    var f = function() {
        this.init()
    };
    f.prototype = {init:function() {
        this.options = {timeFormat:b.jPlayer.timeFormat}
    }, time:function(a) {
        var b = new Date(1E3 * (a && "number" === typeof a ? a : 0)), c = b.getUTCHours(), a = this.options.timeFormat.showHour ? b.getUTCMinutes() : b.getUTCMinutes() + 60 * c, b = this.options.timeFormat.showMin ? b.getUTCSeconds() : b.getUTCSeconds() + 60 * a, c = this.options.timeFormat.padHour && 10 > c ? "0" + c : c, a = this.options.timeFormat.padMin && 10 > a ? "0" + a : a, b = this.options.timeFormat.padSec && 10 > b ? "0" + b : b, c = "" + (this.options.timeFormat.showHour ? c + this.options.timeFormat.sepHour :
            ""), c = c + (this.options.timeFormat.showMin ? a + this.options.timeFormat.sepMin : "");
        return c + (this.options.timeFormat.showSec ? b + this.options.timeFormat.sepSec : "")
    }};
    var g = new f;
    b.jPlayer.convertTime = function(a) {
        return g.time(a)
    };
    b.jPlayer.uaBrowser = function(a) {
        var a = a.toLowerCase(), b = /(opera)(?:.*version)?[ \/]([\w.]+)/, c = /(msie) ([\w.]+)/, d = /(mozilla)(?:.*? rv:([\w.]+))?/, a = /(webkit)[ \/]([\w.]+)/.exec(a) || b.exec(a) || c.exec(a) || 0 > a.indexOf("compatible") && d.exec(a) || [];
        return{browser:a[1] || "", version:a[2] || "0"}
    };
    b.jPlayer.uaPlatform = function(a) {
        var b = a.toLowerCase(), c = /(android)/, d = /(mobile)/, a = /(ipad|iphone|ipod|android|blackberry|playbook|windows ce|webos)/.exec(b) || [], b = /(ipad|playbook)/.exec(b) || !d.exec(b) && c.exec(b) || [];
        a[1] && (a[1] = a[1].replace(/\s/g, "_"));
        return{platform:a[1] || "", tablet:b[1] || ""}
    };
    b.jPlayer.browser = {};
    b.jPlayer.platform = {};
    var e = b.jPlayer.uaBrowser(navigator.userAgent);
    e.browser && (b.jPlayer.browser[e.browser] = !0, b.jPlayer.browser.version = e.version);
    e = b.jPlayer.uaPlatform(navigator.userAgent);
    e.platform && (b.jPlayer.platform[e.platform] = !0, b.jPlayer.platform.mobile = !e.tablet, b.jPlayer.platform.tablet = !!e.tablet);
    b.jPlayer.getDocMode = function() {
        var a;
        b.jPlayer.browser.msie && (document.documentMode ? a = document.documentMode : (a = 5, document.compatMode && "CSS1Compat" === document.compatMode && (a = 7)));
        return a
    };
    b.jPlayer.browser.documentMode = b.jPlayer.getDocMode();
    b.jPlayer.nativeFeatures = {init:function() {
        var a = document, b = a.createElement("video"), c = {w3c:"fullscreenEnabled fullscreenElement requestFullscreen exitFullscreen fullscreenchange fullscreenerror".split(" "), moz:"mozFullScreenEnabled mozFullScreenElement mozRequestFullScreen mozCancelFullScreen mozfullscreenchange mozfullscreenerror".split(" "), webkit:["", "webkitCurrentFullScreenElement", "webkitRequestFullScreen", "webkitCancelFullScreen", "webkitfullscreenchange"], webkitVideo:["webkitSupportsFullscreen", "webkitDisplayingFullscreen",
            "webkitEnterFullscreen", "webkitExitFullscreen", ""]}, d = ["w3c", "moz", "webkit", "webkitVideo"], e, g;
        this.fullscreen = b = {support:{w3c:!!a[c.w3c[0]], moz:!!a[c.moz[0]], webkit:"function" === typeof a[c.webkit[3]], webkitVideo:"function" === typeof b[c.webkitVideo[2]]}, used:{}};
        e = 0;
        for(g = d.length;e < g;e++) {
            var f = d[e];
            if(b.support[f]) {
                b.spec = f;
                b.used[f] = !0;
                break
            }
        }
        if(b.spec) {
            var m = c[b.spec];
            b.api = {fullscreenEnabled:!0, fullscreenElement:function(b) {
                b = b ? b : a;
                return b[m[1]]
            }, requestFullscreen:function(a) {
                return a[m[2]]()
            }, exitFullscreen:function(b) {
                b = b ? b : a;
                return b[m[3]]()
            }};
            b.event = {fullscreenchange:m[4], fullscreenerror:m[5]}
        }else {
            b.api = {fullscreenEnabled:!1, fullscreenElement:function() {
                return null
            }, requestFullscreen:function() {
            }, exitFullscreen:function() {
            }}, b.event = {}
        }
    }};
    b.jPlayer.nativeFeatures.init();
    b.jPlayer.focus = null;
    b.jPlayer.keyIgnoreElementNames = "INPUT TEXTAREA";
    var d = function(a) {
        var c = b.jPlayer.focus, d;
        c && (b.each(b.jPlayer.keyIgnoreElementNames.split(/\s+/g), function(b, c) {
            if(a.target.nodeName.toUpperCase() === c.toUpperCase()) {
                return d = !0, !1
            }
        }), d || b.each(c.options.keyBindings, function(d, e) {
            if(e && a.which === e.key && b.isFunction(e.fn)) {
                return a.preventDefault(), e.fn(c), !1
            }
        }))
    };
    b.jPlayer.keys = function(a) {
        b(document.documentElement).unbind("keydown.jPlayer");
        a && b(document.documentElement).bind("keydown.jPlayer", d)
    };
    b.jPlayer.keys(!0);
    b.jPlayer.prototype = {count:0, version:{script:"2.4.0", needFlash:"2.4.0", flash:"unknown"}, options:{swfPath:"js", solution:"html, flash", supplied:"mp3", preload:"metadata", volume:0.8, muted:!1, wmode:"opaque", backgroundColor:"#000000", cssSelectorAncestor:"#jp_container_1", cssSelector:{videoPlay:".jp-video-play", play:".jp-play", pause:".jp-pause", stop:".jp-stop", seekBar:".jp-seek-bar", playBar:".jp-play-bar", mute:".jp-mute", unmute:".jp-unmute", volumeBar:".jp-volume-bar", volumeBarValue:".jp-volume-bar-value",
        volumeMax:".jp-volume-max", currentTime:".jp-current-time", duration:".jp-duration", fullScreen:".jp-full-screen", restoreScreen:".jp-restore-screen", repeat:".jp-repeat", repeatOff:".jp-repeat-off", gui:".jp-gui", noSolution:".jp-no-solution"}, smoothPlayBar:!1, fullScreen:!1, fullWindow:!1, autohide:{restored:!1, full:!0, fadeIn:200, fadeOut:600, hold:1E3}, loop:!1, repeat:function(a) {
        a.jPlayer.options.loop ? b(this).unbind(".jPlayerRepeat").bind(b.jPlayer.event.ended + ".jPlayer.jPlayerRepeat", function() {
            b(this).jPlayer("play")
        }) : b(this).unbind(".jPlayerRepeat")
    }, nativeVideoControls:{}, noFullWindow:{msie:/msie [0-6]\./, ipad:/ipad.*?os [0-4]\./, iphone:/iphone/, ipod:/ipod/, android_pad:/android [0-3]\.(?!.*?mobile)/, android_phone:/android.*?mobile/, blackberry:/blackberry/, windows_ce:/windows ce/, iemobile:/iemobile/, webos:/webos/}, noVolume:{ipad:/ipad/, iphone:/iphone/, ipod:/ipod/, android_pad:/android(?!.*?mobile)/, android_phone:/android.*?mobile/, blackberry:/blackberry/, windows_ce:/windows ce/, iemobile:/iemobile/, webos:/webos/, playbook:/playbook/},
        timeFormat:{}, keyEnabled:!1, audioFullScreen:!1, keyBindings:{play:{key:32, fn:function(a) {
            a.status.paused ? a.play() : a.pause()
        }}, fullScreen:{key:13, fn:function(a) {
            (a.status.video || a.options.audioFullScreen) && a._setOption("fullScreen", !a.options.fullScreen)
        }}, muted:{key:8, fn:function(a) {
            a._muted(!a.options.muted)
        }}, volumeUp:{key:38, fn:function(a) {
            a.volume(a.options.volume + 0.1)
        }}, volumeDown:{key:40, fn:function(a) {
            a.volume(a.options.volume - 0.1)
        }}}, verticalVolume:!1, idPrefix:"jp", noConflict:"jQuery", emulateHtml:!1, errorAlerts:!1, warningAlerts:!1}, optionsAudio:{size:{width:"0px", height:"0px", cssClass:""}, sizeFull:{width:"0px", height:"0px", cssClass:""}}, optionsVideo:{size:{width:"480px", height:"270px", cssClass:"jp-video-270p"}, sizeFull:{width:"100%", height:"100%", cssClass:"jp-video-full"}}, instances:{}, status:{src:"", media:{}, paused:!0, format:{}, formatType:"", waitForPlay:!0, waitForLoad:!0, srcSet:!1, video:!1,
        seekPercent:0, currentPercentRelative:0, currentPercentAbsolute:0, currentTime:0, duration:0, videoWidth:0, videoHeight:0, readyState:0, networkState:0, playbackRate:1, ended:0}, internal:{ready:!1}, solution:{html:!0, flash:!0}, format:{mp3:{codec:'audio/mpeg; codecs="mp3"', flashCanPlay:!0, media:"audio"}, m4a:{codec:'audio/mp4; codecs="mp4a.40.2"', flashCanPlay:!0, media:"audio"}, oga:{codec:'audio/ogg; codecs="vorbis"', flashCanPlay:!1, media:"audio"}, wav:{codec:'audio/wav; codecs="1"', flashCanPlay:!1,
        media:"audio"}, webma:{codec:'audio/webm; codecs="vorbis"', flashCanPlay:!1, media:"audio"}, fla:{codec:"audio/x-flv", flashCanPlay:!0, media:"audio"}, rtmpa:{codec:'audio/rtmp; codecs="rtmp"', flashCanPlay:!0, media:"audio"}, m4v:{codec:'video/mp4; codecs="avc1.42E01E, mp4a.40.2"', flashCanPlay:!0, media:"video"}, ogv:{codec:'video/ogg; codecs="theora, vorbis"', flashCanPlay:!1, media:"video"}, webmv:{codec:'video/webm; codecs="vorbis, vp8"', flashCanPlay:!1, media:"video"}, flv:{codec:"video/x-flv",
        flashCanPlay:!0, media:"video"}, rtmpv:{codec:'video/rtmp; codecs="rtmp"', flashCanPlay:!0, media:"video"}}, _init:function() {
        var a = this;
        this.element.empty();
        this.status = b.extend({}, this.status);
        this.internal = b.extend({}, this.internal);
        this.options.timeFormat = b.extend({}, b.jPlayer.timeFormat, this.options.timeFormat);
        this.internal.cmdsIgnored = b.jPlayer.platform.ipad || b.jPlayer.platform.iphone || b.jPlayer.platform.ipod;
        this.internal.domNode = this.element.get(0);
        this.options.keyEnabled && !b.jPlayer.focus && (b.jPlayer.focus = this);
        this.formats = [];
        this.solutions = [];
        this.require = {};
        this.htmlElement = {};
        this.html = {};
        this.html.audio = {};
        this.html.video = {};
        this.flash = {};
        this.css = {};
        this.css.cs = {};
        this.css.jq = {};
        this.ancestorJq = [];
        this.options.volume = this._limitValue(this.options.volume, 0, 1);
        b.each(this.options.supplied.toLowerCase().split(","), function(c, h) {
            var d = h.replace(/^\s+|\s+$/g, "");
            if(a.format[d]) {
                var e = !1;
                b.each(a.formats, function(a, b) {
                    if(d === b) {
                        return e = !0, !1
                    }
                });
                e || a.formats.push(d)
            }
        });
        b.each(this.options.solution.toLowerCase().split(","), function(c, h) {
            var d = h.replace(/^\s+|\s+$/g, "");
            if(a.solution[d]) {
                var e = !1;
                b.each(a.solutions, function(a, b) {
                    if(d === b) {
                        return e = !0, !1
                    }
                });
                e || a.solutions.push(d)
            }
        });
        this.internal.instance = "jp_" + this.count;
        this.instances[this.internal.instance] = this.element;
        this.element.attr("id") || this.element.attr("id", this.options.idPrefix + "_jplayer_" + this.count);
        this.internal.self = b.extend({}, {id:this.element.attr("id"), jq:this.element});
        this.internal.audio = b.extend({}, {id:this.options.idPrefix + "_audio_" + this.count, jq:c});
        this.internal.video = b.extend({}, {id:this.options.idPrefix + "_video_" + this.count, jq:c});
        this.internal.flash = b.extend({}, {id:this.options.idPrefix + "_flash_" + this.count, jq:c, swf:this.options.swfPath + (".swf" !== this.options.swfPath.toLowerCase().slice(-4) ? (this.options.swfPath && "/" !== this.options.swfPath.slice(-1) ? "/" : "") + "Jplayer.swf" : "")});
        this.internal.poster = b.extend({}, {id:this.options.idPrefix + "_poster_" + this.count, jq:c});
        b.each(b.jPlayer.event, function(b, h) {
            a.options[b] !== c && (a.element.bind(h + ".jPlayer", a.options[b]), a.options[b] = c)
        });
        this.require.audio = !1;
        this.require.video = !1;
        b.each(this.formats, function(b, c) {
            a.require[a.format[c].media] = !0
        });
        this.options = this.require.video ? b.extend(!0, {}, this.optionsVideo, this.options) : b.extend(!0, {}, this.optionsAudio, this.options);
        this._setSize();
        this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
        this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow);
        this.status.noVolume = this._uaBlocklist(this.options.noVolume);
        b.jPlayer.nativeFeatures.fullscreen.api.fullscreenEnabled && this._fullscreenAddEventListeners();
        this._restrictNativeVideoControls();
        this.htmlElement.poster = document.createElement("img");
        this.htmlElement.poster.id = this.internal.poster.id;
        this.htmlElement.poster.onload = function() {
            (!a.status.video || a.status.waitForPlay) && a.internal.poster.jq.show()
        };
        this.element.append(this.htmlElement.poster);
        this.internal.poster.jq = b("#" + this.internal.poster.id);
        this.internal.poster.jq.css({width:this.status.width, height:this.status.height});
        this.internal.poster.jq.hide();
        this.internal.poster.jq.bind("click.jPlayer", function() {
            a._trigger(b.jPlayer.event.click)
        });
        this.html.audio.available = !1;
        this.require.audio && (this.htmlElement.audio = document.createElement("audio"), this.htmlElement.audio.id = this.internal.audio.id, this.html.audio.available = !!this.htmlElement.audio.canPlayType && this._testCanPlayType(this.htmlElement.audio));
        this.html.video.available = !1;
        this.require.video && (this.htmlElement.video = document.createElement("video"), this.htmlElement.video.id = this.internal.video.id, this.html.video.available = !!this.htmlElement.video.canPlayType && this._testCanPlayType(this.htmlElement.video));
        this.flash.available = this._checkForFlash(10.1);
        this.html.canPlay = {};
        this.flash.canPlay = {};
        b.each(this.formats, function(b, c) {
            a.html.canPlay[c] = a.html[a.format[c].media].available && "" !== a.htmlElement[a.format[c].media].canPlayType(a.format[c].codec);
            a.flash.canPlay[c] = a.format[c].flashCanPlay && a.flash.available
        });
        this.html.desired = !1;
        this.flash.desired = !1;
        b.each(this.solutions, function(c, h) {
            if(0 === c) {
                a[h].desired = !0
            }else {
                var d = !1, e = !1;
                b.each(a.formats, function(b, c) {
                    a[a.solutions[0]].canPlay[c] && ("video" === a.format[c].media ? e = !0 : d = !0)
                });
                a[h].desired = a.require.audio && !d || a.require.video && !e
            }
        });
        this.html.support = {};
        this.flash.support = {};
        b.each(this.formats, function(b, c) {
            a.html.support[c] = a.html.canPlay[c] && a.html.desired;
            a.flash.support[c] = a.flash.canPlay[c] && a.flash.desired
        });
        this.html.used = !1;
        this.flash.used = !1;
        b.each(this.solutions, function(c, h) {
            b.each(a.formats, function(b, c) {
                if(a[h].support[c]) {
                    return a[h].used = !0, !1
                }
            })
        });
        this._resetActive();
        this._resetGate();
        this._cssSelectorAncestor(this.options.cssSelectorAncestor);
        !this.html.used && !this.flash.used ? (this._error({type:b.jPlayer.error.NO_SOLUTION, context:"{solution:'" + this.options.solution + "', supplied:'" + this.options.supplied + "'}", message:b.jPlayer.errorMsg.NO_SOLUTION, hint:b.jPlayer.errorHint.NO_SOLUTION}), this.css.jq.noSolution.length && this.css.jq.noSolution.show()) : this.css.jq.noSolution.length && this.css.jq.noSolution.hide();
        if(this.flash.used) {
            var h, d = "jQuery=" + encodeURI(this.options.noConflict) + "&id=" + encodeURI(this.internal.self.id) + "&vol=" + this.options.volume + "&muted=" + this.options.muted;
            if(b.jPlayer.browser.msie && (9 > Number(b.jPlayer.browser.version) || 9 > b.jPlayer.browser.documentMode)) {
                d = ['<param name="movie" value="' + this.internal.flash.swf + '" />', '<param name="FlashVars" value="' + d + '" />', '<param name="allowScriptAccess" value="always" />', '<param name="bgcolor" value="' + this.options.backgroundColor + '" />', '<param name="wmode" value="' + this.options.wmode + '" />'];
                h = document.createElement('<object id="' + this.internal.flash.id + '" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" width="0" height="0" tabindex="-1"></object>');
                for(var e = 0;e < d.length;e++) {
                    h.appendChild(document.createElement(d[e]))
                }
            }else {
                e = function(a, b, c) {
                    var h = document.createElement("param");
                    h.setAttribute("name", b);
                    h.setAttribute("value", c);
                    a.appendChild(h)
                }, h = document.createElement("object"), h.setAttribute("id", this.internal.flash.id), h.setAttribute("name", this.internal.flash.id), h.setAttribute("data", this.internal.flash.swf), h.setAttribute("type", "application/x-shockwave-flash"), h.setAttribute("width", "1"), h.setAttribute("height", "1"), h.setAttribute("tabindex", "-1"), e(h, "flashvars", d), e(h, "allowscriptaccess", "always"), e(h, "bgcolor", this.options.backgroundColor), e(h, "wmode", this.options.wmode)
            }
            this.element.append(h);
            this.internal.flash.jq = b(h)
        }
        this.html.used && (this.html.audio.available && (this._addHtmlEventListeners(this.htmlElement.audio, this.html.audio), this.element.append(this.htmlElement.audio), this.internal.audio.jq = b("#" + this.internal.audio.id)), this.html.video.available && (this._addHtmlEventListeners(this.htmlElement.video, this.html.video), this.element.append(this.htmlElement.video), this.internal.video.jq = b("#" + this.internal.video.id), this.status.nativeVideoControls ? this.internal.video.jq.css({width:this.status.width,
            height:this.status.height}) : this.internal.video.jq.css({width:"0px", height:"0px"}), this.internal.video.jq.bind("click.jPlayer", function() {
            a._trigger(b.jPlayer.event.click)
        })));
        this.options.emulateHtml && this._emulateHtmlBridge();
        this.html.used && !this.flash.used && setTimeout(function() {
            a.internal.ready = !0;
            a.version.flash = "n/a";
            a._trigger(b.jPlayer.event.repeat);
            a._trigger(b.jPlayer.event.ready)
        }, 100);
        this._updateNativeVideoControls();
        this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide();
        b.jPlayer.prototype.count++
    }, destroy:function() {
        this.clearMedia();
        this._removeUiClass();
        this.css.jq.currentTime.length && this.css.jq.currentTime.text("");
        this.css.jq.duration.length && this.css.jq.duration.text("");
        b.each(this.css.jq, function(a, b) {
            b.length && b.unbind(".jPlayer")
        });
        this.internal.poster.jq.unbind(".jPlayer");
        this.internal.video.jq && this.internal.video.jq.unbind(".jPlayer");
        this._fullscreenRemoveEventListeners();
        this === b.jPlayer.focus && (b.jPlayer.focus = null);
        this.options.emulateHtml && this._destroyHtmlBridge();
        this.element.removeData("jPlayer");
        this.element.unbind(".jPlayer");
        this.element.empty();
        delete this.instances[this.internal.instance]
    }, enable:function() {
    }, disable:function() {
    }, _testCanPlayType:function(a) {
        try {
            return a.canPlayType(this.format.mp3.codec), !0
        }catch(b) {
            return!1
        }
    }, _uaBlocklist:function(a) {
        var c = navigator.userAgent.toLowerCase(), d = !1;
        b.each(a, function(a, b) {
            if(b && b.test(c)) {
                return d = !0, !1
            }
        });
        return d
    }, _restrictNativeVideoControls:function() {
        this.require.audio && this.status.nativeVideoControls && (this.status.nativeVideoControls = !1, this.status.noFullWindow = !0)
    }, _updateNativeVideoControls:function() {
        this.html.video.available && this.html.used && (this.htmlElement.video.controls = this.status.nativeVideoControls, this._updateAutohide(), this.status.nativeVideoControls && this.require.video ? (this.internal.poster.jq.hide(), this.internal.video.jq.css({width:this.status.width, height:this.status.height})) : this.status.waitForPlay && this.status.video && (this.internal.poster.jq.show(), this.internal.video.jq.css({width:"0px", height:"0px"})))
    }, _addHtmlEventListeners:function(a, c) {
        var d = this;
        a.preload = this.options.preload;
        a.muted = this.options.muted;
        a.volume = this.options.volume;
        a.addEventListener("progress", function() {
            c.gate && (d.internal.cmdsIgnored && 0 < this.readyState && (d.internal.cmdsIgnored = !1), d._getHtmlStatus(a), d._updateInterface(), d._trigger(b.jPlayer.event.progress))
        }, !1);
        a.addEventListener("timeupdate", function() {
            c.gate && (d._getHtmlStatus(a), d._updateInterface(), d._trigger(b.jPlayer.event.timeupdate))
        }, !1);
        a.addEventListener("durationchange", function() {
            c.gate && (d._getHtmlStatus(a), d._updateInterface(), d._trigger(b.jPlayer.event.durationchange))
        }, !1);
        a.addEventListener("play", function() {
            c.gate && (d._updateButtons(!0), d._html_checkWaitForPlay(), d._trigger(b.jPlayer.event.play))
        }, !1);
        a.addEventListener("playing", function() {
            c.gate && (d._updateButtons(!0), d._seeked(), d._trigger(b.jPlayer.event.playing))
        }, !1);
        a.addEventListener("pause", function() {
            c.gate && (d._updateButtons(!1), d._trigger(b.jPlayer.event.pause))
        }, !1);
        a.addEventListener("waiting", function() {
            c.gate && (d._seeking(), d._trigger(b.jPlayer.event.waiting))
        }, !1);
        a.addEventListener("seeking", function() {
            c.gate && (d._seeking(), d._trigger(b.jPlayer.event.seeking))
        }, !1);
        a.addEventListener("seeked", function() {
            c.gate && (d._seeked(), d._trigger(b.jPlayer.event.seeked))
        }, !1);
        a.addEventListener("volumechange", function() {
            c.gate && (d.options.volume = a.volume, d.options.muted = a.muted, d._updateMute(), d._updateVolume(), d._trigger(b.jPlayer.event.volumechange))
        }, !1);
        a.addEventListener("suspend", function() {
            c.gate && (d._seeked(), d._trigger(b.jPlayer.event.suspend))
        }, !1);
        a.addEventListener("ended", function() {
            c.gate && (b.jPlayer.browser.webkit || (d.htmlElement.media.currentTime = 0), d.htmlElement.media.pause(), d._updateButtons(!1), d._getHtmlStatus(a, !0), d._updateInterface(), d._trigger(b.jPlayer.event.ended))
        }, !1);
        a.addEventListener("error", function() {
            c.gate && (d._updateButtons(!1), d._seeked(), d.status.srcSet && (clearTimeout(d.internal.htmlDlyCmdId), d.status.waitForLoad = !0, d.status.waitForPlay = !0, d.status.video && !d.status.nativeVideoControls && d.internal.video.jq.css({width:"0px", height:"0px"}), d._validString(d.status.media.poster) && !d.status.nativeVideoControls && d.internal.poster.jq.show(), d.css.jq.videoPlay.length && d.css.jq.videoPlay.show(), d._error({type:b.jPlayer.error.URL, context:d.status.src, message:b.jPlayer.errorMsg.URL,
                hint:b.jPlayer.errorHint.URL})))
        }, !1);
        b.each(b.jPlayer.htmlEvent, function(e, g) {
            a.addEventListener(this, function() {
                c.gate && d._trigger(b.jPlayer.event[g])
            }, !1)
        })
    }, _getHtmlStatus:function(a, b) {
        var c = 0, d = 0, e = 0, g = 0;
        isFinite(a.duration) && (this.status.duration = a.duration);
        c = a.currentTime;
        d = 0 < this.status.duration ? 100 * c / this.status.duration : 0;
        "object" === typeof a.seekable && 0 < a.seekable.length ? (e = 0 < this.status.duration ? 100 * a.seekable.end(a.seekable.length - 1) / this.status.duration : 100, g = 0 < this.status.duration ? 100 * a.currentTime / a.seekable.end(a.seekable.length - 1) : 0) : (e = 100, g = d);
        b && (d = g = c = 0);
        this.status.seekPercent = e;
        this.status.currentPercentRelative = g;
        this.status.currentPercentAbsolute = d;
        this.status.currentTime = c;
        this.status.videoWidth = a.videoWidth;
        this.status.videoHeight = a.videoHeight;
        this.status.readyState = a.readyState;
        this.status.networkState = a.networkState;
        this.status.playbackRate = a.playbackRate;
        this.status.ended = a.ended
    }, _resetStatus:function() {
        this.status = b.extend({}, this.status, b.jPlayer.prototype.status)
    }, _trigger:function(a, c, d) {
        a = b.Event(a);
        a.jPlayer = {};
        a.jPlayer.version = b.extend({}, this.version);
        a.jPlayer.options = b.extend(!0, {}, this.options);
        a.jPlayer.status = b.extend(!0, {}, this.status);
        a.jPlayer.html = b.extend(!0, {}, this.html);
        a.jPlayer.flash = b.extend(!0, {}, this.flash);
        c && (a.jPlayer.error = b.extend({}, c));
        d && (a.jPlayer.warning = b.extend({}, d));
        this.element.trigger(a)
    }, jPlayerFlashEvent:function(a, c) {
        if(a === b.jPlayer.event.ready) {
            if(this.internal.ready) {
                if(this.flash.gate) {
                    if(this.status.srcSet) {
                        var d = this.status.currentTime, e = this.status.paused;
                        this.setMedia(this.status.media);
                        0 < d && (e ? this.pause(d) : this.play(d))
                    }
                    this._trigger(b.jPlayer.event.flashreset)
                }
            }else {
                this.internal.ready = !0, this.internal.flash.jq.css({width:"0px", height:"0px"}), this.version.flash = c.version, this.version.needFlash !== this.version.flash && this._error({type:b.jPlayer.error.VERSION, context:this.version.flash, message:b.jPlayer.errorMsg.VERSION + this.version.flash, hint:b.jPlayer.errorHint.VERSION}), this._trigger(b.jPlayer.event.repeat), this._trigger(a)
            }
        }
        if(this.flash.gate) {
            switch(a) {
                case b.jPlayer.event.progress:
                    this._getFlashStatus(c);
                    this._updateInterface();
                    this._trigger(a);
                    break;
                case b.jPlayer.event.timeupdate:
                    this._getFlashStatus(c);
                    this._updateInterface();
                    this._trigger(a);
                    break;
                case b.jPlayer.event.play:
                    this._seeked();
                    this._updateButtons(!0);
                    this._trigger(a);
                    break;
                case b.jPlayer.event.pause:
                    this._updateButtons(!1);
                    this._trigger(a);
                    break;
                case b.jPlayer.event.ended:
                    this._updateButtons(!1);
                    this._trigger(a);
                    break;
                case b.jPlayer.event.click:
                    this._trigger(a);
                    break;
                case b.jPlayer.event.error:
                    this.status.waitForLoad = !0;
                    this.status.waitForPlay = !0;
                    this.status.video && this.internal.flash.jq.css({width:"0px", height:"0px"});
                    this._validString(this.status.media.poster) && this.internal.poster.jq.show();
                    this.css.jq.videoPlay.length && this.status.video && this.css.jq.videoPlay.show();
                    this.status.video ? this._flash_setVideo(this.status.media) : this._flash_setAudio(this.status.media);
                    this._updateButtons(!1);
                    this._error({type:b.jPlayer.error.URL, context:c.src, message:b.jPlayer.errorMsg.URL, hint:b.jPlayer.errorHint.URL});
                    break;
                case b.jPlayer.event.seeking:
                    this._seeking();
                    this._trigger(a);
                    break;
                case b.jPlayer.event.seeked:
                    this._seeked();
                    this._trigger(a);
                    break;
                case b.jPlayer.event.ready:
                    break;
                default:
                    this._trigger(a)
            }
        }
        return!1
    }, _getFlashStatus:function(a) {
        this.status.seekPercent = a.seekPercent;
        this.status.currentPercentRelative = a.currentPercentRelative;
        this.status.currentPercentAbsolute = a.currentPercentAbsolute;
        this.status.currentTime = a.currentTime;
        this.status.duration = a.duration;
        this.status.videoWidth = a.videoWidth;
        this.status.videoHeight = a.videoHeight;
        this.status.readyState = 4;
        this.status.networkState = 0;
        this.status.playbackRate = 1;
        this.status.ended = !1
    }, _updateButtons:function(a) {
        a === c ? a = !this.status.paused : this.status.paused = !a;
        this.css.jq.play.length && this.css.jq.pause.length && (a ? (this.css.jq.play.hide(), this.css.jq.pause.show()) : (this.css.jq.play.show(), this.css.jq.pause.hide()));
        this.css.jq.restoreScreen.length && this.css.jq.fullScreen.length && (this.status.noFullWindow ? (this.css.jq.fullScreen.hide(), this.css.jq.restoreScreen.hide()) : this.options.fullWindow ? (this.css.jq.fullScreen.hide(), this.css.jq.restoreScreen.show()) : (this.css.jq.fullScreen.show(), this.css.jq.restoreScreen.hide()));
        this.css.jq.repeat.length && this.css.jq.repeatOff.length && (this.options.loop ? (this.css.jq.repeat.hide(), this.css.jq.repeatOff.show()) : (this.css.jq.repeat.show(), this.css.jq.repeatOff.hide()))
    }, _updateInterface:function() {
        this.css.jq.seekBar.length && this.css.jq.seekBar.width(this.status.seekPercent + "%");
        this.css.jq.playBar.length && (this.options.smoothPlayBar ? this.css.jq.playBar.stop().animate({width:this.status.currentPercentAbsolute + "%"}, 250, "linear") : this.css.jq.playBar.width(this.status.currentPercentRelative + "%"));
        this.css.jq.currentTime.length && this.css.jq.currentTime.text(this._convertTime(this.status.currentTime));
        this.css.jq.duration.length && this.css.jq.duration.text(this._convertTime(this.status.duration))
    }, _convertTime:f.prototype.time, _seeking:function() {
        this.css.jq.seekBar.length && this.css.jq.seekBar.addClass("jp-seeking-bg")
    }, _seeked:function() {
        this.css.jq.seekBar.length && this.css.jq.seekBar.removeClass("jp-seeking-bg")
    }, _resetGate:function() {
        this.html.audio.gate = !1;
        this.html.video.gate = !1;
        this.flash.gate = !1
    }, _resetActive:function() {
        this.html.active = !1;
        this.flash.active = !1
    }, setMedia:function(a) {
        var c = this, d = !1, e = this.status.media.poster !== a.poster;
        this._resetMedia();
        this._resetGate();
        this._resetActive();
        b.each(this.formats, function(e, g) {
            var f = "video" === c.format[g].media;
            b.each(c.solutions, function(b, e) {
                if(c[e].support[g] && c._validString(a[g])) {
                    var k = "html" === e;
                    f ? (k ? (c.html.video.gate = !0, c._html_setVideo(a), c.html.active = !0) : (c.flash.gate = !0, c._flash_setVideo(a), c.flash.active = !0), c.css.jq.videoPlay.length && c.css.jq.videoPlay.show(), c.status.video = !0) : (k ? (c.html.audio.gate = !0, c._html_setAudio(a), c.html.active = !0) : (c.flash.gate = !0, c._flash_setAudio(a), c.flash.active = !0), c.css.jq.videoPlay.length && c.css.jq.videoPlay.hide(), c.status.video = !1);
                    d = !0;
                    return!1
                }
            });
            if(d) {
                return!1
            }
        });
        if(d) {
            if((!this.status.nativeVideoControls || !this.html.video.gate) && this._validString(a.poster)) {
                e ? this.htmlElement.poster.src = a.poster : this.internal.poster.jq.show()
            }
            this.status.srcSet = !0;
            this.status.media = b.extend({}, a);
            this._updateButtons(!1);
            this._updateInterface()
        }else {
            this._error({type:b.jPlayer.error.NO_SUPPORT, context:"{supplied:'" + this.options.supplied + "'}", message:b.jPlayer.errorMsg.NO_SUPPORT, hint:b.jPlayer.errorHint.NO_SUPPORT})
        }
    }, _resetMedia:function() {
        this._resetStatus();
        this._updateButtons(!1);
        this._updateInterface();
        this._seeked();
        this.internal.poster.jq.hide();
        clearTimeout(this.internal.htmlDlyCmdId);
        this.html.active ? this._html_resetMedia() : this.flash.active && this._flash_resetMedia()
    }, clearMedia:function() {
        this._resetMedia();
        this.html.active ? this._html_clearMedia() : this.flash.active && this._flash_clearMedia();
        this._resetGate();
        this._resetActive()
    }, load:function() {
        this.status.srcSet ? this.html.active ? this._html_load() : this.flash.active && this._flash_load() : this._urlNotSetError("load")
    }, focus:function() {
        this.options.keyEnabled && (b.jPlayer.focus = this)
    }, play:function(a) {
        a = "number" === typeof a ? a : NaN;
        this.status.srcSet ? (this.focus(), this.html.active ? this._html_play(a) : this.flash.active && this._flash_play(a)) : this._urlNotSetError("play")
    }, videoPlay:function() {
        this.play()
    }, pause:function(a) {
        a = "number" === typeof a ? a : NaN;
        this.status.srcSet ? this.html.active ? this._html_pause(a) : this.flash.active && this._flash_pause(a) : this._urlNotSetError("pause")
    }, pauseOthers:function() {
        var a = this;
        b.each(this.instances, function(b, c) {
            a.element !== c && c.data("jPlayer").status.srcSet && c.jPlayer("pause")
        })
    }, stop:function() {
        this.status.srcSet ? this.html.active ? this._html_pause(0) : this.flash.active && this._flash_pause(0) : this._urlNotSetError("stop")
    }, playHead:function(a) {
        a = this._limitValue(a, 0, 100);
        this.status.srcSet ? this.html.active ? this._html_playHead(a) : this.flash.active && this._flash_playHead(a) : this._urlNotSetError("playHead")
    }, _muted:function(a) {
        this.options.muted = a;
        this.html.used && this._html_mute(a);
        this.flash.used && this._flash_mute(a);
        !this.html.video.gate && !this.html.audio.gate && (this._updateMute(a), this._updateVolume(this.options.volume), this._trigger(b.jPlayer.event.volumechange))
    }, mute:function(a) {
        a = a === c ? !0 : !!a;
        this._muted(a)
    }, unmute:function(a) {
        a = a === c ? !0 : !!a;
        this._muted(!a)
    }, _updateMute:function(a) {
        a === c && (a = this.options.muted);
        this.css.jq.mute.length && this.css.jq.unmute.length && (this.status.noVolume ? (this.css.jq.mute.hide(), this.css.jq.unmute.hide()) : a ? (this.css.jq.mute.hide(), this.css.jq.unmute.show()) : (this.css.jq.mute.show(), this.css.jq.unmute.hide()))
    }, volume:function(a) {
        a = this._limitValue(a, 0, 1);
        this.options.volume = a;
        this.html.used && this._html_volume(a);
        this.flash.used && this._flash_volume(a);
        !this.html.video.gate && !this.html.audio.gate && (this._updateVolume(a), this._trigger(b.jPlayer.event.volumechange))
    }, volumeBar:function(a) {
        if(this.css.jq.volumeBar.length) {
            var c = b(a.currentTarget), d = c.offset(), e = a.pageX - d.left, g = c.width(), a = c.height() - a.pageY + d.top, c = c.height();
            this.options.verticalVolume ? this.volume(a / c) : this.volume(e / g)
        }
        this.options.muted && this._muted(!1)
    }, volumeBarValue:function() {
    }, _updateVolume:function(a) {
        a === c && (a = this.options.volume);
        a = this.options.muted ? 0 : a;
        this.status.noVolume ? (this.css.jq.volumeBar.length && this.css.jq.volumeBar.hide(), this.css.jq.volumeBarValue.length && this.css.jq.volumeBarValue.hide(), this.css.jq.volumeMax.length && this.css.jq.volumeMax.hide()) : (this.css.jq.volumeBar.length && this.css.jq.volumeBar.show(), this.css.jq.volumeBarValue.length && (this.css.jq.volumeBarValue.show(), this.css.jq.volumeBarValue[this.options.verticalVolume ? "height" : "width"](100 * a + "%")), this.css.jq.volumeMax.length && this.css.jq.volumeMax.show())
    }, volumeMax:function() {
        this.volume(1);
        this.options.muted && this._muted(!1)
    }, _cssSelectorAncestor:function(a) {
        var c = this;
        this.options.cssSelectorAncestor = a;
        this._removeUiClass();
        this.ancestorJq = a ? b(a) : [];
        a && 1 !== this.ancestorJq.length && this._warning({type:b.jPlayer.warning.CSS_SELECTOR_COUNT, context:a, message:b.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.ancestorJq.length + " found for cssSelectorAncestor.", hint:b.jPlayer.warningHint.CSS_SELECTOR_COUNT});
        this._addUiClass();
        b.each(this.options.cssSelector, function(a, b) {
            c._cssSelector(a, b)
        });
        this._updateInterface();
        this._updateButtons();
        this._updateAutohide();
        this._updateVolume();
        this._updateMute()
    }, _cssSelector:function(a, c) {
        var d = this;
        "string" === typeof c ? b.jPlayer.prototype.options.cssSelector[a] ? (this.css.jq[a] && this.css.jq[a].length && this.css.jq[a].unbind(".jPlayer"), this.options.cssSelector[a] = c, this.css.cs[a] = this.options.cssSelectorAncestor + " " + c, this.css.jq[a] = c ? b(this.css.cs[a]) : [], this.css.jq[a].length && this.css.jq[a].bind("click.jPlayer", function(c) {
            c.preventDefault();
            d[a](c);
            b(this).blur()
        }), c && 1 !== this.css.jq[a].length && this._warning({type:b.jPlayer.warning.CSS_SELECTOR_COUNT, context:this.css.cs[a], message:b.jPlayer.warningMsg.CSS_SELECTOR_COUNT + this.css.jq[a].length + " found for " + a + " method.", hint:b.jPlayer.warningHint.CSS_SELECTOR_COUNT})) : this._warning({type:b.jPlayer.warning.CSS_SELECTOR_METHOD, context:a, message:b.jPlayer.warningMsg.CSS_SELECTOR_METHOD, hint:b.jPlayer.warningHint.CSS_SELECTOR_METHOD}) : this._warning({type:b.jPlayer.warning.CSS_SELECTOR_STRING,
            context:c, message:b.jPlayer.warningMsg.CSS_SELECTOR_STRING, hint:b.jPlayer.warningHint.CSS_SELECTOR_STRING})
    }, seekBar:function(a) {
        if(this.css.jq.seekBar.length) {
            var c = b(a.currentTarget), d = c.offset(), a = a.pageX - d.left, c = c.width();
            this.playHead(100 * a / c)
        }
    }, playBar:function() {
    }, repeat:function() {
        this._loop(!0)
    }, repeatOff:function() {
        this._loop(!1)
    }, _loop:function(a) {
        this.options.loop !== a && (this.options.loop = a, this._updateButtons(), this._trigger(b.jPlayer.event.repeat))
    }, currentTime:function() {
    }, duration:function() {
    }, gui:function() {
    }, noSolution:function() {
    }, option:function(a, d) {
        var e = a;
        if(0 === arguments.length) {
            return b.extend(!0, {}, this.options)
        }
        if("string" === typeof a) {
            var g = a.split(".");
            if(d === c) {
                for(var e = b.extend(!0, {}, this.options), f = 0;f < g.length;f++) {
                    if(e[g[f]] !== c) {
                        e = e[g[f]]
                    }else {
                        return this._warning({type:b.jPlayer.warning.OPTION_KEY, context:a, message:b.jPlayer.warningMsg.OPTION_KEY, hint:b.jPlayer.warningHint.OPTION_KEY}), c
                    }
                }
                return e
            }
            for(var f = e = {}, j = 0;j < g.length;j++) {
                j < g.length - 1 ? (f[g[j]] = {}, f = f[g[j]]) : f[g[j]] = d
            }
        }
        this._setOptions(e);
        return this
    }, _setOptions:function(a) {
        var c = this;
        b.each(a, function(a, b) {
            c._setOption(a, b)
        });
        return this
    }, _setOption:function(a, c) {
        var d = this;
        switch(a) {
            case "volume":
                this.volume(c);
                break;
            case "muted":
                this._muted(c);
                break;
            case "cssSelectorAncestor":
                this._cssSelectorAncestor(c);
                break;
            case "cssSelector":
                b.each(c, function(a, b) {
                    d._cssSelector(a, b)
                });
                break;
            case "fullScreen":
                if(this.options[a] !== c) {
                    var e = b.jPlayer.nativeFeatures.fullscreen.used.webkitVideo;
                    if(!e || e && !this.status.waitForPlay) {
                        e || (this.options[a] = c), c ? this._requestFullscreen() : this._exitFullscreen(), e || this._setOption("fullWindow", c)
                    }
                }
                break;
            case "fullWindow":
                this.options[a] !== c && (this._removeUiClass(), this.options[a] = c, this._refreshSize());
                break;
            case "size":
                !this.options.fullWindow && this.options[a].cssClass !== c.cssClass && this._removeUiClass();
                this.options[a] = b.extend({}, this.options[a], c);
                this._refreshSize();
                break;
            case "sizeFull":
                this.options.fullWindow && this.options[a].cssClass !== c.cssClass && this._removeUiClass();
                this.options[a] = b.extend({}, this.options[a], c);
                this._refreshSize();
                break;
            case "autohide":
                this.options[a] = b.extend({}, this.options[a], c);
                this._updateAutohide();
                break;
            case "loop":
                this._loop(c);
                break;
            case "nativeVideoControls":
                this.options[a] = b.extend({}, this.options[a], c);
                this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
                this._restrictNativeVideoControls();
                this._updateNativeVideoControls();
                break;
            case "noFullWindow":
                this.options[a] = b.extend({}, this.options[a], c);
                this.status.nativeVideoControls = this._uaBlocklist(this.options.nativeVideoControls);
                this.status.noFullWindow = this._uaBlocklist(this.options.noFullWindow);
                this._restrictNativeVideoControls();
                this._updateButtons();
                break;
            case "noVolume":
                this.options[a] = b.extend({}, this.options[a], c);
                this.status.noVolume = this._uaBlocklist(this.options.noVolume);
                this._updateVolume();
                this._updateMute();
                break;
            case "emulateHtml":
                this.options[a] !== c && ((this.options[a] = c) ? this._emulateHtmlBridge() : this._destroyHtmlBridge());
                break;
            case "timeFormat":
                this.options[a] = b.extend({}, this.options[a], c);
                break;
            case "keyEnabled":
                this.options[a] = c;
                !c && this === b.jPlayer.focus && (b.jPlayer.focus = null);
                break;
            case "keyBindings":
                this.options[a] = b.extend(!0, {}, this.options[a], c);
                break;
            case "audioFullScreen":
                this.options[a] = c
        }
        return this
    }, _refreshSize:function() {
        this._setSize();
        this._addUiClass();
        this._updateSize();
        this._updateButtons();
        this._updateAutohide();
        this._trigger(b.jPlayer.event.resize)
    }, _setSize:function() {
        this.options.fullWindow ? (this.status.width = this.options.sizeFull.width, this.status.height = this.options.sizeFull.height, this.status.cssClass = this.options.sizeFull.cssClass) : (this.status.width = this.options.size.width, this.status.height = this.options.size.height, this.status.cssClass = this.options.size.cssClass);
        this.element.css({width:this.status.width, height:this.status.height})
    }, _addUiClass:function() {
        this.ancestorJq.length && this.ancestorJq.addClass(this.status.cssClass)
    }, _removeUiClass:function() {
        this.ancestorJq.length && this.ancestorJq.removeClass(this.status.cssClass)
    }, _updateSize:function() {
        this.internal.poster.jq.css({width:this.status.width, height:this.status.height});
        !this.status.waitForPlay && this.html.active && this.status.video || this.html.video.available && this.html.used && this.status.nativeVideoControls ? this.internal.video.jq.css({width:this.status.width, height:this.status.height}) : !this.status.waitForPlay && this.flash.active && this.status.video && this.internal.flash.jq.css({width:this.status.width, height:this.status.height})
    }, _updateAutohide:function() {
        var a = this, b = function() {
            a.css.jq.gui.fadeIn(a.options.autohide.fadeIn, function() {
                clearTimeout(a.internal.autohideId);
                a.internal.autohideId = setTimeout(function() {
                    a.css.jq.gui.fadeOut(a.options.autohide.fadeOut)
                }, a.options.autohide.hold)
            })
        };
        this.css.jq.gui.length && (this.css.jq.gui.stop(!0, !0), clearTimeout(this.internal.autohideId), this.element.unbind(".jPlayerAutohide"), this.css.jq.gui.unbind(".jPlayerAutohide"), this.status.nativeVideoControls ? this.css.jq.gui.hide() : this.options.fullWindow && this.options.autohide.full || !this.options.fullWindow && this.options.autohide.restored ? (this.element.bind("mousemove.jPlayer.jPlayerAutohide", b), this.css.jq.gui.bind("mousemove.jPlayer.jPlayerAutohide", b), this.css.jq.gui.hide()) :
            this.css.jq.gui.show())
    }, fullScreen:function() {
        this._setOption("fullScreen", !0)
    }, restoreScreen:function() {
        this._setOption("fullScreen", !1)
    }, _fullscreenAddEventListeners:function() {
        var a = this, c = b.jPlayer.nativeFeatures.fullscreen;
        c.api.fullscreenEnabled && c.event.fullscreenchange && ("function" !== typeof this.internal.fullscreenchangeHandler && (this.internal.fullscreenchangeHandler = function() {
            a._fullscreenchange()
        }), document.addEventListener(c.event.fullscreenchange, this.internal.fullscreenchangeHandler, !1))
    }, _fullscreenRemoveEventListeners:function() {
        var a = b.jPlayer.nativeFeatures.fullscreen;
        this.internal.fullscreenchangeHandler && document.addEventListener(a.event.fullscreenchange, this.internal.fullscreenchangeHandler, !1)
    }, _fullscreenchange:function() {
        this.options.fullScreen && !b.jPlayer.nativeFeatures.fullscreen.api.fullscreenElement() && this._setOption("fullScreen", !1)
    }, _requestFullscreen:function() {
        var a = this.ancestorJq.length ? this.ancestorJq[0] : this.element[0], c = b.jPlayer.nativeFeatures.fullscreen;
        c.used.webkitVideo && (a = this.htmlElement.video);
        c.api.fullscreenEnabled && c.api.requestFullscreen(a)
    }, _exitFullscreen:function() {
        var a = b.jPlayer.nativeFeatures.fullscreen, c;
        a.used.webkitVideo && (c = this.htmlElement.video);
        a.api.fullscreenEnabled && a.api.exitFullscreen(c)
    }, _html_initMedia:function(a) {
        var c = b(this.htmlElement.media).empty();
        b.each(a.track || [], function(a, b) {
            var d = document.createElement("track");
            d.setAttribute("kind", b.kind ? b.kind : "");
            d.setAttribute("src", b.src ? b.src : "");
            d.setAttribute("srclang", b.srclang ? b.srclang : "");
            d.setAttribute("label", b.label ? b.label : "");
            b.def && d.setAttribute("default", b.def);
            c.append(d)
        });
        this.htmlElement.media.src = this.status.src;
        "none" !== this.options.preload && this._html_load();
        this._trigger(b.jPlayer.event.timeupdate)
    }, _html_setFormat:function(a) {
        var c = this;
        b.each(this.formats, function(b, d) {
            if(c.html.support[d] && a[d]) {
                return c.status.src = a[d], c.status.format[d] = !0, c.status.formatType = d, !1
            }
        })
    }, _html_setAudio:function(a) {
        this._html_setFormat(a);
        this.htmlElement.media = this.htmlElement.audio;
        this._html_initMedia(a)
    }, _html_setVideo:function(a) {
        this._html_setFormat(a);
        this.status.nativeVideoControls && (this.htmlElement.video.poster = this._validString(a.poster) ? a.poster : "");
        this.htmlElement.media = this.htmlElement.video;
        this._html_initMedia(a)
    }, _html_resetMedia:function() {
        this.htmlElement.media && (this.htmlElement.media.id === this.internal.video.id && !this.status.nativeVideoControls && this.internal.video.jq.css({width:"0px", height:"0px"}), this.htmlElement.media.pause())
    }, _html_clearMedia:function() {
        this.htmlElement.media && (this.htmlElement.media.src = "about:blank", this.htmlElement.media.load())
    }, _html_load:function() {
        this.status.waitForLoad && (this.status.waitForLoad = !1, this.htmlElement.media.load());
        clearTimeout(this.internal.htmlDlyCmdId)
    }, _html_play:function(a) {
        var b = this, c = this.htmlElement.media;
        this._html_load();
        if(isNaN(a)) {
            c.play()
        }else {
            this.internal.cmdsIgnored && c.play();
            try {
                if(!c.seekable || "object" === typeof c.seekable && 0 < c.seekable.length) {
                    c.currentTime = a, c.play()
                }else {
                    throw 1;
                }
            }catch(d) {
                this.internal.htmlDlyCmdId = setTimeout(function() {
                    b.play(a)
                }, 250);
                return
            }
        }
        this._html_checkWaitForPlay()
    }, _html_pause:function(a) {
        var b = this, c = this.htmlElement.media;
        0 < a ? this._html_load() : clearTimeout(this.internal.htmlDlyCmdId);
        c.pause();
        if(!isNaN(a)) {
            try {
                if(!c.seekable || "object" === typeof c.seekable && 0 < c.seekable.length) {
                    c.currentTime = a
                }else {
                    throw 1;
                }
            }catch(d) {
                this.internal.htmlDlyCmdId = setTimeout(function() {
                    b.pause(a)
                }, 250);
                return
            }
        }
        0 < a && this._html_checkWaitForPlay()
    }, _html_playHead:function(a) {
        var b = this, c = this.htmlElement.media;
        this._html_load();
        try {
            if("object" === typeof c.seekable && 0 < c.seekable.length) {
                c.currentTime = a * c.seekable.end(c.seekable.length - 1) / 100
            }else {
                if(0 < c.duration && !isNaN(c.duration)) {
                    c.currentTime = a * c.duration / 100
                }else {
                    throw"e";
                }
            }
        }catch(d) {
            this.internal.htmlDlyCmdId = setTimeout(function() {
                b.playHead(a)
            }, 250);
            return
        }
        this.status.waitForLoad || this._html_checkWaitForPlay()
    }, _html_checkWaitForPlay:function() {
        this.status.waitForPlay && (this.status.waitForPlay = !1, this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(), this.status.video && (this.internal.poster.jq.hide(), this.internal.video.jq.css({width:this.status.width, height:this.status.height})))
    }, _html_volume:function(a) {
        this.html.audio.available && (this.htmlElement.audio.volume = a);
        this.html.video.available && (this.htmlElement.video.volume = a)
    }, _html_mute:function(a) {
        this.html.audio.available && (this.htmlElement.audio.muted = a);
        this.html.video.available && (this.htmlElement.video.muted = a)
    }, _flash_setAudio:function(a) {
        var c = this;
        try {
            b.each(this.formats, function(b, d) {
                if(c.flash.support[d] && a[d]) {
                    switch(d) {
                        case "m4a":
                            ;
                        case "fla":
                            c._getMovie().fl_setAudio_m4a(a[d]);
                            break;
                        case "mp3":
                            c._getMovie().fl_setAudio_mp3(a[d]);
                            break;
                        case "rtmpa":
                            c._getMovie().fl_setAudio_rtmp(a[d])
                    }
                    c.status.src = a[d];
                    c.status.format[d] = !0;
                    c.status.formatType = d;
                    return!1
                }
            }), "auto" === this.options.preload && (this._flash_load(), this.status.waitForLoad = !1)
        }catch(d) {
            this._flashError(d)
        }
    }, _flash_setVideo:function(a) {
        var c = this;
        try {
            b.each(this.formats, function(b, d) {
                if(c.flash.support[d] && a[d]) {
                    switch(d) {
                        case "m4v":
                            ;
                        case "flv":
                            c._getMovie().fl_setVideo_m4v(a[d]);
                            break;
                        case "rtmpv":
                            c._getMovie().fl_setVideo_rtmp(a[d])
                    }
                    c.status.src = a[d];
                    c.status.format[d] = !0;
                    c.status.formatType = d;
                    return!1
                }
            }), "auto" === this.options.preload && (this._flash_load(), this.status.waitForLoad = !1)
        }catch(d) {
            this._flashError(d)
        }
    }, _flash_resetMedia:function() {
        this.internal.flash.jq.css({width:"0px", height:"0px"});
        this._flash_pause(NaN)
    }, _flash_clearMedia:function() {
        try {
            this._getMovie().fl_clearMedia()
        }catch(a) {
            this._flashError(a)
        }
    }, _flash_load:function() {
        try {
            this._getMovie().fl_load()
        }catch(a) {
            this._flashError(a)
        }
        this.status.waitForLoad = !1
    }, _flash_play:function(a) {
        try {
            this._getMovie().fl_play(a)
        }catch(b) {
            this._flashError(b)
        }
        this.status.waitForLoad = !1;
        this._flash_checkWaitForPlay()
    }, _flash_pause:function(a) {
        try {
            this._getMovie().fl_pause(a)
        }catch(b) {
            this._flashError(b)
        }
        0 < a && (this.status.waitForLoad = !1, this._flash_checkWaitForPlay())
    }, _flash_playHead:function(a) {
        try {
            this._getMovie().fl_play_head(a)
        }catch(b) {
            this._flashError(b)
        }
        this.status.waitForLoad || this._flash_checkWaitForPlay()
    }, _flash_checkWaitForPlay:function() {
        this.status.waitForPlay && (this.status.waitForPlay = !1, this.css.jq.videoPlay.length && this.css.jq.videoPlay.hide(), this.status.video && (this.internal.poster.jq.hide(), this.internal.flash.jq.css({width:this.status.width, height:this.status.height})))
    }, _flash_volume:function(a) {
        try {
            this._getMovie().fl_volume(a)
        }catch(b) {
            this._flashError(b)
        }
    }, _flash_mute:function(a) {
        try {
            this._getMovie().fl_mute(a)
        }catch(b) {
            this._flashError(b)
        }
    }, _getMovie:function() {
        return document[this.internal.flash.id]
    }, _getFlashPluginVersion:function() {
        var a = 0, b;
        if(window.ActiveXObject) {
            try {
                if(b = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) {
                    var c = b.GetVariable("$version");
                    c && (c = c.split(" ")[1].split(","), a = parseInt(c[0], 10) + "." + parseInt(c[1], 10))
                }
            }catch(d) {
            }
        }else {
            navigator.plugins && 0 < navigator.mimeTypes.length && navigator.plugins["Shockwave Flash"] && (a = navigator.plugins["Shockwave Flash"].description.replace(/.*\s(\d+\.\d+).*/, "$1"))
        }
        return 1 * a
    }, _checkForFlash:function(a) {
        var b = !1;
        this._getFlashPluginVersion() >= a && (b = !0);
        return b
    }, _validString:function(a) {
        return a && "string" === typeof a
    }, _limitValue:function(a, b, c) {
        return a < b ? b : a > c ? c : a
    }, _urlNotSetError:function(a) {
        this._error({type:b.jPlayer.error.URL_NOT_SET, context:a, message:b.jPlayer.errorMsg.URL_NOT_SET, hint:b.jPlayer.errorHint.URL_NOT_SET})
    }, _flashError:function(a) {
        var c;
        c = this.internal.ready ? "FLASH_DISABLED" : "FLASH";
        this._error({type:b.jPlayer.error[c], context:this.internal.flash.swf, message:b.jPlayer.errorMsg[c] + a.message, hint:b.jPlayer.errorHint[c]});
        this.internal.flash.jq.css({width:"1px", height:"1px"})
    }, _error:function(a) {
        this._trigger(b.jPlayer.event.error, a);
        this.options.errorAlerts && this._alert("Error!" + (a.message ? "\n\n" + a.message : "") + (a.hint ? "\n\n" + a.hint : "") + "\n\nContext: " + a.context)
    }, _warning:function(a) {
        this._trigger(b.jPlayer.event.warning, c, a);
        this.options.warningAlerts && this._alert("Warning!" + (a.message ? "\n\n" + a.message : "") + (a.hint ? "\n\n" + a.hint : "") + "\n\nContext: " + a.context)
    }, _alert:function(a) {
        alert("jPlayer " + this.version.script + " : id='" + this.internal.self.id + "' : " + a)
    }, _emulateHtmlBridge:function() {
        var a = this;
        b.each(b.jPlayer.emulateMethods.split(/\s+/g), function(b, c) {
            a.internal.domNode[c] = function(b) {
                a[c](b)
            }
        });
        b.each(b.jPlayer.event, function(c, d) {
            var e = !0;
            b.each(b.jPlayer.reservedEvent.split(/\s+/g), function(a, b) {
                if(b === c) {
                    return e = !1
                }
            });
            e && a.element.bind(d + ".jPlayer.jPlayerHtml", function() {
                a._emulateHtmlUpdate();
                var b = document.createEvent("Event");
                b.initEvent(c, !1, !0);
                a.internal.domNode.dispatchEvent(b)
            })
        })
    }, _emulateHtmlUpdate:function() {
        var a = this;
        b.each(b.jPlayer.emulateStatus.split(/\s+/g), function(b, c) {
            a.internal.domNode[c] = a.status[c]
        });
        b.each(b.jPlayer.emulateOptions.split(/\s+/g), function(b, c) {
            a.internal.domNode[c] = a.options[c]
        })
    }, _destroyHtmlBridge:function() {
        var a = this;
        this.element.unbind(".jPlayerHtml");
        b.each((b.jPlayer.emulateMethods + " " + b.jPlayer.emulateStatus + " " + b.jPlayer.emulateOptions).split(/\s+/g), function(b, c) {
            delete a.internal.domNode[c]
        })
    }};
    b.jPlayer.error = {FLASH:"e_flash", FLASH_DISABLED:"e_flash_disabled", NO_SOLUTION:"e_no_solution", NO_SUPPORT:"e_no_support", URL:"e_url", URL_NOT_SET:"e_url_not_set", VERSION:"e_version"};
    b.jPlayer.errorMsg = {FLASH:"jPlayer's Flash fallback is not configured correctly, or a command was issued before the jPlayer Ready event. Details: ", FLASH_DISABLED:"jPlayer's Flash fallback has been disabled by the browser due to the CSS rules you have used. Details: ", NO_SOLUTION:"No solution can be found by jPlayer in this browser. Neither HTML nor Flash can be used.", NO_SUPPORT:"It is not possible to play any media format provided in setMedia() on this browser using your current options.",
        URL:"Media URL could not be loaded.", URL_NOT_SET:"Attempt to issue media playback commands, while no media url is set.", VERSION:"jPlayer " + b.jPlayer.prototype.version.script + " needs Jplayer.swf version " + b.jPlayer.prototype.version.needFlash + " but found "};
    b.jPlayer.errorHint = {FLASH:"Check your swfPath option and that Jplayer.swf is there.", FLASH_DISABLED:"Check that you have not display:none; the jPlayer entity or any ancestor.", NO_SOLUTION:"Review the jPlayer options: support and supplied.", NO_SUPPORT:"Video or audio formats defined in the supplied option are missing.", URL:"Check media URL is valid.", URL_NOT_SET:"Use setMedia() to set the media URL.", VERSION:"Update jPlayer files."};
    b.jPlayer.warning = {CSS_SELECTOR_COUNT:"e_css_selector_count", CSS_SELECTOR_METHOD:"e_css_selector_method", CSS_SELECTOR_STRING:"e_css_selector_string", OPTION_KEY:"e_option_key"};
    b.jPlayer.warningMsg = {CSS_SELECTOR_COUNT:"The number of css selectors found did not equal one: ", CSS_SELECTOR_METHOD:"The methodName given in jPlayer('cssSelector') is not a valid jPlayer method.", CSS_SELECTOR_STRING:"The methodCssSelector given in jPlayer('cssSelector') is not a String or is empty.", OPTION_KEY:"The option requested in jPlayer('option') is undefined."};
    b.jPlayer.warningHint = {CSS_SELECTOR_COUNT:"Check your css selector and the ancestor.", CSS_SELECTOR_METHOD:"Check your method name.", CSS_SELECTOR_STRING:"Check your css selector is a string.", OPTION_KEY:"Check your option name."}
});
(function(b) {
    function c(c) {
        var d = c || window.event, a = [].slice.call(arguments, 1), g = 0, f = 0, k = 0, c = b.event.fix(d);
        c.type = "mousewheel";
        d.wheelDelta && (g = d.wheelDelta / 120);
        d.detail && (g = -d.detail / 3);
        k = g;
        void 0 !== d.axis && d.axis === d.HORIZONTAL_AXIS && (k = 0, f = -1 * g);
        void 0 !== d.wheelDeltaY && (k = d.wheelDeltaY / 120);
        void 0 !== d.wheelDeltaX && (f = -1 * d.wheelDeltaX / 120);
        a.unshift(c, g, f, k);
        return(b.event.dispatch || b.event.handle).apply(this, a)
    }
    var f = ["DOMMouseScroll", "mousewheel"];
    if(b.event.fixHooks) {
        for(var g = f.length;g;) {
            b.event.fixHooks[f[--g]] = b.event.mouseHooks
        }
    }
    b.event.special.mousewheel = {setup:function() {
        if(this.addEventListener) {
            for(var b = f.length;b;) {
                this.addEventListener(f[--b], c, !1)
            }
        }else {
            this.onmousewheel = c
        }
    }, teardown:function() {
        if(this.removeEventListener) {
            for(var b = f.length;b;) {
                this.removeEventListener(f[--b], c, !1)
            }
        }else {
            this.onmousewheel = null
        }
    }};
    b.fn.extend({mousewheel:function(b) {
        return b ? this.bind("mousewheel", b) : this.trigger("mousewheel")
    }, unmousewheel:function(b) {
        return this.unbind("mousewheel", b)
    }})
})(jQuery);
(function(b, c) {
    var f, g, e, d;
    function a(a) {
        if(a.pageX) {
            return[a.pageX, a.pageY]
        }
        var b = c, d = a.target.ownerDocument, e = d.body, d = d.documentElement;
        return[a.clientX + (b.pageXOffset || d.scrollLeft || e.scrollLeft || 0) - (d.clientLeft || e.clientLeft || 0), a.clientY + (b.pageYOffset || d.scrollTop || e.scrollTop || 0) - (d.clientTop || e.clientTop || 0)]
    }
    d = void 0;
    f = 0;
    g = 1;
    e = 2;
    var h = {disable:!1, cancel:"input", cursor:"move", distance:5, helper:"original", getPos:function(a) {
        var b = a.offset(), c = b.top;
        return[b.left + a.attr("offsetWidth") / 2, c + a.attr("offsetHeight") / 2]
    }}, i = "__DrAg_DrOp__", k = function(a, c) {
        this._moElement$ = a;
        this._moMover$ = null;
        this._moContainer$ = c && c.container && b(c.container);
        this._moOptions = b.extend({}, h, c);
        this._mnState = e;
        this._init()
    };
    k.prototype = {option:function(a, b) {
        var c = this._moOptions;
        return b ? (c[a] = b, this) : c[a]
    }, _init:function() {
        function c(a) {
            var h = [];
            d && (h = d[f]);
            for(var k = 0;k < h.length;k++) {
                var j = h[k];
                j != e._moElement$.size() && b.trigger(j, i, [{state:e._mnState, cursorPos:a, pos:g.getPos(e._moMover$)}])
            }
        }
        var e = this, g = e._moOptions;
        (g.handle ? e._moElement$.find(g.handle) : e._moElement$).bind("mousedown", function(a) {
            a.preventDefault();
            if(!(g.disable || g.lockx && g.locky)) {
                var b = e._moElement$.offset();
                e._moOrgPos = {_nMouseX:a.clientX, _nMouseY:a.clientY, _nDomX:b.left - (parseInt(e._moElement$.css("margin-left")) || 0), _nDomY:b.top - (parseInt(e._moElement$.css("margin-top")) || 0)};
                e._move()
            }
        });
        var h = null, f = g.group;
        f && e._moElement$.bind("dragStart", function(d) {
            c(a(d));
            b(d.target.ownerDocument.body).css("cursor", g.cursor)
        }).bind("drag", function(b) {
                clearTimeout(h);
                var d = a(b);
                h = setTimeout(function() {
                    c(d)
                })
            }).bind("dragStop", function(d) {
                c(a(d));
                b(d.target.ownerDocument.body).css("cursor", "")
            })
    }, _move:function() {
        function a(l) {
            i.setCapture ? (i.setCapture(!0), b(i).bind("losecapture", c)) : (j.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP), b.bind(j).bind("blur", c));
            l.preventDefault();
            j.getSelection ? j.getSelection().removeAllRanges() : k.selection.empty();
            var n = d._moOrgPos, t = n._nMouseY, n = Math.abs(n._nMouseX - l.clientX), t = Math.abs(t - l.clientY);
            if(d._mnState == e) {
                if(n > h.distance || t > h.distance) {
                    d._mnState = f, d._start(l), d._moElement$.trigger("dragStart", [l, {helper:d._moMover$, position:{left:0, right:0}, offset:{left:0, right:0}}])
                }
            }else {
                d._mnState = g, d._drag(l), d._moElement$.trigger("drag", [l, {helper:d._moMover$, position:{left:0, right:0}, offset:{left:0, right:0}}])
            }
        }
        function c(g) {
            d._mnState != e && (d._mnState = e, d._moElement$.trigger("dragStop", [g, {helper:d._moMover$, position:{left:0, right:0}, offset:{left:0, right:0}}]), d._stop(g));
            b(k).unbind("mousemove", a).unbind("mouseup", c);
            i.releaseCapture ? (i.releaseCapture(), b(i).unbind("losecapture", c)) : (j.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP), b(j).unbind("blur", c))
        }
        var d = this, h = d._moOptions, i = d._moElement$[0], k = i.ownerDocument, j = k.parentWindow || k.defaultView;
        b(k).bind("mousemove", a);
        b(k).bind("mouseup", c)
    }, _start:function(a) {
        var b = this._moOptions;
        this._moMover$ = this._getMover(a);
        this._moMover = this._moMover$[0];
        this._moOrgStyle = {_zIndex:this._moMover$.css("zIndex"), _opacity:this._moMover$.css("opacity")};
        this._moMover$.css("zIndex", "10001").css("opacity", b.opacity);
        this._moMover$.css("display", "block")
    }, _drag:function(b) {
        var c = this._moOptions;
        with(this._moMover.style) {
            if(c.cursorAt) {
                b = a(b), left = b[0] + (c.cursorAt.left || 0) + "px", top = b[1] + (c.cursorAt.right || 0) + "px"
            }else {
                for(var d = this._moMover$.parent("*").offset() || {left:0, top:0}, e = this._moMover, g = {top:0, left:0}, h = e.offsetParent;e && e != h;) {
                    g.top += e.scrollTop, g.left += e.scrollLeft, e = e.parentNode
                }
                e = this._moOrgPos;
                c.lockx || (left = e._nDomX + b.clientX - e._nMouseX - d.left + g.left + "px");
                c.locky || (top = e._nDomY + b.clientY - e._nMouseY - d.top + g.top + "px");
                if(this._moContainer$) {
                    var b = this._moMover$.offset(), d = this._moContainer$.offset(), g = this._moMover.clientHeight, e = this._moMover.clientWidth, h = this._moContainer$.innerHeight(), f = this._moContainer$.innerWidth(), i = Math.ceil(this._moContainer$.css("border-left-width").replace(/px/, "")), k = Math.ceil(this._moContainer$.css("border-top-width").replace(/px/, ""));
                    b.left < d.left + i && !c.lockx ? left = this._moMover.offsetLeft + (d.left + i - b.left) + "px" : b.left + e > d.left + i + f && !c.lockx && (left = this._moMover.offsetLeft + (d.left + i + f) - (b.left + e) + "px");
                    b.top < d.top + k && !c.locky ? top = this._moMover.offsetTop + (d.top + k - b.top) + "px" : b.top + g > d.top + k + h && !c.locky && (top = this._moMover.offsetTop + (d.top + k + h) - (b.top + g) + "px")
                }
            }
        }
    }, _stop:function() {
        var a = this._moOptions.helper;
        "original" === a ? this._moMover$.css("zIndex", this._moOrgStyle._zIndex).css("opacity", this._moOrgStyle._opacity) : "clone" === a ? (this._moElement$.css("opacity", 1), this._moMover$.remove(), this._moMover = null) : this._moMover$.css("left", "-1000px").css("top", "-1000px").hide()
    }, _getMover:function(a) {
        var c = this._moElement$, d = this._moOptions, e = d.helper, g;
        g = "original" === e ? c : "clone" === e ? b(c[0].cloneNode(!0)) : b(e);
        var h = d.cursorAt ? a.clientY + (d.cursorAt.right || 0) + "px" : c.attr("offsetTop") - (parseInt(c.css("margin-top")) || 0) + "px", a = d.cursorAt ? a.clientX + (d.cursorAt.left || 0) + "px" : c.attr("offsetLeft") - (parseInt(c.css("margin-left")) || 0) + "px";
        g.css("top", h).css("left", a).css("position", "absolute");
        "clone" === e && c.parent("*").append(g);
        return g
    }};
    var l = {getPos:function(a) {
        var b = a.offset(), c = a.attr("offsetWidth"), a = a.attr("offsetHeight");
        return[b.top, b.left + c, b.top + a, b.left]
    }}, j = function(a, c) {
        this._moElement$ = a;
        this._moOptions = b.extend({}, l, c);
        this._mnState = void 0;
        this._init()
    };
    j.prototype = {option:function(a, b) {
        var c = this._moOptions;
        b && (c[a] = b);
        return c[a]
    }, _init:function() {
        var a = this;
        a._moOptions.group && a._moElement$.bind(i, function(b) {
            a.listen(b)
        })
    }, listen:function(a) {
        var b = this, c = a.state, d = a.pos, g = a.cursorPos, h = b._mnState;
        b._mnState = b._isOver(b._moOptions.overByCursor ? g : d, b._moOptions.getPos(b._moElement$)) ? c == e ? 2 : 0 : 1;
        h != b._mnState && 2 != h && (0 == b._mnState ? b._mnDropOverTimer = setTimeout(function() {
            b._moElement$.trigger("dropOverLong", [a])
        }, 800) : 1 == b._mnState && clearTimeout(b._mnDropOverTimer), b._moElement$.trigger(["dropOver", "dropOut", "drop"][b._mnState], [a]))
    }, _isOver:function(a, b) {
        var c = a[0], d = a[1], e = b[1], g = b[0], h = b[2];
        return c > b[3] && c < e && d > g && d < h
    }};
    b.fn.draggable = function(a) {
        this.each(function() {
            new k(b(this), a)
        });
        return this
    };
    b.fn.droppable = function(a) {
        var c, e = a.group || "default-group";
        d = d || {};
        c = d[e] || [];
        this.each(function(d) {
            var e = !1;
            new j(b(this), a);
            for(var g = 0;g < c.length;g++) {
                d == c[g] && (e = !0)
            }
            !e && c.push(d)
        });
        d[e] = c;
        return this
    }
})(jQuery, this);
window.jQuery && function(b) {
    b.extend({xml2json:function(c, f) {
        function g(a, c) {
            if(!a) {
                return null
            }
            var h = "", j = null;
            e(a.localName || a.nodeName);
            a.childNodes && 0 < a.childNodes.length && b.each(a.childNodes, function(a, b) {
                var c = b.nodeType, f = e(b.localName || b.nodeName), i = b.text || b.nodeValue || "";
                8 != c && (3 == c || 4 == c || !f ? i.match(/^\s+$/) || (h += i.replace(/^\s+/, "").replace(/\s+$/, "")) : (j = j || {}, j[f] ? (j[f].length || (j[f] = d(j[f])), j[f] = d(j[f]), j[f][j[f].length] = g(b, !0), j[f].length = j[f].length) : j[f] = g(b)))
            });
            a.attributes && 0 < a.attributes.length && (j = j || {}, b.each(a.attributes, function(a, b) {
                var c = e(b.name), g = b.value;
                j[c] ? (j[cnn] = d(j[cnn]), j[c][j[c].length] = g, j[c].length = j[c].length) : j[c] = g
            }));
            if(j) {
                j = b.extend("" != h ? new String(h) : {}, j || {});
                if(h = j.text ? ("object" == typeof j.text ? j.text : [j.text || ""]).concat([h]) : h) {
                    j.text = h
                }
                h = ""
            }
            var n = j || h;
            if(f) {
                h && (n = {});
                if(h = n.text || h || "") {
                    n.text = h
                }
                c || (n = d(n))
            }
            return n
        }
        if(!c) {
            return{}
        }
        var e = function(a) {
            return("" + (a || "")).replace(/-/g, "_")
        }, d = function(a) {
            b.isArray(a) || (a = [a]);
            a.length = a.length;
            return a
        };
        "string" == typeof c && (c = b.text2xml(c));
        if(c.nodeType) {
            if(3 == c.nodeType || 4 == c.nodeType) {
                return c.nodeValue
            }
            var a = 9 == c.nodeType ? c.documentElement : c, h = g(a, !0), a = c = null;
            return h
        }
    }, text2xml:function(c) {
        var f;
        try {
            var g = b.browser.msie ? new ActiveXObject("Microsoft.XMLDOM") : new DOMParser;
            g.async = !1
        }catch(e) {
            throw Error("XML Parser could not be instantiated");
        }
        try {
            f = b.browser.msie ? g.loadXML(c) ? g : !1 : g.parseFromString(c, "text/xml")
        }catch(d) {
            throw Error("Error parsing XML string");
        }
        return f
    }})
}(jQuery);
(function(b, c) {
    var f = function(e, d) {
        function a() {
            f.is(":visible") && (f.outerHeight(!0) == g._nContentHeight && k.innerHeight() == g._nContainerHeight || g._resize())
        }
        var g = this;
        g._option = {opacity:0.8, rate:5, deltaRate:10, minHeight:20, maxMouseWheelContentScroll:50, onscroll:function() {
        }, callback4stop:function() {
        }};
        b.extend(g._option, d);
        var f = g._oContent$ = e, k = g._oContainer$ = e.parent(), l = g._oBarBox$ = b("<div/>").addClass("scrollbarBox"), j = g._oBar$ = b("<div/>").addClass("scrollbar");
        j.offsetTop = 0;
        j.setTop = function(a) {
            j.offsetTop = a;
            return j
        };
        j.getTop = function() {
            return j.offsetTop
        };
        j.setHeight = function(a) {
            a = Math.floor(a);
            j.css("height", a);
            g._nBarScrollHeight = g._nContainerHeight - a;
            return j
        };
        j.checkStopTimeout = null;
        j.moveTo = function(a, b) {
            j.isShow() && (0 > a && (a = 0), a > g._nBarScrollHeight && (a = g._nBarScrollHeight), j.setTop(a).css("top", Math.round(a)), j.moved(b))
        };
        j.moved = function(a) {
            clearTimeout(j.checkStopTimeout);
            j.appear();
            var b = Math.ceil(g._getScrollDestPos());
            f.css("top", b);
            a || g._option.onscroll && g._option.onscroll(b);
            j.checkStopTimeout = setTimeout(g._option.callback4stop, 100);
            return j
        };
        j.timeout = null;
        j.opacity = g._option.opacity;
        j.autoDisappear = !0;
        j.appear = function() {
            j.timeout && (clearTimeout(j.timeout), j.timeout = null);
            j.stop(!0).css({opacity:j.opacity});
            j.autoDisappear && j.disappear()
        };
        j.disappear = function() {
            j.timeout || (j.timeout = setTimeout(function() {
                j.stop(!0).animate({opacity:0}, "fast")
            }, 1E3))
        };
        g._resize();
        j.css({position:"absolute", right:"0", top:"0", display:"none"}).draggable({container:k, lockx:!0, distance:0}).on("drag", function() {
            j.setTop(j.position().top).moved()
        });
        l.css({position:"absolute", right:"0", top:"0", height:"100%"}).on("mouseenter", function() {
            j.autoDisappear = !1;
            j.appear()
        }).on("mouseleave", function() {
                j.autoDisappear = !0;
                j.disappear()
            });
        f.css({position:"absolute"});
        k.append(l.append(j)).css({"overflow-y":"hidden", position:"relative"}).mousewheel(function(a, b) {
            var c = parseInt(j.css("top")) - b * g._nDeltaRate;
            j.moveTo(c)
        }).on("mouseenter", function() {
                j.appear()
            }).data({scrollTop:function(a) {
                if(!a && 0 != a) {
                    return-parseInt(f.css("top"))
                }
                j.moveTo(parseInt(a) / g._nRate);
                return null
            }, heightChanged:function() {
                a()
            }, scrollBarDestroy:function() {
                g.destroy()
            }});
        g._oContentHeightInterval = setInterval(a, 500);
        debug(function() {
            c.scrollBars || (c.scrollBars = {});
            var a = 0, b;
            for(b in c.scrollBars) {
                ++a
            }
            a = k.attr("id") || k.attr("class") || f.attr("id") || f.attr("class") || "noname" + a;
            c.scrollBars[a] = g
        });
        return{resize:function() {
            g._resize()
        }, moveTo:function(a, b) {
            j.moveTo(a, b)
        }, destroy:function() {
            g.destroy()
        }}
    };
    f.prototype = {constructor:f, _resize:function() {
        this._nContentHeight = this._oContent$.outerHeight(!0);
        this._nContainerHeight = this._oContainer$.innerHeight();
        this._nRate = this._option.rate;
        this._nDeltaRate = this._option.deltaRate;
        this._nContentScrollBottom = this._nContentHeight - this._nContainerHeight;
        if(this._nContentHeight <= this._nContainerHeight) {
            this._oContent$.css("top", "0"), this._oBar$.hide()
        }else {
            var b = this._getBarHeightWithRate(), c = -parseInt(this._oContent$.css("top")) / this._nRate;
            this._reCalculateDeltaRate();
            this._oBar$.setHeight(b).moveTo(c, !0);
            this._oBar$.show().appear()
        }
    }, _getBarHeightWithRate:function() {
        var b = this._option.minHeight, c = b, c = this._nContainerHeight - this._nContentScrollBottom / this._nRate;
        c < b && (c = b, this._nRate = this._nContentScrollBottom / (this._nContainerHeight - c));
        return c
    }, _getScrollDestPos:function() {
        var b = this._oBar$.getTop() * this._nRate, b = b <= this._nContentScrollBottom ? b : this._nContentScrollBottom;
        return-b
    }, _reCalculateDeltaRate:function() {
        var b = this._option.maxMouseWheelContentScroll;
        this._nDeltaRate * this._nRate <= b || (this._nDeltaRate = Math.floor(b / this._nRate), 1 > this._nDeltaRate && (this._nDeltaRate = 1))
    }, destroy:function() {
        this._oBarBox$.remove();
        this._oContainer$.removeData("scrollTop heightChanged scrollBarDestroy").off("mouseenter").unmousewheel();
        clearInterval(this._oContentHeightInterval);
        delete this
    }};
    b.fn.scrollable = function(c) {
        var d = this, a;
        d.each(function() {
            d.scrollBar = a = new f(b(this), c)
        });
        return a
    };
    var g = b.fn.scrollTop;
    b.fn.scrollTop = function(b) {
        if(!this.data("scrollTop")) {
            return g.apply(this, arguments)
        }
        this.data("heightChanged") && this.data("heightChanged")();
        var c = this.data("scrollTop")(b);
        return!c && 0 != c ? this : c
    }
})(jQuery, this);
(function(b, c) {
    function f(c) {
        var c = b(c), a = c.offset();
        return[a.top, a.left + c.width(), a.top + c.height(), a.left, c.width(), c.height()]
    }
    var g = function(b, a, c) {
        this._moResizeDom = null;
        this._moOptions = {maxContainer:null, minWidth:0, minHeight:0, scale:0};
        this._moCallBacks = {onready:function() {
        }, onresize:function() {
        }, oncomplete:function() {
        }};
        this._init(b, a, c)
    };
    g.prototype = {setTriggers:function(c) {
        var a = this;
        b.each(c, function(c, d) {
            b(d).off("mousedown").on("mousedown", function(b) {
                a._start(b, a._getResizeFunc(d[1]))
            })
        });
        b(a._moResizeDom).mousewheel(function(b, c) {
            var d = 6 * c;
            a._computeOriPos(b);
            a._getResizeFunc("left-top")(-d, -d);
            a._computeOriPos(b);
            a._getResizeFunc("right-bottom")(d, d);
            a._moCallBacks.onresize.call(a);
            b.preventDefault()
        })
    }, getResizeDom:function() {
        return this._moResizeDom
    }, _init:function(c, a, e) {
        this._moResizeDom = c;
        this._moDocument = c.ownerDocument;
        this._moWindow = this._moDocument.parentWindow || this._moDocument.defaultView;
        b.extend(this._moOptions, a);
        b.extend(this._moCallBacks, e)
    }, _start:function(c, a) {
        var e = this;
        e._computeOriPos(c);
        e._moCallBacks.onready.call(e);
        c.stopPropagation();
        b(e._moDocument).off("mousemove").on("mousemove", e._moOnMouseMove = function(b) {
            e._resize(b, a)
        });
        b(e._moDocument).off("mouseup").on("mouseup", e._moOnMouseUp = function(b) {
            e._stop(b, a)
        });
        e._moResizeDom.setCapture && (e._moResizeDom.setCapture(), b(e._moResizeDom).off("losecapture").on("losecapture", e._moOnMouseUp));
        return e
    }, _resize:function(c, a) {
        this._moWindow.getSelection ? this._moWindow.getSelection().removeAllRanges() : this._moDocument.selection.empty();
        var e = c.clientX + b(document.body).scrollLeft(), g = c.clientY + b(document.body).scrollTop();
        a.call(this, e - this._mnMouseX, g - this._mnMouseY);
        this._moCallBacks.onresize.call(this);
        return this
    }, _stop:function() {
        b(this._moDocument).off("mousemove", this._moOnMouseMove).off("mouseup", this._moOnMouseUp);
        this._moResizeDom.releaseCapture && (this._moResizeDom.releaseCapture(), b(this._moResizeDom).off("losecapture", this._moOnMouseUp));
        this._moCallBacks.oncomplete.call(this);
        return this
    }, _computeOriPos:function(c) {
        var a = this._moResizeDom, e = this._moOptions.maxContainer;
        this._mnMouseX = c.clientX + b(document.body).scrollLeft();
        this._mnMouseY = c.clientY + b(document.body).scrollTop();
        this._moPos = f(a);
        this._mnTop = a.offsetTop;
        this._mnLeft = a.offsetLeft;
        this._mnHeight = b.browser.msie ? this._moPos[5] : a.clientHeight;
        this._mnWidth = b.browser.msie ? this._moPos[4] : a.clientWidth;
        e && (this._moContainerPos = e && f(e), this._mnDiffTop = this._moContainerPos[0] - this._moPos[0], this._mnDiffLeft = this._moContainerPos[3] - this._moPos[3], this._mnDiffBottom = this._moContainerPos[2] - this._moPos[2], this._mnDiffRight = this._moContainerPos[1] - this._moPos[1]);
        return this
    }, _computeDiff:function(b, a, c, e, g, f, j, n) {
        var m = this._moOptions;
        m.scale ? c && !e ? a = b / m.scale * (f && j || g && n ? -1 : 1) : !c && e ? b = a * m.scale * (f && j || g && n ? -1 : 1) : c && e && (Math.abs(b) > Math.abs(m.scale * a) ? a = b / m.scale * (f && j || g && n ? -1 : 1) : Math.abs(b) < Math.abs(m.scale * a) && (b = a * m.scale * (f && j || g && n ? -1 : 1))) : (b = c ? b : 0, a = e ? a : 0);
        if(m.maxContainer) {
            var q = f && this._moPos[3] + b < this._moContainerPos[3], p = j && this._moPos[2] + a > this._moContainerPos[2], r = n && this._moPos[1] + b > this._moContainerPos[1];
            if(g && this._moPos[0] + a < this._moContainerPos[0]) {
                return this._computeDiff(m.scale ? 0 : b, this._mnDiffTop, c, !0, g, f, j, n)
            }
            if(q) {
                return this._computeDiff(this._mnDiffLeft, m.scale ? 0 : a, !0, e, g, f, j, n)
            }
            if(p) {
                return this._computeDiff(m.scale ? 0 : b, this._mnDiffBottom, c, !0, g, f, j, n)
            }
            if(r) {
                return this._computeDiff(this._mnDiffRight, m.scale ? 0 : a, !0, e, g, f, j, n)
            }
        }
        c = this._mnHeight + (j ? a : -a) < m.minHeight;
        return this._mnWidth + (n ? b : -b) < m.minWidth || c ? null : [b, a]
    }, _getResizeFunc:function(b) {
        function a(a, b) {
            j.top = f._mnTop + b + "px";
            j.height = f._mnHeight - b + "px"
        }
        function c(a) {
            j.left = f._mnLeft + a + "px";
            j.width = f._mnWidth - a + "px"
        }
        function e(a, b) {
            j.height = f._mnHeight + b + "px"
        }
        function g(a) {
            j.width = f._mnWidth + a + "px"
        }
        var f = this, j = f._moResizeDom.style;
        switch(b.toLowerCase()) {
            case "top":
                return function(b, d) {
                    var e = f._computeDiff(b, d, !1, !0, !0, !0);
                    e && a(e[0], e[1]);
                    e && c(e[0], e[1])
                };
            case "left":
                return function(b, d) {
                    var e = f._computeDiff(b, d, !0, !1, !0, !0);
                    e && a(e[0], e[1]);
                    e && c(e[0], e[1])
                };
            case "bottom":
                return function(a, b) {
                    var c = f._computeDiff(a, b, !1, !0, !1, !1, !0, !0);
                    c && e(c[0], c[1]);
                    c && g(c[0], c[1])
                };
            case "right":
                return function(a, b) {
                    var c = f._computeDiff(a, b, !0, !1, !1, !1, !0, !0);
                    c && e(c[0], c[1]);
                    c && g(c[0], c[1])
                };
            case "left-top":
                return function(b, d) {
                    var e = f._computeDiff(b, d, !0, !0, !0, !0);
                    e && a(e[0], e[1]);
                    e && c(e[0], e[1])
                };
            case "right-top":
                return function(b, c) {
                    var d = f._computeDiff(b, c, !0, !0, !0, !1, !1, !0);
                    d && a(d[0], d[1]);
                    d && g(d[0], d[1])
                };
            case "left-bottom":
                return function(a, b) {
                    var d = f._computeDiff(a, b, !0, !0, !1, !0, !0, !1);
                    d && e(d[0], d[1]);
                    d && c(d[0], d[1])
                };
            case "right-bottom":
                return function(a, b) {
                    var c = f._computeDiff(a, b, !0, !0, !1, !1, !0, !0);
                    c && e(c[0], c[1]);
                    c && g(c[0], c[1])
                };
            default:
                return function() {
                    debug("undifined direction")
                }
        }
    }};
    var e = c.QMImgCropper = function(b, a, c) {
        this._moContainer = null;
        this._msImgPath = "";
        this._moPreviewImgs = [];
        this._moOptions = {resizeScale:1, previewDoms:[]};
        this._moCallBacks = {onready:function() {
        }, onmove:function() {
        }, onresize:function() {
        }};
        this._init(b, a, c)
    };
    e.prototype = {setImg:function(b) {
        this._msImgPath = b;
        this._setLayer()
    }, getImg:function() {
        return this._msImgPath
    }, getPos:function() {
        var b = this._getCropperPos();
        return[Math.round(b[0] * this._mnImageHeight / this._mnImgStyleHeight), Math.round(b[3] * this._mnImageWidth / this._mnImgStyleWidth), Math.round(b[4] * this._mnImageHeight / this._mnImgStyleHeight), Math.round(b[5] * this._mnImageWidth / this._mnImgStyleWidth), Math.round(this._mnImageWidth), Math.round(this._mnImageHeight)]
    }, _init:function(c, a, e) {
        this._moContainer = c;
        this._moDocument = c.ownerDocument;
        this._moWindow = this._moDocument.parentWindow || this._moDocument.defaultView;
        b.extend(this._moOptions, a);
        b.extend(this._moCallBacks, e)
    }, _setLayer:function() {
        function c() {
            var g = e.clientHeight, f = e.clientWidth;
            b(a._moWrapper).show();
            a._mnImageHeight = a._moBaseImg.height;
            a._mnImageWidth = a._moBaseImg.width;
            var i = a._getSize([g, f], [a._mnImageHeight, a._mnImageWidth]);
            a._mnImgStyleHeight = i[0];
            a._mnImgStyleWidth = i[1];
            with(a._moWrapper.style) {
                height = i[0] + "px", width = i[1] + "px", top = (g - i[0]) / 2 + "px", left = (f - i[1]) / 2 + "px"
            }
            with(a._moBaseImg.style) {
                height = i[0] + "px", width = i[1] + "px", position = "absolute"
            }
            b(a._moBaseImg).css("opacity", 0.6);
            with(a._moCropperImg.style) {
                height = a._mnImgStyleHeight + "px", width = a._mnImgStyleWidth + "px", position = "absolute", zIndex = "100"
            }
            a._moPreviewImgs = [];
            g = 0;
            for(f = a._moOptions.previewDoms;g < f.length;g++) {
                i = a._moDocument.createElement("img"), i.src = a._msImgPath, i.style.position = "absolute", f[g].style.overflow = "hidden", f[g].style.position = "relative", f[g].innerHTML = "", a._moPreviewImgs.push(f[g].appendChild(i))
            }
            a._setCropper();
            b(a._moBaseImg).off("load", c);
            a._moCallBacks.onready()
        }
        var a = this, e = a._moContainer, g = a._moDocument.createElement("div"), f = a._moDocument.createElement("img"), l = a._moDocument.createElement("img");
        e.innerHTML = "";
        g.style.position = "relative";
        g.style.backgroundColor = "#000";
        g.style.display = "none";
        a._moWrapper = e.appendChild(g);
        a._moBaseImg = a._moWrapper.appendChild(f);
        a._moCropperImg = a._moWrapper.appendChild(l);
        b(a._moBaseImg).on("load", c);
        f.src = l.src = a._msImgPath;
        return a
    }, _setCropper:function() {
        function c() {
            var b = a._getCropperPos();
            a._moCropperImg.style.clip = "rect(" + (b[0] + 1) + "px," + (b[1] + 1) + "px," + (b[2] + 1) + "px," + (b[3] + 1) + "px)";
            a._setPreview()
        }
        var a = this, f = b.now(), i = a._moOptions.resizeScale, k, l, j, n;
        k = 0;
        b.browser.msie || (k = 2);
        a._mnImgStyleWidth / a._mnImgStyleHeight > i ? (j = a._mnImgStyleHeight - k, n = j * i, k = 0, l = (a._mnImgStyleWidth - n) / 2) : (n = a._mnImgStyleWidth - k, j = n / i, k = (a._mnImgStyleHeight - j) / 2, l = 0);
        b(a._moWrapper).append(b.tmpl(e.TMPL.cropper, {_id:f, top:k + "px", left:l + "px", height:j + "px", width:n + "px"}));
        a._moCropper = b("#resizedom_" + f, a._moDocument)[0];
        var m = [[b("#rUp_" + f, a._moDocument)[0], "top"], [b("#rLeft_" + f, a._moDocument)[0], "left"], [b("#rDown_" + f, a._moDocument)[0], "bottom"], [b("#rRight_" + f, a._moDocument)[0], "right"], [b("#rLeftUp_" + f, a._moDocument)[0], "left-top"], [b("#rLeftDown_" + f, a._moDocument)[0], "left-bottom"], [b("#rRightUp_" + f, a._moDocument)[0], "right-top"], [b("#rRightDown_" + f, a._moDocument)[0], "right-bottom"]];
        (new g(a._moCropper, {maxContainer:a._moWrapper, scale:i}, {onresize:function() {
            c();
            a._moCallBacks.onresize()
        }})).setTriggers(m);
        b(a._moCropper).draggable({container:a._moWrapper}).bind("dragStart", function() {
            b.each(m, function(a, c) {
                b(c[0]).hide()
            })
        }).bind("drag", function() {
                c();
                a._moCallBacks.onmove()
            }).bind("dragStop", function() {
                b.each(m, function(a, c) {
                    b(c[0]).show()
                })
            });
        c();
        return a
    }, _setPreview:function() {
        for(var b = this._moOptions.previewDoms, a = this._moPreviewImgs, c = this._getCropperPos(), e = 0;e < a.length;e++) {
            var g = b[e].clientHeight, f = b[e].clientWidth;
            with(a[e].style) {
                c[4] && c[5] && (height = this._mnImgStyleHeight * g / c[4] + "px", width = this._mnImgStyleWidth * f / c[5] + "px", top = -(c[0] * g / c[4]) + "px", left = -(c[3] * f / c[5]) + "px")
            }
        }
        return this
    }, _getSize:function(b, a) {
        if(b[0] > a[0] && b[1] > a[1]) {
            return a
        }
        if(a[0] * b[1] > a[1] * b[1]) {
            var c = b[0] * a[1] / (a[0] || 1);
            return c > b[1] ? [b[1] * b[0] / c, b[1]] : [b[0], c]
        }
        c = a[0] * b[1] / (a[1] || 1);
        return c > b[0] ? [b[0], b[1] * b[0] / c] : [c, b[1]]
    }, _getCropperPos:function() {
        var b = this._moCropper;
        return[b.offsetTop, b.offsetLeft + b.clientWidth, b.offsetTop + b.clientHeight, b.offsetLeft, b.clientHeight, b.clientWidth]
    }};
    e.TMPL = {cropper:'<div id="resizedom_<#=_id#>" style="border:1px dashed #ccc; width:<#=width#>; height:<#=height#>; top:<#=top#>; left:<#=left#>; position:absolute;cursor:move;z-index:200;"><div id="rRightDown_<#=_id#>" style="position:absolute;background:#FFF;border: 1px solid #333;width: 6px;height: 6px;z-index:500;font-size:0;opacity: 0.5;filter:alpha(opacity=50);cursor:nw-resize;right:-4px;bottom:-4px;background-color:#00F;"> </div><div id="rLeftDown_<#=_id#>" style="position:absolute;background:#FFF;border: 1px solid #333;width: 6px;height: 6px;z-index:500;font-size:0;opacity: 0.5;filter:alpha(opacity=50);cursor:ne-resize;left:-4px;bottom:-4px;"> </div><div id="rRightUp_<#=_id#>" style="position:absolute;background:#FFF;border: 1px solid #333;width: 6px;height: 6px;z-index:500;font-size:0;opacity: 0.5;filter:alpha(opacity=50);cursor:ne-resize;right:-4px;top:-4px;"> </div><div id="rLeftUp_<#=_id#>" style="position:absolute;background:#FFF;border: 1px solid #333;width: 6px;height: 6px;z-index:500;font-size:0;opacity: 0.5;filter:alpha(opacity=50);cursor:nw-resize;left:-4px;top:-4px;"> </div><div id="rRight_<#=_id#>" style="position:absolute;background:#FFF;border: 1px solid #333;width: 6px;height: 6px;z-index:500;font-size:0;opacity: 0.5;filter:alpha(opacity=50);cursor:e-resize;right:-4px;top:50%;margin-top:-4px;"> </div><div id="rLeft_<#=_id#>" style="position:absolute;background:#FFF;border: 1px solid #333;width: 6px;height: 6px;z-index:500;font-size:0;opacity: 0.5;filter:alpha(opacity=50);cursor:e-resize;left:-4px;top:50%;margin-top:-4px;"> </div><div id="rUp_<#=_id#>" style="position:absolute;background:#FFF;border: 1px solid #333;width: 6px;height: 6px;z-index:500;font-size:0;opacity: 0.5;filter:alpha(opacity=50);cursor:n-resize;top:-4px;left:50%;margin-left:-4px;"> </div><div id="rDown_<#=_id#>" style="position:absolute;background:#FFF;border: 1px solid #333;width: 6px;height: 6px;z-index:500;font-size:0;opacity: 0.5;filter:alpha(opacity=50);cursor:n-resize;bottom:-4px;left:50%;margin-left:-4px;"> </div><div style="filter: alpha(opacity:0); opacity:0;BACKGROUND-COLOR: #fff; width: 100%; height: 100%; font-size: 0px;"/></div>'}
})(jQuery, this);
(function(b) {
    function c(b, c) {
        var d = c || window;
        return(d = d[b] || d.document[b]) && (d.length ? d[d.length - 1] : d)
    }
    function f(b) {
        if(!(this._mId = b.id)) {
            throw Error(0, "config.id can't use null");
        }
        if(!(this._mWin = b.win)) {
            throw Error(0, "config.win win is null");
        }
        this._mFlash = b.flash;
        this._moConstructor = this.constructor;
        this._mEvent = b;
        this._initlize()
    }
    _goStatic = f;
    _goClass = _goStatic.prototype;
    _goStatic.get = function(b, c) {
        var d = c[this._CONST._CACHES];
        return d && d[b]
    };
    _goStatic.getFlashVer = function() {
        var b = "", c = -1, d = -1, a = -1, f = navigator.plugins;
        if(f && f.length) {
            for(var i = 0, k = f.length;i < k;i++) {
                var l = f[i];
                if(-1 != l.name.indexOf("Shockwave Flash")) {
                    b = l.description.split("Shockwave Flash ")[1];
                    c = parseFloat(b);
                    a = parseInt(b.split("r")[1]);
                    d = parseInt(b.split("b")[1]);
                    break
                }
            }
        }else {
            try {
                if(i = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) {
                    b = i.GetVariable("$version").split(" ")[1], k = b.split(","), c = parseFloat(k.join(".")), a = parseInt(k[2]), d = parseInt(k[3])
                }
            }catch(j) {
            }
        }
        return{version:(isNaN(c) ? -1 : c) || -1, build:(isNaN(a) ? -1 : a) || -1, beta:(isNaN(d) ? -1 : d) || -1, desc:b}
    };
    _goStatic.isSupported = function() {
        var b = this.getFlashVer();
        return 10 <= b.version || 9 == b.version && 50 < b.build
    };
    _goStatic._CONST = {_TIMEOUT:5E3, _CACHES:"qmFlashCaches_ASDr431gGas", _CALLBACK:"onFlashEvent_ASDr431gGas"};
    _goClass.getFlash = function() {
        return this._mFlash || c(this._mId, this._mWin)
    };
    _goClass.isDisabled = function() {
        return this._mDisabled || !1
    };
    _goClass.disable = function(b) {
        this._mDisabled = !1 != b;
        return this
    };
    _goClass.setup = function(b) {
        function c(a, e) {
            try {
                b.call(d, a, e)
            }catch(f) {
            }
        }
        var d = this;
        this._getLoadedPercent(function(a) {
            100 == a ? setTimeout(function() {
                try {
                    if(!d.getFlash().setup(f._CONST._CALLBACK, d._mId)) {
                        return c(!1, "setuperr")
                    }
                }catch(a) {
                    return c(!1, "nosetup")
                }
                c(!0)
            }) : "number" != typeof a && c(!1, a)
        })
    };
    _goClass._getLoadedPercent = function(c) {
        function e(a) {
            try {
                c.call(d, a)
            }catch(b) {
            }
        }
        var d = this, a = this.getFlash();
        if(!a) {
            return e("notfound")
        }
        var h = 0;
        (function() {
            var c = arguments.callee;
            c._startTime || (c._startTime = b.now());
            var d = 0, g = !1;
            try {
                d = a.PercentLoaded()
            }catch(j) {
                g = !0
            }
            d != h && e(h = d);
            100 != d && (b.now() - c._startTime > f._CONST._TIMEOUT ? e(g ? "noflash" : "timeout") : setTimeout(c, 100))
        })()
    };
    _goClass._initlize = function() {
        var b = this._mWin, c = this._moConstructor._CONST, d = c._CACHES, c = c._CALLBACK;
        b[d] || (b[d] = new b.Object);
        b[d][this._mId] = this;
        b[c] || (b[c] = function() {
            var a = arguments[1], c = b[d][arguments[0]];
            if(c && "function" == typeof c._mEvent[a]) {
                for(var e = [], f = 2, l = arguments.length;f < l;f++) {
                    e.push(arguments[f])
                }
                c._mEvent[a].apply(c, e)
            }
        })
    };
    b.generateFlashCode = function(c, e, d, a) {
        var f = [], i = [], k = [], a = a || {}, l = b.browser.msie ? '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" <#=codebase#> <#=attr#> <#=id#> ><#=param#></object>' : '<embed <#=embed#> type="application/x-shockwave-flash" <#=pluginspage#>  <#=name#> <#=id#> ></embed>';
        a.allowscriptaccess = d && d.allowscriptaccess || "always";
        a.quality = "high";
        for(var j in a) {
            var n = {name:j, value:a[j]};
            i.push(b.tmpl('<param name="<#=name#>" value="<#=value#>" />', n));
            k.push(b.tmpl(" <#=name#>=<#=value#> ", n))
        }
        for(j in d) {
            n = {name:j, value:d[j]}, f.push(b.tmpl(" <#=name#>=<#=value#> ", n)), k.push(b.tmpl(" <#=name#>=<#=value#> ", n))
        }
        e && (i.push(b.tmpl('<param name="<#=name#>" value="<#=value#>" />', {name:"movie", value:e})), k.push(b.tmpl(" <#=name#>=<#=value#> ", {name:"src", value:e})));
        return b.tmpl(l, {id:c && [' id="', c, '"'].join(""), name:c && [' name="', c, '"'].join(""), attr:f.join(""), param:i.join(""), embed:k.join(""), codebase:"https:" == location.protocol ? "" : 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" ', pluginspage:"https:" == location.protocol ? "" : 'pluginspage="http://www.adobe.com/cn/products/flashplayer" '})
    };
    b.getFlash = c;
    b.qmFlash = f
})(jQuery, this);
(function(b, c) {
    var f = {};
    c.WebMM = b.extend(c.WebMM || {}, {triggerEvent:function(g, e, d) {
        setTimeout(function() {
            b(c.document.body).trigger("globalevent", {type:g, range:!d && "all", data:e});
            f[g] && f[g](e)
        }, 0)
    }, addEventListener:function(b, c) {
        f[b] = c
    }})
})(jQuery, this);
(function(b, c) {
    var f = {};
    c.model = c.model || function(c, e) {
        if(!e) {
            return f[c]
        }
        f[c] = b.extend(f[c] || {}, e)
    }
})(jQuery, WebMM, this);
(function(b, c) {
    var f = {};
    c.logic = c.logic || function(c, e) {
        if(!e) {
            return f[c]
        }
        f[c] = b.extend(f[c] || {}, e)
    }
})(jQuery, WebMM, this);
(function(b, c, f, g) {
    function e(a, c) {
        var d = b.parseURLParam(a);
        d.ctrl = a.split("?")[0];
        c && (d.child = arguments.callee(c));
        return d
    }
    function d(a) {
        a = b("#" + a);
        return a.length && a
    }
    var a = {base:Class({init:function(a, b) {
        var d = b || {};
        this._moChildren = {};
        this._msName = a;
        this._moDom$ = d.oDom$.attr("ctrl", 1);
        this._moDom$[0].ctrl = this;
        this._moParent = d.oParent;
        d.oParent = this;
        this._moComponets = c.ctrlComponents(this, d)
    }, getName:function() {
        return this._msName
    }, getParent:function() {
        return this._moParent
    }, _changeActive:function(a, b) {
        if(this._msLastHash != b) {
            this._moParams = a;
            this._msLastHash = b;
            for(var c = 0, d = this._moComponets.length;c < d;c++) {
                this._moComponets[c].active(a)
            }
            this.active(a)
        }
    }, active:function() {
    }, _inactive:function() {
        this._msLastHash = "";
        this.inactive && this.inactive()
    }, isActive:function() {
        return!!this._mbActive
    }, back:function() {
        b.history.back()
    }, isTopView:function() {
        return this.isActive() && !this._msActiveChild
    }, dispatch:function(a, b, c) {
        a = "on" + a.toLowerCase();
        this[a] && this[a](b, c)
    }, getDom$:function() {
        return this._moDom$
    }, getParam:function(a) {
        return(this._moParams || {})[a]
    }, html:function(a) {
        return a == g ? this._moDom$.html() : this._moDom$.html(a)
    }, onglobalevent:function(a) {
        var b = a.type;
        if("all" == a.range) {
            for(var c in this._moChildren) {
                this._moChildren[c].onglobalevent(a)
            }
        }else {
            if(this._msActiveChild) {
                this._moChildren[this._msActiveChild].onglobalevent(a)
            }
        }
        this[b] && this[b](a.data);
        c = 0;
        for(var d = this._moComponets.length;c < d;c++) {
            this._moComponets[c][b] && this._moComponets[c][b](a.data)
        }
    }, onhashchange:function(a, g) {
        var f = a.replace(/^#/ig, "").split("/"), h = e(f[0], f[1]);
        this._changeActive(h, f[0]);
        h.child && h.child.ctrl ? (h = h.child.ctrl, this._moChildren[h] || (this._moChildren[h] = c.ctrl(h, {oDom$:d(h, this._moDom$) || b("<div>").attr("un", h), oParent:this})), this._moChildren[h] && !1 !== this.switchChild(this._msActiveChild, h) && (f.shift(), this._moChildren[h].onhashchange(f.join("/") || h, g))) : this._msActiveChild && this.switchChild(this._msActiveChild, null);
        return this
    }, switchChild:function() {
    }}).Inherit({popupWindow:function(a, d, e, g, f) {
            var h = this.getDom$();
            h.html(b.tmpl("popupwindow")).find(".content").html(d);
            h.find(".header p").html(a);
            c.widget.screenCentral(h, b.extend({rawPosDom$:e, offset:g, showMask:!0, lightMask:!0}, f));
            h.draggable({handle:".header", cursor:"move"})
        }, showTips:function(a, d, e) {
            var g = b("#tips");
            g.find(".tipsDesc").html(a);
            g.find(".tipsIcon")[d ? "removeClass" : "addClass"]("errorIcon");
            c.widget.screenCentral(g, b.extend({showMask:!1, adjustPos:!1}, e));
            setTimeout(function() {
                g.hide()
            }, 1500)
        }, alert:function(a, b, c) {
            this._showTips(a || "", b, !0, !1, c)
        }, confirm:function(a, b, c) {
            this._showTips(a || "", b, !0, !0, c)
        }, closeAlertOrConfirm:function() {
            b("#redirectDialog").hide()
        }, _showTips:function(a, d, e, g, f) {
            var h = b("#redirectDialog"), q = h.find(".dialogContent"), a = b("<div></div>").html(a);
            q.html(a.addClass(f ? f : "default"));
            c.widget.screenCentral(h.show());
            d = b.extend({ok:function() {
            }, cancel:function() {
            }}, d);
            h.find("[un='ok']").off("click").on("click", function() {
                h.hide();
                d.ok(q)
            })[e ? "show" : "hide"]()[g ? "removeClass" : "addClass"]("singleBtn");
            h.find("[un='cancel']").off("click").on("click", function() {
                h.hide();
                d.cancel(q)
            })[g ? "show" : "hide"]();
            h.off("keydown").on("keydown", function(a) {
                b.isHotkey(a, "enter") ? (h.hide(), d.ok(q)) : b.isHotkey(a, "esc") ? (h.hide(), d.cancel(q)) : a.stopPropagation()
            })
        }, onhashchange:function(a, b) {
            b && b.addClass("active");
            this.Root.onhashchange.call(this, a)
        }, switchChild:function(a, b) {
            var c = a && a != b && this._moChildren[a].getDom$(), d = b && this._moChildren[b].getDom$();
            if(a != b && (c && c.hide(), d && d.show(), a && this._moChildren[a])) {
                this._moChildren[a]._mbActive = !1;
                this._moChildren[a]._inactive();
                c = 0;
                for(d = this._moChildren[a]._moComponets.length;c < d;c++) {
                    this._moChildren[a]._moComponets[c]._inactive()
                }
            }
            (this._msActiveChild = b) && this._moChildren[b] && (this._moChildren[b]._mbActive = !0);
            return!0
        }})}, h = {};
    b.extend(c || {}, {createCtrl:function() {
        var b = 2 == arguments.length && ["base"].concat([].slice.apply(arguments)) || arguments;
        a[b[1]] = (a[b[0]] || a.base).Inherit(b[2])
    }, ctrl:function(b, c) {
        return h[b] = a[b] && new a[b](b, c) || {}
    }, getCtrlInstants:function(a) {
        return h[a]
    }, ctrlComponents:function(c, e) {
        var g = [], f;
        for(f in a) {
            if(0 == f.indexOf(c.getName() + "_")) {
                var h = b.extend({}, e, {oDom$:d(f, c.getDom$()) || b("<div>").attr("un", f)});
                g.push(this.ctrl(f, h))
            }
        }
        return g
    }});
    c.widget = {}
})(jQuery, WebMM, this);
(function(b, c) {
    function f() {
        for(var c = [], a = 0, f = g.length;a < f;a++) {
            c.push("type=" + g[a].Type)
        }
        a = {BaseRequest:{Uin:0, Sid:0}, Count:g.length, List:g};
        b.netQueue("statReport").send("/cgi-bin/mmwebwx-bin/webwxstatreport?" + c.join("&"), a);
        clearTimeout(e);
        e = 0;
        g = []
    }
    var g = [], e;
    c.WebMM = b.extend(c.WebMM || {}, {ossLog:function(c) {
        c = b.extend({Type:1}, c);
        !g.length && 0 == e && (e = setTimeout(f, 6E4));
        g.push(c);
        10 <= g.length && f()
    }, flushOssLog:function() {
        f()
    }})
})(jQuery, this);
(function(b, c, f, g) {
    function e(a, e) {
        if(d <= a) {
            if(b.isFunction(e[0])) {
                b.safe(function() {
                    e[0]()
                });
                return
            }
            var g = "";
            try {
                g = c.model("account").getUserInfo().Uin
            }catch(k) {
                g = "Can't get."
            }
            for(var g = {Type:1, Text:JSON.stringify(e), Uin:g, Date:(new Date).getTime()}, l = 0;l < e.length;l++) {
                f.WebLog = b.formatDate(new Date, "hh:mm:ss") + "\n" + JSON.stringify(e[l]) + "\n\n" + f.WebLog
            }
            WebMM.ossLog(g)
        }
        c.vConsole && c.vConsole.print(a, e)
    }
    f.WebLog = "";
    var d = 1;
    f.Log = {level:function(a) {
        if(a == g) {
            return d
        }
        d = a
    }, i:function() {
        e(0, arguments)
    }, d:function() {
        e(1, arguments)
    }, w:function() {
        e(2, arguments)
    }, e:function() {
        e(3, arguments)
    }};
    f.onerror = function(a, b, d) {
        var e = {Type:2, Text:JSON.stringify({msg:a, line:d, url:b, func:arguments.callee.caller})};
        WebMM.ossLog(e);
        c.vConsole && c.vConsole.print(3, [e]);
        return!1
    };
    f.debug = Log.d
})(jQuery, WebMM, this);
(function(b, c, f) {
    function g(a) {
        if(!a) {
            return!1
        }
        var b = k[0], c = b.getAttribute("step");
        null == c && (c = 0);
        "right" == a ? 3 == c ? c = 0 : c++ : "left" == a && (0 == c ? c = 3 : c--);
        b.setAttribute("step", c);
        if(document.all) {
            switch(b.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(rotation=" + c + ")", c) {
                case 0:
                    b.parentNode.style.height = b.height;
                    break;
                case 1:
                    b.parentNode.style.height = b.width;
                    break;
                case 2:
                    b.parentNode.style.height = b.height;
                    break;
                case 3:
                    b.parentNode.style.height = b.width
            }
        }else {
            l = document.getElementById("canvas_pop_img");
            null == l && (l = document.createElement("canvas"), l.setAttribute("id", "canvas_pop_img"), b.parentNode.appendChild(l));
            a = l.getContext("2d");
            b.style.visibility = "hidden";
            b.style.position = "absolute";
            switch(c) {
                default:
                    ;
                case 0:
                    l.setAttribute("width", b.width);
                    l.setAttribute("height", b.height);
                    a.rotate(0 * Math.PI / 180);
                    a.drawImage(b, 0, 0);
                    break;
                case 1:
                    l.setAttribute("width", b.height);
                    l.setAttribute("height", b.width);
                    a.rotate(90 * Math.PI / 180);
                    a.drawImage(b, 0, -b.height);
                    break;
                case 2:
                    l.setAttribute("width", b.width);
                    l.setAttribute("height", b.height);
                    a.rotate(180 * Math.PI / 180);
                    a.drawImage(b, -b.width, -b.height);
                    break;
                case 3:
                    l.setAttribute("width", b.height), l.setAttribute("height", b.width), a.rotate(270 * Math.PI / 180), a.drawImage(b, -b.width, 0)
            }
            l.style.display = "block"
        }
    }
    function e(c, d) {
        var e = c.offset(), g = c.width(), k = c.height(), n = b(f).width(), m = b(f).height(), t = n / 1.5, F = m / 1.5, u = d[0].width, v = d[0].height, G = 2 * u, C = 2 * v, D = u / v, A = n / m;
        if(u > t || v > F) {
            D >= A ? (u = t, v = u / D) : (v = F, u = D * v)
        }
        var E = u / 2, B = v / 2, y = {left:(n - u) / 2, top:(m - v) / 2, width:u, height:v};
        d.width(g).height(k);
        l && (l.style.display = "none");
        d.css("width", "100%").css("height", "100%").css("left", "0");
        var w = d.parent();
        w.css({left:e.left, top:e.top, width:g, height:k}).show().animate(y, 500, "swing", function() {
            a.open().find('[opt="download"]').attr("url", i + "&fun=download");
            h == null && (h = w.find(".iconClose"));
            h.show().off("click").on("click", function() {
                h.hide();
                a.close();
                w.hide();
                b("#mask").off("click").stop().animate({opacity:0}, function() {
                    b("#mask").hide()
                })
            });
            var c = 1;
            j = function(a, b) {
                debug(a);
                debug(w.width());
                debug(w.height());
                debug(E);
                debug(B);
                if(!(a > 0 && (w.width() > G || w.height() > C))) {
                    if(!(a < 0 && (w.width() < E || w.height() < B))) {
                        c = c + 0.2 * a;
                        c < 0.5 && (c = 0.5);
                        var d = y.width, e = y.height;
                        y.width = u * c;
                        y.height = v * c;
                        y.left = parseInt(w.css("left")) - (y.width - d) * (b.offsetX / d || 0.5);
                        y.top = parseInt(w.css("top")) - (y.height - e) * (b.offsetY / e || 0.5);
                        w.css(y)
                    }
                }
            };
            d.bind("mousewheel", function(a, b) {
                j(Math.abs(b) / b, a)
            })
        })
    }
    var d = b("#slidePic"), a = b("#popImgOperator"), h = null, i, k, l, j, n;
    a.off("click").on("click", function(a) {
        var a = a.target, b = a.getAttribute("opt");
        if("zoomOut" == b) {
            j(2, {offsetX:0, offsetY:0})
        }else {
            if("zoomIn" == b) {
                j(-2, {offsetX:0, offsetY:0})
            }else {
                if("rotateLeft" == b) {
                    g("left")
                }else {
                    if("rotateRight" == b) {
                        g("right")
                    }else {
                        if("download" == b) {
                            var c = f.onbeforeunload;
                            f.onbeforeunload = null;
                            a.getAttribute("url") && (location.href = a.getAttribute("url"));
                            setTimeout(function() {
                                f.onbeforeunload = c
                            })
                        }
                    }
                }
            }
        }
    }).bind({mouseenter:function() {
            a.appear()
        }, mouseleave:function() {
            a.disappear()
        }});
    a.open = function() {
        var a = this;
        a.show().css({opacity:1});
        n = setTimeout(function() {
            a.animate({opacity:0})
        }, 3E3);
        a.on = !0;
        return a
    };
    a.close = function() {
        clearTimeout(n);
        this.on = !1;
        this.hide();
        return this
    };
    a.appear = function() {
        a.on && (n && clearTimeout(n), a.stop(!0, !0).animate({opacity:1}))
    };
    a.disappear = function() {
        a.on && (n && clearTimeout(n), n = setTimeout(function() {
            a.stop(!0, !0).animate({opacity:0})
        }, 1E3))
    };
    d.delegate("img", "mouseenter", a.appear).delegate("img", "mouseleave", a.disappear);
    c.popImage = function(c, g) {
        var f = new Image;
        f.onload = function() {
            d.find("img").remove();
            d = d.append(f);
            c.removeWaitEffect();
            b("#mask").css("opacity", 0).show().stop().animate({opacity:0.6}, function() {
                e(c, k = b(f))
            }).off("click").on("click", function() {
                    a.close();
                    d.stop().hide();
                    b("#mask").off("click").stop().animate({opacity:0}, function() {
                        b("#mask").hide()
                    });
                    h.hide()
                });
            d.draggable({handle:"img"})
        };
        f.onerror = function() {
            c.removeWaitEffect()
        };
        c.insertWaitEffect();
        i = f.src = g
    };
    var m = {};
    c.widget = b.extend(c.widget || {}, {preLoadImg:function(a, c) {
        if(a && !m[a]) {
            var d = new Image;
            d.onload = d.onerror = d.onabort = function() {
                m[this.src] && m[this.src].callback && b.safe(m[this.src].callback);
                delete m[this.src]
            };
            d.src = a;
            m[d.src] = {img:d, callback:c}
        }
    }, replaceImg:function(a) {
        Log.d(a)
    }})
})(jQuery, WebMM, this);
(function(b) {
    b.fn = b.extend(b.fn, {insertWaitEffect:function() {
        var c = b(b("#waitingEffect")[0].cloneNode(!0)).show().appendTo(this.parent());
        c.css({left:(this[0].clientWidth - c[0].width) / 2, top:(this[0].clientHeight - c[0].height) / 2});
        return this
    }, removeWaitEffect:function() {
        this.parent().find("#waitingEffect").remove();
        return this
    }})
})(jQuery, WebMM, this);
(function(b) {
    b.millTimeFormator = function(b, f) {
        function g(a, b) {
            var c = new Date(a);
            c.setUTCHours(15, 59, 59, 999);
            return e - (c.getTime() - b)
        }
        if(0 > +b || 0 > +f) {
            return""
        }
        var e = 1E3 * +f, d = 1E3 * +b, a = e - d, h = {"\ufffd\u0578\ufffd":{max:6E4, unit:1E3}, "nn\ufffd\ufffd\ufffd\ufffd\u01f0":{max:36E5, unit:6E4}, "nn\u0421\u02b1\u01f0":{max:216E5, unit:36E5}, "\ufffd\ufffd\ufffd\ufffd hh:mm":{max:g(e, 864E5), unit:864E5}, "\ufffd\ufffd\ufffd\ufffd hh:mm":{max:g(e, 1728E5), unit:864E5}, "MM\ufffd\ufffddd\ufffd\ufffd hh:mm":{max:function(a) {
            a = new Date(a);
            a.setFullYear(a.getFullYear(), 0, 1);
            a.setUTCHours(-8, 0, 0, 0);
            return e - a.getTime()
        }(e), unit:864E5}, "yyyy/MM/dd hh:mm":{max:Infinity, unit:0}}, i;
        for(i in h) {
            var k = h[i];
            if(k.max > a) {
                var d = new Date(d), h = d.getHours() + "", l = d.getMinutes() + "", h = 1 == h.length ? "0" + h : h, l = 1 == l.length ? "0" + l : l;
                return 0 != k.unit ? i.replace("nn", Math.floor(a / k.unit)).replace("hh", h).replace("mm", l).replace("MM", d.getMonth() + 1).replace("dd", d.getDate()) : i.replace("yyyy", d.getFullYear()).replace("MM", d.getMonth() + 1).replace("dd", d.getDate()).replace("hh", h).replace("mm", l)
            }
        }
    }
})(jQuery);
(function(b, c, f) {
    var g = {onplay:function() {
        Log.d("jPlayer play")
    }, onprogress:function() {
        Log.d("jPlayer progress")
    }, onpause:function() {
        Log.d("jPlayer pause")
    }, onstop:function() {
        Log.d("jPlayer ended")
    }}, e = null, d = null, a = null, h = null;
    c.setMediaPlayerUICallbacks = function(a) {
        b.extend(g, g, a)
    };
    c.getMediaPlayer = function() {
        return e
    };
    c.widget.playNewMsgSound = function(a) {
        d && (d.jPlayer("setMedia", {mp3:d.attr("url" + a)}), d.jPlayer("play"))
    };
    b(function() {
        setTimeout(function() {
            e || (e = b("#mediaPlayer").jPlayer({ready:function() {
                Log.d("jPlayer ready")
            }, play:function(a) {
                g.onplay(a)
            }, progress:function(a) {
                g.onprogress(a)
            }, pause:function(a) {
                g.onpause(a)
            }, stop:function(a) {
                g.onstop(a)
            }, ended:function(a) {
                g.onstop(a)
            }, swfPath:c.getRes("swf_jplayer"), supplied:"mp3", solution:"flash, html", wmode:"window"}))
        }, 500);
        setTimeout(function() {
            d || (d = b("#newMsgPlayer").jPlayer({ready:function() {
            }, play:function() {
            }, progress:function() {
            }, pause:function() {
            }, stop:function() {
            }, ended:function() {
            }, swfPath:c.getRes("swf_jplayer"), supplied:"mp3", solution:"flash, html", wmode:"window"}))
        }, 500);
        a || setTimeout(function() {
            h = b("#videoPlayerContainer");
            a = b("#jquery_jplayer_1").jPlayer({ready:function() {
                Log.d("jPlayer ready")
            }, play:function() {
                Log.d("jPlayer play")
            }, progress:function() {
                Log.d("jPlayer progress")
            }, pause:function() {
                Log.d("jPlayer pause")
            }, stop:function() {
                Log.d("jPlayer stop")
            }, ended:function() {
                Log.d("jPlayer ended")
            }, swfPath:c.getRes("swf_jplayer"), supplied:"flv, m4v", solution:"flash, html", size:{width:"766px", height:"360px", cssClass:"jp-video-360p"}});
            h.bind("click", function(c) {
                c = b(c.target);
                c.hasClass("ico_close_circle") ? (a.jPlayer("stop"), h.hide(), b("#mask").off("click").stop().animate({opacity:0}, function() {
                    b("#mask").hide()
                })) : c.hasClass("jp-download-screen")
            }).draggable({handle:".jp_header", cursor:"move"});
            h.find(".jp-download-screen").click(function() {
                var a = f.onbeforeunload;
                f.onbeforeunload = null;
                location.href = i.download;
                setTimeout(function() {
                    f.onbeforeunload = a
                })
            });
            a.jPlayer("play")
        }, 0)
    });
    var i = null;
    c.playVideo = function(d) {
        b("#mask").css("opacity", 0).show().stop().animate({opacity:0.6}).off("click").on("click", function() {
            a.jPlayer("stop");
            h.hide();
            b("#mask").off("click").stop().animate({opacity:0}, function() {
                b("#mask").hide()
            })
        });
        c.widget.screenCentral(h.show());
        a.jPlayer("stop");
        a.jPlayer("setMedia", i = d);
        setTimeout(function() {
            a.jPlayer("play")
        }, d.flv ? 1E3 : 0)
    }
})(jQuery, WebMM, this);
(function(b, c, f) {
    var g = null;
    c.widget = b.extend(c.widget || {}, {filterQQFace:function(b, d) {
        g = g || f.gQQFaceMap;
        d || (b = b.replace(/\[([^\]]+)\]/g, function(a, b) {
            var d;
            return(d = g[b]) ? '<img src="' + c.getRes("img_path") + "qqface/" + d + '.png" />' : a
        }));
        for(var a = b.length - 1, h, i;0 <= a;) {
            if("/" == b[a]) {
                for(var k = 0;4 > k;k++) {
                    if(i = g[h = b.substr(a + 1, k)]) {
                        b = b.substring(0, a) + (!d ? '<img src="' + c.getRes("img_path") + "/qqface/" + i + '.png" />' : "[" + h + "]") + b.substring(a + k + 1);
                        break
                    }
                }
            }
            a--
        }
        return b
    }, preFilterEmoji:function(b) {
        return b = b.replace(/<.*?>/g, function(b) {
            return g[b] ? b.replace("<", "{").replace(">", "}") : b
        })
    }, afterFilterEmoji:function(b) {
        return b = b.replace(/{.*?}/g, function(b) {
            var a;
            return(a = g[b.replace("{", "<").replace("}", ">")]) ? '<span class="emoji emoji' + a + '"></span>' : b
        })
    }, afterEncodeEmoji:function(b) {
        var b = b.replace(/{.*?}/g, function(a) {
            var b;
            return(b = g[a.replace("{", "<").replace("}", ">")]) ? f.gEmojiCodeMap[b] || "" : a
        }), c;
        for(c in gEmojiCodeConv) {
            for(;0 <= b.indexOf(c);) {
                b = b.replace(c, gEmojiCodeConv[c])
            }
        }
        return b
    }, afterHTMLEncodeEmoji:function(b) {
        return b = b.replace(/&lt;span class=&quot;(emoji emoji.*?)&quot;&gt;&lt;\/span&gt;/g, "<span class='$1'></span>")
    }})
})(jQuery, WebMM, this);
(function(b, c) {
    var f = {"44682e637b75a3f5d6747d61dbd23a15":"icon_001.gif", c0059fa4f781a2a500ec03fade10e9b1:"icon_002.gif", "86cb157e9c44b2c9934e4e430790776d":"icon_006.gif", e6f269a19ff2fb61fdb847b39c86ebca:"icon_007.gif", ea675fef6e28b0244c4577c6d5a2e5c9:"icon_009.gif", d629cb3c544fb719405f2b9f16ed6e6c:"icon_010.gif", e2e2e96798bfbd55b35c3111d89b2e17:"icon_012.gif", d13e21be9fd71777f727e0c34b0d3994:"icon_013.gif", "68f9864ca5c0a5d823ed7184e113a4aa":"icon_018.gif", "1483ce786912099e29551915e0bc2125":"icon_019.gif",
        bb82ce58f5ed6fdd2b5e34fc2a8e347a:"icon_020.gif", "31574013280aac3897722cc7e3e49ee4":"icon_021.gif", a00d1de64298d9eaa145ec848a9cc8af:"icon_022.gif", "6257411b26d5aa873762490769625bb9":"icon_024.gif", "5a7fc462d63ef845e6d99c1523bbc91e":"icon_027.gif", "3a4dc10bc33c74726f46ba1eacd97391":"icon_028.gif", "72ebfa527add152c6872219044b151c3":"icon_029.gif", "6a9284bc5ce0bf059375e970a49fa2c5":"icon_030.gif", "2c4597ce27b24af08652be6bea644c32":"icon_033.gif", "6ae79b62bab61132981f1e85ad7070c4":"icon_035.gif",
        aab84584b5a3f262286cb38bb107b53e:"icon_040.gif"}, g = {"icon_001.gif":"44682e637b75a3f5d6747d61dbd23a15", "icon_002.gif":"c0059fa4f781a2a500ec03fade10e9b1", "icon_006.gif":"86cb157e9c44b2c9934e4e430790776d", "icon_007.gif":"e6f269a19ff2fb61fdb847b39c86ebca", "icon_009.gif":"ea675fef6e28b0244c4577c6d5a2e5c9", "icon_010.gif":"d629cb3c544fb719405f2b9f16ed6e6c", "icon_012.gif":"e2e2e96798bfbd55b35c3111d89b2e17", "icon_013.gif":"d13e21be9fd71777f727e0c34b0d3994", "icon_018.gif":"68f9864ca5c0a5d823ed7184e113a4aa",
        "icon_019.gif":"1483ce786912099e29551915e0bc2125", "icon_020.gif":"bb82ce58f5ed6fdd2b5e34fc2a8e347a", "icon_021.gif":"31574013280aac3897722cc7e3e49ee4", "icon_022.gif":"a00d1de64298d9eaa145ec848a9cc8af", "icon_024.gif":"6257411b26d5aa873762490769625bb9", "icon_027.gif":"5a7fc462d63ef845e6d99c1523bbc91e", "icon_028.gif":"3a4dc10bc33c74726f46ba1eacd97391", "icon_029.gif":"72ebfa527add152c6872219044b151c3", "icon_030.gif":"6a9284bc5ce0bf059375e970a49fa2c5", "icon_033.gif":"2c4597ce27b24af08652be6bea644c32",
        "icon_035.gif":"6ae79b62bab61132981f1e85ad7070c4", "icon_040.gif":"aab84584b5a3f262286cb38bb107b53e"};
    c.widget = b.extend(c.widget || {}, {parseTuzki:function(e) {
        var e = (b.htmlDecode(e) || "").split("<br/>"), e = b.xml2json(1 < e.length ? e[1] : e[0]), d;
        return e && e.emoji.androidmd5 && (d = f[e.emoji.androidmd5]) ? c.getRes("img_path") + "/emoji/" + d : ""
    }, getTuzkiMd5:function(b) {
        return g[b]
    }, getTuzkiPath:function(b) {
        return c.getRes("img_path") + "/emoji/" + b
    }, getTuzkiPathByMd5:function(b) {
        return this.getTuzkiPath(f[b])
    }})
})(jQuery, WebMM, this);
(function(b, c, f) {
    var g = null;
    b(window).resize(function() {
        g && g.isShow() && c.widget.screenCentral(g)
    });
    c.widget.screenCentral = function(c, d) {
        if(c && c.length) {
            if(!d || !1 !== d.adjustPos) {
                g = c
            }
            if(d && d.rawPosDom$) {
                var a = d.rawPosDom$.offset(), h = d.rawPosDom$.width(), i = d.rawPosDom$.height(), k = c.width(), l = c.height();
                c.css({left:a.left, top:a.top, position:"absolute", width:h, height:i});
                c.animate({left:(b(document.body).width() - k) / 2 + (d.offset && d.offset.left || 0), top:(b(document.body).height() - l) / 2 + b(f).scrollTop() + (d.offset && d.offset.top || 0), position:"absolute", width:k, height:l})
            }else {
                c.css({left:(c.offsetParent().innerWidth() - c.outerWidth()) / 2 + (d && d.offset && d.offset.left || 0), top:((f.innerHeight || document.documentElement.clientHeight) - c.outerHeight()) / 2 + b(f).scrollTop(), position:"absolute"})
            }
            if(d && d.showMask) {
                if(b("#mask").css("opacity", 0).show().stop().animate({opacity:d.lightMask ? 0 : 0.6}, function() {
                    c.show()
                }), d.clickMaskHide) {
                    b("#mask").off("click").on("click", function() {
                        c.hide();
                        b("#mask").off("click").stop().animate({opacity:0}, function() {
                            b("#mask").hide()
                        });
                        d.onhide && d.onhide()
                    })
                }
            }else {
                c.fadeIn("fast")
            }
            return c
        }
    }
})(jQuery, WebMM, this);
(function(b) {
    function c(b) {
        return(b || "").toLowerCase().split("+").sort().join("").replace(/\s/ig, "")
    }
    var f = {27:"esc", 9:"tab", 32:"space", 13:"enter", 8:"backspace", 145:"scroll", 20:"capslock", 144:"numlock", 19:"pause", 45:"insert", 36:"home", 46:"del", 35:"end", 33:"pageup", 34:"pagedown", 37:"left", 38:"up", 39:"right", 40:"down", 107:"=", 109:"-", 112:"f1", 113:"f2", 114:"f3", 115:"f4", 116:"f5", 117:"f6", 118:"f7", 119:"f8", 120:"f9", 121:"f10", 122:"f11", 123:"f12", 188:"<", 190:">", 191:"/", 192:"`", 219:"[", 220:"\\", 221:"]", 222:"'"}, g = {"`":"~", 1:"!", 2:"@", 3:"#", 4:"$", 5:"%",
        6:"^", 7:"&", 8:"*", 9:"(", "0":")", "-":"_", "=":"+", ";":":", "'":'"', ",":"<", ".":">", "/":"?", "\\":"|"};
    b.isHotkey = function(b, d) {
        var a, h = b.keyCode;
        a = f[h];
        if(!(h = !a && 49 <= h && 90 >= h && String.fromCharCode(h).toLowerCase())) {
            if(h = b.type, h = "mousewheel" == h || "DOMMouseScroll" == h) {
                h = 0 < b.wheelDelta || 0 > b.detail ? "mousewheelup" : "mousewheeldown"
            }
        }
        var i = b.ctrlKey, k = b.shiftKey, l = b.altKey, j = k && (g[h] || g[a]), n = [];
        !i && (!l && j) && (a = j, k = h = null);
        i && n.push("ctrl");
        k && n.push("shift");
        l && n.push("alt");
        a && n.push(a);
        h && n.push(h);
        a = n.join("+");
        return c(a) == c(d)
    }
})(jQuery, this);
(function(b, c, f) {
    function g() {
        return h || (h = QMActivex.create(d))
    }
    function e(b, d) {
        var e = i || (i = QMActivex.create(a));
        e.StopUpload();
        e.ClearHeaders();
        e.ClearFormItems();
        e && (e.URL = c.getRes("url_host") + "/cgi-bin/mmwebwx-bin/webwxpreview?fun=upload", e.AddHeader("Cookie", document.cookie), e.AddFormItem("msgimgrequest", 0, 0, b), e.AddFormItem("filename", 1, 4, !g() || !g() || !g().IsClipBoardImage ? !1 : g().SaveClipBoardBmpToFile(1)), e.OnEvent = function(a, b) {
            switch(b) {
                case 3:
                    e && (d(JSON.parse(e.Response)), e = null);
                    break;
                case 1:
                    Log.d("screensnap upload error"), d({}), e = null
            }
        }, e.StartUpload())
    }
    var d = "screencapture", a = "uploader", h = null, i = null;
    c.widget.screenSnap = {isSupport:function() {
        return f.QMActivex && 0 < QMActivex.isSupport(d)
    }, install:function() {
        window.open(QMActivex.installUrl.replace(/^https/, "http"))
    }, capture:function(a) {
        var b = g();
        b && (b.OnCaptureFinished = a.ok);
        b.OnCaptureCanceled = function() {
        };
        b.DoCapture()
    }, isClipBoardImage:function() {
        return g() && g().IsClipBoardImage
    }, upload:function(a, b) {
        if(g() && g().IsClipBoardImage) {
            return e(a, b), !0
        }
    }}
})(jQuery, WebMM, this);
(function(b) {
    var c = 0;
    b.textAreaResize = function(f, g, e, d) {
        var a = b(f), h = g || a.height(), i = e || a.height();
        !a.attr("defHeight") && a.height("defHeight", a.height());
        f.onkeydown = f.onkeyup = f.onchange = f.onpropertychange = null;
        if(0 > h || 0 > i) {
            a.height(a.attr("defHeight"))
        }else {
            var k = f.parentNode.appendChild(f.cloneNode(!0));
            with(k.style) {
                visibility = "hidden", position = "absolute", left = "-1000px", paddingBottom = paddingTop = "0px", paddingLeft = a.css("paddingLeft"), paddingRight = a.css("paddingRight"), width = a.width() + "px", overflow = "hidden"
            }
            f.onkeydown = f.onkeyup = f.onfocus = f.onblur = f.onchange = function() {
                k.style.width = a.width() + "px";
                k.value = f.value;
                var b = k.scrollHeight, e = a.height();
                0 < b && (b != c && e != b) && (c = b, f.style.height = (b < h ? h : b > i ? i : b) + "px", f.style.overflow = b > i ? "auto" : "hidden", d && a.height() != e && d(a.height() - e))
            }
        }
    }
})(jQuery, WebMM, this);
(function(b, c) {
    function f(b, c) {
        return b.position().top - c.scrollTop() + b.height() / 2 - 20
    }
    c.widget = b.extend(c.widget || {}, {scrollFocus:function(c, e, d, a) {
        if(c && c.size() && e && e.size()) {
            var h = c.scrollTop(), i = h + c.parent().height(), k = e.position().top, l = k + e.height(), j = 0;
            h > k ? j = k - 20 : i < l && (j = h + l - i + 20);
            0 != j && a ? (c.scrollTop(j), d.css("top", f(e, c))) : b.isLowerBrowser() ? d.css({top:f(e, c)}) : d.stop().animate({top:f(e, c)}, "fast")
        }
    }})
})(jQuery, WebMM, this);
(function(b, c, f) {
    function g(a, c, d, e) {
        var g = [], f = [], h = [], e = e || {}, i = b.browser.msie ? '<object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" <#=codebase#> <#=attr#> <#=id#> ><#=param#></object>' : '<embed <#=embed#> type="application/x-shockwave-flash" <#=pluginspage#>  <#=name#> <#=id#> ></embed>';
        e.allowscriptaccess = d && d.allowscriptaccess || "always";
        e.quality = "high";
        for(var k in e) {
            var l = {name:k, value:e[k]};
            f.push(b.tmpl('<param name="<#=name#>" value="<#=value#>" />', l));
            h.push(b.tmpl(" <#=name#>=<#=value#> ", l))
        }
        for(k in d) {
            l = {name:k, value:d[k]}, g.push(b.tmpl(" <#=name#>=<#=value#> ", l)), h.push(b.tmpl(" <#=name#>=<#=value#> ", l))
        }
        c && (f.push(b.tmpl('<param name="<#=name#>" value="<#=value#>" />', {name:"movie", value:c})), h.push(b.tmpl(" <#=name#>=<#=value#> ", {name:"src", value:c})));
        return b.tmpl(i, {id:a && [' id="', a, '"'].join(""), name:a && [' name="', a, '"'].join(""), attr:g.join(""), param:f.join(""), embed:h.join(""), codebase:"https:" == location.protocol ? "" : 'codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" ', pluginspage:"https:" == location.protocol ? "" : 'pluginspage="http://www.adobe.com/cn/products/flashplayer" '})
    }
    function e(a, b) {
        var c = b || window;
        return(c = c[a] || c.document[a]) && (c.length ? c[c.length - 1] : c)
    }
    function d(a) {
        if(!(this._mId = a.id)) {
            throw Error(0, "config.id can't use null");
        }
        if(!(this._mWin = a.win)) {
            throw Error(0, "config.win win is null");
        }
        this._mFlash = a.flash;
        this._moConstructor = this.constructor;
        this._mEvent = a;
        this._initlize()
    }
    function a(a, e) {
        var m = b.extend({onbefore:function() {
        }, onprocess:function() {
        }, onsuccess:function() {
        }, onerror:function() {
        }, oncomplete:function() {
        }}, e);
        if(a && 0 != a.size()) {
            var q = b.tmpl(k, {height:a.height(), width:a.width(), margin:0, code:g(h, c.getRes("swf_uploader") + "?r=" + b.now(), {width:"100%", height:"100%"}, {wmode:"transparent"})});
            b("#swfUploaderWrapper").remove();
            a.prepend(q);
            clearTimeout(l);
            l = 0;
            l = setTimeout(function() {
                (new d({id:h, win:f, onSelect:function(a, b) {
                    for(var c = a;c <= b;c++) {
                        m.onselect(c, {name:i.getFileInfo(c, "name"), size:parseInt(i.getFileInfo(c, "size"), 10)})
                    }
                }, onProcess:function(a, b) {
                    m.onprocess(a, b);
                    m.onsuccess()
                }, onError:function(a, b, c, d) {
                    m.onerror(b, c, d)
                }, onComplete:function(a, b) {
                    m.oncomplete(a, b)
                }})).setup(function(a, b) {
                        a ? (i = this.getFlash(), i.initlize("single"), i.clearUploadVars(), i.addUploadVar("timeout", 6E4)) : Log.e("the flash uploader is not ok..." + b)
                    })
            }, 300)
        }
    }
    b.getFlash = e;
    _goStatic = d;
    _goClass = _goStatic.prototype;
    _goStatic.get = function(a, b) {
        var c = b[this._CONST._CACHES];
        return c && c[a]
    };
    _goStatic.getFlashVer = function() {
        var a = "", b = -1, c = -1, d = -1, e = navigator.plugins;
        if(e && e.length) {
            for(var g = 0, f = e.length;g < f;g++) {
                var h = e[g];
                if(-1 != h.name.indexOf("Shockwave Flash")) {
                    a = h.description.split("Shockwave Flash ")[1];
                    b = parseFloat(a);
                    d = parseInt(a.split("r")[1]);
                    c = parseInt(a.split("b")[1]);
                    break
                }
            }
        }else {
            try {
                if(g = new ActiveXObject("ShockwaveFlash.ShockwaveFlash")) {
                    a = g.GetVariable("$version").split(" ")[1], f = a.split(","), b = parseFloat(f.join(".")), d = parseInt(f[2]), c = parseInt(f[3])
                }
            }catch(i) {
            }
        }
        return{version:(isNaN(b) ? -1 : b) || -1, build:(isNaN(d) ? -1 : d) || -1, beta:(isNaN(c) ? -1 : c) || -1, desc:a}
    };
    _goStatic.isSupported = function() {
        var a = this.getFlashVer();
        return 10 <= a.version || 9 == a.version && 50 < a.build
    };
    _goStatic._CONST = {_TIMEOUT:5E3, _CACHES:"qmFlashCaches_ASDr431gGas", _CALLBACK:"onFlashEvent_ASDr431gGas"};
    _goClass.getFlash = function() {
        return this._mFlash || e(this._mId, this._mWin)
    };
    _goClass.isDisabled = function() {
        return this._mDisabled || !1
    };
    _goClass.disable = function(a) {
        this._mDisabled = !1 != a;
        return this
    };
    _goClass.setup = function(a) {
        function b(d, e) {
            try {
                a.call(c, d, e)
            }catch(g) {
            }
        }
        var c = this;
        this._getLoadedPercent(function(a) {
            100 == a ? setTimeout(function() {
                try {
                    if(!c.getFlash().setup(d._CONST._CALLBACK, c._mId)) {
                        return b(!1, "setuperr")
                    }
                }catch(a) {
                    return b(!1, "nosetup")
                }
                b(!0)
            }) : "number" != typeof a && b(!1, a)
        })
    };
    _goClass._getLoadedPercent = function(a) {
        function c(b) {
            try {
                a.call(e, b)
            }catch(d) {
            }
        }
        var e = this, g = this.getFlash();
        if(!g) {
            return c("notfound")
        }
        var f = 0;
        (function() {
            var a = arguments.callee;
            a._startTime || (a._startTime = b.now());
            var e = 0, h = !1;
            try {
                e = g.PercentLoaded()
            }catch(i) {
                h = !0
            }
            e != f && c(f = e);
            100 != e && (b.now() - a._startTime > d._CONST._TIMEOUT ? c(h ? "noflash" : "timeout") : setTimeout(a, 100))
        })()
    };
    _goClass._initlize = function() {
        var a = this._mWin, b = this._moConstructor._CONST, c = b._CACHES, b = b._CALLBACK;
        a[c] || (a[c] = new a.Object);
        a[c][this._mId] = this;
        a[b] || (a[b] = function() {
            var b = arguments[1], d = a[c][arguments[0]];
            if(d && "function" == typeof d._mEvent[b]) {
                for(var e = [], g = 2, f = arguments.length;g < f;g++) {
                    e.push(arguments[g])
                }
                d._mEvent[b].apply(d, e)
            }
        })
    };
    var h = "flashUploader", i = null, k = '<span id="swfUploaderWrapper" style="top:0;left:0;position:absolute;width:100%;height:<#=height#>px;margin:<#=margin#>;z-index:2;"><#=code#></span>', l = 0;
    c.widget = b.extend(c.widget || {}, {swfUploader:{isSupport:function() {
        return d.isSupported()
    }, install:function(b, c) {
        a(b, c)
    }, upload:function(a, b, c) {
        i.setUploadUrl(b);
        for(var d in c) {
            i.addUploadVar(d, c[d])
        }
        i.upload(a, "filename", !1)
    }}})
})(jQuery, WebMM, this);
(function(b, c, f) {
    var g = {ondisplay:function() {
    }, onerror:function() {
    }, onclose:function() {
    }, onclick:function() {
    }}, e = null;
    f.MMNotification = c.widget.notification = {notify:function(c, a, f, i) {
        if(this.isSupport()) {
            var i = b.extend(g, i), k = i.onclick, l = window.webkitNotifications;
            i.onclick = function() {
                e && (k.apply(this, arguments), e.cancel(), e = null)
            };
            0 == l.checkPermission() ? (e && (e.cancel(), e = null), e = l.createNotification(c, a, f), b.extend(e, i), setTimeout(function() {
                if(e) {
                    e.show();
                    clearTimeout(0);
                    setTimeout(function() {
                        if(e) {
                            e.cancel();
                            e = null
                        }
                    }, 1E4)
                }
            })) : l.checkPermission()
        }
    }, cancel:function() {
        e && (e.cancel(), e = null)
    }, requestPermission:function() {
        if(this.isSupport()) {
            var b = window.webkitNotifications;
            1 == b.checkPermission() && b.requestPermission(function() {
            })
        }
    }, checkPermission:function() {
        return this.isSupport() ? f.webkitNotifications.checkPermission() : 2
    }, isSupport:function() {
        return!!f.webkitNotifications
    }}
})(jQuery, WebMM, this);
(function(b, c, f) {
    function g(g) {
        var k = b.extend({onReady:function() {
        }, onRecordStart:function() {
        }, onRecordError:function() {
        }, onRecordStop:function() {
        }, onRecordFinish:function() {
        }, onSendError:function() {
        }, onSendProgress:function() {
        }, onSendFinish:function() {
        }, onActivityTime:function() {
        }, onSecurityPanelClose:function() {
        }}, g), g = b.tmpl(h, {WrapID:e, code:b.generateFlashCode(d, c.getRes("swf_recorder"), {width:"100%", height:"100%"}, {wmode:"transparent"})});
        b("#" + e).remove();
        b(document.body).append(g);
        clearTimeout(i);
        i = setTimeout(function() {
            (new b.qmFlash(b.extend(k, {id:d, win:f}))).setup(function(b, c) {
                b ? (a = this.getFlash(), k.onReady()) : Log.e("the flash recorder is not ok..." + c)
            })
        }, 300)
    }
    var e = "VoiceRecorderWrapper", d = "VoiceRecorder", a = null, h = '<div id="<#=WrapID#>" style="top:0px;left:-1000px;position:absolute;width:300px;height:200px;z-index:9999;"><#=code#></div>', i = 0, k = !1;
    c.widget = b.extend(c.widget || {}, {Recorder:{isSupport:function() {
        return b.qmFlash.isSupported()
    }, install:function(a) {
        if(k) {
            a.onReady()
        }else {
            g(a), k = !0
        }
    }, getObject:function() {
        return a
    }}})
})(jQuery, WebMM, this);
(function(b, c, f) {
    var g = b("#uploadPreview");
    f.uploadPreview = {show:function() {
        g.find("img").replaceWith(b("<img/>").attr("src", c.getRes("img_loading1")));
        c.widget.screenCentral(g.show());
        return this
    }, hide:function() {
        g.hide();
        b("#mask").hide();
        return this
    }, getDom$:function() {
        return g
    }, setImg:function(b) {
        var c = new Image;
        c.onload = function() {
            var a = g.find(".picPreviewWrap"), b = a.find("img"), e = a.width(), a = a.height(), f = this.width, l = this.height;
            if(f > e || l > a) {
                f / l > e / a ? (c.style.width = e + "px", c.style.height = e * l / f + "px") : (c.style.height = a + "px", c.style.width = f * a / l + "px")
            }
            b.replaceWith(c)
        };
        c.src = b;
        return this
    }, setCallback:function(c) {
        var d = this;
        g.off("click").on("click", function(a) {
            a = b(a.target).attr("opt");
            "cancel" == a ? (d.hide(), c.cancel && c.cancel()) : "send" == a && c.send && (d.hide(), c.send())
        });
        return this
    }}
})(jQuery, WebMM, this);
(function(b, c, f) {
    function g(a) {
        var d = b(document.body), g = e.ctrl("root", {oDom$:d}), f = a || "chat";
        g.dispatch("hashchange", "root/" + (b.hash() || f));
        b.hashChange(function(a) {
            a = a || f;
            g.dispatch("hashchange", "root/" + a)
        });
        var h = {};
        c.globalEventSetting = function(a) {
            return b.extend(h, a || {})
        };
        d.bind("click keyup keydown change", function(a) {
            for(var d = !1, e = !1, f = a.target, i = a.type, k = [];f && f != document.body;) {
                f.getAttribute(i) && k.push(f), f = f.parentNode
            }
            f = 0;
            i = k.length;
            a:for(;f < i;f++) {
                var l = b(k[f]);
                if(!h.globalIntercept || b.contains(h.interceptDom$[0], l[0])) {
                    for(var j = l.parents("[ctrl]"), n = l.attr(a.type), m = n && n.split("@"), p = m && m[0], m = m && m[1], A = 0, E = j.length;n && A < E;A++) {
                        var B = j[A].ctrl;
                        if(B[p] && (B = B[p](a, l, m && l.parents(m).first()), d = !0, !1 === B)) {
                            break a
                        }
                    }
                    "A" == l.prop("tagName") && "javascript:;" == l.prop("href") && (e = !0)
                }
            }
            d || (d = "click" == a.type && "noHandledClick" || "keydown" == a.type && "noHandledKeyDown" || "keyup" == a.type && "noHandledKeyUp") && g.dispatch("globalevent", {type:d, data:a});
            e || "A" == a.target.tagName && "javascript:;" == a.target.href || "A" == a.target.parentNode.tagName && "javascript:;" == a.target.parentNode.href ? (a.stopPropagation(), a.preventDefault()) : "A" == a.target.tagName && (0 == a.target.href.indexOf("http") && "" == a.target.target) && (window.open(a.target.href), a.stopPropagation(), a.preventDefault());
            c.touchUserAction()
        }).bind("globalevent", function(a, b) {
                g.dispatch("globalevent", b)
            })
    }
    var e = f.WebMM = f.WebMM || {}, d = {};
    e.getRes = function(a) {
        return d[a]
    };
    var a = null;
    e.getDeviceId = function() {
        if(!a) {
            a = "e";
            for(var b = 0;15 > b;b++) {
                a += Math.floor(10 * Math.random())
            }
        }
        return a
    };
    c.timeoutDetect = function(a) {
        return"1100" == a ? (f.onbeforeunload = null, c.util.logout(0), !0) : "1101" == a || "1205" == a || "1102" == a ? (f.onbeforeunload = null, c.util.logout(1), !0) : !1
    };
    b.netQueueSetting({globalExceptionHandler:function(a) {
        return c.timeoutDetect(a)
    }});
    var h = !0, i = 0;
    c.touchUserAction = function() {
        h || c.triggerEvent("hasUserAction", h = !0);
        i = b.now()
    };
    setInterval(function() {
        3E4 < b.now() - i && c.triggerEvent("hasUserAction", h = !1)
    }, 3E4);
    c.touchUserAction();
    f.GlobalConfig && f.GlobalConfig.gRes && (d = GlobalConfig.gRes, f.Log.level(GlobalConfig.gLog), f.GlobalRes = null);
    var k = !1, l;
    f.ready = function(a) {
        if(a == "view" || f.viewReady) {
            k = true
        }
        a == "js" && (l = true);
        if(k && l) {
            b.getTmplStr = function(a) {
                return document.getElementById("viewFrame").contentWindow.document.getElementById(a).innerHTML
            };
            g()
        }
    };
    var j = {check:function() {
        b.qmFlash.isSupported() || Log.e("Not Support Flash. Navigator: " + f.Navigator)
    }};
    b(function() {
        ready("js");
        j.check()
    });
    c.ErrOk = 0;
    c.ErrSessionTimeOut = 1;
    c.ErrNet = 2;
    c.ErrFail = 3
})(jQuery, WebMM, this);
(function(b, c) {
    var f = "weibo qqmail fmessage tmessage qmessage qqsync floatbottle lbsapp shakeapp medianote qqfriend readerapp blogapp facebookapp masssendapp meishiapp feedsapp voip blogappweixin weixin brandsessionholder weixinreminder wxid_novlwrv3lqwv11 gh_22b87fa7cb3c officialaccounts".split(" "), g = ["wxid_novlwrv3lqwv11", "gh_22b87fa7cb3c"], e, d;
    c.util = b.extend(c.util || {}, {isSpUser:function(a) {
        for(var b = 0, c = f.length;b < c;b++) {
            if(f[b] === a || a.endsWith("@qqim")) {
                return!0
            }
        }
        return!1
    }, isShieldUser:function(a) {
        if(/@lbsroom/.test(a)) {
            return!0
        }
        for(var b = 0, c = g.length;b < c;++b) {
            if(g[b] == a) {
                return!0
            }
        }
        return!1
    }, isFileHelper:function(a) {
        return a == c.Constants.SP_CONTACT_FILE_HELPER
    }, isRoomContact:function(a) {
        if(!a) {
            return!1
        }
        var b = a.lastIndexOf("@chatroom");
        return 0 > b ? !1 : b == a.length - 9
    }, isTalkContact:function(a) {
        if(!a) {
            return!1
        }
        var b = a.lastIndexOf("@talkroom");
        return 0 > b ? !1 : b == a.length - 9
    }, getMsgPeerUserName:function(a) {
        return a.isSend ? a.ToUserName : a.FromUserName
    }, getMediaTypeCode:function() {
    }, getContactDisplayName:function(a) {
        if("string" === b.type(a) && (a = c.model("contact").getContact(a), null == a)) {
            return a
        }
        var d = "";
        if(!a || !a.UserName) {
            return d
        }
        if(c.util.isRoomContact(a.UserName)) {
            if(d = a.RemarkName || a.NickName, !d && a.MemberList) {
                for(var e = 0, g = a.MemberList.length;e < g && 10 > e;++e) {
                    0 < d.length && (d += ", ");
                    var f = a.MemberList[e], j = c.model("contact").getContact(f.UserName), d = d + (j && j.RemarkName || f.DisplayName || j && j.NickName || f.NickName || f.UserName)
                }
            }else {
                d || (d = a.UserName)
            }
        }else {
            d = a.RemarkName || a.NickName || a.UserName
        }
        a.orderC = b.clearHtmlStr(a.RemarkPYQuanPin || a.PYQuanPin || a.NickName || a.UserName || "").toLocaleUpperCase().replace(/\W/ig, "");
        "A" > a.orderC.charAt(0) && (a.orderC = "~");
        return d
    }, getMemberDisplayName:function(a, d) {
        "string" === b.type(a) && (a = c.model("contact").getContact(a));
        "string" === b.type(d) && (d = c.model("contact").getContact(d));
        if(null == a || null == d) {
            return""
        }
        if(a.RemarkName) {
            return a.RemarkName
        }
        for(var e = a.UserName, g = 0, f = d.MemberList.length;g < f;++g) {
            var j = d.MemberList[g];
            if(j.UserName == e) {
                if(j.DisplayName) {
                    return j.DisplayName
                }
                break
            }
        }
        return a.DisplayName || a.NickName || e
    }, isImgMsg:function(a) {
        return a == c.Constants.MM_DATA_IMG || a == c.Constants.MM_DATA_PRIVATEMSG_IMG || a == c.Constants.MM_DATA_QQLIXIANMSG_IMG
    }, isTextMsg:function(a) {
        switch(a) {
            case c.Constants.MM_DATA_TEXT:
                ;
            case c.Constants.MM_DATA_PRIVATEMSG_TEXT:
                ;
            case c.Constants.MM_DATA_QMSG:
                return!0;
            default:
                return!1
        }
    }, isVoiceMsg:function(a) {
        return a == c.Constants.MM_DATA_VOICEMSG
    }, isVideoMsg:function(a) {
        return a == c.Constants.MM_DATA_VIDEO || a == c.Constants.MM_DATA_VIDEO_IPHONE_EXPORT
    }, isSysMsg:function(a) {
        return a == c.Constants.MM_DATA_SYS
    }, isEmojiMsg:function(a) {
        return a == c.Constants.MM_DATA_EMOJI
    }, isQqMailMsg:function(a) {
        return a == c.Constants.MM_DATA_APPMSG
    }, isQqMsg:function(a) {
        return a == c.Constants.MM_DATA_QMSG
    }, isPushSystmeMsg:function(a) {
        return a == c.Constants.MM_DATA_PUSHSYSTEMMSG
    }, isRecommendAssistant:function(a) {
        return a == c.Constants.MM_DATA_POSSIBLEFRIEND_MSG || a == c.Constants.MM_DATA_VERIFYMSG
    }, isAppMsg:function(a) {
        return a == c.Constants.MM_DATA_APPMSG
    }, genMessageDigest:function(a) {
        var b = "";
        _nMsgType = a.MsgType;
        if(-9999 == _nMsgType) {
            b = ""
        }else {
            var b = this.isTextMsg(_nMsgType) || _nMsgType == c.Constants.MM_DATA_READER_TYPE ? a.digest : this.isImgMsg(_nMsgType) ? c.getRes("text_image_msg") : this.isVoiceMsg(_nMsgType) ? c.getRes("text_voice_msg") : this.isVideoMsg(_nMsgType) ? c.getRes("text_video_msg") : this.isEmojiMsg(_nMsgType) ? c.getRes("text_emoji_msg") : _nMsgType == c.Constants.MM_DATA_APP_MSG_EMOJI_TYPE ? c.getRes("text_emoji_msg") : this.isAppMsg(_nMsgType) || _nMsgType >= c.Constants.MM_DATA_APP_MSG_IMG_TYPE ? a.Url ?
                c.getRes("text_url_msg") : c.getRes("text_app_msg") : a.digest, d = "";
            if(this.isRoomContact(a.FromUserName)) {
                var e = c.model("contact").getContact(a.actualSender);
                e && (d = c.util.getMemberDisplayName(e, a.FromUserName), d += d && ": " || "")
            }
            b = b && d + b || ""
        }
        return b.replace(/<br\/?>/ig, " ")
    }, isBrandContact:function(a) {
        return a & c.Constants.MM_USERATTRVERIFYFALG_BIZ_BRAND
    }, getRoomMsgActualSender:function(a) {
        var b = a.Content.indexOf(":");
        return 0 > b ? "" : a.Content.substr(0, b)
    }, isSelf:function(a) {
        return c.model("account").getUserName() == a
    }, modifyNickName:function(a) {
        if(a) {
            switch(a.UserName) {
                case "weixin":
                    a.NickName = c.getRes("text_weixin_nickname");
                    break;
                case "filehelper":
                    a.NickName = c.getRes("text_filehelper_nickname");
                    break;
                case "newsapp":
                    a.NickName = c.getRes("text_newsapp_nickname");
                    break;
                case "fmessage":
                    a.NickName = c.getRes("text_fmessage_nickname");
                    break;
                case "gh_8f619b5732ed":
                    a.NickName = c.getRes("tencent_2012_2_sessions")
            }
        }
    }, isContact:function(a) {
        return(a = c.model("contact").getContact(a)) && a.isContact && a.isContact()
    }, setServerTime:function(a) {
        e = 1E3 * a;
        d = b.now()
    }, getServerTime:function() {
        var a = e + (b.now() - d);
        return 0 > a ? b.now() : a
    }})
})(jQuery, WebMM, this);
(function(b, c) {
    var f = {hasPhotoAlbum:function() {
        return this.SnsFlag & 1
    }}, g = [], e = null, d = null, a = "", h = "";
    c.model("account", {getSyncKey:function() {
        return e || {}
    }, setSyncKey:function(a) {
        a ? e = a : Log.e("JS Function: setSyncKey. Error. no synckey")
    }, getSid:function() {
        return d || (d = b.getCookie("wxsid"))
    }, setSid:function(a) {
        a && (d = a)
    }, getSkey:function() {
        return a
    }, setSkey:function(b) {
        b && (a = b)
    }, setUserInfo:function(a) {
        a ? (b.extend(f, a), f.isMute = this.isMute(), f.isNotifyOpen = this.isNotifyOpen(), c.triggerEvent("accountUpdated", f)) : Log.e("JS Function: setUserInfo. Error. no accout")
    }, getUserInfo:function() {
        return f && f.UserName && f || null
    }, getUin:function() {
        return this.getUserInfo() && this.getUserInfo().Uin || b.getCookie("wxuin")
    }, getUserName:function() {
        return this.getUserInfo() && this.getUserInfo().UserName
    }, getBaseRequest:function() {
        return{BaseRequest:{Uin:this.getUin(), Sid:this.getSid(), Skey:this.getSkey(), DeviceID:c.getDeviceId()}}
    }, reset:function() {
    }, setHistoryConversation:function(a) {
        g = g.concat(a.split(",")) || [];
        c.addEventListener("messageAdded", function(a) {
            for(var a = a.UserName, b = 0, c = g.length;b < c;b++) {
                g[b] == a && g.splice(b, 1)
            }
        })
    }, getHistoryConversation:function() {
        return g
    }, isMute:function() {
        return this.getUserInfo().WebWxPluginSwitch & c.Constants.MM_WEBWXFUNCTION_TONE_NOT_OPEN
    }, isGroupMute:function() {
        return!1
    }, setMute:function(a) {
        f.WebWxPluginSwitch = a ? f.WebWxPluginSwitch | c.Constants.MM_WEBWXFUNCTION_TONE_NOT_OPEN : f.WebWxPluginSwitch & ~c.Constants.MM_WEBWXFUNCTION_TONE_NOT_OPEN;
        f.isMute = this.isMute();
        return this
    }, isNotifyOpen:function() {
        return this.getUserInfo().WebWxPluginSwitch & c.Constants.MM_WEBWXFUNCTION_NOTIFY_OPEN
    }, setNotifyOpen:function(a) {
        f.WebWxPluginSwitch = a ? f.WebWxPluginSwitch | c.Constants.MM_WEBWXFUNCTION_NOTIFY_OPEN : f.WebWxPluginSwitch & ~c.Constants.MM_WEBWXFUNCTION_NOTIFY_OPEN;
        f.isNotifyOpen = this.isNotifyOpen();
        return this
    }, isHigherVer:function() {
        return 4.5 <= h
    }, setClientVer:function(a) {
        a = parseInt(a, 10).toString(16);
        a.substr(0, 1);
        h = a = a.substr(1, 3).replace("0", ".")
    }});
    c.model("account").reset()
})(jQuery, WebMM, this);
(function(b, c) {
    _oContacts = {};
    _oReverseMap = {};
    var f = {isSelf:function() {
        return c.model("account").getUserName() == this.UserName
    }, isContact:function() {
        return!!(this.ContactFlag & c.Constants.MM_CONTACTFLAG_CONTACT)
    }, isBlackContact:function() {
        return!!(this.ContactFlag & c.Constants.MM_CONTACTFLAG_BLACKLISTCONTACT)
    }, isConversationContact:function() {
        return!!(this.ContactFlag & c.Constants.MM_CONTACTFLAG_CHATCONTACT)
    }, isRoomContact:function() {
        return this.UserName.endsWith("@chatroom")
    }, isRoomContactDel:function() {
        return this.isRoomContact() && !(this.ContactFlag & c.Constants.MM_CONTACTFLAG_CHATROOMCONTACT)
    }, isRoomOwner:function() {
        return this.isRoomContact() && this.OwnerUin == c.model("account").getUin()
    }, isBrandContact:function() {
        return this.VerifyFlag & c.Constants.MM_USERATTRVERIFYFALG_BIZ_BRAND
    }, isSpContact:function() {
        return c.util.isSpUser(this.UserName)
    }, isShieldUser:function() {
        return c.util.isShieldUser(this.UserName)
    }, isFileHelper:function() {
        return this.UserName == c.Constants.SP_CONTACT_FILE_HELPER
    }, isRecommendHelper:function() {
        return"fmessage" == this.UserName
    }, isNewsApp:function() {
        return this.UserName == c.Constants.SP_CONTACT_NEWSAPP
    }, isMuted:function() {
        return this.Statues === c.Constants.MM_CHATROOM_NOTIFY_CLOSE && this.isRoomContact()
    }, _canSearchMemberList:function(b) {
        if(this.isRoomContact()) {
            for(var e = 0, d = this.MemberList.length;e < d;e++) {
                var a = this.MemberList[e].UserName;
                if((a = c.model("contact").getContact(a)) && a.canSearch(b)) {
                    return!0
                }
            }
        }
    }, canSearch:function(b, c) {
        if(!b) {
            return this.weight = 1, !0
        }
        var b = b.toUpperCase(), d = 0, a = 0, d = this.RemarkName.toUpperCase().indexOf(b), a = this.RemarkPYQuanPin.toUpperCase().indexOf(b);
        if(0 <= d || 0 <= a) {
            return this.weight = 0 == d ? 1 : 0 == a ? 0.9 : 0.6, !0
        }
        d = this.NickName.toUpperCase().indexOf(b);
        a = this.PYQuanPin.toUpperCase().indexOf(b);
        return 0 <= d || 0 <= a ? (this.weight = 0 == d ? 0.8 : 0 == a ? 0.7 : 0.4, !0) : 0 <= this.Alias.toUpperCase().indexOf(b) || 0 <= this.UserName.toUpperCase().indexOf(b) || c && this.isRoomContact() && this._canSearchMemberList(b) ? (this.weight = 0.5, !0) : !1
    }, update:function(g) {
        g && (b.extend(this, g), c.triggerEvent("contactUpdated", this))
    }, hasPhotoAlbum:function() {
        return this.SnsFlag & 1
    }};
    c.model("contact", {addContacts:function(b, e) {
        if(b) {
            for(var d = 0, a = b.length;d < a;d++) {
                this.addContact(b[d])
            }
            e || c.triggerEvent("contactListReady")
        }
    }, addContact:function(g) {
        if(g && !c.util.isShieldUser(g.UserName)) {
            var e = "";
            c.util.modifyNickName(g);
            "fmessage" == g.UserName && (g.ContactFlag = 0);
            if(_oContacts[g.UserName]) {
                if(0 === g.ContactFlag) {
                    this.deleteContact(g.UserName);
                    return
                }
                c.util.isRoomContact(g.UserName) && 0 == g.MemberCount && (delete g.MemberCount, delete g.MemberList);
                b.extend(_oContacts[g.UserName], g);
                e = "contactUpdated"
            }else {
                _oContacts[g.UserName] = g, e = "contactAdded"
            }
            if(c.util.isRoomContact(g.UserName) && 0 < g.MemberCount) {
                for(var d = 0, a = g.MemberList.length;d < a;d++) {
                    var h = g.MemberList[d];
                    _oReverseMap[h.UserName] || (_oReverseMap[h.UserName] = []);
                    _oReverseMap[h.UserName].push(g.Uin)
                }
            }
            a = _oContacts[g.UserName];
            a.DisplayName = c.util.getContactDisplayName(a);
            d = _oContacts;
            g = g.UserName;
            a = b.extend({RemarkPYQuanPin:"", RemarkPYInitial:"", PYInitial:"", PYQuanPin:""}, a, f);
            a.avatar = c.util.getNormalAvatarUrl(a.UserName);
            a = d[g] = a;
            c.triggerEvent(e, a)
        }
    }, getContact:function(b) {
        return _oContacts[b] || null
    }, isContactExisted:function(b) {
        return!!_oContacts[b]
    }, getAllContacts:function() {
        return _oContacts
    }, getAllStarContact:function(b) {
        var c = [], b = b || {}, d;
        for(d in _oContacts) {
            var a = _oContacts[d];
            !a.isSelf() && (1 == a.StarFriend && !b[d]) && c.push(a)
        }
        return c = c.sort(function(a, b) {
            return a.orderC > b.orderC ? 1 : -1
        })
    }, getAllChatroomContact:function() {
        var b = [], c;
        for(c in _oContacts) {
            var d = _oContacts[c];
            d.isRoomContact() && b.push(d)
        }
        return b = b.sort(function(a, b) {
            return a.orderC > b.orderC ? 1 : -1
        })
    }, getAllFriendChatroomContact:function(b) {
        var c = [], d;
        for(d in _oContacts) {
            var a = _oContacts[d];
            a.isContact() && (a.isRoomContact() && a.canSearch(b)) && c.push(a)
        }
        return c = c.sort(function(a, b) {
            return a.orderC > b.orderC ? 1 : -1
        })
    }, getAllBrandContact:function() {
        var b = [], c;
        for(c in _oContacts) {
            var d = _oContacts[c];
            d.isContact() && d.isBrandContact() && b.push(d)
        }
        return b = b.sort(function(a, b) {
            return a.orderC > b.orderC ? 1 : -1
        })
    }, getAllFriendContact:function(b, e, d, a) {
        var f = [], d = d || {}, i;
        for(i in _oContacts) {
            if(!d[i]) {
                var k = _oContacts[i];
                k.isSelf() && !c.model("account").isHigherVer() || (!k.isContact() || e && 1 == k.StarFriend || k.isRoomContact() || a && k.isBrandContact() || k.isShieldUser()) || k.canSearch(b) && f.push(k)
            }
        }
        return f = f.sort(function(a, b) {
            return a.orderC > b.orderC ? 1 : -1
        })
    }, getAllCanChatContactUserName:function(b) {
        var e = [], d;
        for(d in _oContacts) {
            var a = _oContacts[d];
            (a.isSelf() && c.model("account").isHigherVer() || (a.isContact() || a.isRoomContact() || a.isSpContact()) && !a.isShieldUser()) && a.canSearch(b, !0) && e.push(d)
        }
        return e
    }, deleteContact:function(g) {
        b.isArray(g) || (g = [g]);
        for(var e = 0, d = g.length;e < d;e++) {
            var a = g[e], f = null;
            if(f = _oContacts[a]) {
                delete _oContacts[a], c.triggerEvent("contactDeleted", f)
            }
        }
    }, getContactCount:function() {
        var b = 0, c;
        for(c in _oContacts) {
            b++
        }
        return b
    }})
})(jQuery, WebMM, this);
(function(b, c, f, g) {
    function e(a, b) {
        for(var c = 0;c < a.length;++c) {
            if(a[c].MsgId == b) {
                return c
            }
        }
        return-1
    }
    function d(a) {
        if(!a) {
            return""
        }
        var b = a.MsgType, d = c.util;
        return d.isTextMsg(b) || d.isSysMsg(b) || b == c.Constants.MM_DATA_READER_TYPE || b == c.Constants.MM_DATA_APP_MSG_TEXT_TYPE || b == c.Constants.MM_DATA_VERIFYMSG || b == c.Constants.MM_DATA_SHARECARD || b == c.Constants.MM_DATA_POSSIBLEFRIEND_MSG ? d.isRoomContact(a.FromUserName) ? (b = a.Content.indexOf(":<br/>"), 0 > b ? a.Content : a.Content.substr(b + 6)) : a.Content : c.Constants.MM_DATA_APPMSG_UNSUPPORT == b ? c.getRes("text_chatmsglist_app_msg_unspport") : c.Constants.MM_DATA_LOCATION ==
            b ? c.getRes("text_location_msg") : c.Constants.MM_DATA_VOIPMSG == b || c.Constants.MM_DATA_VOIPNOTIFY == b || c.Constants.MM_DATA_VOIPINVITE == b ? c.getRes("text_voip_msg") : c.getRes("text_chatmsglist_msg_unspport")
    }
    var a = {}, h = null, i = {isSysMessage:function() {
        return this.MsgType == c.Constants.MM_DATA_SYS
    }, update:function(a) {
        a && (b.extend(this, a), c.triggerEvent("messageUpdated", this))
    }};
    c.addEventListener("accountUpdated", function(b) {
        var d = c.model("account").getUserName();
        if(b = b.avatar) {
            for(var e in a) {
                for(var f = a[e], g = 0, h = f.length;g < h;++g) {
                    f[g].avatarId && f[g].avatarId == d && (f[g].avatar = b)
                }
            }
        }
    });
    c.model("message", {getMessages:function(b) {
        return a[b] ? a[b] : []
    }, getUnreadMsgsCount:function(b) {
        var c = 0;
        if(b = a[b]) {
            for(var d = b.length - 1;0 <= d;d--) {
                b[d].unread && ++c
            }
        }
        return c
    }, markMsgsRead:function(a) {
        for(var a = this.getMessages(a), b = !1, c = 0, d = a.length;c < d;c++) {
            a[c].unread && (b = !0), a[c].unread = !1
        }
        return b
    }, getFirstMessage:function(a) {
        a = this.getMessages(a);
        return a.length && a[0] || null
    }, getLastMessage:function(a) {
        a = this.getMessages(a);
        return a.length && a[a.length - 1] || {}
    }, getMsgById:function(a, b) {
        var c = this.getMessages(a), d = e(c, b);
        return 0 <= d ? c[d] : null
    }, getMsgByLocalId:function(a, b) {
        var c;
        a: {
            for(var d = this.getMessages(a), e = 0;e < d.length;++e) {
                if(d[e].LocalID == b) {
                    c = d[e];
                    break a
                }
            }
        }
        return c
    }, getNextUnreadVoiceMsg:function(a, b) {
        for(var d = this.getMessages(a), e = !1, g = 0, f = d.length;g < f;g++) {
            if(!e && d[g].MsgId == b) {
                e = !0
            }else {
                if(e && d[g].MsgType == c.Constants.MM_DATA_VOICEMSG && d[g].Status == c.Constants.STATE_REACH) {
                    return d[g]
                }
            }
        }
        return null
    }, addFakeSysMsg:function(a) {
        this.addMessages([{MsgId:b.now(), MsgType:a.MsgType, FromUserName:a.FromUserName, ToUserName:a.ToUserName, Status:c.Constants.STATE_SENT, CreateTime:a.CreateTime || c.util.getServerTime() / 1E3, Content:a.Content, unread:!1}])
    }, initMessageQueue:function(d, e) {
        if(d && !c.util.isShieldUser(d)) {
            if(a[d]) {
                return!1
            }
            a[d] = [];
            var g = c.util.isFileHelper(d) && 0 == a[d].length ? 1E4 : -9999, f = 0 < g ? c.getRes("text_file_helper_tip") : "", e = 0 < g ? c.util.getServerTime() / 1E3 : e;
            this.addMessages([{MsgId:b.now(), MsgType:g, FromUserName:"", ToUserName:d, Status:c.Constants.STATE_SENT, CreateTime:e ? e : c.util.getServerTime() / 1E3, Content:f, unread:!1}]);
            return!0
        }
    }, getQueueUserNames:function() {
        var b = [], c;
        for(c in a) {
            b.push(c)
        }
        return b
    }, addMessages:function(f, l) {
        if(f) {
            b.isArray(f) || (f = [f]);
            for(var j = 0, n = f.length;j < n;j++) {
                try {
                    var m = f[j], q = m.FromUserName, p = m.ToUserName, r, o = m;
                    h || (h = c.model("account").getUserName());
                    o.isSend = o.FromUserName == h || "" == o.FromUserName;
                    r = o.isSend ? o.ToUserName : o.FromUserName;
                    var s = a[r] || (a[r] = []);
                    Log.d("msgid=" + m.MsgId);
                    o = m;
                    if(o.HasProductId) {
                        if(o.MsgType = 1, o.FromUserName == c.model("account").getUserName()) {
                            o.Content = c.getRes("send_emoji_not_support_msg")
                        }else {
                            var z = "";
                            c.util.isRoomContact(o.FromUserName) && (z = o.Content.match(/(.*?:)<br\/>/));
                            z && 1 < z.length && (z = z[1] + "<br/>");
                            o.Content = z + c.getRes("rece_emoji_not_support_msg")
                        }
                    }
                    m.actualSender = c.util.isRoomContact(q) ? c.util.getRoomMsgActualSender(m) : q;
                    if(!(m.MsgType == c.Constants.MM_DATA_STATUSNOTIFY || c.util.isTalkContact(q) || c.util.isTalkContact(p) || c.util.isShieldUser(q) || c.util.isShieldUser(p) || m.MsgType == c.Constants.MM_DATA_VERIFYMSG && m.RecommendInfo && m.RecommendInfo.UserName == c.model("account").getUserInfo().UserName)) {
                        var x;
                        x = e(s, m.MsgId);
                        if(0 > x) {
                            var t = d(m);
                            m.LocalID != g && m.LocalID == m.ClientMsgId && (t = c.widget.preFilterEmoji(t), t = b.htmlEncode(t), t = t.replace(/\n/g, "<br/>"), t = c.widget.afterFilterEmoji(t));
                            m.LocalID || (m.ClientMsgId = m.LocalID = m.MsgId);
                            m.digest = b.clearLinkTag(c.widget.filterQQFace(t));
                            m.actualContent = b.hrefEncode(c.widget.filterQQFace(t));
                            m.FromUserName != c.model("account").getUserName() && (m.unread == g && m.MsgType != c.Constants.MM_DATA_SYS) && (m.unread = !0);
                            if(m.MsgType == c.Constants.MM_DATA_VERIFYMSG) {
                                var F = m.RecommendInfo.UserName, u;
                                a: {
                                    for(o = 0;o < s.length;++o) {
                                        var v = s[o];
                                        if(v.MsgType == c.Constants.MM_DATA_VERIFYMSG && v.RecommendInfo.UserName == F) {
                                            u = o;
                                            break a
                                        }
                                    }
                                    u = -1
                                }
                                if(0 > u) {
                                    m.History = ["0" + m.RecommendInfo.Content]
                                }else {
                                    var G = s[u];
                                    G.History.push("0" + m.RecommendInfo.Content);
                                    m.History = G.History
                                }
                            }
                            m.avatarTitle = c.util.isRoomContact(m.FromUserName) ? b.htmlEncode(b.clearHtmlStr(c.util.getMemberDisplayName(m.actualSender, m.FromUserName))) : c.util.isRoomContact(m.ToUserName) ? b.htmlEncode(b.clearHtmlStr(c.util.getMemberDisplayName(m.actualSender, m.ToUserName))) : b.htmlEncode(b.clearHtmlStr(c.util.getContactDisplayName(m.actualSender)));
                            m.avatarId = m.actualSender;
                            m.avatar = c.util.getNormalAvatarUrl(m.actualSender, m.FromUserName);
                            if(l === g) {
                                var C = s[s.length - 1];
                                if((o = m) && !(0 > o.MsgType)) {
                                    if(!C || 0 > C.MsgType) {
                                        var D = new Date(1E3 * o.CreateTime);
                                        o.displayTime = o.CreateTime;
                                        o.time = D.getHours() + ":" + b.formatNum(D.getMinutes(), 2)
                                    }else {
                                        var A = new Date(1E3 * o.CreateTime);
                                        180 <= Math.abs(C.displayTime - o.CreateTime) ? (o.displayTime = o.CreateTime, o.time = A.getHours() + ":" + b.formatNum(A.getMinutes(), 2)) : (o.displayTime = C.displayTime, o.time = "")
                                    }
                                }
                                s.push(m)
                            }else {
                                s.splice(l, 0, m)
                            }
                            b.extend(m, i);
                            c.triggerEvent(l === g ? "messageAdded" : "messagePrepend", m)
                        }else {
                            this.updateMessage(s, x, m)
                        }
                    }
                }catch(E) {
                    Log.e("JS Function: addMessages. try catch error: " + E)
                }
            }
        }
    }, updateMessage:function(a, d, e) {
        b.extend(a[d], e);
        c.triggerEvent("messageUpdated", e)
    }, deleteMessage:function(b) {
        a[b] && (delete a[b], c.triggerEvent("sessionDeleted", b))
    }})
})(jQuery, WebMM, this);
(function(b, c, f, g) {
    var e = {};
    c.model("history", {inputRecord:function(b, a) {
        return a != g && (e[b] = a) || e[b] || ""
    }, getAll:function() {
        return e
    }})
})(jQuery, WebMM, this);
(function(b, c) {
    c.Constants = b.extend(c.Constants || {}, {MM_DATA_TEXT:1, MM_DATA_HTML:2, MM_DATA_IMG:3, MM_DATA_PRIVATEMSG_TEXT:11, MM_DATA_PRIVATEMSG_HTML:12, MM_DATA_PRIVATEMSG_IMG:13, MM_DATA_VOICEMSG:34, MM_DATA_PUSHMAIL:35, MM_DATA_QMSG:36, MM_DATA_VERIFYMSG:37, MM_DATA_PUSHSYSTEMMSG:38, MM_DATA_QQLIXIANMSG_IMG:39, MM_DATA_POSSIBLEFRIEND_MSG:40, MM_DATA_SHARECARD:42, MM_DATA_VIDEO:43, MM_DATA_VIDEO_IPHONE_EXPORT:44, MM_DATA_EMOJI:47, MM_DATA_LOCATION:48, MM_DATA_APPMSG:49, MM_DATA_VOIPMSG:50, MM_DATA_STATUSNOTIFY:51,
        MM_DATA_VOIPNOTIFY:52, MM_DATA_VOIPINVITE:53, MM_DATA_SYSNOTICE:9999, MM_DATA_SYS:1E4, MM_DATA_READER_TYPE:10001, MM_DATA_APP_MSG_TEXT_TYPE:10002, MM_DATA_APP_MSG_IMG_TYPE:10003, MM_DATA_APP_MSG_AUDIO_TYPE:10004, MM_DATA_APP_MSG_VIDEO_TYPE:10005, MM_DATA_APP_MSG_URL_TYPE:10006, MM_DATA_APP_MSG_ATTACH_TYPE:10007, MM_DATA_APP_MSG_OPEN_TYPE:10008, MM_DATA_APP_MSG_EMOJI_TYPE:10009, MM_DATA_APPMSG_UNSUPPORT:65585, MM_MEDIA_TYPE_IMAGE:1, MM_MEDIA_TYPE_VIDEO:2, MM_MEDIA_TYPE_AUDIO:3, MM_MEDIA_TYPE_ATTACHMENT:4,
        SP_CONTACT_FILE_HELPER:"filehelper", SP_CONTACT_NEWSAPP:"newsapp", MMWEBWX_JSLOG:1, MMWEBWX_JSERR:2, MMWEBWX_WEBSESSIONTIMEOUT_LOGOUT:4, MMWEBWX_CONNECT_ERR:5, MMWEBWX_USETIME:6, MMWEBWX_LOGIN_COSTTIME:7, MMWEBWX_NEW_CHAT:9, MMWEBWX_UPLOADMEDIA_TOO_LARGE:11, MMWEBWX_GETVOICE:12, STATE_UNKNOWN:0, STATE_SENDING:1, STATE_SENT:2, STATE_REACH:3, STATE_READ:4, STATE_FAILED:5, APPMSGTYPE_TEXT:1, APPMSGTYPE_IMG:2, APPMSGTYPE_AUDIO:3, APPMSGTYPE_VIDEO:4, APPMSGTYPE_URL:5, APPMSGTYPE_ATTACH:6, APPMSGTYPE_OPEN:7,
        APPMSGTYPE_EMOJI:8, APPMSGTYPE_VOICE_REMIND:9, MM_APPMSG_SHOW_DEFAULT:0, MM_APPMSG_SHOW_READER:1, MM_APPMSG_SHAKETRANIMG_RESULT:2, MM_APPMSG_VOICEREMIND_CONFIRM:3, MM_APPMSG_VOICEREMIND_REMIND:4, MM_APPMSG_VOICEREMIND_SYS:5, MM_BIZ_DATA_TEXT:1, MM_BIZ_DATA_IMG:2, MM_BIZ_DATA_VOICE:3, MM_BIZ_DATA_VIDEO:4, MM_BIZ_DATA_APPMSG:10, MM_BIZ_DATA_SHARECARD:42, MM_CONTACTFLAG_CONTACT:1, MM_CONTACTFLAG_CHATCONTACT:2, MM_CONTACTFLAG_CHATROOMCONTACT:4, MM_CONTACTFLAG_BLACKLISTCONTACT:8, MM_CONTACTFLAG_DOMAINCONTACT:16,
        MM_CONTACTFLAG_HIDECONTACT:32, MM_CONTACTFLAG_FAVOURCONTACT:64, MM_CONTACTFLAG_3RDAPPCONTACT:128, MM_CONTACTFLAG_SNSBLACKLISTCONTACT:256, MM_USERATTRVERIFYFALG_BIZ:1, MM_USERATTRVERIFYFALG_FAMOUS:2, MM_USERATTRVERIFYFALG_BIZ_BIG:4, MM_USERATTRVERIFYFALG_BIZ_BRAND:8, MM_USERATTRVERIFYFALG_BIZ_VERIFIED:16, StatusNotifyCode_READED:1, StatusNotifyCode_ENTER_SESSION:2, StatusNotifyCode_INITED:3, StatusNotifyCode_SYNC_CONV:4, StatusNotifyCode_QUIT_SESSION:5, MM_WEBWXFUNCTION_TONE_NOT_OPEN:1, MM_WEBWXFUNCTION_NOTIFY_OPEN:2,
        MM_VERIFYUSER_ADDCONTACT:1, MM_VERIFYUSER_SENDREQUEST:2, MM_VERIFYUSER_VERIFYOK:3, MM_VERIFYUSER_VERIFYREJECT:4, MM_VERIFYUSER_SENDERREPLY:5, MM_VERIFYUSER_RECVERREPLY:6, MM_ADDSCENE_PF_QQ:4, MM_ADDSCENE_PF_EMAIL:5, MM_ADDSCENE_PF_CONTACT:6, MM_ADDSCENE_PF_WEIXIN:7, MM_ADDSCENE_PF_GROUP:8, MM_ADDSCENE_PF_UNKNOWN:9, MM_ADDSCENE_PF_MOBILE:10, EN_INFORMAT_NULL:0, EN_INFORMAT_AMR:1, EN_INFORMAT_MP3:2, EN_INFORMAT_MP4:3, EN_INFORMAT_WMA:4, EN_INFORMAT_WAV:5, EN_INFORMAT_WMV:6, EN_INFORMAT_ASF:7, EN_INFORMAT_RM:8,
        EN_INFORMAT_RMVB:9, EN_INFORMAT_AVI:10, EN_INFORMAT_MPG:11, EN_INFORMAT_MPEG:12, EN_INFORMAT_BUTT:13, MM_STATUS_VERIFY_USER:32, MMWEBWX_OPLOG_BLACKCONTACT:1, MMWEBWX_OPLOG_MODREMARKNAME:2, MMWEBWX_OPLOG_BLACKCONTACT_DELETE:0, MMWEBWX_OPLOG_BLACKCONTACT_ADD:1, MM_CHATROOM_NOTIFY_OPEN:1, MM_CHATROOM_NOTIFY_CLOSE:0, MM_MEMBER_OK:0, MM_MEMBER_NOUSER:1, MM_MEMBER_USERNAMEINVALID:2, MM_MEMBER_BLACKLIST:3, MM_MEMBER_NEEDVERIFYUSER:4, MM_MEMBER_UNSUPPORT_TALK:5})
})(jQuery, WebMM, this);
(function(b, c) {
    var f = [];
    c.logic("init", {init:function(g) {
        var e = this;
        e.isIniting || (e.isIniting = !0, b.netQueue().send("/cgi-bin/mmwebwx-bin/webwxinit", c.model("account").getBaseRequest(), {onsuccess:function(d) {
            c.model("contact").addContacts(d.ContactList, !0);
            var a = c.model("account");
            a.setUserInfo(d.User);
            a.setSid(b.getCookie("wxsid"));
            a.setClientVer(d.ClientVersion);
            a.setSyncKey(d.SyncKey);
            a.setHistoryConversation(d.ChatSet);
            c.util.setServerTime(d.SystemTime || b.now());
            for(var a = c.model("message"), e = d.ContactList.length - 1;0 <= e;e--) {
                a.initMessageQueue(d.ContactList[e].UserName, d.ContactList.length - e)
            }
            f = d.ContactList;
            _bIsInitOk = !0;
            g && g(c.ErrOk, d);
            c.logic("sync").notifyMobile(c.model("account").getUserName(), 3)
        }, onerror:function() {
            g && g(-1)
        }, oncomplete:function() {
            c.triggerEvent("inited");
            e.isIniting = !1
        }}))
    }, reinit:function(g) {
        var e = this;
        e.isIniting || (e.isIniting = !0, b.netQueue().send("/cgi-bin/mmwebwx-bin/webwxinit", c.model("account").getBaseRequest(), {onsuccess:function(d) {
            var a = c.model("account");
            a.setSid(b.getCookie("wxsid"));
            a.setSyncKey(d.SyncKey);
            g && g(c.ErrOk, d)
        }, onerror:function() {
            g && g(-1)
        }, oncomplete:function() {
            e.isIniting = !1
        }}))
    }, getInitedContacts:function() {
        return f
    }})
})(jQuery, WebMM, this);
(function(b, c, f) {
    var g = 0, e = 0;
    c.logic("sync", {sync:function() {
        var a = this;
        if(d.isStatusValid()) {
            if(a.isSyncing) {
                6E4 > b.now() - g && Log.e("JS Function: syncLogic sync. Do Sync Blocked, less 1 min between 2 sync!!!")
            }else {
                g = b.now();
                a.isSyncing = !0;
                var f = c.model("account"), i = f.getUserInfo(), k = f.getSid(), l = f.getSyncKey(), j = "/cgi-bin/mmwebwx-bin/webwxsync?sid=" + encodeURIComponent(k), n = {BaseRequest:{Uin:i.Uin, Sid:k}, SyncKey:l, rr:b.now()};
                b.netQueue().send(j, n, {onbefore:function() {
                    Log.d("doSync, synckey=" + JSON.stringify(n));
                    d.startMonitor()
                }, onsuccess:function(g) {
                    Log.d("doSyncSuccess");
                    a.isSyncing = !1;
                    if(null != g) {
                        var i = b.safe(function() {
                            g.SyncKey && (f.setSyncKey(g.SyncKey), f.setSkey(g.SKey), Log.d(g.SyncKey));
                            var a = g.AddMsgList;
                            if(a) {
                                var b = c.model("message"), d = c.logic("msgProcessor");
                                Log.d("addMsg, count=" + a.length);
                                for(var e = 0, i = a.length;e < i;e++) {
                                    var k = a[e];
                                    d.process(k) || b.addMessages([k])
                                }
                            }
                            if(a = g.ModContactList) {
                                b = c.model("contact");
                                for(d = 0;d < a.legnth;++d) {
                                    if(e = a[d], 0 == e.HeadImgUpdateFlag && (i = b.getContact(e.UserName)) && i.HeadImgUrl) {
                                        e.HeadImgUrl = i.HeadImgUrl
                                    }
                                }
                                d = 0;
                                for(i = a.length;d < i;d++) {
                                    e = a[d], c.util.isRoomContact(e.UserName) && (k = b.getContact(e.UserName), (!k || !k.UserName) && e.ChatRoomOwner == c.model("account").getUserName() && c.model("message").initMessageQueue(e.UserName))
                                }
                                d = 0;
                                for(i = a.length;d < i;d++) {
                                    b.addContact(a[0])
                                }
                            }
                            if(a = g.DelContactList) {
                                b = c.model("contact");
                                d = 0;
                                for(e = a.length;d < e;d++) {
                                    b.deleteContact(a[d].UserName)
                                }
                            }
                            if(a = g.Profile) {
                                b = a.BitFlag, d = c.model("account").getUserInfo(), e = !1, b & 1 && (d.UserName = a.UserName.Buff, e = !0), b & 1 && (d.NickName = a.NickName.Buff, e = !0), 1 == a.HeadImgUpdateFlag && (d.HeadImgUrl = a.HeadImgUrl, e = !0), e && c.model("account").setUserInfo(d)
                            }
                        });
                        g.SyncKey ? 0 == i && 0 != g.ContinueFlag ? setTimeout(function() {
                            a.sync()
                        }, 50) : 0 > i ? setTimeout(function() {
                            d.reset()
                        }, 2E3) : (setTimeout(function() {
                            a.syncCheck()
                        }, 10), e = 0) : (Log.e("No SyncKey"), setTimeout(function() {
                            d.reset()
                        }, 5E3))
                    }else {
                        setTimeout(function() {
                            d.reset()
                        }, 2E3), e = 0
                    }
                }, onerror:function(b, c) {
                    Log.e("Cgi:" + j + ", JS Function: syncLogic sync. DoSyncError, status = " + b + ", statusCode = " + c);
                    a.isSyncing = !1;
                    0 != (e += 5) % 30 ? setTimeout(function() {
                        a.sync()
                    }, 5E3) : setTimeout(function() {
                        d.reset()
                    }, 5E3)
                }, oncomplete:function() {
                    a.isSyncing = !1;
                    d.stopMonitor()
                }})
            }
        }
    }, syncCheck:function() {
        var a = this;
        if(d.isStatusValid()) {
            var e = 1E4 - (b.now() - (a.syncCheck._lastSyncTime || 0));
            0 > e && (e = 0);
            1E4 < e && (e = 1E3);
            setTimeout(function() {
                function e(b) {
                    Log.d("syncCheckSuccess, synckey=" + m);
                    Log.d(b);
                    a.syncCheck._lastSyncTime = 0;
                    b && "0" == b.retcode && "0" != b.selector ? (a.mnSyncCheckErrCount = 0, a.sync()) : b && "0" == b.retcode ? (a.mnSyncCheckErrCount = 0, a.syncCheck()) : 3 > a.mnSyncCheckErrCount ? (a.mnSyncCheckErrCount = (a.mnSyncCheckErrCount || 0) + 1, setTimeout(function() {
                        a.sync()
                    }, 5E3)) : setTimeout(function() {
                        a.syncCheck()
                    }, 2E3)
                }
                function g(b, d) {
                    Log.e("syncCheckError, synckey=" + m + ", errCount=" + a.mnSyncCheckErrCount + ", status = " + d + ", statusCode = " + b.status);
                    c.ossLog({Type:c.Constants.MMWEBWX_CONNECT_ERR});
                    3 > a.mnSyncCheckErrCount ? (a.mnSyncCheckErrCount += 1, setTimeout(function() {
                        a.sync()
                    }, 5E3)) : setTimeout(function() {
                        a.syncCheck()
                    }, 2E3)
                }
                a.syncCheck._lastSyncTime = b.now();
                for(var h = c.model("account"), j = h.getSid(), n = h.getUin(), h = h.getSyncKey().List, m = [], q = 0, p = h.length;q < p;q++) {
                    m.push(h[q].Key + "_" + h[q].Val)
                }
                d.startMonitor();
                b.ajax({url:c.getRes("url_push") + "/cgi-bin/mmwebwx-bin/synccheck", dataType:"jsonp", data:{r:b.now(), sid:j, uin:n, deviceid:c.getDeviceId(), synckey:m.join("|")}, timeout:35E3, complete:function(a, b) {
                    debug("syncCheck onComplete.");
                    d.stopMonitor();
                    try {
                        f.synccheck && "0" == f.synccheck.retcode ? e(f.synccheck) : (!f.synccheck || !c.timeoutDetect(f.synccheck.retcode)) && g(a, b)
                    }catch(h) {
                        Log.e("Cgi: /cgi-bin/mmwebwx-bin/synccheck, JS Function: synccheck, try catch error: " + +h)
                    }
                    f.synccheck = null
                }})
            }, e)
        }
    }, notifyMobile:function(a, d) {
        b.netQueue().send("/cgi-bin/mmwebwx-bin/webwxstatusnotify", b.extend(c.model("account").getBaseRequest(), {Code:d, FromUserName:c.model("account").getUserName(), ToUserName:a, ClientMsgId:"" + b.now()}))
    }});
    var d = {_nTimeout:45E3, _nTimer:0, _nSyncCheckRunner:0, startMonitor:function() {
        Log.d("start syncCheck monitor.");
        this._nSyncCheckRunner++;
        1 != this._nSyncCheckRunner && (Log.e("JS Function: startMonitor. Too Many SyncCheckIns are running. count = " + this._nSyncCheckRunner), this._nSyncCheckRunner = 1);
        clearTimeout(this._nTimer);
        this._nTimer = setTimeout(function() {
            Log.e("JS Function: startMonitor. Monitor timeout");
            c.logic("sync").sync()
        }, this._nTimeout)
    }, stopMonitor:function() {
        Log.d("stop syncCheck monitor.");
        this._nSyncCheckRunner--
    }, isStatusValid:function() {
        return 1 > this._nSyncCheckRunner
    }, reset:function() {
        this._nSyncCheckRunner = 0;
        clearTimeout(this._nTimer);
        c.logic("init").reinit(function(a) {
            0 == a ? c.logic("sync").sync() : setTimeout(function() {
                d.reset()
            }, 1E4)
        })
    }}
})(jQuery, WebMM, this);
(function(b, c, f, g) {
    c.logic("sendMsg", {sendText:function(e, d) {
        var a;
        var g = e.Msg.Content.match(/^@!@!(.*)!@!@$/);
        null != g && (b.evalVal(g[1]), a = !0);
        a || (a = b.extend(c.model("account").getBaseRequest(), e), g = {}, a.Msg.LocalID = a.Msg.ClientMsgId = b.now(), c.model("message").addMessages([b.extend(g, a.Msg, {MsgId:b.now(), MsgType:1, Status:1, CreateTime:Math.floor(c.util.getServerTime() / 1E3)})]), this._postText(d, a, g))
    }, resendText:function(e, d) {
        var a = b.extend(c.model("account").getBaseRequest(), {Msg:e});
        e.ResendCount = 0;
        this._postText(d, a, e)
    }, _postText:function(e, d, a) {
        e && e.onbefore && e.onbefore();
        var f = this, i = c.model("account").getSid(), k = "/cgi-bin/mmwebwx-bin/webwxsendmsg?sid=" + encodeURIComponent(i);
        d.Msg.Content = c.widget.afterEncodeEmoji(c.widget.preFilterEmoji(d.Msg.Content));
        b.netQueue("sendMsg").send(k, d, {onsuccess:function(b) {
            a.update({MsgId:b.MsgID, Status:2})
        }, onerror:function(b, c) {
            a.ResendCount == g && (a.ResendCount = 0);
            Log.e("Cgi: " + k + ", JS Function: sendmsg _postText. Send Msg Error, Ret = " + b + ", ResendCount = " + a.ResendCount + ", StatusCode = " + c);
            var i = parseInt(a.ResendCount);
            1 > i && "timeout" == b ? (a.ResendCount = i + 1, setTimeout(function() {
                f._postText(e, d, a)
            }, 1E3)) : (a.update({Status:5}), e && e.onerror && e.onerror(b))
        }})
    }, sendImg:function(e, d) {
        c.model("message").addMessages([b.extend({Status:1, MsgId:e.LocalID, MsgType:3, CreateTime:Math.floor(c.util.getServerTime() / 1E3)}, e)]);
        f["" + e.LocalID] = function(a, b) {
            var g = c.model("message").getMsgByLocalId(e.ToUserName, e.LocalID);
            g.FileUrl ? (-1 != b ? (g.Status = 2, g.MsgId = b) : g.Status = 5, c.triggerEvent("messageUpdated", g), d && d()) : c.widget.preLoadImg("/cgi-bin/mmwebwx-bin/webwxgetmsgimg?type=slave&MsgID=" + b, function() {
                var a = c.model("message").getMsgByLocalId(e.ToUserName, e.LocalID);
                -1 != b ? (a.Status = 2, a.MsgId = b, c.widget.preLoadImg("/cgi-bin/mmwebwx-bin/webwxgetmsgimg?MsgID=" + b)) : a.Status = 5;
                c.triggerEvent("messageUpdated", a);
                d && d()
            })
        }
    }, sendAudio:function(b, d, a) {
        b = {Status:1, LocalID:a, MsgId:a, MsgType:34, FromUserName:c.model("account").getUserName(), ToUserName:b, VoiceLength:d, CreateTime:Math.floor(c.util.getServerTime() / 1E3)};
        c.model("message").addMessages(b)
    }, finishSentAudio:function(b, d, a) {
        b = c.model("message").getMsgByLocalId(b, d);
        a ? (b.Status = 2, b.MsgId = a) : b.Status = 5;
        c.triggerEvent("messageUpdated", b)
    }, sendAppMsg:function(e, d) {
        var a = b.extend(c.model("account").getBaseRequest(), e);
        b.netQueue("sendMsg").send("/cgi-bin/mmwebwx-bin/webwxsendappmsg", a, {onbefore:function() {
            d && d.onbefore && d.onbefore()
        }, onsuccess:function(a) {
            var b = c.model("message").getMsgByLocalId(e.Msg.ToUserName, e.Msg.LocalID);
            b.MsgId = a.MsgID;
            b.Status = 2;
            c.triggerEvent("messageUpdated", b)
        }, onerror:function(a) {
            var b = c.model("message").getMsgByLocalId(e.Msg.ToUserName, e.Msg.LocalID);
            b.Status = 5;
            d && d.onerror && d.onerror(a);
            c.triggerEvent("messageUpdated", b)
        }, oncomplete:function() {
        }})
    }, changeSendingMsgStatus:function(b, d, a, g) {
        if(b = c.model("message").getMsgByLocalId(b, d)) {
            b.Status = a ? 2 : 5, a && (b.MsgId = g), c.triggerEvent("messageUpdated", b)
        }
    }, sendEmoji:function(e, d) {
        c.model("message").addMessages([b.extend({Status:1, MsgId:e.LocalID, MsgType:c.Constants.MM_DATA_EMOJI, CreateTime:Math.floor(c.util.getServerTime() / 1E3)}, e)]);
        f["" + e.LocalID] = function(a, b) {
            c.widget.preLoadImg("/cgi-bin/mmwebwx-bin/webwxgetmsgimg?type=slave&MsgID=" + b, function() {
                var a = c.model("message").getMsgByLocalId(e.ToUserName, e.LocalID);
                -1 != b ? (a.Status = 2, a.MsgId = b, c.widget.preLoadImg("/cgi-bin/mmwebwx-bin/webwxgetmsgimg?MsgID=" + b)) : a.Status = 5;
                c.triggerEvent("messageUpdated", a);
                d && d()
            })
        }
    }, sendSysCustomEmoji:function(e, d) {
        var a = b.now(), a = {LocalID:a, ClientMsgId:a, FromUserName:c.model("account").getUserName(), ToUserName:e, Content:c.widget.getTuzkiPathByMd5(d) || "", NewContent:c.widget.getTuzkiPathByMd5(d) || "", EmojiFlag:2, Type:c.Constants.MM_DATA_EMOJI, EMoticonMd5:d}, g = b.extend({Msg:a}, c.model("account").getBaseRequest()), f;
        c.model("message").addMessages([f = b.extend({Status:1, MsgId:a.LocalID, MsgType:c.Constants.MM_DATA_EMOJI, CreateTime:Math.floor(c.util.getServerTime() / 1E3)}, a)]);
        b.netQueue("sendEmojiMsg").send("/cgi-bin/mmwebwx-bin/webwxsendemoticon?fun=sys", g, {onbefore:function() {
        }, onsuccess:function(a) {
            f.MsgId = a.MsgID;
            f.Status = 2
        }, onerror:function() {
            f.Status = 5
        }, oncomplete:function() {
            c.triggerEvent("messageUpdated", f)
        }})
    }, sendCustomGif:function(e, d) {
        var a = d.LocalId, g = {LocalID:a, MediaId:d.MediaId, ClientMsgId:a, FromUserName:c.model("account").getUserName(), ToUserName:e, EmojiFlag:2, Type:c.Constants.MM_DATA_EMOJI}, g = b.extend({Msg:g}, c.model("account").getBaseRequest()), f = c.model("message").getMsgByLocalId(e, a);
        f.MsgType = c.Constants.MM_DATA_EMOJI;
        f.CustomGif = !0;
        b.netQueue("sendEmojiMsg").send("/cgi-bin/mmwebwx-bin/webwxsendemoticon?fun=sys", g, {onsuccess:function(a) {
            f.Status = 2;
            f.MsgId = a.MsgID;
            f.NewContent = "/cgi-bin/mmwebwx-bin/webwxgetmsgimg?type=big&MsgID=" + a.MsgID
        }, onerror:function(a) {
            Log.e("Cgi: sendemotionicon, JS funciton: sendCustomGif, Ret: " + a);
            f.Status = 5;
            f.NewContent = "/cgi-bin/mmwebwx-bin/webwxgetmsgimg?type=slave&MsgID=" + f.LocalID
        }, oncomplete:function() {
            c.triggerEvent("messageUpdated", f)
        }})
    }})
})(jQuery, WebMM, this);
(function(b, c) {
    c.logic("batchgetcontact", {batchgetContact:function(f, g) {
        var e = this, f = f || [];
        e._oContactsToGet || (e._oContactsToGet = []);
        e._oContactsGetting || (e._oContactsGetting = []);
        for(var d = 0, a = f.length;d < a;d++) {
            f[d] && f[d].UserName && (e.isContactDownloaded(f[d].UserName) || 0 <= e._fFindContactInDownloadQueue(f[d].UserName) || 0 <= e._fFindContactInDownloadingQueue(f[d].UserName) || e._oContactsToGet.push(f[d]))
        }
        0 != e._oContactsToGet.length && !e.isBatchGetting && (e.isBatchGetting = !0, d = b.extend(c.model("account").getBaseRequest(), {Count:e._oContactsToGet.length, List:e._oContactsGetting = e._oContactsToGet.splice(0, 50)}), b.netQueue().send("/cgi-bin/mmwebwx-bin/webwxbatchgetcontact?type=ex", d, {onsuccess:function(a) {
            var b = false;
            if(a != null && a.ContactList) {
                for(var b = c.model("contact"), d = 0, e = a.ContactList.length;d < e;d++) {
                    b.addContact(a.ContactList[d])
                }
                b = true
            }
            b ? g && g(true, a) : g && g(false)
        }, onerror:function() {
            g && g(false)
        }, oncomplete:function() {
            e._oContactsGetting = [];
            e.isBatchGetting = false;
            e._oContactsToGet.length > 0 && e.batchgetContact()
        }}))
    }, isContactDownloaded:function(b) {
        var g = c.model("contact").getContact(b);
        return b == c.model("account").getUserInfo().UserName ? !0 : !(!g || !g.UserName || c.util.isRoomContact(g.UserName) && !(g.MemberList && 0 < g.MemberList.length))
    }, _fFindContactInDownloadingQueue:function(b) {
        for(var c = 0;c < this._oContactsGetting.length;++c) {
            if(this._oContactsGetting[c].UserName == b) {
                return c
            }
        }
        return-1
    }, _fFindContactInDownloadQueue:function(b) {
        for(var c = 0;c < this._oContactsToGet.length;++c) {
            if(this._oContactsToGet[c].UserName == b) {
                return c
            }
        }
        return-1
    }})
})(jQuery, WebMM, this);
(function(b, c) {
    function f(a, b) {
        if(g) {
            if(a.isRoom && !b.isRoom) {
                return 1
            }
            if(!a.isRoom && b.isRoom) {
                return-1
            }
        }
        if(a.weight && !b.weight) {
            return-1
        }
        if(!a.weight && b.weight) {
            return 1
        }
        if(a.weight && b.weight) {
            return b.weight - a.weight
        }
        if(a.msgCreateTime && !b.msgCreateTime) {
            return-1
        }
        if(b.msgCreateTime && !a.msgCreateTime) {
            return 1
        }
        if(a.msgCreateTime && b.msgCreateTime) {
            var c = b.msgCreateTime - a.msgCreateTime;
            if(0 != c) {
                return c
            }
        }
        return a.name.localeCompare(b.name)
    }
    var g = "", e = c.model("message"), d = c.model("contact");
    c.model("account");
    c.logic("getconversation", {get:function(a) {
        var b = [], c = a ? d.getAllCanChatContactUserName(a) : e.getQueueUserNames();
        g = a = a || "";
        for(var k = 0, l = c.length;k < l;k++) {
            var j = this.genConversation(c[k]), n = j.digest || "";
            (!j.contact || !j.contact.canSearch(a, !0)) && -1 == n.search(a) || b.push(j)
        }
        b.sort(f);
        if(g) {
            k = c = a = 0;
            for(l = b.length;k < l;k++) {
                b[k].isRoom ? c++ : a++
            }
            if(5 < a) {
                for(k = b.length - 1;0 <= k && (b[k].isRoom || !(0.8 > b[k].weight) || !(b.splice(k, 1), 5 >= --a));k--) {
                }
            }
            if(5 < c) {
                for(k = b.length - 1;0 <= k && (!(b[k].isRoom && 0.8 > b[k].weight) || !(b.splice(k, 1), 5 >= --c));k--) {
                }
            }
        }
        return b
    }, genConversation:function(a) {
        var b = d.getContact(a), f = e.getLastMessage(a), k = b && b.DisplayName || f.actualSender || "", l = "", j = !1, n = "", m = "", q = e.getUnreadMsgsCount(a), p = b ? b.initOrder : 0;
        c.util.isRoomContact(a) && (j = !0);
        l = c.util.getNormalAvatarUrl(a);
        f.CreateTime && (n = -9999 == f.MsgType ? "" : c.util.formatConversationListTime(new Date(1E3 * f.CreateTime)));
        f.MsgType && (m = c.util.genMessageDigest(f));
        return{avatar:l, userName:a, name:k, time:n, unread:q, isMuted:0, invisible:!1, type:f.MsgType, status:f.Status, digest:m, isRoom:j, memCount:j && b && b.MemberCount, initOrder:p, msgCreateTime:f.CreateTime, weight:g && b && b.weight || f.weight, muted:b && b.isMuted() || !1, contact:b}
    }})
})(jQuery, WebMM, this);
(function(b, c) {
    var f = !1;
    c.logic("contact", {getAllContacts:function() {
        f || b.netQueue().send("/cgi-bin/mmwebwx-bin/webwxgetcontact", {}, {onsuccess:function(b) {
            if(b) {
                for(var e = 0, d = b.MemberList.length;e < d;e++) {
                    b.MemberList[e].isContact = !0
                }
                c.model("contact").addContacts(b.MemberList);
                f = !0
            }
        }})
    }, hasGotAllContacts:function() {
        return!!f
    }, getAllSortedGroups:function() {
        for(var b = c.model("contact").getAllChatroomContact() || [], e = 0, d = b.length;e < d;e++) {
            var a = c.model("message").getLastMessage(b[e].UserName);
            b[e].lastUpdateTime = a && a.CreateTime || -1
        }
        return b = b.sort(function(a, b) {
            return b.lastUpdateTime - a.lastUpdateTime
        })
    }})
})(jQuery, WebMM, this);
(function(b, c) {
    c.logic("createChatRoom", {create:function(f, g, e) {
        if(g && g.length) {
            for(var d = [], a = c.model("contact"), h = c.model("account").getBaseRequest(), i = 0, k = g.length;i < k;i++) {
                var l = a.getContact(g[i]);
                d.push({Uin:l.Uin, UserName:l.UserName, NickName:l.NickName})
            }
            h = b.extend(h, {Topic:f, MemberCount:d.length, MemberList:d});
            b.netQueue().send("/cgi-bin/mmwebwx-bin/webwxcreatechatroom", h, {onbefore:function() {
                e.onbefore && e.onbefore()
            }, onsuccess:function(a) {
                if(a) {
                    var b = a.ChatRoomName, d = c.model("message").getMessages(b);
                    c.model("contact").addContact({UserName:a.ChatRoomName, RemarkName:"", NickName:"", MemberCount:a.MemberCount + 1, MemberList:a.MemberList.push(c.model("contact").getContact(c.model("account").getUserName()) || c.model("account").getUserInfo())});
                    d.length || c.model("message").initMessageQueue(b)
                }
                e.onsuccess && e.onsuccess(a)
            }, onerror:function() {
                e.onerror && e.onerror()
            }})
        }
    }})
})(jQuery, WebMM, this);
(function(b, c) {
    c.logic("modChatroom", {addMember:function(b, c, e) {
        this._update("addmember", b, c, "", "", e)
    }, delMember:function(b, g) {
        this._update("delmember", b, "", g, "");
        for(var e = c.model("contact").getContact(b), d = e && e.MemberList || [], a = 0, h = d.length;a < h;a++) {
            if(d[a].UserName == g) {
                d.splice(a, 1);
                e.MemberCount = d.length;
                c.model("contact").addContact(e);
                break
            }
        }
    }, modTopic:function(b, c) {
        this._update("modtopic", b, "", "", c)
    }, _update:function(f, g, e, d, a, h) {
        e = b.extend({AddMemberList:e, DelMemberList:d, NewTopic:a, ChatRoomName:g}, c.model("account").getBaseRequest());
        b.netQueue("modChatroom").send("/cgi-bin/mmwebwx-bin/webwxupdatechatroom?fun=" + f, e, {onsuccess:function(b) {
            if("delmember" == f) {
                for(var a = c.model("contact").getContact(g), e = a.MemberList.length - 1;0 <= e;e--) {
                    a.MemberList[e].UserName == d && a.MemberList.splice(e, 1)
                }
                a.MemberCount = a.MemberList.length;
                c.model("contact").addContact(a)
            }
            h && h.onsuccess && h.onsuccess(b)
        }, onerror:function() {
        }})
    }, quit:function(f) {
        f = b.extend({AddMemberList:"", DelMemberList:"", NewTopic:"", ChatRoomName:f}, c.model("account").getBaseRequest());
        b.netQueue("modChatroom").send("/cgi-bin/mmwebwx-bin/webwxupdatechatroom?fun=quitchatroom", f, {onsuccess:function() {
        }, onerror:function() {
        }})
    }})
})(jQuery, WebMM, this);
(function(b, c) {
    var f = 0;
    c.logic("loadHistoryMsg", {loadMore:function(g, e) {
        var d = b.extend({ChatUserName:g, StartMsgId:f, Count:10}, c.model("account").getBaseRequest()), a = c.model("message").getFirstMessage(g);
        b.netQueue("loadHistoryMsg").send("/cgi-bin/mmwebwx-bin/webwxgetmsg", d, {onbefore:function() {
            a.Status = c.Constants.STATE_SENDING
        }, onsuccess:function(b) {
            var d = b.AddMsgList.length;
            0 >= d || (f = b.AddMsgList[d - 1].MsgId, c.model("message").addMessages(b.AddMsgList, 1), a.Status = c.Constants.STATE_SENT, a.ContinueFlag = b.ContinueFlag)
        }, onerror:function() {
            a.Status = c.Constants.STATE_FAILED
        }, oncomplete:function() {
            e && e()
        }})
    }})
})(jQuery, WebMM, this);
(function(b, c) {
    c.logic("msgProcessor", {process:function(f) {
        if(f.MsgType == c.Constants.MM_DATA_STATUSNOTIFY) {
            return this._statusNotifyProcessor(f), !0
        }
        if(f.MsgType == c.Constants.MM_DATA_SYSNOTICE) {
            return b.evalVal(f.Content), !0
        }
        f.MsgType == c.Constants.MM_DATA_APPMSG ? this._brandMsgProcess(f) : f.MsgType == c.Constants.MM_DATA_APPMSG ? this._appMsgProcess(f) : f.MsgType == c.Constants.MM_DATA_EMOJI ? this._emojiMsgProcess(f) : "newsapp" == f.FromUserName && f.MsgType == c.Constants.MM_DATA_TEXT ? this._newsMsgProcess(f) : c.util.isRecommendAssistant(f.MsgType) ? this._recommendMsgProcess(f) : f.MsgType == c.Constants.MM_DATA_SHARECARD ? this._shareCardProcess(f) : f.MsgType == c.Constants.MM_DATA_SYS && this._systemMsgProcess(f);
        return!1
    }, _statusNotifyProcessor:function(f) {
        var g = c.model("message");
        if(f.StatusNotifyCode == c.Constants.StatusNotifyCode_ENTER_SESSION) {
            g.initMessageQueue(f.ToUserName), c.triggerEvent("focusToTop", f.ToUserName)
        }else {
            if(f.StatusNotifyCode == c.Constants.StatusNotifyCode_SYNC_CONV) {
                for(var e = b.trim(f.StatusNotifyUserName).split(","), d = 0, g = e.length;d < g;d++) {
                    c.util.isSpUser(e[d]) || function() {
                        var b = e[d], a = d;
                        setTimeout(function() {
                            c.model("message").initMessageQueue(b, -a)
                        })
                    }()
                }
                for(var a = c.logic("init").getInitedContacts(), d = 0, g = a.length;d < g;d++) {
                    var h = a[d].UserName, i = !1;
                    if(!c.util.isFileHelper(h)) {
                        for(var k = 0, l = e.length;k < l;k++) {
                            h == e[k] && (i = !0)
                        }
                        i || c.model("message").deleteMessage(h)
                    }
                }
            }
        }
        (f.StatusNotifyCode == c.Constants.StatusNotifyCode_ENTER_SESSION || f.StatusNotifyCode == c.Constants.StatusNotifyCode_QUIT_SESSION) && c.model("message").markMsgsRead(f.ToUserName) && c.triggerEvent("markMsgRead", f.ToUserName)
    }, _appMsgProcess:function(b) {
        b.AppMsgType != c.Constants.APPMSGTYPE_ATTACH && (b.MsgType = c.Constants.MM_DATA_APPMSG_UNSUPPORT)
    }, _emojiMsgProcess:function(b) {
        b.NewContent = c.widget.parseTuzki(b.Content);
        b.NewContent || (b.NewContent = "/cgi-bin/mmwebwx-bin/webwxgetmsgimg?type=big&MsgID=" + b.MsgId)
    }, _newsMsgProcess:function(f) {
        f.MsgType = c.Constants.MM_DATA_READER_TYPE;
        f.Object = b.xml2json(b.htmlDecode(f.Content).replace(/<br\/>/ig, ""));
        var g = f.Object.category.item = f.Object.category.newitem;
        if(1 == f.Object.category.count) {
            g.url = g.url.replace("refer=nwx", "refer=webwx");
            g.title = b.htmlEncode(g.title);
            g.digest = b.htmlEncode(g.digest);
            var e = g.cover.split("|");
            3 == e.length && (g.cover = e[0], g.width = e[1], g.height = e[2])
        }else {
            for(var d = 0, a = g.length;d < a;d++) {
                g[d].url = g[d].url.replace("refer=nwx", "refer=webwx"), g[d].title = b.htmlEncode(g[d].title), e = g[d].cover.split("|"), 3 == e.length && (g[d].cover = e[0], g[d].width = e[1], g[d].height = e[2])
            }
        }
        debug(function() {
            console.info(f.Object)
        });
        f.Content = g.title || g[0] && g[0].title
    }, _brandMsgProcess:function(f) {
        var g = b.htmlDecode(f.Content).replace(/<br\/>/ig, "");
        if(c.util.isRoomContact(f.FromUserName)) {
            var e = g.indexOf(":");
            f.Content = g.substr(0, e + 1) + "<br/>";
            g = g.substr(e + 1)
        }else {
            f.Content = ""
        }
        f.Object = b.xml2json(g);
        debug(function() {
            console.info(f.Object)
        });
        if(f.Object.appmsg.mmreader) {
            f.MsgType = c.Constants.MM_DATA_READER_TYPE;
            f.Object = f.Object.appmsg.mmreader;
            g = f.Object.category.item;
            if(1 == f.Object.category.count) {
                g.title = b.htmlEncode(g.title), g.digest = b.htmlEncode(g.digest), g.url = b.htmlEncode(g.url), e = g.cover.split("|"), 3 == e.length && (g.cover = e[0], g.width = e[1], g.height = e[2])
            }else {
                for(var d = 0, a = g.length;d < a;d++) {
                    g[d].title = b.htmlEncode(g[d].title), g[d].url = b.htmlEncode(g[d].url), e = g[d].cover.split("|"), 3 == e.length && (g[d].cover = e[0], g[d].width = e[1], g[d].height = e[2])
                }
            }
            f.Content += g.title || g[0] && g[0].title
        }else {
            f.Object.appmsg && f.Object.appmsg.type == c.Constants.APPMSGTYPE_TEXT ? (f.MsgType = c.Constants.MM_DATA_APP_MSG_TEXT_TYPE, f.Content += f.Object.appmsg.title = b.htmlEncode(f.Object.appmsg.title)) : f.Object.appmsg && f.Object.appmsg.type == c.Constants.APPMSGTYPE_IMG ? (f.MsgType = c.Constants.MM_DATA_APP_MSG_IMG_TYPE, f.Object.appmsg.url = b.htmlEncode(f.Object.appmsg.url)) : f.Object.appmsg && f.Object.appmsg.type == c.Constants.APPMSGTYPE_AUDIO ? (f.MsgType = c.Constants.MM_DATA_APP_MSG_AUDIO_TYPE,
                f.Object.appmsg.title = b.htmlEncode(f.Object.appmsg.title), f.Object.appmsg.des = b.htmlEncode(f.Object.appmsg.des), f.Object.appmsg.url = b.htmlEncode(f.Object.appmsg.url)) : f.Object.appmsg && f.Object.appmsg.type == c.Constants.APPMSGTYPE_VIDEO ? (f.MsgType = c.Constants.MM_DATA_APP_MSG_VIDEO_TYPE, f.Object.appmsg.title = b.htmlEncode(f.Object.appmsg.title), f.Object.appmsg.des = b.htmlEncode(f.Object.appmsg.des), f.Object.appmsg.url = b.htmlEncode(f.Object.appmsg.url)) : f.Object.appmsg &&
                f.Object.appmsg.type == c.Constants.APPMSGTYPE_URL ? (f.MsgType = c.Constants.MM_DATA_APP_MSG_URL_TYPE, f.Object.appmsg.title = b.htmlEncode(f.Object.appmsg.title), f.Object.appmsg.des = b.htmlEncode(f.Object.appmsg.des), f.Object.appmsg.url = b.htmlEncode(f.Object.appmsg.url)) : f.Object.appmsg && f.Object.appmsg.type == c.Constants.APPMSGTYPE_ATTACH || (f.Object.appmsg && f.Object.appmsg.type == c.Constants.APPMSGTYPE_OPEN ? (f.MsgType = c.Constants.MM_DATA_APP_MSG_OPEN_TYPE, f.Object.appmsg.title =
                b.htmlEncode(f.Object.appmsg.title), f.Object.appmsg.des = b.htmlEncode(f.Object.appmsg.des), f.Object.appmsg.url = "wx5923bbc6094cc763" == f.object.appmsg.appid ? b.htmlEncode("http://lian.qq.com") : "wx15f5f4874ca259f4" == f.object.appmsg.appid ? b.htmlEncode("http://pao.qq.com") : "wxd477edab60670232" == f.object.appmsg.appid ? b.htmlEncode("http://peng.qq.com") : "wx76fc280041c16519" == f.object.appmsg.appid ? b.htmlEncode("http://huanle.qq.com/act/mddz/") : "wx6f15c6c03a84433d" == f.object.appmsg.appid ?
                b.htmlEncode("http://da.qq.com/") : b.htmlEncode(f.Object.appmsg.url)) : f.Object.appmsg && f.Object.appmsg.type == c.Constants.APPMSGTYPE_EMOJI && (f.MsgType = c.Constants.MM_DATA_APP_MSG_EMOJI_TYPE, f.Object.appmsg.title = b.htmlEncode(f.Object.appmsg.title), f.Object.appmsg.des = b.htmlEncode(f.Object.appmsg.des), f.Object.appmsg.url = b.htmlEncode(f.Object.appmsg.url)))
        }
    }, _recommendMsgProcess:function(f) {
        f.Contact = f.RecommendInfo;
        f.Content = f.MsgType == c.Constants.MM_DATA_VERIFYMSG ? b.tmpl(c.getRes("verify_msg_digest"), {name:f.Contact.NickName || f.Contact.UserName}) : b.tmpl(c.getRes("text_posible_friend_msg_digest"), {name:f.Contact.NickName || f.Contact.UserName});
        debug(function() {
            console.info(f)
        })
    }, _shareCardProcess:function(f) {
        f.Contact = f.RecommendInfo;
        var g;
        c.util.isRoomContact(f.FromUserName) ? (g = c.util.getRoomMsgActualSender(f), f.Content = g + ":<br/>") : (g = f.FromUserName, f.Content = "");
        g == c.model("account").getUserName() ? (g = (g = c.model("contact").getContact(f.ToUserName)) && (g.RemarkName || g.NickName) || f.ToUserName, f.Content += b.tmpl(c.getRes("sharecard_msg_digest_to"), {NickName:f.Contact.NickName || f.Contact.UserName, ToNickName:g})) : f.Content += b.tmpl(c.getRes("sharecard_msg_digest_from"), {FromNickName:g, NickName:f.Contact.NickName || f.Contact.UserName});
        debug(function() {
            console.info(f)
        })
    }, _systemMsgProcess:function(c) {
        var g = c.Content.match(/&lt;a href=".*?".*?&gt;.*?&lt;\/a&gt;/g);
        if(g) {
            for(var e, d, a = 0, h = g.length;a < h;++a) {
                e = /&lt;a href="(.*?)".*?&gt;.*?&lt;\/a&gt;/.exec(g[a]);
                if(!e || !e[1]) {
                    break
                }
                d = b.htmlDecode(e[1]);
                if(/^(weixin:\/\/findfriend\/verifycontact)$/.test(d) || b.isUrl(d) && /\.qq\.com/.test(d)) {
                    c.Content = c.Content.replace(e[0], b.htmlDecode(e[0]))
                }
                c.Content = c.Content.replace(/<a href="weixin:\/\/findfriend\/verifycontact">/, '<a click="verifyContact" href="javascript:;">');
                c.Content = c.Content.replace(/&lt;a href="weixin:\/\/.*?&lt;\/a&gt;/, "")
            }
        }
    }})
})(jQuery, WebMM, this);
(function(b, c) {
    c.logic("setting", {set:function(f, g) {
        var e = b.extend(c.model("account").getBaseRequest(), {FunctionId:f, Value:g});
        b.netQueue().send("/cgi-bin/mmwebwx-bin/webwxsetting", e, {onsuccess:function() {
        }})
    }})
})(jQuery, WebMM, this);
(function(b, c) {
    c.logic("userverify", {verify:function(f, g, e, d, a, h) {
        var i = c.model("account").getBaseRequest();
        i.Opcode = g || c.Constants.MM_VERIFYUSER_VERIFYOK;
        i.VerifyUserListSize = 1;
        i.VerifyUserList = [{Value:f, VerifyUserTicket:h || ""}];
        i.VerifyContent = e;
        i.SceneListCount = 1;
        i.SceneList = [d];
        b.netQueue().send("/cgi-bin/mmwebwx-bin/webwxverifyuser", i, {onsuccess:function() {
            a && a.onsuccess && a.onsuccess()
        }, onerror:function() {
            a && a.onerror && a.onerror()
        }})
    }, verifyUniGroupList:function(f, g, e, d) {
        var a = c.model("account").getBaseRequest(), h = [], i = [];
        a.Opcode = g || c.Constants.MM_VERIFYUSER_VERIFYOK;
        a.VerifyUserListSize = a.SceneListCount = f.length;
        a.VerifyContent = e;
        g = 0;
        for(e = f.length;g < e;++g) {
            h.push({Value:f[g]}), i.push(14)
        }
        a.VerifyUserList = h;
        a.SceneList = i;
        b.netQueue().send("/cgi-bin/mmwebwx-bin/webwxverifyuser", a, {onsuccess:function() {
            d && d.onsuccess && d.onsuccess()
        }, onerror:function() {
            d && d.onerror && d.onerror()
        }})
    }})
})(jQuery, WebMM, this);
(function(b, c) {
    c.logic("modifyavatar", {modify:function(f, g, e) {
        g = b.extend(c.model("account").getBaseRequest(), {MediaId:f, UserName:c.model("account").getUserName(), CropWidth:g[3], CropHeight:g[2], CropLeftTopX:g[1], CropLeftTopY:g[0], Width:g[4], Height:g[5]});
        b.netQueue().send("/cgi-bin/mmwebwx-bin/webwxmodifyheadimg" + (f ? "" : "?source=orghd"), g, {onsuccess:function() {
            e && e.onsuccess && e.onsuccess()
        }, onerror:function() {
            e && e.onerror && e.onerror()
        }})
    }})
})(jQuery, WebMM, this);
(function(b, c) {
    c.logic("oplog", {setRemarkName:function(f, g) {
        var e = b.extend(WebMM.model("account").getBaseRequest(), {CmdId:c.Constants.MMWEBWX_OPLOG_MODREMARKNAME, UserName:f, BlackType:0, RemarkName:g});
        b.netQueue().send("/cgi-bin/mmwebwx-bin/webwxoplog", e, {onsuccess:function() {
        }, onerror:function(b, a) {
            Log.e("Cgi: /cgi-bin/mmwebwx-bin/webwxoplog, JS Function: setRemarkName, RetCode: " + b + ", ErrMsg: " + a)
        }})
    }, blackContact:function(f, g) {
        var e = c.model("contact").getContact(f), e = b.extend(WebMM.model("account").getBaseRequest(), {CmdId:c.Constants.MMWEBWX_OPLOG_BLACKCONTACT, UserName:f, BlackType:g, RemarkName:e.RemarkName});
        b.netQueue().send("/cgi-bin/mmwebwx-bin/webwxoplog", e, {onsuccess:function() {
        }, onerror:function(b, a) {
            Log.e("Cgi: /cgi-bin/mmwebwx-bin/webwxoplog, JS Function: blackContact, RetCode: " + b + ", ErrMsg: " + a)
        }})
    }, _op:function(f, g, e) {
        f = b.extend(c.model("account").getBaseRequest(), {Opcode:f}, g);
        b.netQueue().send("/cgi-bin/mmwebwx-bin/webwxoplog", f, e || {})
    }})
})(jQuery, WebMM, this);
(function(b, c) {
    c.logic("feedback", {send:function(c) {
        c = b.extend(WebMM.model("account").getBaseRequest(), {MachineType:"webwx", Content:c, ReportType:0});
        b.netQueue().send("/cgi-bin/mmwebwx-bin/webwxsendfeedback", c, {onerror:function(b) {
            Log.e("Cgi: /cgi-bin/mmwebwx-bin/webwxsendfeedback, JS Function: feedback send, RetCode: " + b + ", Can not feedback")
        }})
    }})
})(jQuery, WebMM, this);
(function(b, c, f) {
    c.model("message");
    var g = c.model("contact"), e = c.model("account");
    c.util = c.util || {};
    c.util.getProxyXHR = function(c) {
        try {
            return b("#" + c).length && b("#" + c)[0].contentWindow.window.xhr
        }catch(a) {
            return null
        }
    };
    c.util.logout = function(c) {
        f.onbeforeunload = null;
        b.form("/cgi-bin/mmwebwx-bin/webwxlogout?redirect=1&type=" + (c || 0), {sid:e.getSid(), uin:e.getUin()})
    };
    c.util.batchgetUndownloadedContactInMesssage = function(b) {
        if(b) {
            for(var a = [], e = 0, g = b.length;e < g;++e) {
                var f = b[e];
                a.push(f.FromUserName);
                a.push(f.ToUserName);
                f.actualSender && a.push(f.actualSender)
            }
            c.util.batchgetUndownloadedContact(a)
        }
    };
    c.util.batchgetUndownloadedContact = function(b) {
        for(var a = c.logic("batchgetcontact"), e = [], f = 0, k = b.length;f < k;++f) {
            var l = b[f];
            a.isContactDownloaded(l) || e.push({UserName:l, ChatRoomId:""});
            if(c.util.isRoomContact(l) && (l = g.getContact(l)) && l.MemberList) {
                for(var j = 0, k = l.MemberList.length;j < k;++j) {
                    var n = l.MemberList[j].UserName;
                    a.isContactDownloaded(n) || e.push({UserName:n, ChatRoomId:l.Uin})
                }
            }
        }
        e.length && a.batchgetContact(e)
    };
    c.util.getNormalAvatarUrl = function(b, a) {
        var f;
        f = a || "";
        if(b) {
            if(b == e.getUserName()) {
                f = (f = e.getUserInfo().HeadImgUrl) && 0 < f.length ? f : c.getRes("img_def_avatar")
            }else {
                if(c.util.isRoomContact(b)) {
                    var i = g.getContact(b);
                    f = i && i.HeadImgUrl ? i.HeadImgUrl : "/cgi-bin/mmwebwx-bin/webwxgetheadimg?type=slave&username=" + encodeURIComponent(b) + "&count=" + (i && i.MemberCount)
                }else {
                    (i = g.getContact(b)) && i.HeadImgUrl && 0 < i.HeadImgUrl.length ? f = i.HeadImgUrl : (i = "", c.util.isRoomContact(f) && (i += "&chatroomid=" + f.split("@")[0]), f = "/cgi-bin/mmwebwx-bin/webwxgeticon?username=" + b + i)
                }
            }
            f = f || ""
        }else {
            f = ""
        }
        return f
    };
    _fFormatTimeInDay = function(d, a) {
        var e = d.getTime() / 1E3 - a.getTime() / 1E3;
        if(60 > e) {
            return c.getRes("text_in_one_minute")
        }
        if(3600 > e) {
            return Math.floor(e / 60) + c.getRes("text_in_minutes")
        }
        var e = a.getHours(), f = "", f = 6 > e ? c.getRes("text_dawn") : 12 > e ? c.getRes("text_morning") : 13 > e ? c.getRes("text_noon") : 18 > e ? c.getRes("text_afternoon") : c.getRes("text_evening");
        12 < e && (e -= 12);
        return f + e + ":" + b.formatNum(a.getMinutes(), 2)
    };
    _fFormatDayAndYear = function(b, a) {
        if(b.getFullYear() != a.getFullYear()) {
            return a.getFullYear() + c.getRes("text_year") + (a.getMonth() + 1) + c.getRes("text_month") + a.getDate() + c.getRes("text_day")
        }
        var e = Math.floor(b.getTime() / 864E5) - Math.floor(a.getTime() / 864E5);
        if(0 == e) {
            return""
        }
        if(1 == e) {
            return c.getRes("text_yesterday")
        }
        if(7 > e) {
            e = a.getDay();
            0 == e && (e = 7);
            var f = b.getDay();
            0 == f && (f = 7);
            if(f > e) {
                return c.getRes(" text_monday text_tuesday text_wednesday text_thursday text_friday text_saturday text_sunday".split(" ")[e])
            }
        }
        return a.getMonth() + 1 + c.getRes("text_month") + a.getDate() + c.getRes("text_day")
    };
    c.util.formatChatMsgListTime = function(b) {
        var a = new Date;
        return _fFormatDayAndYear(a, b) + _fFormatTimeInDay(a, b)
    };
    c.util.formatConversationListTime = function(c) {
        return c.getHours() + ":" + b.formatNum(c.getMinutes(), 2)
    };
    c.util.createNewSession = function(d) {
        c.model("message").getMessages(d);
        c.model("message").initMessageQueue(d);
        b.hash("chat?userName=" + d);
        c.triggerEvent("switchToChatPanel");
        c.triggerEvent("focusToTop", d)
    };
    c.util.getChatTitle = function(d) {
        if(!d) {
            return""
        }
        d.DisplayName || (d.DisplayName = this.getContactDisplayName(d));
        return c.util.isRoomContact(d.UserName) && !d.RemarkName && !d.NickName ? b.tmpl(c.getRes("text_title_group"), d.MemberList) : c.util.isRoomContact(d.UserName) ? b.tmpl(c.getRes("text_title_group_remark"), {DisplayName:d.DisplayName, Count:d.MemberCount}) : d.DisplayName
    };
    c.util.verificationPopup = function(d, a, e, f, g) {
        var l = "string" == typeof a ? c.model("contact").getContact(a) : a;
        l && (e.confirm(b.tmpl(d), {ok:function() {
            var a = b("#verification_request"), d = b.stripStr(b.trim(a.find("input[type=text]").val()), 40);
            if(g && g.notEmpty && !d) {
                return!1
            }
            c.logic("userverify").verify(l.RecommendInfo && l.RecommendInfo.UserName || l.UserName, g && g.type || c.Constants.MM_VERIFYUSER_SENDREQUEST, d, l && l.scene || 0, {onsuccess:function() {
                e.showTips(a.attr("addSuccTips"), !0, null);
                f && f.onsuccess && f.onsuccess(d)
            }, onerror:function() {
                e.showTips(a.attr("addErrTips"), !1, null);
                f && f.onerror && f.onerror()
            }}, g && g.ticket)
        }}, "verificationRequest"), b.setInputLength(b("#verification_request").find("input"), 40))
    };
    c.util.verificationGroupPopup = function(d, a, e) {
        d && (a.confirm(b.tmpl("verification_add_group_request"), {ok:function() {
            var f = b("#verification_request"), g = b.stripStr(b.trim(f.find("input[type=text]").val()), 40);
            c.logic("userverify").verifyUniGroupList(d, c.Constants.MM_VERIFYUSER_SENDREQUEST, g, {onsuccess:function() {
                a.showTips(f.attr("addSuccTips"), !0, null);
                e && e.onsuccess && e.onsuccess(g)
            }, onerror:function() {
                a.showTips(f.attr("addErrTips"), !1, null);
                e && e.onerror && e.onerror()
            }})
        }}, "verificationRequest"), b.setInputLength(b("#verification_request").find("input"), 40))
    }
})(jQuery, WebMM, this);
(function(b, c, f) {
    c.createCtrl("root", {init:function() {
        function c() {
            var d = document.body.clientHeight;
            a.height(d - 254);
            i.height(d - 233);
            f.height(d - 134);
            k.height(a.height());
            b("#chattingmgr_list").height(d - 340)
        }
        var e = this;
        if(b("#container").isShow()) {
            e.appStart()
        }else {
            var d = setInterval(function() {
                b("#container").isShow() && (clearInterval(d), e.appStart())
            }, 100)
        }
        var a = b(".chatPanel .listContentWrap"), f = b(".chatContainer"), i = b(".chatPanel .chatScorll"), k = b("#vernierContainer");
        b(window).resize(function() {
            c()
        });
        c()
    }, active:function() {
    }, appStart:function() {
        var g = this;
        c.logic("init").init(function(e) {
            if(e == c.ErrOk) {
                c.logic("sync").sync(), c.logic("contact").getAllContacts()
            }else {
                if(-1 == e) {
                    g.alert(c.getRes("init_error_to_refresh"), {ok:function() {
                        location.reload()
                    }})
                }else {
                    if(c.timeoutDetect(e)) {
                        return
                    }
                    g.alert(c.getRes("text_init_error") + " Error Code: " + e, {ok:function() {
                        f.onbeforeunload = null;
                        c.util.logout()
                    }})
                }
            }
            f.t_t = "";
            b.getCookie("wxloadtime") && (b.setCookie("wxstaytime", b.getCookie("wxloadtime")), b.delCookie("wxloadtime"))
        });
        0 > location.href.indexOf("dev.web") && (f.onbeforeunload = function() {
            return c.getRes("text_leave_confirm")
        })
    }, enterSession:function(f, e) {
        var d = e.attr("userName") || e.attr("un"), a = c.model("contact").getContact(d);
        a && (!a.isSelf() || WebMM.model("account").isHigherVer()) && (a.isContact() || a.isRoomContact() ? c.util.createNewSession(d) : this.alert(b.tmpl(c.getRes("text_is_not_weixin_contact"), {name:a.DisplayName})))
    }, showProfile:function(c, e) {
        b.hash((b.hash() || "chat") + "/popupcontactprofile?userName=" + e.attr("userName"))
    }, showPhotoAlbum:function(c, e) {
        b.hash((b.hash() || "chat") + "/popupphotoalbum?userName=" + e.attr("userName"));
        return!1
    }})
})(jQuery, WebMM, this);
(function(b, c, f) {
    var g = "", e = !1, d = b("#chatMainPanel"), a = b("#chatDetailPanel"), h = null, i = b("#leftOpBtn"), k = b("#rightOpBtn");
    c.createCtrl("chat", {init:function() {
        this.accountUpdated()
    }, active:function(b) {
        g = b.userName;
        this._updateChatTitle();
        e && this.toggleChatMgr();
        this._refreshRightOptBtn()
    }, inactive:function() {
    }, accountUpdated:function() {
        var a = c.model("account").getUserInfo();
        a && (a.name = a.NickName && 0 < a.NickName.length ? a.NickName : a.UserName, a.avatar = c.util.getNormalAvatarUrl(a.UserName), b("#profile").html(b.tmpl("chat_profile", a)))
    }, messageAdded:function() {
    }, contactAdded:function(b) {
        b.UserName == g && (this._updateChatTitle(), this._refreshRightOptBtn())
    }, contactUpdated:function(b) {
        b.UserName == g && (this._updateChatTitle(), this._refreshRightOptBtn())
    }, getAllContacts:function() {
        c.logic("contact").getAllContacts()
    }, toggleSysMenu:function() {
        alert(1);
        var a = this.getDom$().find(".operaterBox");
        c.globalEventSetting({globalIntercept:!a.isShow(), interceptDom$:a});
        a.html(b.tmpl("chat_operaterBoxPanel", c.model("account").getUserInfo()));
        b.browser.msie ? a.toggle() : a.fadeToggle("fast")
    }, logout:function() {
        this.confirm(c.getRes("text_logout_confirm"), {ok:function() {
            f.onbeforeunload = null;
            c.util.logout(0)
        }});
        this.toggleSysMenu()
    }, toggleNotify:function(a, d) {
        var e = !!c.model("account").isNotifyOpen() && 0 == MMNotification.checkPermission();
        2 == MMNotification.checkPermission() ? this.alert(d.attr("tip"), {ok:function() {
            b.isChrome()
        }}) : (1 == MMNotification.checkPermission() && MMNotification.requestPermission(function() {
        }), c.model("account").setNotifyOpen(!e), c.logic("setting").set(c.Constants.MM_WEBWXFUNCTION_NOTIFY_OPEN, e ? 0 : 1), b("#operaterBox").html(b.tmpl("chat_operaterBoxPanel", c.model("account").getUserInfo())), 0 != MMNotification.checkPermission() && this.toggleSysMenu())
    }, toggleMute:function() {
        var a = c.model("account").isMute();
        c.model("account").setMute(!a);
        c.logic("setting").set(c.Constants.MM_WEBWXFUNCTION_TONE_NOT_OPEN, a ? 0 : 1);
        b("#operaterBox").html(b.tmpl("chat_operaterBoxPanel", c.model("account").getUserInfo()))
    }, noHandledKeyDown:function(a) {
        b.isHotkey(a, "esc") && (a = b("#mask"), a.isShow() && a.click())
    }, noHandledClick:function() {
        this.getDom$().find(".operaterBox").isShow() && this.toggleSysMenu()
    }, _updateChatTitle:function() {
        var a = c.model("contact").getContact(g);
        null == h && (h = b("#messagePanelTitle"));
        h.html(c.util.getChatTitle(a))
    }, createChatroom:function() {
        b.hash((b.hash() || "chat") + "/createchatroom");
        this.toggleSysMenu()
    }, closeChat:function() {
        b.hash("chat")
    }, toggleChatMgr:function() {
        c.util.batchgetUndownloadedContact([g]);
        var f = this;
        if(e) {
            f.switchToChatPanel()
        }else {
            e = !e;
            var h = function() {
                f.getDom$().find(".chatName").css("opacity", 1);
                f._refreshRightOptBtn();
                c.triggerEvent("setChatPanelStatus", e)
            };
            b.isLowerBrowser() ? (d.show().css({left:-d.width()}), a.show().css({left:0}), h()) : (d.css({left:0, top:0}).show().stop().animate({left:-d.width()}), a.css({left:d.width(), top:0}).show().stop().animate({left:0}, h), f.getDom$().find(".chatName").css("opacity", 0.5))
        }
    }, switchToChatPanel:function() {
        if(e) {
            var f = this, g = function() {
                f.getDom$().find(".chatName").css("opacity", 1);
                f._refreshRightOptBtn();
                c.triggerEvent("setChatPanelStatus", e)
            };
            e = !e;
            b.isLowerBrowser() ? (d.show().css({left:0}), a.show().css({left:d.width()}), g()) : (d.show().stop().animate({left:0}), a.show().stop().animate({left:d.width()}, g), f.getDom$().find(".chatName").css("opacity", 0.5))
        }
    }, _refreshRightOptBtn:function() {
        var b = c.model("contact").getContact(g);
        b && !e ? (k[b.isBrandContact() || b.isFileHelper() || b.isRecommendHelper() || b.isNewsApp() ? "hide" : "show"](), i.hide()) : e && (k.hide(), i.show())
    }, showEditableTip:function() {
        debug("showTip")
    }, popupModifyAvatarWin:function() {
        b.hash((b.hash() || "chat") + "/modifyavatar")
    }, feedback:function() {
        b.hash((b.hash() || "chat") + "/feedback");
        this.toggleSysMenu()
    }})
})(jQuery, WebMM, this);
(function(b, c, f, g) {
    var e = !0, d = !0, a = f.onfocus = function() {
        e = !0;
        b.stopFlashTitle();
        MMNotification.cancel();
        c.triggerEvent("windowFocus")
    };
    f.onblur = function() {
        e = !1;
        c.triggerEvent("windowBlur")
    };
    b.isWindowFocus = function() {
        return e
    };
    var h = "", i = "", k = !1, l = null, j = c.model("message"), n = [], m = !1, q = b("#vernierContainer .activeChatVernier"), p = null, r = 0, o = !1, s = 0, z = !1, x = null;
    c.createCtrl("chat_conversationListContent", {init:function() {
        var a = this;
        l = b("#conversationContainer");
        p = b("#totalUnreadDot");
        a.getDom$().scrollable({onscroll:function() {
            clearTimeout(r);
            r = setTimeout(function() {
                a._convActive()
            }, 200)
        }});
        c.chooseConversation = function(c) {
            a.chooseConversation(null, b(c), null)
        }
    }, active:function(b) {
        var a = this;
        e || a.windowFocus();
        (i = b.userName) && c.util.batchgetUndownloadedContact([i]);
        h ? a.conversationListSearch("", function() {
            0 <= a._getUiConvDataIndex(i) ? a._convActive(!0) : c.util.createNewSession(i)
        }) : (a._convActive(!0), b = a._getUiConvDataIndex(i), 0 <= b && (b = n[b]) && !0 == b.invisible && a.focusToTop(i))
    }, _convActive:function(a, d) {
        var e = x && x.attr("un") || "";
        if(i != e || d) {
            x && x.removeClass("activeColumn"), (x = b("#conv_" + b.getAsciiStr(i))).addClass("activeColumn")
        }
        i && c.widget.scrollFocus(this.getDom$().parent(), x, q, a)
    }, chooseConversation:function(a, d) {
        d.addClass("activeColumn");
        var f = this._getUiConvDataIndex(i);
        0 <= f && 0 < n[f].unread && (k = j.markMsgsRead(i), this._handleConvItemDataChangeByUserName(i));
        k && (c.logic("sync").notifyMobile(i, 1), k = !1);
        f = d.attr("userName");
        if(k = j.markMsgsRead(f)) {
            c.logic("sync").notifyMobile(f, 1), k = !1, this._handleConvItemDataChangeByUserName(f)
        }
        if(h) {
            var g = c.model("message").getLastMessage(f);
            g && (g.weight = b.now())
        }
        e = !0;
        b.hash("#chat?userName=" + f)
    }, conversationListSearch:function(a, d) {
        var e = this;
        setTimeout(function() {
            a != h && (h = a, n = c.logic("getconversation").get(b.trim(h)), e._renderList(), e.getDom$().parent().scrollTop(0), d ? d() : e._convActive())
        })
    }, loadMoreConv:function(a, d) {
        for(var e = 0, f = 0, g = n.length;e < g && 10 > f;e++) {
            if(n[e].invisible) {
                n[e].invisible = !1;
                var h = b("#conv_" + b.getAsciiStr(n[e].userName)), i = h.find("img.avatar");
                i.attr("src", i.attr("hide_src"));
                h.show().after(d);
                f++
            }
        }
        e == n.length && (m = !0, d.remove());
        c.ossLog({Type:10})
    }, focusToTop:function(b) {
        var a = this._getUiConvDataIndex(b);
        0 < a && this._sortConvAndUpateUi(b, a);
        this._convActive();
        this.getDom$().parent().scrollTop(0);
        b && c.util.batchgetUndownloadedContact([b])
    }, inited:function() {
        if((n = c.logic("getconversation").get()) && n.length) {
            for(var b = [], a = 0, d = n.length;a < d;a++) {
                b.push(n[a].userName)
            }
            c.util.batchgetUndownloadedContact(b);
            this._renderList();
            i && this._convActive(!0, !0)
        }
    }, _showTitleTip:function() {
        for(var a = s = 0, d = n.length;a < d;a++) {
            s += n[a].unread || 0
        }
        z && s ? p.html(s).show() : p.hide();
        if(!e) {
            if(0 < s) {
                b.flashTitle(b.tmpl(c.getRes("text_new_message_come"), {count:s}));
                var g = this._getFirstUnreadConv();
                g && c.model("account").isNotifyOpen() && MMNotification.notify(g.avatar, b.tmpl(c.getRes("text_new_message_come"), {count:s}), b.subAsiiStr(b.clearHtmlStr(g.name + ": " + (b.clearHtmlStr(g.digest) || c.getRes("text_emoji_replacer"))), 50, "..."), {onclick:function() {
                    f.focus();
                    g.userName && c.util.createNewSession(g.userName)
                }})
            }else {
                b.stopFlashTitle(), MMNotification.cancel()
            }
        }
    }, messageAdded:function(a) {
        c.util.batchgetUndownloadedContactInMesssage([a]);
        var f = c.util.getMsgPeerUserName(a);
        f == i && !o && e && d && j.markMsgsRead(i) && (k = !0);
        var g = this._getUiConvDataIndex(f);
        0 <= g ? (n[g].invisible = !1, this._handleConvItemDataChangeByUserName(f), this._sortConvAndUpateUi(f, g)) : h || (g = c.logic("getconversation").genConversation(f), n[0 < a.CreateTime ? "unshift" : "push"](g), 0 > a.MsgType && (0 > a.CreateTime && 15 < n.length && !m && f != i) && (g.invisible = !0), l[0 < a.CreateTime ? "prepend" : "append"](b.tmpl("chat_conversationItem", g)), this._handleConvItemDataChangeByUserName(f));
        this._convActive(!0);
        this._showTitleTip()
    }, messageUpdated:function(a) {
        c.util.batchgetUndownloadedContactInMesssage([a]);
        this._handleConvItemDataChangeByUserName(c.util.getMsgPeerUserName(a))
    }, contactUpdated:function(a) {
        this._handleConvItemDataChangeByUserName(a.UserName)
    }, contactAdded:function(a) {
        this.contactUpdated(a)
    }, contactDeleted:function(a) {
        this.sessionDeleted(a.UserName)
    }, sessionDeleted:function(a) {
        var c = this._getUiConvDataIndex(a);
        0 > c || (n.splice(c, 1), b("#conv_" + b.getAsciiStr(a)).remove(), a == i && b.hash("chat"))
    }, noHandledKeyDown:function(a) {
        if(b.isHotkey(a, "down") || b.isHotkey(a, "up")) {
            if(a.stopPropagation(), a.preventDefault(), !b.hash().endsWith("/contactlist")) {
                var c = 0;
                if(i) {
                    for(var d = 0, e = n.length;d < e;d++) {
                        if(n[d].userName == i) {
                            c = d;
                            b.isHotkey(a, "down") && d + 1 < e ? c++ : b.isHotkey(a, "up") && 0 < d && c--;
                            break
                        }
                    }
                    if(n[c].invisible) {
                        return
                    }
                }
                try {
                    if(n[c]) {
                        var f = b("#conv_" + b.getAsciiStr(n[c].userName));
                        f.length && this.chooseConversation(a, f)
                    }
                }catch(g) {
                    alert(g)
                }
                a.stopPropagation();
                a.preventDefault()
            }
        }
    }, _renderList:function() {
        if(!h && !m) {
            for(var a = 15, c = n.length;a < c;a++) {
                n[a].invisible = !0
            }
        }
        l.html(b.tmpl("chat_conversationList", {filter:h, list:n}))
    }, _sortConvAndUpateUi:function(a, c) {
        var d = b("#conv_" + b.getAsciiStr(a));
        if(d.length) {
            l.prepend(d);
            var e = d[0].holder;
            if(e) {
                var f = e.avatar$.attr("hide_src"), h = e.avatar$.attr("src");
                f && f != h && e.avatar$.attr("src", f)
            }
            d.show();
            c != g && (d = n.splice(c, 1), n.unshift(d[0]), d[0].invisible = !1)
        }
    }, _handleConvItemDataChangeByUserName:function(a) {
        0 <= this._getUiConvDataIndex(a) && this._updateConvUIItem(c.logic("getconversation").genConversation(a))
    }, _updateConvUIItem:function(a) {
        var c = a.userName, d = b("#conv_" + b.getAsciiStr(c));
        if(d.length) {
            var e = this._getUiConvDataIndex(c);
            -1 != e && (c = d[0].holder, c || (d[0].holder = c = {}, c.avatar$ = d.find(".avatar"), c.name$ = d.find(".name"), c.time$ = d.find(".time"), c.mute$ = d.find(".mute"), c.digest$ = d.find(".desc"), c.sendFailedStatus$ = d.find(".sendFailedStatus"), c.sendingStatus$ = d.find(".sendingStatus"), c.unread$ = d.find(".unreadDot"), c.unreadS$ = d.find(".unreadDotS"), c.count$ = d.find(".personNum")), d = n[e], d.avatar != a.avatar && c.avatar$.attr(d.invisible ? "hide_src" : "src", a.avatar), d.name !=
                a.name && c.name$.html(a.name), d.time != a.time && (c.time$.text(a.time), c.mute$[a.muted ? "show" : "hide"]()), 1 == a.status ? c.sendingStatus$.show() : c.sendingStatus$.hide(), 5 == a.status ? c.sendFailedStatus$.show() : c.sendFailedStatus$.hide(), d.digest != a.digest && c.digest$.html(a.digest), d.unread != a.unread && (a.unread ? a.isMuted ? (c.unread$.hide(), c.unreadS$.show()) : (c.unread$.html(a.unread).show(), c.unreadS$.hide()) : (c.unread$.hide(), c.unreadS$.hide())), d.isRoom &&
                d.memCount != a.memCount && c.count$.html("(" + a.memCount + ")"), a.invisible = d.invisible, b.extend(d, a))
        }
    }, _getUiConvDataIndex:function(a) {
        for(var b = 0, c = n.length;b < c;++b) {
            if(n[b].userName == a) {
                return b
            }
        }
        return-1
    }, _getFirstUnreadConv:function() {
        for(var a = 0, b = n.length;a < b;++a) {
            if(0 < n[a].unread) {
                return n[a]
            }
        }
    }, setChatPanelStatus:function(a) {
        o = a;
        if(!o) {
            var b = this;
            setTimeout(function() {
                b.chooseConversation({}, b.getDom$().find("div .activeColumn"))
            })
        }
    }, hasUserAction:function(b) {
        if(d = b) {
            this.windowFocus(), a()
        }
    }, windowFocus:function() {
        var a = this;
        i && (k = !0, 0 < c.model("message").getUnreadMsgsCount(i) && setTimeout(function() {
            j.markMsgsRead(i) && a._handleConvItemDataChangeByUserName(i)
        }, 500))
    }, markMsgRead:function(a) {
        this._handleConvItemDataChangeByUserName(a);
        this._showTitleTip()
    }, needShowContactList:function(a) {
        a || p.hide();
        z = a
    }, hasEdited:function() {
        b("#conv_" + b.getAsciiStr(i)).find(".editedIcon").show()
    }, hasNoEdited:function() {
        b("#conv_" + b.getAsciiStr(i)).find(".editedIcon").hide()
    }})
})(jQuery, WebMM, this);
(function(b, c, f) {
    var g = null;
    c.model("contact");
    var e = c.model("message");
    c.model("account");
    var d = 0, a = 0, h = 0, i = b.browser.msie && 9 > b.browser.version ? 300 : 0, k = 0, l = null, j = 0, n = 0, m = !1, q = !1, p = null;
    c.createCtrl("chat_chatmsglist", {init:function() {
        var a = this;
        a.getDom$().scrollable({onscroll:function(b) {
            0 != b || (m || q) || a._msgDelayLoad()
        }})
    }, active:function(a) {
        if(a.userName) {
            if(g == a.userName) {
                return!0
            }
            0 != h && (c.getMediaPlayer().jPlayer("stop"), h = 0);
            g = a.userName;
            var d = this;
            clearTimeout(k);
            k = setTimeout(function() {
                d.refresh(true)
            }, i);
            0 < i && d.getDom$().html("");
            n = parseInt(d.getDom$().parent().height() / 58) + 5
        }else {
            this.getDom$().html(b.tmpl("chat_chooseConversation"))
        }
    }, refresh:function(a) {
        l = c.model("message").getMessages(g);
        j = l.length - 1;
        q = !1;
        this._removeNoMsgTip();
        this.getDom$().html("");
        this._msgDelayLoad();
        this.getDom$().parent().scrollTop(a ? 1E5 : 0)
    }, _msgDelayLoad:function() {
        function a() {
            b.isLowerBrowser() ? g.hide() : g.fadeOut("fast");
            d.prepend(b.tmpl("chat_chatmsglist", c));
            d.css("top", f - (d.height() - e));
            d.scrollBar.resize();
            m = !1
        }
        m = !0;
        for(var c = [], d = this.getDom$(), e = d.height(), f = parseInt(d.css("top")), g = b("#chatListloadingMoreMsg"), h = 0;h < n;++h) {
            if(0 > j) {
                q = !0;
                break
            }
            c.unshift(l[j--])
        }
        clearTimeout(p);
        q || b(document).triggerHandler("mouseup");
        d.html() ? c.length && (g.length || (d.prepend(b.tmpl("chatListloadingMoreMsg", "")), g = b("#chatListloadingMoreMsg")), b.isLowerBrowser() ? g.show() : g.fadeIn("fast"), p = setTimeout(a, 1E3)) : a()
    }, messageAdded:function(a) {
        var d = c.util.getMsgPeerUserName(a), e = c.model("contact").getContact(d);
        !a.isSend && (!c.model("account").isMute() && !a.isSysMessage() && 0 == h && e && !e.isMuted() && !e.isBrandContact()) && (a.actualSender == g && b.isWindowFocus() ? c.widget.playNewMsgSound(c.util.isVoiceMsg(a.MsgType) ? 1 : 2) : c.widget.playNewMsgSound(3));
        d == g && (this._removeNoMsgTip(), this.getDom$().append(b.tmpl("chat_chatmsglist", [a])), a = this.getDom$().parent(), a.scrollTop() + a.height() < this.getDom$().height() - 1E3 || a.scrollTop(1E5))
    }, messageUpdated:function(a) {
        c.util.getMsgPeerUserName(a) == g && a.LocalID && this.getDom$().find("[un='item_" + a.LocalID + "']").replaceWith(b.tmpl("chat_chatmsglist", [a]))
    }, contactAdded:function(a) {
        this.contactUpdated(a)
    }, contactUpdated:function(a) {
        this.getDom$().find("img[un='avatar_" + a.UserName + "']").attr("src", c.util.getNormalAvatarUrl(a.UserName));
        var b = c.model("message").getMessages("fmessage");
        if(!(1 > b.length)) {
            for(var d in b) {
                "fmessage" == b[d].FromUserName && b[d].UserName == a.UserName && (this.messageUpdated(b[d]), c.model("message").initMessageQueue(a.UserName))
            }
        }
    }, accountUpdated:function() {
        this.contactUpdated({UserName:c.model("account").getUserName()})
    }, popImg:function(a, b) {
        c.popImage(b, b.attr("rawSrc"))
    }, playVoice:function(b, e) {
        var f = this, i = e.attr("msgid"), k = e.find("[un='voiceStatus']"), j = k.parents(".cloud");
        if(h == i) {
            c.getMediaPlayer().jPlayer("stop"), h = 0
        }else {
            var l = !1;
            clearInterval(d);
            d = setInterval(function() {
                j.animate({opacity:l ? 1 : 0.5}, 200);
                l = !l;
                21 < ++a && clearInterval(d)
            }, 300);
            a = 0;
            c.getMediaPlayer().jPlayer("stop");
            c.setMediaPlayerUICallbacks({onloadstart:function() {
                Log.d("loadstart")
            }, onprogress:function() {
                Log.d("progress");
                (c.getMediaPlayer().lastStatusDom || k).addClass("icoVoice").removeClass("icoVoicePlaying");
                c.getMediaPlayer().lastStatusDom = k;
                0 < d && (clearInterval(d), d = 0, j.stop().css("opacity", 1));
                k.addClass("icoVoicePlaying").removeClass("icoVoice")
            }, onpause:function() {
                Log.d("onpuase");
                0 < d && (clearInterval(d), d = 0, j.stop().css("opacity", 1));
                k.addClass("icoVoice").removeClass("icoVoicePlaying");
                var a = 0 != h && c.model("message").getNextUnreadVoiceMsg(g, i);
                a && setTimeout(function() {
                    f.playVoice(null, f.getDom$().find("[un='cloud_" + a.MsgId + "']"))
                });
                h = 0
            }, onstop:function() {
                this.onpause();
                Log.d("onstop");
                h = 0
            }, onerror:function() {
                clearInterval(d);
                Log.d("onerror")
            }});
            c.getMediaPlayer().jPlayer("setMedia", {mp3:c.getRes("url_host_https") + "/cgi-bin/mmwebwx-bin/webwxgetvoice?msgid=" + i});
            c.getMediaPlayer().jPlayer("play");
            e.find("[un='unread_" + i + "']").hide();
            var m = c.model("message").getMsgById(g, i);
            m && (m.Status = c.Constants.STATE_READ);
            h = i;
            c.ossLog({Type:c.Constants.MMWEBWX_GETVOICE, Cgi:"webwxgetvoice"})
        }
    }, playVideo:function(a, b) {
        var d = b.attr("msgid"), d = {flv:c.getRes("url_host_https") + "/cgi-bin/mmwebwx-bin/webwxgetvideo?type=flv&msgid=" + d, m4v:c.getRes("url_host_https") + "/cgi-bin/mmwebwx-bin/webwxgetvideo?msgid=" + d, poster:c.getRes("url_host_https") + "/cgi-bin/mmwebwx-bin/webwxgetmsgimg?type=slave&MsgID=" + d, download:c.getRes("url_host_https") + "/cgi-bin/mmwebwx-bin/webwxgetvideo?fun=download&msgid=" + d};
        c.playVideo(d);
        c.ossLog({Type:c.Constants.MMWEBWX_GETVOICE, Cgi:"webwxgetvoice"})
    }, downloadMedia:function(a, b) {
        var d = f.onbeforeunload;
        f.onbeforeunload = null;
        location.href = b.attr("url") + ("&fromuser=" + c.model("account").getUserName()) + "&skey=" + c.model("account").getSkey();
        setTimeout(function() {
            f.onbeforeunload = d
        })
    }, _removeNoMsgTip:function() {
        this.getDom$().find("#noMsgTip").remove()
    }, _recompose:function(a) {
        for(var b = 0, d = a.length;b < d;b++) {
            var e = a[b];
            e.avatarTitle = e;
            e.avatarId = e.actualSender;
            e.avatar = c.util.getNormalAvatarUrl(e.actualSender)
        }
    }, loadHistoryMsg:function(a, b) {
        var d = this, e = b.hide().siblings('[un="loading"]').show();
        c.logic("loadHistoryMsg").loadMore(g, function(a) {
            switch(a) {
                case c.Constants.STATE_FAILED:
                    e.hide().siblings('[un="loaderr"]').show();
                    break;
                default:
                    d.refresh(!1)
            }
        })
    }, userVerify:function() {
        b.hash((b.hash() || "chat") + "/popupmsgprofile")
    }, popupMsgProfile:function(a, c) {
        var d = g;
        _sMsgId = c.attr("msgId");
        b.hash((b.hash() || "chat") + "/popupcontactprofile?userName=" + d + "&msgId=" + _sMsgId)
    }, cancelUpload:function(a, b) {
        var d = b.attr("localId");
        c.triggerEvent("cancelUploadByLocalId", d)
    }, resendMsg:function(a, b, d) {
        var f = this, a = d.attr("msgid"), a = e.getMsgById(g, a);
        a.update({Status:1});
        c.logic("sendMsg").resendText(a, {onerror:function(a) {
            "1201" == a && f.alert(c.getRes("text_exit_chatroom"))
        }})
    }, verifyContact:function() {
        c.util.verificationPopup("verification_request", g, this)
    }, verifyUniContacts:function(a, b) {
        var d = b.siblings("span.friends").attr("usernames").split(",");
        c.util.verificationGroupPopup(d, this)
    }})
})(jQuery, WebMM, this);
(function(b, c) {
    function f(a) {
        var b = e.position().left;
        0 < a ? -b + 320 < e.width() && e.css("left", b - 60) : 0 > b && e.css("left", b + 60)
    }
    var g = "", e = null, d = [], a = 0, h, i, k, l, j = "", n = "person", m = null;
    _oFilterContact = {};
    c.createCtrl("createchatroom", {init:function() {
        (e = this.getDom$().find(".selectedListScroll")).bind("mousewheel", function(a, b) {
            f(b)
        });
        this.getDom$().draggable({handle:".titleContainer", cursor:"move"});
        var a = this.getDom$();
        h = a.find(".searchBar").find("input");
        i = a.find(".selectFriendContainer .selectedPanel");
        k = a.find(".selectFriendContainer .friendList");
        l = a.find(".searchClean")
    }, active:function(a) {
        j = a.userName;
        n = "person";
        m = a.func;
        _oFilterContact = {};
        if("add" == m) {
            if(c.util.isRoomContact(j)) {
                for(var a = (a = c.model("contact").getContact(j)) && a.MemberList || [], b = 0, e = a.length;b < e;b++) {
                    _oFilterContact[a[b].UserName] = !0
                }
            }else {
                _oFilterContact[j] = !0
            }
            this.getDom$().find(".choosePersGroup").hide();
            this.getDom$().find(".title span").hide()[1].style.display = ""
        }else {
            this.getDom$().find(".choosePersGroup").show(), this.getDom$().find(".title span").hide().first().show()
        }
        _oFilterContact[c.Constants.SP_CONTACT_FILE_HELPER] = !0;
        g = "";
        c.widget.screenCentral(this.getDom$(), {showMask:!0});
        this.contactListReady(c.logic("contact").hasGotAllContacts());
        d = [];
        this._renderSelectedContacts();
        a = this.getDom$();
        a.find(".selectGroupChat").removeClass("selectedChat");
        a.find(".selectPersChat").addClass("selectedChat")
    }, inactive:function() {
        b("#mask").hide()
    }, contactListReady:function(d) {
        var e = this;
        if("person" == n) {
            var f = c.model("contact").getAllFriendContact(g, !g, _oFilterContact, !0), h = !g && c.model("contact").getAllStarContact(_oFilterContact) || [];
            if(d) {
                for(var i = 0, k = f.length;i < k;i++) {
                    f[i].choosed = !1
                }
                i = 0;
                for(k = h.length;i < k;i++) {
                    h[i].choosed = !1
                }
            }
            var j = b.tmpl("newchatlist", {init:d, contacts:f, starContacts:h});
            a = f.length + h.length;
            setTimeout(function() {
                e.getDom$().find(".selectFriendContainer").show().find(".group").html(j);
                e.getDom$().find(".selectGroupContainer").hide();
                d && e.getDom$().find(".searchBar input").val("")[0].focus()
            })
        }else {
            "group" == n && setTimeout(function() {
                var a = c.logic("contact").getAllSortedGroups(), a = b.tmpl("chatroomlist", {contacts:a});
                e.getDom$().find(".selectFriendContainer").hide();
                e.getDom$().find(".selectGroupContainer").show().find(".group").html(a)
            })
        }
    }, selectContact:function(a, b) {
        var c = this;
        b.attr("id").replace("sel_con_", "");
        (b = b.find(".checkbox")).toggleClass("checked");
        var d = b.hasClass("checked"), c = this;
        c._toggleSelectedContact(b.attr("username"), d);
        c._renderSelectedContacts();
        d && (h.val() && c._cleanSearchInput(), "none" == i.css("display") && c._showSelectedPanel())
    }, unSelectContact:function(a, c) {
        var d = c.attr("username");
        b("#sel_con_" + b.getAsciiStr(d)).click()
    }, cleanSearchWord:function() {
        this._cleanSearchInput()
    }, _toggleSelectedContact:function(a, b) {
        var e = c.model("contact").getContact(a);
        if(e.choosed = b) {
            d.push(e)
        }else {
            e = 0;
            for(len = d.length;e < len;e++) {
                if(d[e].UserName == a) {
                    d.splice(e, 1);
                    break
                }
            }
            0 == d.length && this._hideSelectedPanel()
        }
    }, _renderSelectedContacts:function() {
        var a = this.getDom$().find(".selectedListScroll");
        a.html(b.tmpl("selectcontactlist", d));
        var c = a.find("span:first-child").outerWidth(!0) * d.length;
        a.width(c).css("left", 320 > c ? 0 : 320 - c);
        this.getDom$().find("#selectContactCount").html("(" + d.length + ")")[0 < d.length ? "show" : "hide"]()
    }, _showSelectedPanel:function() {
        k.css("height", "303px");
        i.show()
    }, _hideSelectedPanel:function() {
        i.hide();
        k.css("height", "373px")
    }, _cleanSearchInput:function() {
        l.hide();
        h.val("");
        h.focus();
        g = b.trim("");
        this.contactListReady()
    }, _hasSpecialFriend:function(a) {
        for(var d = a.MemberList, e = "", f = c.model("contact"), g = 0, h = d.length;g < h;++g) {
            var i = d[g];
            i.MemberStatus == c.Constants.MM_MEMBER_BLACKLIST && (i = f.getContact(i.UserName), e += i.NickName || i.Alias || i.UserName, e += " , ")
        }
        e = e.substr(0, e.length - 2);
        0 < e.length && this.alert(b.tmpl("addBlackContactGroupErrTips", {Friends:e}), null, "verificationRequest");
        for(var k = a.ChatRoomName || j, l = [], m, n = "", g = 0, h = d.length;g < h;++g) {
            i = d[g], i.MemberStatus == c.Constants.MM_MEMBER_NEEDVERIFYUSER && l.push(i.UserName)
        }
        m = l.length;
        0 < m ? m < a.MemberCount ? (b.hash("chat?userName=" + k), setTimeout(function() {
            for(var a = 0;a < m;++a) {
                var d = WebMM.model("contact").getContact(l[a]);
                n += (d.NickName || d.Alias || d.UserName) + " , "
            }
            n = n.substr(0, n.length - 2);
            c.model("message").addFakeSysMsg({MsgType:1E4, FromUserName:k, ToUserName:c.model("account").getUserInfo().UserName, Status:c.Constants.STATE_SENT, CreateTime:b.now() / 1E3, Content:b.tmpl("verificationUinGroup", {Friends:n, UserNames:l.join(",")}), unread:!1})
        }, 500)) : c.util.verificationGroupPopup(l, this) : b.hash("chat?userName=" + k)
    }, newsession:function(a) {
        c.util.createNewSession(a);
        c.ossLog({Type:c.Constants.MMWEBWX_NEW_CHAT})
    }, searchContact:function(c, d) {
        var e = this;
        setTimeout(function() {
            if(b.isHotkey(c, "enter")) {
                if(1 == a) {
                    e.getDom$().find(".friendDetail").click();
                    e._cleanSearchInput();
                    return
                }
                h.val() || e.getDom$().find(".chatSend").click()
            }
            g = b.trim(d.val());
            e.contactListReady();
            "" != d.val() ? l.show() : l.hide()
        })
    }, noHandledKeyDown:function(a) {
        b.isHotkey(a, "enter") && !h.val() && this.getDom$().find(".chatSend").click()
    }, createChatRoom:function() {
        var a = this, e = [], f = c.model("account").getUserInfo().UserName;
        a._hideSelectedPanel();
        for(var g = 0, h = d.length;g < h;g++) {
            var i = d[g].UserName;
            i == f && 1 < h || e.push(i)
        }
        0 == e.length ? b.history.back() : 0 < e.length && "add" == m && c.util.isRoomContact(j) ? (c.logic("modChatroom").addMember(j, e.join(","), {onsuccess:function(b) {
            a._hasSpecialFriend(b);
            c.triggerEvent("switchToChatPanel")
        }}), this.close()) : 1 == e.length && "add" != m ? a.newsession(e[0]) : (j && e.push(j), c.logic("createChatRoom").create("", e, {onbefore:function() {
            b.history.back()
        }, onsuccess:function(b) {
            a._hasSpecialFriend(b)
        }, onerror:function(b) {
            -23 == b ? a.alert(c.getRes("text_create_chatroom_exceed_limit_err")) : a.alert(c.getRes("text_create_chatroom_err"))
        }}))
    }, close:function() {
        this._cleanSearchInput();
        this._hideSelectedPanel();
        b.history.back()
    }, scrollLeft:function() {
        f(-1)
    }, scrollRight:function() {
        f(1)
    }, switchTag:function(a, b) {
        b.attr("un") != n && (this.getDom$().find("[click='switchTag']").removeClass("selectedChat"), b.addClass("selectedChat"), n = b.attr("un"), this.contactListReady())
    }})
})(jQuery, WebMM, this);
(function(b, c, f) {
    var g = "", e = "", d = "", a, h, i;
    c.createCtrl("chat_leftpanel", {init:function() {
        g = "conversation";
        a = b("#chat_conversationListContent").parent();
        h = b("#chat_contactListContent").parent();
        i = b("#conv_search_clean")
    }, active:function(a) {
        !!e != !!a.userName && (this.getDom$().nextAll().css("visibility", a.userName ? "visible" : "hidden"), f.FormData || c.triggerEvent("swfUploaderInit"));
        a.userName != e && (e = a.userName, d && i.isShow() && this.cleanSearchWord("click", null, this.getDom$().find(".chatListSearchInput")), this.switchPanel({}, b("#chooseConversationBtn")))
    }, focusToTop:function() {
        "conversation" != g && this.switchPanel({}, b("#chooseConversationBtn"))
    }, preSearch:function(a) {
        a && b.isHotkey(a, "tab") && (a.preventDefault(), a.stopPropagation())
    }, search:function(a, e, f) {
        d = b.trim(e.val()) || "";
        f.find(".searchClean")[d ? "show" : "hide"]();
        c.triggerEvent("conversation" == g ? "conversationListSearch" : "contactListSearch", d)
    }, cleanSearchWord:function(a, b, c) {
        var d = c.find("input");
        this.search(a, d.val(""), c);
        a && setTimeout(function() {
            d.focus()
        }, 10)
    }, switchPanel:function(e, f) {
        var j = f.attr("un");
        f.siblings().removeClass("active");
        f.addClass("active");
        g != j && (d && i.isShow() && this.cleanSearchWord(null, i, i.parent()), a.scrollTop(0), g = j, "conversation" == g ? (a.show(), h.hide(), c.triggerEvent("needShowContactList", !1)) : (a.hide(), h.show(), b("#conv_search").focus(), c.triggerEvent("needShowContactList", !0)))
    }})
})(jQuery, WebMM, this);
(function(b, c, f, g) {
    function e(a) {
        return"newsapp" != a && "fmessage" != a
    }
    var d = null, a = b("#sendEmojiIcon"), h = b("#screenSnapIcon"), i = b("#sendFileIcon"), k = b("#sendVoiceIcon"), l = b.isiOS();
    !l && i.show();
    a.show();
    !l && h.show();
    var j = {}, n = b.browser.msie ? 300 : 0, m = 0, q = 0, p = 0, r = 0, o = null;
    c.createCtrl("chat_editor", {init:function() {
        var a = this;
        o = a.getDom$().find("textarea");
        b.textAreaResize(o[0], o.height(), 4 * o.height(), function(b) {
            a.getDom$().prev().height(function(a, c) {
                return c - b
            });
            a.getDom$().height(a.getDom$().height() + b)
        });
        o.on("paste", function(d) {
            if(d.originalEvent.clipboardData && d.originalEvent.clipboardData.types && "Files" == d.originalEvent.clipboardData.types[0]) {
                if(d = d.originalEvent.clipboardData.items, !(1 > d.length)) {
                    var e = d[0].getAsFile();
                    e && !(0 >= e.size) && (d = b.getURLFromFile(e)) && f.uploadPreview.setCallback({send:function() {
                        b.uploadFileByForm({target:{files:[b.extend(e, {name:"undefined.jpg"})]}});
                        setTimeout(function() {
                            b("#textInput")[0].focus()
                        })
                    }}).setImg(d).show()
                }
            }else {
                c.widget.screenSnap.isClipBoardImage() && a._screenSnapUpload()
            }
        }).on("keydown", function(d) {
                a.hotkeySend(d, b(this));
                d.stopPropagation();
                c.touchUserAction()
            }).on("keyup", function(a) {
                a.stopPropagation();
                b(this).val()
            });
        b.setDragFileUploadOption(function() {
            var a = c.util.getProxyXHR("uploadFrame");
            return a ? a() : new XMLHttpRequest
        }, a._getDragFileUploadUI());
        b.dragFileUpload("dragPanel", function() {
            return c.getRes("url_file") + "/cgi-bin/mmwebwx-bin/webwxuploadmedia?f=json&un=" + d + "&skey=" + c.model("account").getSkey() + "&wxuin=" + c.model("account").getUin()
        }, function() {
            return c.model("account").getBaseRequest().BaseRequest
        }, a._getDragFileUploadCallbacks())
    }, swfUploaderInit:function() {
        var a = this, e = c.widget.swfUploader;
        if(e.isSupport()) {
            var f = b("#uploadFileContainer"), h = b("#swfUploaderContainer");
            f.offset();
            h.css("width", f.width()).css("height", f.height()).css("left", 0).css("top", 0).appendTo(f);
            e.install(h, {onbefore:function() {
                Log.d("onbefore")
            }, onselect:function(f, g) {
                if(10485760 < g.size) {
                    c.ossLog({Type:c.Constants.MMWEBWX_UPLOADMEDIA_TOO_LARGE}), a.alert(c.getRes("text_file_too_large"))
                }else {
                    if(b.isImg(g.name) && 10485760 < g.size) {
                        c.ossLog({Type:c.Constants.MMWEBWX_UPLOADMEDIA_TOO_LARGE}), a.alert(c.getRes("img_too_large"))
                    }else {
                        e.upload(f, c.getRes("url_file") + "/cgi-bin/mmwebwx-bin/webwxuploadmedia?f=json&un=" + d + "&skey=" + c.model("account").getSkey() + "&wxuin=" + c.model("account").getUin(), {uploadmediarequest:JSON.stringify(b.extend(c.model("account").getBaseRequest(), {ClientMediaId:"" + b.now(), TotalLen:0, StartPos:0, DataLen:0, MediaType:4}))});
                        var h = a._addAppMsg(g.name, g.size);
                        j[f] = {toUserName:d, name:g.name, localId:h}
                    }
                }
            }, onprocess:function(a, c) {
                j[a] !== g && b("#progressBar_" + j[a].localId).css("width", 98 * c / 100).parent().parent().css("visibility", "visible")
            }, onsuccess:function() {
            }, onerror:function() {
                Log.e("JS Function: swfUploaderInit, swf upload onerror, arguments: " + arguments)
            }, oncomplete:function(d, e) {
                debug("upload complete idx:" + d + e);
                if(j[d] !== g) {
                    var f = JSON.parse(e), h = j[d];
                    0 == f.BaseResponse.Ret ? a._doSendAppMsg(h.toUserName, h.name, b.extend({MediaId:f.MediaId, StartPos:f.StartPos}, {LocalId:h.localId})) : c.logic("sendMsg").changeSendingMsgStatus(h.toUserName, h.localId, !1);
                    b("#progressBar_" + h.localId).parent().parent().css("visibility", "hidden");
                    delete j[d]
                }
            }})
        }
    }, active:function(a) {
        var f = this, g = d;
        d = a.userName;
        g && c.model("history").inputRecord(g, this.getDom$().find("textarea").val());
        clearTimeout(m);
        m = setTimeout(function() {
            _oContact = c.model("contact").getContact(d);
            1 == p && f.cancelRecord();
            f.getDom$().children(".inputArea").css("visibility", e(d) ? "" : "hidden");
            d != g && (o.val(c.model("history").inputRecord(d)), clearTimeout(q), q = setTimeout(function() {
                b.safe(function() {
                    e(d) && o[0].focus()
                })
            }, 300))
        }, n)
    }, sendImgMsg:function(a, e, f) {
        b.isImg(f[0].filename.value) ? (a = b.now(), f[0].msgimgrequest.value = JSON.stringify(b.extend({Msg:{FromUserName:c.model("account").getUserName(), ToUserName:d, Type:3, LocalID:"" + a}}, c.model("account").getBaseRequest())), e = "actionFrame" + a, b("<iframe>").css("display", "none").attr("id", e).attr("name", e).attr("src", "javascript:;").appendTo("body"), f.attr("target", e), f.submit(), f[0].filename.value = "", this._sendImgMsg(a)) : this.alert(c.getRes("text_invalid_img_type"))
    }, _sendImgMsg:function(a, e) {
        c.logic("sendMsg").sendImg({LocalID:a, ClientMsgId:a, FromUserName:c.model("account").getUserName(), ToUserName:d, Type:3, FileUrl:e || ""}, function() {
            b("#actionFrame" + a).remove()
        })
    }, _doSendImgMsgByMedia:function(a, d, e) {
        a = b.extend({Msg:{FromUserName:c.model("account").getUserName(), MediaId:e, ToUserName:a, Type:3, LocalID:"" + d}}, c.model("account").getBaseRequest());
        b.netQueue().send("/cgi-bin/mmwebwx-bin/webwxsendmsgimg?fun=async&f=json", a, {onbefore:function() {
        }, onsuccess:function(a) {
            f[d] && f[d](d, a.MsgID)
        }, onerror:function() {
            f[d] && f[d](d, -1);
            Log.e("Cgi: /cgi-bin/mmwebwx-bin/webwxsendmsgimg?fun=async&f=json, JS Function: _doSendImgMsgByMedia, SendImgMsgByMedia error.")
        }})
    }, sendAppMsg:function(a, e, g) {
        if(f.FormData) {
            b.uploadFileByForm(a), g[0].filename.value = ""
        }else {
            var h = this;
            g[0].uploadmediarequest.value = JSON.stringify(b.extend(c.model("account").getBaseRequest(), {ClientMediaId:"" + b.now(), TotalLen:0, StartPos:0, DataLen:0, MediaType:4}));
            g.attr("action", g.attr("url") + "&skey=" + c.model("account").getSkey());
            g.submit();
            var i = b.getFileName(g[0].filename.value);
            g[0].filename.value = "";
            var k = h._addAppMsg(i), j = d;
            f.sendFile = function(a, d) {
                "0" == a ? h._doSendAppMsg(j, i, b.extend(d, {LocalId:k})) : c.logic("sendMsg").changeSendingMsgStatus(j, k, !1)
            }
        }
    }, hotkeySend:function(a, c) {
        if(b.isHotkey(a, "enter") || b.isHotkey(a, "ctrl+enter") || b.isHotkey(a, "alt+s")) {
            this._sendTextMsg(c), a.stopPropagation(), a.preventDefault()
        }else {
            if(!b.browser.msie && b.isHotkey(a, "alt+enter")) {
                c.insertTextToInput("\n"), a.stopPropagation(), a.preventDefault()
            }else {
                if(b.isHotkey(a, "esc")) {
                    c.blur()
                }else {
                    if((b.isHotkey(a, "up") || b.isHotkey(a, "down")) && !c.val()) {
                        c.blur(), a.stopPropagation(), a.preventDefault()
                    }
                }
            }
        }
    }, sendMsg:function(a, b, d) {
        1 == p ? c.widget.Recorder.getObject().jStopRecording() : this._sendTextMsg(d.find(".chatInput"))
    }, showEmojiPanel:function() {
        var a = c.model("contact").getContact(d);
        c.globalEventSetting({globalIntercept:!0, interceptDom$:b("#emojiPanel").html(b.tmpl("editor_emoji_panel", {isBrandContact:a && a.isBrandContact()})).fadeIn("fast")})
    }, closeEmojiPanel:function() {
        c.globalEventSetting({globalIntercept:!1});
        b("#emojiPanel").fadeOut("fast")
    }, chooseEmoji:function(a) {
        var c = this;
        c.closeEmojiPanel();
        setTimeout(function() {
            c.getDom$().find(".chatInput").insertTextToInput("[" + a.target.title + "]");
            b.safe(function() {
                e(d) && o[0].focus()
            })
        })
    }, chooseSysEmoji:function(a) {
        var c = this;
        c.closeEmojiPanel();
        setTimeout(function() {
            c.getDom$().find(".chatInput").insertTextToInput("<" + a.target.title + ">");
            b.safe(function() {
                e(d) && o[0].focus()
            })
        })
    }, chooseCustomEmoji:function(a) {
        a = a.target.getAttribute("un");
        if(a = c.widget.getTuzkiMd5(a)) {
            this.closeEmojiPanel(), c.logic("sendMsg").sendSysCustomEmoji(d, a), this._focusInput()
        }
    }, chooseEmojiPanel:function(a, c, d) {
        var e = this, f = c.attr("un");
        d.find("a").each(function() {
            var a = b(this), c = a.attr("un");
            c != f ? (a.removeClass("chooseFaceTab"), e.getDom$().find("." + c).hide()) : (a.addClass("chooseFaceTab"), e.getDom$().find("." + c).show())
        })
    }, noHandledClick:function(a) {
        var a = a.target, c = b("#emojiPanel");
        !b.contains(c[0], a) && c.isShow() && this.closeEmojiPanel()
    }, forwardImgMsg:function() {
        Log.d("forwardImgMsg")
    }, downloadImgMsg:function(a) {
        f.open(a.src + "&fun=download")
    }, screenSnap:function() {
        var a = this;
        c.widget.screenSnap.isSupport() ? c.widget.screenSnap.capture({ok:function() {
            a._screenSnapUpload()
        }}) : a.confirm(c.getRes("text_no_install_plug"), {ok:function() {
            c.widget.screenSnap.install()
        }})
    }, _screenSnapUpload:function() {
        var a = this, e = b.now(), g = b.extend({Msg:{FromUserName:c.model("account").getUserName(), ToUserName:d, Type:3, LocalID:"" + e}}, c.model("account").getBaseRequest()), h = f.uploadPreview, i = !1;
        h.setCallback({cancel:function() {
            i = !0
        }}).show();
        c.widget.screenSnap.upload(JSON.stringify(g), function(c) {
            i || (!c.BaseResponse || c.BaseResponse && 0 != c.BaseResponse.Ret ? (a.alert("Snap error.Please check your network."), Log.e("JS Function: _screenSnapUpload, Snap Error.")) : h.setCallback({send:function() {
                g.Msg.MediaId = c.MediaId;
                g.Msg.ToUserName = d;
                b.netQueue().send("/cgi-bin/mmwebwx-bin/webwxsendmsgimg?fun=async&f=json&scene=screenshot", g, {onbefore:function() {
                    a._sendImgMsg(e)
                }, onsuccess:function(a) {
                    f[e] && f[e](e, a.MsgID)
                }, onerror:function() {
                    f[e] && f[e](e, -1);
                    Log.e("Cgi: /cgi-bin/mmwebwx-bin/webwxsendmsgimg?fun=async&f=json&scene=screenshot, JS Function: WebMM.widget.screenSnap.upload, SendMsgImg error.")
                }})
            }}).setImg("/cgi-bin/mmwebwx-bin/webwxpreview?fun=preview&mediaid=" + encodeURIComponent(c.MediaId)).getDom$().attr("mid", c.MediaId))
        })
    }, sendPreviewImg:function(a, b, c) {
        Log.d(c.attr("mid"))
    }, noHandledKeyDown:function(a) {
        b.isHotkey(a, "ctrl+i") ? b.safe(function() {
            e(d) && o[0].focus()
        }) : b.isHotkey(a, "esc") ? this.getDom$().find("textarea")[0].blur() : b.isHotkey(a, "enter") && this.getDom$().find(".chatSend").click()
    }, _sendTextMsg:function(a) {
        var e = this, f = b.trim(a.val());
        0 == f.length ? setTimeout(function() {
            a.val("")[0].focus()
        }) : (a.val("")[0].focus(), c.logic("sendMsg").sendText({Msg:{FromUserName:c.model("account").getUserName(), ToUserName:d, Type:1, Content:f}}, {onerror:function(a) {
            "1201" == a && e.alert(c.getRes("text_exit_chatroom"))
        }}))
    }, _getDragFileUploadCallbacks:function() {
        var a = this;
        return{onbefore:function() {
        }, onprogress:function(a, c) {
            b("#progressBar_" + a).css("width", 98 * c).parent().parent().css("visibility", "visible")
        }, onsuccess:function(b, c, d) {
            a._doSendAppMsg(b, c, d)
        }, onerror:function(a, b, d, e) {
            c.logic("sendMsg").changeSendingMsgStatus(d, e, !1);
            Log.e("JS Function: _getDragFileUploadCallbacks, DragFile Upload Error. Status: " + b)
        }, oncomplete:function() {
        }}
    }, _addAppMsg:function(a, e, f) {
        var g = b.now();
        if(b.isImg(a)) {
            return this._sendImgMsg(g, f), g
        }
        a = {FromUserName:c.model("account").getUserName(), ToUserName:d, Type:6, FileName:a, FileSize:e, Status:1, MsgId:g, ClientMsgId:g, LocalID:g, MsgType:49, CreateTime:Math.floor(g / 1E3)};
        c.model("message").addMessages([a]);
        return g
    }, _doSendAppMsg:function(a, e, f) {
        if(b.isImg(e) && !b.isGif(e)) {
            this._doSendImgMsgByMedia(a, f.LocalId, f.MediaId)
        }else {
            if(b.isGif(e)) {
                c.logic("sendMsg").sendCustomGif(d, f)
            }else {
                if(a = c.model("message").getMsgByLocalId(a, f.LocalId)) {
                    b.extend(a, {MediaId:f.MediaId, Content:this._genAppMsgContent(e, f.MediaId, f.StartPos)}), c.logic("sendMsg").sendAppMsg({Msg:a})
                }
            }
        }
    }, _genAppMsgContent:function(a, c, d) {
        return b.tmpl('<appmsg appid="wxeb7ec651dd0aefa9" sdkver=""><title><![CDATA[<#=title#>]]\></title><des></des><action></action><type><#=type#></type><content></content><url></url><lowurl></lowurl><appattach><totallen><#=totalLen#></totallen><attachid><#=attachId#></attachid><fileext><#=ext#></fileext></appattach><extinfo></extinfo></appmsg>', {title:a, ext:b.getExt(a), type:6, totalLen:d, attachId:c})
    }, _getDragFileUploadUI:function() {
        var a = this, e = 0, f = a.getDom$().find("#dragPanel"), g = f.find("div");
        return{ondocover:function() {
            clearTimeout(e);
            "none" == f.css("display") && (g.html(g.attr("outTxt")), f.show())
        }, ondocleave:function() {
            e = setTimeout(function() {
                f.hide()
            }, 500)
        }, ontargetover:function() {
            g.html(g.attr("inTxt"))
        }, ontargetdrop:function(e, g, h) {
            f.hide();
            return 10485760 < g ? (c.ossLog({Type:c.Constants.MMWEBWX_UPLOADMEDIA_TOO_LARGE}), a.alert(c.getRes("text_file_too_large")), !1) : b.isImg(e) && 10485760 < g ? (c.ossLog({Type:c.Constants.MMWEBWX_UPLOADMEDIA_TOO_LARGE}), a.alert(c.getRes("img_too_large")), !1) : e ? {localId:a._addAppMsg(e || "", g, h), toUserName:d} : !0
        }, ontargetleave:function() {
            g.html(g.attr("outTxt"))
        }}
    }, sendLocalEmoji:function(a, e, f) {
        if(b.isImg(f[0].filename.value)) {
            var g = b.now();
            f[0].msgimgrequest.value = JSON.stringify(b.extend({Msg:{FromUserName:c.model("account").getUserName(), ToUserName:d, Type:3, LocalID:"" + g}}, c.model("account").getBaseRequest()));
            a = "actionFrame" + g;
            b("<iframe>").css("display", "none").attr("id", a).attr("name", a).attr("src", "javascript:;").appendTo("body");
            f.attr("target", a);
            f.submit();
            f[0].filename.value = "";
            this._sendCustomEmojiMsg(g, "", function() {
                b("#actionFrame" + g).remove()
            })
        }else {
            this.alert(c.getRes("text_invalid_img_type"))
        }
    }, _sendCustomEmojiMsg:function(a, b, e) {
        c.logic("sendMsg").sendEmoji({LocalID:a, ClientMsgId:a, FromUserName:c.model("account").getUserName(), ToUserName:d, Content:b || "", Type:c.Constants.MM_DATA_EMOJI}, e)
    }, setChatPanelStatus:function(a) {
        a || this._focusInput()
    }, _focusInput:function() {
        setTimeout(function() {
            b.safe(function() {
                e(d) && o[0].focus()
            })
        }, 500)
    }, toggleRecoder:function() {
        var a = this;
        if(c.widget.Recorder.isSupport()) {
            var e = b("#textInput").toggle(), f = b("#recordInput").toggle();
            if(1 == p) {
                p = 0, c.widget.Recorder.getObject().jCancelRecording()
            }else {
                if(2 == p) {
                    p = 0
                }else {
                    p = 0;
                    var g;
                    c.widget.Recorder.install(g = {onReady:function(e) {
                        var g = c.widget.Recorder.getObject().jIsMicroPhoneAvailable();
                        f[0].innerHTML = b.tmpl("voice_recorder", {Status:g});
                        -2 != g && (-1 == g ? e ? a.cancelRecord() : (c.widget.screenCentral(b(c.widget.Recorder.getObject()).parent()), c.widget.Recorder.getObject().jShowSecuritySetting(1)) : c.widget.Recorder.getObject().jStartRecording(6E4, location.protocol + "//" + location.host + "/cgi-bin/mmwebwx-bin/webwxuploadvoice?tousername=" + d + "&type=" + c.Constants.EN_INFORMAT_WAV, d))
                    }, onPermissionChange:function() {
                    }, onSecurityPanelClose:function() {
                        b(c.widget.Recorder.getObject()).parent().css("left", -1E3);
                        g.onReady(!0)
                    }, onRecordStart:function() {
                        p = 1
                    }, onRecordError:function() {
                        Log.e("JS Function: WebMM.widget.Recorder.install, Record Error.")
                    }, onRecordStop:function() {
                    }, onRecordFinish:function(b, c) {
                        1 == p && (a._sendVoice(b, c), e.toggle(), f.toggle(), p = 0)
                    }, onSendError:function(b, d) {
                        Log.e("JS Function: WebMM.widget.Recorder.install, Send Record Msg Error.");
                        1 == p ? (a.cancelRecord(), a.alert("Record Error.")) : c.logic("sendMsg").finishSentAudio(b, d)
                    }, onSendProgress:function() {
                    }, onSendFinish:function(a, b, d) {
                        c.logic("sendMsg").finishSentAudio(b, d, (JSON.parse(a.data) || {}).MsgId)
                    }, onActivityTime:function(a, b) {
                        r = a;
                        var c = f.find(".recordInfo");
                        c.html(c.attr("recording"));
                        f.find(".recordVol").find("span").each(function() {
                            this.style.height = 20 * (b / 100) * Math.random() + "px"
                        });
                        f.find(".recordTime").html(Math.floor(a / 1E3) + "/60")
                    }})
                }
            }
        }else {
            a.alert(c.getRes("text_no_flash_alert"))
        }
    }, cancelRecord:function() {
        p = 2;
        k.click();
        c.widget.Recorder.getObject().jCancelRecording()
    }, _sendVoice:function(a, b) {
        c.logic("sendMsg").sendAudio(a, r, b)
    }, cancelUploadByLocalId:function() {
    }})
})(jQuery, WebMM, this);
(function(b, c) {
    var f = "", g = "", e = !1, d, a = !1;
    c.createCtrl("chat_chattingmgr", {init:function() {
        var a = this.getDom$().find(".section");
        d = a.first().children();
        a.last();
        d.scrollable()
    }, active:function(b) {
        (f = b.userName) && (a || this._render(""))
    }, _render:function(f) {
        if(f != g || a) {
            g = f;
            e = c.util.isRoomContact(f);
            var f = c.model("contact").getContact(f), i = [];
            if(f) {
                if(e) {
                    for(var k = 0, l = f.MemberList && f.MemberList.length;k < l;k++) {
                        var j = f.MemberList[k], n = c.model("contact").getContact(j.UserName);
                        if(n) {
                            if(!n.RemarkName && j.DisplayName) {
                                var m = {};
                                b.extend(m, n, {DisplayName:j.DisplayName});
                                j = m
                            }else {
                                j = n
                            }
                        }
                        i.push(j)
                    }
                }else {
                    i.push(f)
                }
                d.html(b.tmpl("chat_detail_panel", {IsChatroom:e, IsChatroomOwner:f.isRoomOwner(), NickName:f.NickName, Contacts:i}));
                e && (i = this.getDom$().find(".partiTitleName"), i.html(f.NickName || i.attr("noname")));
                b("#chatting_mgr_operator").css("visibility", e ? "visible" : "hidden")
            }else {
                d.html(b.tmpl("chat_detail_panel", {IsChatroom:e, NickName:"", Contacts:[]}))
            }
        }
    }, contactAdded:function(a) {
        this.contactUpdated(a)
    }, contactUpdated:function(d) {
        if(a) {
            if(d.UserName == f) {
                this._render(f)
            }else {
                if(c.util.isRoomContact(f)) {
                    for(var e = c.model("contact").getContact(f), g = (e || {}).MemberList || [], l = 0, j = g.length;l < j;l++) {
                        if(g[l].UserName == d.UserName) {
                            g = b("#personal_info_" + d.UserName);
                            g.length && g.replaceWith(b.tmpl("chat_detail_contact_item", {IsChatroom:!0, IsChatroomOwner:e.isRoomOwner(), Contact:d}));
                            break
                        }
                    }
                }
            }
        }
    }, chatroomMemberFocus:function() {
    }, quitChatroom:function() {
        this.confirm(c.getRes("text_quit_chatroom_alert"), {ok:function() {
            c.logic("modChatroom").quit(f)
        }, cancel:function() {
        }})
    }, modChatroomTopic:function(a, d) {
        var e = this, g = c.model("contact").getContact(f);
        this.getDom$().find(".chatDetailsTitle input").val(g.NickName).show().moveToInputEnd().off("keyup").on("keyup", function(a) {
            if(b.isHotkey(a, "enter") || b.isHotkey(a, "esc")) {
                b.trim(this.value) && (d.html(b.trim(this.value) || d.attr("noname")), e._modTopic(this.value)), this.style.display = "none"
            }
            32 < b.getAsiiStrLen(b.trim(this.value)) && (this.value = b.trim(this.value).substring(0, 32))
        }).off("blur").on("blur", function() {
                b.trim(this.value) && (d.html(b.trim(this.value) || d.attr("noname")), e._modTopic(this.value));
                this.style.display = "none"
            })
    }, _modTopic:function(a) {
        var d = c.model("contact").getContact(f), a = b.trim(a);
        a != d.DisplayName && (d.NickName = a, c.logic("modChatroom").modTopic(f, a))
    }, createChatroom:function() {
        b.hash((b.hash() || "chat") + "/createchatroom?userName=" + f + "&func=add");
        return!1
    }, addChatroomMember:function() {
    }, delChatroomMember:function(a, b) {
        var d = b.attr("un");
        c.logic("modChatroom").delMember(f, d)
    }, setChatPanelStatus:function(b) {
        (a = b) && this._render(f)
    }})
})(jQuery, WebMM, this);
(function(b, c, f) {
    var g = "", e = new Image;
    c.createCtrl("modifyavatar", {init:function() {
        var b = this;
        f.uploadAvatarImg = function(a, c) {
            if("0" == a && b._moCropper) {
                var f = c.SecondaryMediaId || c.MediaId;
                g = c.MediaId;
                e.onload = function() {
                    b._moCropper.setImg("/cgi-bin/mmwebwx-bin/webwxpreview?fun=preview&mediaid=" + f);
                    e.onload = null
                };
                e.src = "/cgi-bin/mmwebwx-bin/webwxpreview?fun=preview&mediaid=" + f
            }
            b.getDom$().find(".loadingMask").hide()
        }
    }, active:function() {
        var d = c.model("account").getUserName();
        this.popupWindow(c.getRes("modify_avatar_title"), b.tmpl("modify_avatar_content", {HeadImgFlag:c.model("account").getUserInfo().HeadImgFlag, avatar:c.util.getNormalAvatarUrl(d) + "&type=big"}), !b.browser.msie && b("#accountAvatarWrapper"), {left:150});
        var a = this.getDom$().find(".editBox"), e = this.getDom$().find(".previewBox");
        this._moCropper = new QMImgCropper(a[0], {previewDoms:e});
        this._moCropper.setImg(c.util.getNormalAvatarUrl(d) + "&type=big")
    }, inactive:function() {
        b("#mask").off("click").hide();
        this._moCropper = e.src = null;
        g = ""
    }, close:function() {
        b.hash(b.hash().replace("/modifyavatar", ""))
    }, returnPre:function() {
        var c = this;
        c.getDom$().find(".preAvartor").fadeIn(function() {
            b.transform(c.getDom$().find(".avatarCntr"), c.getDom$().find(".bigAvatarWrapper"))
        })
    }, gotoModify:function(c, a, e) {
        var f = this;
        (function() {
            var a = f.getDom$().find(".previewBox"), c = f.getDom$().find(".avatarCntr");
            b.transform(c, a, function() {
                e.fadeOut()
            })
        })()
    }, uploadAvatarImg:function(d, a, e) {
        d = e[0].filename.value;
        b.trim(d) && (b.isImg(d) ? (d = b.now(), d = b.extend({Msg:{FromUserName:c.model("account").getUserName(), ToUserName:"", Type:3, LocalID:"" + d}}, c.model("account").getBaseRequest()), e[0].msgimgrequest.value = JSON.stringify(d), e.submit(), this.getDom$().find(".loadingMask").show()) : this.alert(c.getRes("modify_avatar_upload_valid")))
    }, cropper:function(b, a) {
        var e = this;
        this._moCropper.getImg();
        var f = this._moCropper.getPos();
        c.logic("modifyavatar").modify(g, f, {onsuccess:function() {
            e.getDom$().find(".loadingMask").hide();
            e.showTips(a.attr("succTips"), !0, {offset:{left:150}});
            e.close()
        }, onerror:function() {
            e.getDom$().find(".loadingMask").hide();
            e.showTips(a.attr("errTips"), !1, {offset:{left:150}})
        }});
        e.getDom$().find(".loadingMask").show()
    }})
})(jQuery, WebMM, this);
(function(b, c) {
    var f;
    c.createCtrl("popupcontactprofile", {init:function() {
    }, active:function(g) {
        var e = this, d = c.util.isSelf(g.userName);
        if(g.msgId) {
            if(f = c.model("message").getMsgById(g.userName, g.msgId)) {
                g = f.Ticket, f = b.extend(f, f.Contact), f.Ticket || (f.Ticket = g)
            }
        }else {
            f = c.model("contact").getContact(g.userName)
        }
        f ? (e.popupWindow(c.getRes("text_friend_detai_info"), b.tmpl("popupConatctProfile", {Avatar:f.HeadImgUrl, MsgType:f.MsgType, MsgId:f.MsgId, AttrStatus:f.AttrStatus, Contact:f, IsSelf:d}), null, {left:150}, {lightMask:!1, clickMaskHide:!1, onhide:function() {
            e.back()
        }}), f.MsgType == c.Constants.MM_DATA_VERIFYMSG && e.getDom$().find(".valiMesg").html(b.tmpl("valiMesg", {Contact:f, History:f.History || []}))) : e.back()
    }, inactive:function() {
        b("#mask").off("click").hide()
    }, close:function() {
        b.history.back()
    }, contactAdded:function(b) {
        this.contactUpdated(b)
    }, contactUpdated:function(b) {
        if(f && b.UserName == f.UserName) {
            var e = this.getDom$();
            if(b.isContact()) {
                var d = e.find(".nextStep input:button");
                1 < d.length && (d.first().show(), d.last().hide())
            }
            b.ContactFlag & c.Constants.MM_CONTACTFLAG_BLACKLISTCONTACT && (e = e.find(".blackContact"), e.first().show(), e.last().hide());
            b.isContact() && this.getDom$().find(".remarkSection").is(":hidden") && this.getDom$().find(".remarkSection").show()
        }
    }, messageUpdated:function(g) {
        f && (g.MsgType == c.Constants.MM_DATA_VERIFYMSG && g.RecommendInfo && g.RecommendInfo.UserName == f.UserName) && this.getDom$().find(".valiMesg").html(b.tmpl("valiMesg", {Contact:f, History:f.History || []}))
    }, _showLoading:function(b) {
        this.getDom$().find(".loadingMaskWind")[b ? "show" : "hide"]()
    }, verify:function(b, e, d) {
        var a = this;
        if(f) {
            if(f.MsgType == c.Constants.MM_DATA_VERIFYMSG) {
                b = c.Constants.MM_VERIFYUSER_VERIFYOK
            }else {
                if(f.AttrStatus & WebMM.Constants.MM_STATUS_VERIFY_USER) {
                    d.hide().prev().show().find("input:text").focus();
                    return
                }
                b = c.Constants.MM_VERIFYUSER_ADDCONTACT
            }
            c.logic("userverify").verify(f.UserName, b, "", f.Contact && f.Contact.scene || 0, {onsuccess:function() {
                a._showLoading(!1);
                a.showTips(e.attr("addSuccTips"), !0, {offset:{left:150}})
            }, onerror:function(b) {
                1206 == b ? d.hide().prev().show().find("input:text").focus() : (a._showLoading(!1), a.showTips(e.attr("addErrTips"), !1, {offset:{left:150}}))
            }}, f.Ticket);
            a._showLoading(!0)
        }
    }, enterRequest:function(c, e, d) {
        b.isHotkey(c, "enter") ? this.sendRequest(c, d.find("input:button").first(), d) : 40 < b.getAsiiStrLen(b.trim(e.val())) && (e.val(b.subAsiiStr(e.val(), 40)), c.preventDefault())
    }, sendRequest:function(g, e, d) {
        var a = this;
        f && (g = b.trim(d.find("input:text").val()), c.logic("userverify").verify(f.UserName, c.Constants.MM_VERIFYUSER_SENDREQUEST, g, f.Contact && f.Contact.scene || 0, {onsuccess:function() {
            a._showLoading(!1);
            a.showTips(e.attr("addSuccTips"), !0, {offset:{left:150}});
            d.hide().next().show()
        }, onerror:function() {
            a._showLoading(!1);
            a.showTips(e.attr("addErrTips"), !1, {offset:{left:150}})
        }}, f.Ticket), a._showLoading(!0))
    }, cancelRequest:function(b, c, d) {
        d.hide().next().show()
    }, showHDAvatar:function(b, c) {
        function d() {
            var b = c.position();
            f.css({width:c.width(), height:c.height(), left:b.left, top:b.top});
            a.fadeIn(function() {
            })
        }
        var a = this.getDom$().find(".hdAvatarContainer"), f = a.find("img"), i = c.attr("src") + "&type=big";
        f.attr("src") ? d() : (f[0].onload = function() {
            d()
        }, f.attr("src", i))
    }, returnToProfile:function(b, c, d) {
        d.fadeOut()
    }, showPhotoAlbum:function(c, e) {
        this.close();
        var d = e.attr("userName");
        b.hash((b.hash() || "chat") + "/popupphotoalbum?userName=" + d);
        return!1
    }, _editTextWithInput:function(c, e, d, a) {
        function f() {
            var h = b.trim(e.val());
            h == i ? (e.hide(), c.show(), a && a.onerror && a.onerror(h)) : (b.getAsiiStrLen(h) > d && (h = b.stripStr(h, d)), e.val(h).hide(), c.text(h).val(h).show(), a && a.onsuccess && a.onsuccess(h))
        }
        var i = c.text() || c.val(), d = d || 16;
        c.hide();
        i && e.val(i);
        e.show();
        b.selectText(e[0]);
        b.setInputLength(e, d).off("keyup").on("keyup", function(a) {
            (b.isHotkey(a, "enter") || b.isHotkey(a, "esc")) && f()
        }).off("blur").on("blur", function() {
                f()
            })
    }, editRemarkName:function(b, e) {
        var d = e.siblings("input");
        d.val() || d.val(d.attr("nickname"));
        e.hide();
        this._editTextWithInput(e.find("span").first(), e.siblings("input"), 32, {onsuccess:function(a) {
            e.show();
            c.logic("oplog").setRemarkName(f.UserName, a);
            "" == a ? e.find("span.editRemarkNameIcon").addClass("show") : e.find("span.editRemarkNameIcon").removeClass("show")
        }, onerror:function() {
            e.show()
        }})
    }, onEditNickName:function(b, c) {
        this._editTextWithInput(c, c.siblings("input"), 16, {onsuccess:function() {
        }})
    }, onEditSignature:function(b, c) {
        this._editTextWithInput(c, c.siblings("textarea"), 30, {onsuccess:function() {
        }})
    }, blackContact:function() {
        this.confirm(b.tmpl("black_contact_confirm"), {ok:function() {
            c.logic("oplog").blackContact(f.UserName, c.Constants.MMWEBWX_OPLOG_BLACKCONTACT_ADD)
        }})
    }, replyVerifyMsg:function(b, e) {
        var d = e.attr("msgid"), a = e.attr("ticket"), h = e.attr("opcode");
        c.util.verificationPopup("verification_reply", f, this, {onsuccess:function(a) {
            var b = c.model("message").getMsgById("fmessage", d), e = b.History;
            e.push("1" + a);
            b.update(e)
        }}, {notEmpty:!0, type:h == c.Constants.MM_VERIFYUSER_SENDREQUEST || h == c.Constants.MM_VERIFYUSER_SENDERREPLY ? c.Constants.MM_VERIFYUSER_RECVERREPLY : c.Constants.MM_VERIFYUSER_SENDERREPLY, ticket:a})
    }})
})(jQuery, WebMM, this);
(function(b, c) {
    var f = "", g = "", e = !1, d = !1, a = !1, h = !1, i = !0;
    c.createCtrl("chat_contactListContent", {init:function() {
        var a = this;
        a.getDom$().scrollable({callback4stop:function() {
            a._contactImgLoad()
        }})
    }, active:function(a) {
        f = a.userName;
        h && (this.getDom$().find("a.activeColumn").removeClass("activeColumn"), (a = a.child && a.child.userName) && b("#con_item_" + b.getAsciiStr(a)).addClass("activeColumn"))
    }, contactListReady:function() {
        e = !0;
        d && this._contactListRender(!1)
    }, needShowContactList:function(a) {
        d = !0;
        (h = a) && this._contactListRender(!e)
    }, contactUpdated:function(a) {
        b("#con_item_{0}".format(b.getAsciiStr(a.UserName))).replaceWith(b.tmpl("contactItem", {contact:a}))
    }, _contactListRender:function(d, e) {
        if(!a || e) {
            var h = c.model("contact").getAllFriendContact(g, !g, {}, !g), n = !g && c.model("contact").getAllStarContact() || [], m = c.model("contact").getAllFriendChatroomContact(g) || [], q = !g && c.model("contact").getAllBrandContact() || [], p = this, r = b.tmpl("contactlist", {init:d, curUserName:f, isSearch:!!g, contacts:h, starContacts:n, roomContacts:m, brandContacts:q, invisible:i});
            i = !1;
            setTimeout(function() {
                p.getDom$().find("#contactListContainer").html(r);
                p._contactImgLoad()
            });
            d || (a = !0)
        }
    }, _contactImgLoad:function() {
        debug(function() {
            console.log("Load Img")
        });
        var a = this.getDom$().parents(".createNewChat"), c = a.offset().top, d = a.outerHeight(!0);
        this.getDom$().find("a.friendDetail").each(function() {
            var a = b(this);
            if(!a.data("loadedImg")) {
                var e = a.offset().top;
                e + 50 >= c && e < c + 2 * d && (e = a.find("img"), e.attr("src", e.attr("hide_src")), a.data("loadedImg", !0))
            }
        })
    }, contactListSearch:function(a) {
        g = a;
        this._contactListRender(!1, !0);
        this.getDom$().parent().scrollTop(0)
    }, toggleBrandList:function(a, b) {
        b.next(".groupDetail").toggle();
        b.find(".lapIcon").toggleClass("lapedIcon")
    }})
})(jQuery, WebMM, this);
(function(b, c) {
    c.createCtrl("feedback", {active:function() {
        this.popupWindow(this.getDom$().attr("_title"), b.tmpl("feedback", {}), null, {left:150});
        this.getDom$().find(".left").html(this.getDom$().find("textarea").focus().attr("maxlength"))
    }, inactive:function() {
        b("#mask").off("click").hide()
    }, close:function() {
        b.history.back()
    }, edit:function() {
        return!1
    }, send:function(b, g, e) {
        b = e.find("textarea");
        if(g = b.val().trim()) {
            c.logic("feedback").send(g), this.showTips(b.attr("tips"), !0)
        }
        this.close()
    }})
})(jQuery, WebMM);
