;
(function() {
    "use strict";
    var errorType = {
            0: "创建ajax异常",
            1: "参数配置错误"
        },
        mimeType = {
            "default": "application/x-www-form-urlencoded; charset=UTF-8", //默认contentType(传送经过序列化的字符串数据)
            "file": "multipart/form-data; charset=UTF-8", //上传二进制流
            "json": "application/x-www-form-urlencoded; charset=UTF-8" //传送JSON对象
        },
        //构造函数
        MyXMLHttpRequest = function(options) {
            this.options = options;
        };
    //继承方法
    MyXMLHttpRequest.prototype = {
        //默认配置
        "default_options": {
            data: {},
            type: "POST",
            async: true,
            contentType: mimeType["default"],
            error: function() {

            },
            success: function() {

            }
        },
        //基础方法
        "basic_function": {
            //序列化数据
            param_data: function(inputData) {
                var output_data = [];
                try {
                    for (var i in inputData) {
                        var item = inputData[i],
                            encode_item = encodeURIComponent(item),
                            temp_string = i + "=" + encode_item;
                        output_data.push(temp_string);
                    }
                } catch (e) {
                    pengchuan.warn("param_data error.");
                }
                output_data = output_data.join("&");
                return output_data;
            },
            //拓展数据
            extend_data: function() {
                var input_count = arguments.length,
                    extend_item = function(object_1, object_2) {
                        var temp_object = {};
                        for (var i in object_1) {
                            var item = object_1[i];
                            temp_object[i] = item;
                        }
                        for (var i in object_2) {
                            var item = object_2[i];
                            temp_object[i] = item;
                        }
                        return temp_object;
                    };
                if (input_count >= 2) {
                    var result_object = {};
                    for (var i = input_count - 1; i >= 0; i--) {
                        var item_input = arguments[i];
                        result_object = extend_item(item_input, result_object);
                    };
                    return result_object;
                } else if (input_count == 1) {
                    return arguments[0];
                } else {

                }
            }
        },
        //检测参数合法性
        check_options: function() {
            try {
                var temp_options = this.options,
                    temp_url = temp_options.url, //地址
                    temp_data = temp_options.data, //数据
                    temp_type = temp_options.type, //类型
                    temp_async = temp_options.async, //异步
                    temp_contentType = temp_options.contentType, //编码
                    //temp_cache = temp_options.cache, //缓存===
                    //temp_context = temp_options.context, //回调对象===
                    temp_error = temp_options.error, //失败
                    temp_success = temp_options.success; //成功
                if (!temp_url) {
                    throw 1;
                }
            } catch (e) {
                throw 1;
            }
        },
        //合并配置
        combine_options: function() {
            this.options = this.basic_function.extend_data({}, this.default_options, this.options);
        },
        //创建XMLHttpRequest
        creat_request: function() {
            var temp_options = this.options,
                xmlhttprequest;
            if (window.XMLHttpRequest) {
                xmlhttprequest = new XMLHttpRequest();
                if (xmlhttprequest.overrideMimeType) {
                    xmlhttprequest.overrideMimeType("text/xml");
                }
            } else if (window.ActiveXObject) {
                var activeName = ["MSXML2.XMLHTTP", "Microsoft.XMLHTTP"];
                for (var i = 0; i < activeName.length; i++) {
                    try {
                        xmlhttprequest = new ActiveXObject(activeName[i]);
                        break;
                    } catch (e) {

                    }
                }
            }
            if (!xmlhttprequest) {
                throw 0;
            }
            this.xmlhttprequest = xmlhttprequest;
        },
        //设置请求
        set_request: function() {
            var request = this.xmlhttprequest,
                success_callback = this.options.success,
                error_callback = this.options.error;
            request.onreadystatechange = function() {
                if (request.readyState == 4) {
                    if (request.status == 200) {
                        var responseText = request.responseText,
                            responseXML = request.reponseXML;
                        success_callback(responseText, responseXML);
                    } else {
                        var status = request.status,
                            statusText = request.statusText;
                        error_callback(status, statusText);
                    }
                }
            }
        },
        //打开请求
        open_request: function() {
            var request = this.xmlhttprequest,
                type = this.options.type,
                url = this.options.url,
                async = this.options.async,
                contentType = this.options.contentType;
            request.open(type, url, async);
            request.setRequestHeader("Content-type", contentType);
        },
        //发送请求
        send_request: function() {
            var request = this.xmlhttprequest,
                data = this.options.data;
            data = this.basic_function.param_data(data);
            request.send(data);
        },
        //取消请求
        abort: function() {
            this.xmlhttp.abort();
        },
    };
    //挂载方法
    window.ajax = function(options) {
        try {
            var temp_ajax = new MyXMLHttpRequest(options);
            temp_ajax.check_options();
            temp_ajax.combine_options();
            temp_ajax.creat_request();
            temp_ajax.set_request();
            temp_ajax.open_request();
            temp_ajax.send_request();
            return temp_ajax;
        } catch (error_index) {
            //var error_message = errorType[error_index];
            console.log(error_index);
        }
    }
})();




//test get window
/*(function() {
    var window = "pengchuan",
        demo = (function() {
            return this;
        })();
    console.log(demo);
})();*/
