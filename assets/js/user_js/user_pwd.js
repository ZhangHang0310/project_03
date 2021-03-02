$(function() {
    layui.form.verify({
            pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
            newpwd: function(value) {
                if (value === $('#form_pwd [name="oldPwd"]').val()) {
                    return '原密码和新密码不能一致';

                }
            },
            repwd: function(value) {
                if (value !== $('#form_pwd [name="newPwd"]').val()) {
                    return '确认密码和新密码不一致';

                }
            }

        })
        //重置密码
        //给表单绑定一个提交事件
    $('#form_pwd').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('修改密码失败');
                }
                // 重置表单
                $('.layui-form')[0].reset()
                layui.layer.msg('修改密码成功，请重新登录');
                window.parent.location.href = '/login.html'

            }
        })

    })

})