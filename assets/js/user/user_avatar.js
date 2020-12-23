 $(function () {
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

     $('#chooseImage').on('click', function (e) {
         $('#file').click()

     })

     //  为file绑定change事件   监听文件上传
     $('#file').on('change', function (e) {
         var file = e.target.files[0]
         //  判断是否上传了文件
         if (file.length === 0) {
             return layui.layer.msg('未选择文件！')
         }
         var newImgURL = URL.createObjectURL(file)
         $image
             .cropper('destroy') // 销毁旧的裁剪区域
             .attr('src', newImgURL) // 重新设置图片路径
             .cropper(options) // 重新初始化裁剪区域

     })
     // 发起ajsx请求 上传头像
     $('#uploadImage').on('click', function () {
         var dataURL = $image
             .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                 width: 100,
                 height: 100
             })
             .toDataURL('image/png'); // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
         // 发起ajsx请求 上传头像
         $.post("/my/update/avatar", data = {
                 avatar: dataURL
             },
             function (res) {
                 console.log(res)
                 if (res.status !== 0) {
                     return layui.layer.msg('更新头像失败！')
                 }
                 layui.layer.msg('更新头像成功！')
                 //  调用渲染头像函数
                 window.parent.getAvater()
             }
         );

     })




 })