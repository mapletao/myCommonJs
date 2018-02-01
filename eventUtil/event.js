;
(function(win, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        (win['ztEventUtil'] = factory());
})(window, function() {
    const eventUtil = {
        //绑定事件
        bindEvent: (function(dom, type, fn) {
            var self = this;
            if (window.addEventListener) {
                return function(dom, type, fn) {
                    dom.addEventListener(type, fn, false);
                };
            } else if (window.attachEvent) {
                return function(dom, type, fn) {
                    dom.attachEvent('on' + type, fn);
                };
            } else {
                return function(dom, type, fn) {
                    dom["on" + type] = fn;
                };
            }
        })(),
        //获取当前触发源
        getEvent: (function(e) {
            var self = this;
            if (window.event) {
                return function(e) {
                    return window.event;
                };
            } else {
                return function(e) {
                    return e;
                };
            }
        })(),
        getEventSrc: function(e) {
            var self = this;
            if (e.srcElement) {
                self.getEventSrc = function(e) {
                    return e.srcElement;
                };
            } else {
                self.getEventSrc = function(e) {
                    return e.target;
                };
            }
            return self.getEventSrc(e);
        },
        // 阻止冒泡
        stopPropagation: (function(e) {
            var self = this;
            if (window.event) {
                return function(e) {
                    window.event.cancelBubble = true;
                };
            } else {
                return function(e) {
                    e.stopPropagation();
                };
            }
        })(),
        //阻止默认行为
        preventDefault: (function(e) {
            var self = this;
            if (window.event) {
                return function(e) {
                    window.event.returnValue = false;
                };
            } else {
                return function(e) {
                    e.preventDefault();
                };
            }
        })(),
        //解除事件
        removeBind: (function(ele, type, fn) {
            var self = this;
            if (window.removeEventListerner) { // 标准浏览器
                return function(dom, type, fn) {
                    ele.removeEventListerner(type, fn, false);
                };
            } else if (window.detachEvent) { // IE浏览器
                return function(dom, type, fn) {
                    ele.detachEvent("on" + type, fn);
                };
            } else {
                return function(dom, type, fn) {
                    ele["on" + type] = null;
                };
            }
        })()
    }
    return eventUtil
});