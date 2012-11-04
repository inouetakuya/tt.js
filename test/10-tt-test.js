buster.testCase("tt.js test", {
    "setUp": function() {
        this.div = document.getElementById("id-hoge");
        this.nodeList = document.querySelectorAll(".class-hoge-fuga");
    },
    "Basic test": {
        "tt function": function() {
            assert.isFunction(tt);
        },
        "tt object": function() {
            var ttObj = tt("");

            assert.isQbject(ttObj);
        },
        "tt loaded function": function() {
            var spy = sinon.spy();

            tt(spy);
            assert.calledOnce(spy);
        }
    },
    "DOM Search test": {
        "ID named search": function() {
            assert.equals(tt("#id-hoge").length, 1);
        },
        "class named search": function() {
            assert.equals(tt(".class-hoge-fuga").length, 5);
        },
        "tag named search": function() {
            assert.equals(tt("div").length, 7);
        },
        "use querySelectorAll search": function() {
            assert.equals(tt("div[data-attr=piyo]").length, 1);
            assert.equals(tt(".class-hoge > div:first-child").length, 1);
        }
    },
    "tt methods test": {
        "isArray test": function() {
            assert.isFunction(tt.isArray);

            var arr = [];

            assert(tt.isArray(arr));
        },
        "isNodeList test": function() {
            assert.isFunction(tt.isNodeList);
            assert(tt.isNodeList(this.nodeList));
        },
        "plugin test": function() {
            assert.isFunction(tt.plugin);
            assert(tt.plugin("testPlugin", function() { return this; }));
            refure(tt.plugin("", {}));
        },
        "each test": function() {
            assert.isFunction(tt.each);

            var arr = [1, 2, 3, 4, 5],
                res = [];

            tt.each(function(val) {
                res.push(val);
            });
            assert(res.length);
            for (var i = 0, iz = res.length; i < iz; ++i) {
                assert.equals(res[i], arr[i]);
            }
        },
        "match test": function() {
            assert.isFunction(tt.match);

            var arr = [1, 2, 3, 4, 5],
                res;

            res = tt.match(arr, function(val) {
                if (val === 3) {
                    return true;
                }
            });
            assert.equals(res, 3);

            res = tt.match(arr, function() {
                return false;
            });
assert.isNull(res);
        },
        "then test": function() {
            assert.isFunction(tt.then);

            var arr = [1, 2, 3, 4, 5],
                isThree = function(val, index) {
                    return (val === 3);
                };

            assert(tt.then(arr, isThree, true));
            refure(tt.then(arr, isThree, false));
        },
        "query2object test": function() {
            assert.isFunction(tt.query2object);

            var res = tt.query2object('hoge=huga&foo=bar');
            assert.equals(res, {
                'hoge' : 'huga',
                'foo' : 'bar'
            });
        },
        "extend test": function() {
            assert.isFunction(tt.extend);

            var hoge = {'key' : 'val'};
            var huga = {'prop' : 'value'};
            var foo = {'foo' : 'bar'};

            var res = tt.extend(hoge, huga, foo);

            assert.equals(res.key, hoge.key);
            assert.equals(res.prop, huga.prop);
            assert.equals(res.foo, foo.foo);
        },
        "param test": function() {
            assert.isFunction(tt.param);

            var res = tt.param({
                'hoge' : 'huga',
                'foo&bar' : 'kiyo&piyo'
            });
            assert.equals(res, 'hoge=huga&foo%26bar=kiyo%26piyo');
        },
        "triggerEvent test": function() {
            assert.isFunction(tt.triggerEvent);

            var spy = sinon.spy();

            tt(this.div).bind('click', spy);
            tt(this.div).trigger('click');

            assert.calledOnce(spy);

            refure.exception(function () {
                tt('hoge').trigger('huga');
            });
            var self = this;
            assert.exception(function () {
                tt(self.div).trigger();
            }, 'Error');
        },
        "cssPrefix test": function() {
            assert.isFunction(tt.cssPrefix);

            var defaultPrefix = ["webkit", "moz", "o", "ms"],
                testPrefix = ["webkit", "moz"],
                value = "transition", res;

            res = tt.cssPrefix(value);
            tt.each(res, function(prefixed, index) {
                assert.equals(prefixed, "-" + defaultPrefix[index] + "-" + value);
            });

            res = tt.cssPrefix(value, testPrefix);
            tt.each(res, function(prefixed, index) {
                assert.equals(prefixed, "-" + testPrefix[index] + "-" + value);
            });
        },
        "createEnvData test": function() {
            assert.isFunction(tt.createEnvironment);

            var res = {};
            var testUA = {
                "iphone": [
                    ["6000", "Mozilla/5.0 (iPhone; CPU iPhone OS 6_0 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Version/6.0 Mobile/10A403 Safari/8536.25"],
                    ["5000", "Mozilla/5.0 (iPhone; CPU iPhone OS 5_1_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9B206 Safari/7534.48.3"],
                    ["4000", "Mozilla/5.0 (iPhone; U; CPU iPhone OS 4_2_1 like Mac OS X; ja-jp) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148 Safari/6533.18.5"]
                ],
                "android": [
                    ["4000", "Mozilla/5.0 (Linux; U; Android 4.1.1; ja-jp; Galaxy Nexus Build/JRO03H) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30"],
                    ["3000", "Mozilla/5.0 (Linux; U; Android 3.2.1; ja-jp; Transformer TF101 Build/HTK75) AppleWebKit/534.13 (KHTML, like Gecko) Version/4.0 Safari/534.13"],
                    ["2300", "Mozilla/5.0 (Linux; U; Android 2.3.3; ja-jp; SC-02C Build/GINGERBREAD) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"],
                    ["2200", "Mozilla/5.0 (Linux; U; Android 2.2.1; ja-jp; IS03 Build/S9090) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"]
                ],
                "windowsPhone": [
                    ["", "Mozilla/5.0 (compatible; MSIE 9.0; Windows Phone OS 7.5; Trident/5.0; IEMobile/9.0; FujitsuToshibaMobileCommun; IS12T; KDDI)"]
                ],
                "chrome": [
                    ["4100", "Mozilla/5.0 (Linux; Android 4.1.1; Nexus 7 Build/JRO03S) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.166 Safari/535.19"]
                ],
                "opera": [
                    ["", "Opera/9.80 (Android 2.3.3; Linux; Opera Mobi/ADR-1111101157; U; ja) Presto/2.9.201 Version/11.50"]
                ],
                "firefox": [
                    ["", "Mozilla/5.0 (Android; Linux armv7l; rv:9.0) Gecko/20111216 Firefox/9.0 Fennec/9.0"]
                ]
            };

            for (var key in testUA) {
                var values = testUA[key];

                values.forEach(function(data) {
                    res = tt.createEnvData({userAgent: data[1]});
                    assert(res[key]);
                    assert.equals(data[0] ? parseInt(data[0]) : null, res.versionCode);
                });
            }
        },
        "tt.env test": function() {
            assert.isObject(tt.env);
        }
    }
});