(function() {
    //注册点击事件
    $(".go_reg").on("click", function() {
        $(".login_box").hide();
        $(".reg_box").show();
    });
    $(".go_login").on("click", function() {
        $(".login_box").show();
        $(".reg_box").hide();
    });
    var form = layui.form
        // 自定义校验规则
    form.verify({
        pwd: [
            // 正则表达式，/S表示非空格
            /^[\S]{6,12}$/
            // 输入密码错误时的提示信息
            , '密码必须6到12位，且不能出现空格'
        ],
        // value：表单的值
        repwd: function(value) {
            // 后代选择器后面有空格
            var pwd = $(".reg_box [name=pwd]").val();
            if (pwd !== value) {
                return "两次密码不一致，请重新输入"
            }


        }
    });

    // 监听登录表单的提交事件
    $('.form_login').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/login',
            data: {
                username: $('.login_box [name="username"]').val(),
                password: $('.login_box [name="pwd"]').val()
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('登录失败');
                }
                layui.layer.msg('登录成功');
                // 将登录成功得到的 token 字符串，保存到 localStorage 中
                localStorage.setItem('token', res.token)
                    // 跳转到后台页面
                location.href = "/index.html"


            }

        })
    });

    // 监听注册表单的提交事件
    $('.form_reg').submit(function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url: '/api/reguser',
            data: {
                username: $('.form_reg [name="username"]').val(),
                password: $('.form_reg [name="pwd"]').val()

            },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg(res.message);
                }
                layui.layer.msg("注册成功,请登录");
                $(".go_login").click();
                // console.log();

            }

        })
    })


})();