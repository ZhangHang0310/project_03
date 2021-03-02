// $(function(){})是入口函数
$(function() {
    getUserInfo();
    // 给退出注册点击事件
    $('.tuichu').on('click', function() {
        layer.confirm('是否退出登录', { icon: 3, title: '提示' }, function(index) {
            // 在退出之前要先清空localStorage里的数据
            localStorage.removeItem('token')
            location.href = '/login.html'

            layer.close(index);
        });

    })


})

// 获得用户基本信息
function getUserInfo() {
    $.ajax({
        method: "GET",
        url: "/my/userinfo",
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
                // console.dir(res);
                if (res.status !== 0) {
                    // console.log(localStorage.getItem('token'));
                    return layui.layer.msg("获取用户信息失败");

                }
                renderAvatar(res.data);

            }
            // complete: function(res) {
            //     console.log(res);

        // }


    });


    //渲染用户信息
    function renderAvatar(data) {
        // 渲染文本
        var name = data.nickname || data.username;
        $('.welcome').html('欢迎&nbsp;&nbsp;' + name);
        // 渲染头像
        // 如果头像不为空，渲染头像，为空，渲染文字
        if (data.user_pic !== null) {
            $('.layui-nav-img').attr('src', data.user_pic).show();
            $('.text-avatar').hide();

        } else {
            var chars = name[0].toUpperCase()
            $('.text-avatar').html(chars).show();
            $('.layui-nav-img').hide();

        }
    }

}