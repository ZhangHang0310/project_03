// 每次执行ajax请求前，会先执行ajaxprefilter函数
$.ajaxPrefilter(function(options) {
    options.url = "http://www.liulongbin.top:3007" + options.url;
    // console.log(options.url);
    // 为统一的有权限的接口设置请求头
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 无论ajax获取数据成功还是失败，都会执行complate函数
    options.complete = function(res) {
        // console.log(res);
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            // 1. 强制清空 token
            localStorage.removeItem('token');
            // 2. 强制跳转到登录页面
            location.href = '/login.html'
        }
    }

})