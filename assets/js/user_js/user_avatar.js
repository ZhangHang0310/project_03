$(function() {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
        // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    //给chooseBtn注册点击事件,影响file点击事件
    $('#chooseBtn').on('click', function() {
        $('#file').click();
    })

    // 为文件选择框绑定 change 事件
    $('#file').on('change', function(e) {
        //获取选择的文件
        var files = e.target.files;
        // console.log(e);
        if (files.length == 0) {
            return layui.layer.msg('请选择照片');
        }
        //拿到用户选择的文件
        var file = e.target.files[0];
        // 2. 将文件，转化为路径
        var imgurl = URL.createObjectURL(file)
            //3.先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgurl) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域


    })


    //将裁剪后的头像上传到服务器
    $('#queding').on('click', function() {
        // 将裁剪后的图片，输出为 base64 格式的字符串
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串

        //发送ajax请求
        $.ajax({
            type: 'POST',
            url: '/my/update/avatar',
            data: {
                avatar: dataURL
            },
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取头像失败');
                }
                layui.layer.msg('获取头像成功');
                window.parent.getUserInfo();
            }
        })
    })

})