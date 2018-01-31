;
(function(win, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        (win['ztAntiShake'] = factory());
})(window, function() {
    /**
     * @api throttle 
     * @apiParam {function} cb 需要防抖函数
     * @apiParam {number} timeout 延迟事件
     * @apiGroup myCommonJs
     * @apiName antiShake
     * @apiDescription 防抖函数 事件结束后一段事件内执行
     */
    const antiShake = (cb, timeout) => {
        if (typeof cb !== 'function') {
            throw new Error('cb is not a function')
            return !1
        }
        return function() {
            const name = 'zt_antiShake'
            if (cb[name]) {
                clearTimeout(cb[name])
            }
            cb[name] = setTimeout(() => {
                cb()
            }, timeout);
        }
    }
    return antiShake
});