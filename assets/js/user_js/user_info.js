$(function() {
    layui.form.verify({
        nickname: function(value) {
            if (value.length > 6) {
                return '用户昵称应在1~6 个字符之间'

            }
        }
    });
    getInitUserInfo();
    // 获取用户基本信息
    function getInitUserInfo() {
        $.ajax({
            type: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    layui.layer.msg('获取用户信息失败');
                }
                // 给表单赋值
                layui.form.val('formUserInfo', res.data)
            }
        })

    }
    //重置
    $('.resetbtn').on('click', function(e) {
        e.preventDefault();
        // 阻止默认行为后，再次获取用户信息并渲染
        getInitUserInfo();
    })

    //提交修改
    $('form').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    layui.layer.msg('修改用户信息失败');
                }
                window.parent.getUserInfo();

            }
        })

    })



})