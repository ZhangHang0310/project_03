$(function() {
    // select表单,获取文章类别
    getInitCate();
    // 初始化富文本编辑器
    initEditor();

    function getInitCate() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章类别失败');
                }
                var htmlStr = template('tel_cate', res);
                $('[name="cate_id"]').html(htmlStr);
                layui.form.render()

            }
        });
    }


    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    //给选择封面添加点击事件
    $('.btnChoose').on('click', function() {
        $('#file').click()
    })

    //监听 file 的 change 事件，获取用户选择的文件列表
    $('#file').on('change', function(e) {
        // 1.拿到用户选择的文件
        var file = e.target.files[0];
        // 2.根据选择的文件，创建一个对应的 URL 地址：
        var newImgURL = URL.createObjectURL(file);
        // 3.先销毁旧的裁剪区域，再重新设置图片路径，之后再创建新的裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })


    var state = '已发布';
    $('.btnSave2').on('click', function() {
        state = '草稿';
    });
    //基于form表单提交submit事件
    $('#form_pub').submit(function(e) {
        e.preventDefault();
        var fd = new FormData($(this)[0]);
        fd.append('state', state)
            //将裁剪后的图片，输出为文件,blob就是输出的文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                fd.append('cover_img', blob);
                newArticle(fd);
            })

    })


    // 发起Ajax请求实现发布文章的功能
    function newArticle(fd) {
        $.ajax({
            type: "post",
            url: "/my/article/add",
            data: fd,
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('发布文章失败');
                }
                layui.layer.msg('发布文章成功');
                // 发布文章成功后，跳转到文章列表页面
                location.href = '/article/art_list.html'

            }
        });
    }




})