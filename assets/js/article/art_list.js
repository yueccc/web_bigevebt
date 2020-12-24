$(function () {
    // 定义初始数据
    var layer = layui.layer;
    var d = {
        pagenum: 1, //页码值
        pagesize: 2, //每页多少条数据
        cate_id: '', //文章分类id
        state: '' //文章默认状态
    }
    // 时间过滤器
    template.defaults.imports.ftime = function (date) {
        var time = new Date(date);
        var year = time.getFullYear();
        var mouth = time.getMonth() + 1;
        var dates = time.getDate();
        var h = time.getHours();
        h = h < 10 ? "0" + h : h;
        var m = time.getMinutes();
        m = m < 10 ? "0" + m : m;
        var s = time.getSeconds();
        s = s < 10 ? "0" + s : s;
        return year + "-" + mouth + "-" + dates + " " + h + ":" + m + ":" + s;
    }
    // 初始化表格数据
    initTable()
    initSelect()

    function initTable() {
        $.get("/my/article/list", data = d,
            function (res) {
                if (res.status !== 0) {
                    return layer.msg('获得文章列表失败！')
                }
                var str = template('tpl-table', res)
                $('tbody').html(str)
                initPagebox(res.total)
            }
        );
    }

    // 根据数据初始化下拉列表
    function initSelect() {
        $.get("/my/article/cates",
            function (res) {
                if (res.status !== 0) {
                    return layer.msg('获得文章列表失败！')
                }
                var str = template('tpl-cate', res)
                $('[name = cate_id]').html(str)
                // 重新渲染form
                layui.form.render()
            }
        );
    }
    // 监听筛选表单 重新渲染
    $('#form_search').on('submit', function (e) {
        e.preventDefault();
        // 根据选择的下拉表单的值  更改d的数据 
        d.cate_id = +$('[name = cate_id]').val()
        d.state = $('[name = state]').val()
        // 重新发起ajax渲染页面
        initTable()
    })

    // 分页

    var laypage = layui.laypage;

    function initPagebox(total) {
        laypage.render({
            elem: 'page-box' //注意，这里的 test1 是 ID，不用加 # 号
                ,
            count: total, //数据总数，从服务端得到
            limit: d.pagesize, //页面显示多少条数据
            curr: d.pagenum, //设置默认被选中的分页
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [2, 3, 5, 10],
            jump: function (obj, first) {
                d.pagenum = obj.curr;

                // 在junp回调中，可以监听limits的触发，设置pagesize重新渲染页面
                d.pagesize = obj.limit;

                if (!first) {
                    // 判断是否为laypage.render触发的，只有点击才触发laypage.render的jump回调
                    initTable()
                }
            }
        });
    }

    // 点击删除，删除当前项

    $('body').on('click', '.del-table', function (e) {
        e.preventDefault();
        var len = $('.del-table').length;
        console.log(len)
        var id = $(this).attr('data-id');
        layer.confirm('确认删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.get("/my/article/delete/" + id,
                function (res) {
                    console.log(res)
                    if (res.status !== 0) {
                        return layer.msg('删除失败！')
                    }
                    layer.close(index);
                    layer.msg('删除成功！')
                    if (len === 1) {
                        d.pagenum = d.pagenum === 1 ? 1 : d.pagenum - 1
                    }

                    initTable()
                }
            );

        });


    });

    // 编辑功能
    $('body').on('click','.etid_table',function (e) {
        e.preventDefault()
        
    })

})