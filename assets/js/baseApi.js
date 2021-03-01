// 每次执行ajax请求前，会先执行ajaxprefilter函数
$.ajaxPrefilter(function(options) {
    options.url = "http://www.liulongbin.top:3007" + options.url;
    console.log(options.url);
})