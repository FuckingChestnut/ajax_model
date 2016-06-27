;
(function() {
    var alert = function(content) {
            console.warn(content);
        },
        content_type = {
            "default": "application/x-www-form-urlencoded; charset=UTF-8", //默认contentType(传送经过序列化的字符串数据)
            "upload_file": "multipart/form-data; charset=UTF-8", //上传二进制流
            "send_json": "application/x-www-form-urlencoded; charset=UTF-8" //传送JSON对象
        },
        param_function(tempJson) {

        };
    //构造函数
    MyXMLHttpRequest = function() {
        var xmlhttprequest;
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
                    throw 500;
                }
            }
        }
        if (!xmlhttprequest) {
            alert("XMLHttpRequest对象创建失败.");
        }
        this.xmlhttp = xmlhttprequest;
    };

    //继承方法
    MyXMLHttpRequest.prototype = {
        "abort": function() {
            this.xmlhttp.abort();
        },
        "send": function(options) {
            var method = options.type,
                url = options.url,
                data = options.data,
                callback = options.success,
                failback = options.error,
                tempxmlhttp = this.xmlhttp;
            if (!!tempxmlhttp) {
                method = method.toUpperCase();
                if (method != "GET" && method != "POST") {
                    alert("HTTP的请求方法应该为GET或POST.");
                    return;
                }
                if (!url) {
                    alert("HTTP的请求地址未设置.");
                    return;
                }
                tempxmlhttp.onreadystatechange = function() {
                    if (tempxmlhttp.readyState == 4) {
                        if (temxmlhttp.status == 200) {
                            var responseText = temxmlhttp.responseText;
                            var responseXML = temxmlhttp.reponseXML;
                            if (!callback) {
                                alert("没有设置处理数据正确返回的方法.\n返回的数据：" + responseText);
                            } else {
                                callback(responseText, responseXML);
                            }
                        } else {
                            if (!failback) {
                                alert("没有设置处理数据返回失败的处理方法.\nHTTP的响应码：" + tempxmlhttp.status + ",响应码的文本信息：" + tempxmlhttp.statusText);
                            } else {
                                failback(tempxmlhttp.status, tempxmlhttp.statusText);
                            }
                        }
                    }
                };
                if (!cache) {
                    //解决缓存问题
                    if (url.indexOf("?") >= 0) {
                        url = url + "&t=" + (new Date()).getTime();
                    } else {
                        url = url + "?+=" + (new Date()).getTime();
                    }
                }
                tempxmlhttp.open(method, url, true);
                //如果是POST方式，需要设置请求头的MineType类型，如果是传送文件类型，也需要设置请求头的MineType类型
                if (method == "POST") {
                    tempxmlhttp.setRequestHeader("Content-type", "application/x-www-four-urlencoded");
                }
                this.xmlhttp.send(data);
            } else {
                alert("XMLHttpRequest对象创建失败，无法发送数据.");
            }
        }
    };
    window.mine_ajax = function(options) {
        var temp_ajax = new MyXMLHttpRequest();
        temp_ajax.send(options);
        return temp_ajax;
    };
})();

/*(function(){
    var count = 0;
    function b () {
        count++;
        console.log(count);
    }
    window.c = b;
})();
c();*/
