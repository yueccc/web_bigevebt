$(function () {
    var vayer = layui.vayer;

    function intiArticle() {
        $.get("/my/article/cates",
            function (res) {
                var str = template('tem_mob', res)

                // 渲染数据
                $('tbody').html(str)
            }
        );
    }
    intiArticle();
    // Add 添加评论功能
    var indexAdd = null;
    $('#addArticle').click(function (e) {
        e.preventDefault();
        indexAdd = layer.open({
            type: 1,
            title: '添加文章',
            area: ['500px', '250px'],
            content: $('#addMask').html(),
        });
    });

    // 发起ajax，实现添加功能
    $('body').on('submit', '#addMask_form', function (e) {
        e.preventDefault()
        $.post("/my/article/addcates",
            data = $('#addMask_form').serialize(),
            function (res) {
                if (res.status !== 0) {
                    return layer.msg('添加文章失败!')
                }
                layer.msg('添加文章成功!')
                layer.close(indexAdd);
                // 刷新
                intiArticle();
            }
        );
    })

    // 点击编辑 弹出修改层
    var indexEtid = null;
    $('tbody').on('click', '#addEtid', function (e) {
        e.preventDefault()
        indexEtid = layer.open({
            type: 1,
            title: '修改文章',
            area: ['500px', '250px'],
            content: $('#etidMask').html(),
        });
        // 根据当前点击元素id自动填充
        var id = $(this).attr('data-id');
        $.get("/my/article/cates/" + id, data = id,
            function (res) {
                // 自动填充表单
                layui.form.val('etidMask_form', res.data)
            }
        );
    })

    // 监听提交 更新页面
    $('body').on('submit', '#etidMask_form', function (e) {
        e.preventDefault();
        $.post("/my/article/updatecate",
            data = $('#etidMask_form').serialize(),
            function (res) {
                if (res.status !== 0) {
                    return layer.msg('修改失败！')
                }
                layer.close(indexEtid);
                intiArticle();
                layer.msg('修改成功！')
            }
        );
    });

    // 实现删除功能
    $('body').on('click', '#delArt', function (e) {
        e.preventDefault();
        var id = $(this).prev().attr('data-id');
        layer.confirm('确认删除?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            $.get("/my/article/deletecate/" + id,
                function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败！')
                    }
                    layer.close(index);
                    layer.msg('删除成功！')
                    intiArticle();

                }
            );

        });


    });

})