;
(function(win, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
        typeof define === 'function' && define.amd ? define(factory) :
        (win['ztAjax'] = factory());
})(window, function() {
    // options 
    // url 地址
    // type 请求方式
    // async false 同步，true 异步 默认异步
    // timeout 设置请求时间
    // data 发送数据
    // complete 
    // beforeSend
    // 创建对象
    const CreatXml = function(option) {
        if (!(this instanceof CreatXml)) {
            return new CreatXml(option)
        }
        if (!option.url || !option.type) {
            return false;
        }
        this.setOpt(option);
        this.xmlhttp = this.create();
        this.request();
    };
    CreatXml.prototype = {
        construct: CreatXml,
        setOpt: function(option) {
            this.setting = {
                async: true,
                timeout: 15000,
                data: '',
                success: function() {},
                error: function() {},
                complete: function() {},
                beforeSend: function() {}
            };
            this.extend(this.setting, option);
        },
        extend: function(obj, obj2) {
            for (var i in obj2) {
                obj[i] = obj2[i];
            }
        },
        create: function() {
            var xmlhttp = "";
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            } else {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            return xmlhttp;
        },
        readystate: function() {
            var self = this;
            self.xmlhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {
                        clearTimeout(self.setting.setTimes);
                        self.setting.complete();
                        var data = this.responseText;
                        if (data && JSON.parse(data)) {
                            data = JSON.parse(data);
                        }
                        self.setting.success(data);
                    } else {
                        clearTimeout(self.setting.setTimes);
                        self.setting.complete();
                        self.setting.error(this.responseText);
                    }
                }
            }
        },
        setTime: function() {
            var self = this;
            self.setting.setTimes = setTimeout(function() {
                self.setting.complete();
                self.setting.error('time out');
                self.xmlhttp.abort();
            }, self.setting.timeout);
        },
        para: function(data) {
            // var datastr = [];
            // if (data && Object.prototype.toString.call(data) === "[object Object]") {
            //     for (var i in data) {
            //         datastr.push(i + '=' + data[i]);
            //     }
            //     datastr = datastr.join('&')
            // } else {
            //     datastr = data;
            // }
            // return JSON.stringify(data)
            var datastr = JSON.stringify(data)
            return datastr ? datastr : data
        },
        request: function() {
            this.beforeSendHandle();
            var obj = this.getSendInfo();
            var type = this.setting.type.toLowerCase();
            this.xmlhttp.open(type, obj.newurl, obj.async);
            this.xmlhttp.send(obj.datastr);
        },
        beforeSendHandle: function() {
            this.setting.beforeSend();
            this.setTime();
            this.readystate();
        },
        getSendInfo: function() {
            var newurl = this.setting.url;
            var async = this.setting.async;
            var datastr = this.para(this.setting.data);
            return {
                newurl: newurl,
                async: async,
                datastr: datastr
            }
        }
    };
    return CreatXml
});