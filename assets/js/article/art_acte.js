$(function() {
    var layer = layui.layer
    getArticleList();
    //获取文章列表，并渲染
    function getArticleList() {
        $.ajax({
            type: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                // res打印不出来
                // console.log(res);
                if (res.status !== 0) {
                    return layui.layer.msg('获取列表失败');
                }
                var strhtml = template('tpl_table', res);
                $('tbody').html(strhtml)

            }

        })

    }

    //给添加列表设置点击事件
    var indexAdd;
    $('#btnAdd').on('click', function() {
        indexAdd = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '添加文章分类',
            content: $('#dialogAdd').html()

        })

    })


    //实现添加文章分类的功能
    //事件委托,因为弹出层是点击按钮生成的
    $('body').on('submit', '#dialogAdd_form', function(e) {
        e.preventDefault();
        // 发起ajax请求,提交文本框里的数据
        $.ajax({
            type: 'POST',
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('添加文章分类失败');
                }
                getArticleList();
                layer.close(indexAdd);
                layui.layer.msg('添加文章分类成功');


            }

        })

    })

    //给编辑设置点击事件
    var indexEdit;
    $('tbody').on('click', '#btn_edit', function() {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '250px'],
            title: '修改文章分类',
            content: $('#dialogEdit').html()

        });
        // 给编辑添加自定义属性，然后获取数据值并填充到弹出框中
        var id = $(this).attr('data-id')
            // console.log(id);
        $.ajax({
            type: "GET",
            url: "/my/article/cates/" + id,
            success: function(res) {
                // console.log(res);
                layui.form.val('lay_edit', res.data)

            }
        });

    })


    //实现编辑文章分类的功能，根据 Id 获取文章分类数据
    //事件委托,因为弹出层是点击按钮生成的
    $('body').on('submit', '#dialogEdit_form', function(e) {
        e.preventDefault();
        // 发起ajax请求,提交文本框里的数据
        $.ajax({
            type: 'POST',
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('修改文章分类失败');
                }
                getArticleList();
                layer.close(indexEdit);
                layui.layer.msg('修改文章分类成功');


            }

        })

    })

    //实现删除功能
    $('tbody').on('click', '#del', function() {
        var id = $(this).attr('data-id');
        console.log(id);
        layer.confirm('确认删除吗?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                type: 'GET',
                url: "/my/article/deletecate/" + id,
                success: function(res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layui.layer.msg('删除文章分类失败');
                    }
                    getArticleList();
                    layer.close(index);
                    layui.layer.msg('删除文章分类成功');
                }
            })
        });
    })
})