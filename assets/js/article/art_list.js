$(function() {
    var laypage = layui.laypage;
    //定义一个查询参数的对象，将来请求数据时，
    //需要将请求参数对象提交的服务器
    var q = {
        pagenum: 1, //页码值
        pagesize: 3, //每页显示多少条数据
        cate_id: "", //文章分类的 Id
        state: "" //文章的状态

    }
    initList();
    getInitCate()
        //请求文章列表数据，并渲染数据
    function initList() {
        $.ajax({
            type: "GET",
            url: "/my/article/list",
            data: q,
            success: function(res) {
                var htmlStr = template("getList", res);
                $('tbody').html(htmlStr);
                // 在获取列表数据之后，渲染页码
                renderPage(res.total);

            }
        });

    }


    //过滤时间
    template.defaults.imports.DateFormate = function(date) {
        var dt = new Date(date);
        var y = dt.getFullYear();
        var m = buLing(dt.getMonth() + 1);
        var d = buLing(dt.getDay());

        var hh = buLing(dt.getHours());
        var mm = buLing(dt.getMinutes());
        var ss = buLing(dt.getSeconds());

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss;

    }

    //补零
    function buLing(n) {
        return n < 10 ? '0' + n : n;
    }

    //获取文章分类数据,渲染select框
    function getInitCate() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            success: function(res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取文章分类数据失败');
                }
                var htmlStr = template('getCate', res);
                $('#select_cate').html(htmlStr);
                // 让layui重新渲染
                layui.form.render()

            }
        });
    }
    //给form表单中的筛选按钮添加提交事件
    $('#form_select').submit(function(e) {
        e.preventDefault();
        // 获取两个选择下拉单中的内容
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        q.cate_id = cate_id;
        q.state = state;
        initList();
    })

    //渲染分页
    function renderPage(total) {
        laypage.render({
            elem: 'page', //注意，这里的 page 是 ID，不用加 # 号 
            count: total, //数据总数，从服务端得到
            limit: q.pagesize, //页面显示的条目数
            curr: q.pagenum, //默认显示的页码
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10], //每页条数的选择项
            //当分页被切换时触发，函数返回两个参数：obj(当前分页的所有选项值)
            //first（是否首次，一般用于初始加载的判断）
            //当点击页码时，会触发jump事件，首次加载页面时，也会触发jump事件
            jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：curr,limit
                // console.log(obj);
                // count: 4   数据总数目
                // curr: 1   得到当前页，以便向服务端请求对应页的数据。
                // elem: "page"
                // groups: 5
                // index: 1
                // jump: ƒ (obj, first)
                // layout: (3) ["prev", "page", "next"]
                // limit: 3    得到每页显示的条数
                // limits: (5) [10, 20, 30, 40, 50]
                // next: "&#x4E0B;&#x4E00;&#x9875;"
                // pages: 2
                // prev: "&#x4E0A;&#x4E00;&#x9875;"

                // 把最新的页码值，赋值到 q 这个查询参数对象中
                q.pagenum = obj.curr
                    //把页面显示的条目数，赋值到 q 这个查询参数对象中
                q.pagesize = obj.limit
                    //当点击页码时，first值为undefined，首次加载页面时，first值为true
                if (!first) {
                    initList();
                }
            }
        });
    }

    //给删除按钮添加点击事件，并根据自定义属性删除数据
    $('tbody').on('click', '.delList', function() {
        var id = $(this).attr('data-id');
        // 判断当前页面删除按钮的个数
        var length = $('.delList').length
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！');
                    // 当length=1删除后，表格里没有数据于是把页码值减一并赋值给页码值
                    if (length == 1) {
                        q.pagenum = q.pagenum == 1 ? q.pagenum : q.pagenum - 1;

                    }
                    initList();
                }
            })

            layer.close(index)
        })

    })



})