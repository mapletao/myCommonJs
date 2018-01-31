## myCommonJs 常用的js方法

## ztThrottle 节流函数 一段时间内事件只执行一次 （eg login）
`eg const login = ztThrottle(loginHandle, 300)`

## ztAntiShake 防抖函数 触发事件结束一段时间后执行 （eg scroll）
`eg const onScroll = ztAntiShake(scrollHandle, 300)`