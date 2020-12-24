$(function () {
    var layer = layui.layer
    // 动态生成下拉选项
    initSelect()

    function initSelect() {
        $.get("/my/article/cates",
            function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取文章类别失败!')
                }
                var str = template('tpl_select', res)
                $('#select').html(str)
                layui.form.render()
            }
        );
    }

    // 初始化富文本编辑器
    initEditor()

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    // 选择文件功能
    // 1模拟点击选择文件
    $('#btn_chooseImg').on('click', function (e) {
        $('.cover-right [type = file]').click()
    })
    // 2监控file 的 change事件 选择文件
    $('.cover-right [type = file]').on('change', function (e) {
        e.preventDefault();
        //  e.target.files[0] 得到选择的文件
        var files = e.target.files
        console.log(files)
        // 判断是否选择的文件
        if (files.length === 0) {
            return layer.msg('请选择文件！')
        }
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(files[0])
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    var art_state = '已发布';
    $("#btnSave1").on('click', function (e) {
        art_state = '已发布';
    })
    $("#btnSave2").on('click', function (e) {
        art_state = '草稿';
    })
    $('#form_pub').on('submit', function (e) {
        e.preventDefault()
        var fd = new FormData($('#form_pub')[0])
        fd.append('state', art_state)



        // 4. 将封面裁剪过后的图片，输出为一个文件对象
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                for (var k of fd) {
                    console.log(k)
                }
                // 6. 发起 ajax 数据请求
                $.ajax({
                    type: "post",
                    url: "/my/article/add",
                    data: fd,
                    contentType: false,
                    processData: false,
                    success: function (res) {
                        if (res.status !== 0) {
                            layer.msg('发表文章失败！')
                        }
                        layer.msg('发表文章成功！')
                        console.log(window.parent)
                        location.href = './../../../article/art_list.html'
                    }
                })
            })

    })
})