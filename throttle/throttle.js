;
(function(win, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        (win['ztThrottle'] = factory());
})(window, function() {
    /**
     * @api throttle 
     * @apiParam {function} cb 需要节流函数
     * @apiParam {number} timeout 安全时间
     * @apiGroup myCommonJs
     * @apiName throttle
     * @apiDescription 节流函数 在某一个时间段内只执行一次调用
     */
    const throttle = (cb, timeout) => {
        if (typeof cb !== 'function') {
            throw new Error('cb is not a function')
            return !1
        }
        return function() {
            const name = 'zt_throttle'
            if (cb[name]) {
                return !1
            }
            cb[name] = true
            setTimeout(() => {
                cb()
                cb[name] = false
            }, timeout);
        }
    }
    return throttle
});