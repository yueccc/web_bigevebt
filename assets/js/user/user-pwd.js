$(function () {
    // 重置表单
    $('#resetBtn').on('click', function (e) {
        e.preventDefault()
        $('#form')[0].reset()
    })


    // 添加密码验证规则
    layui.form.verify({

        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 原密码和新密码不一致
        newPwd: function (value) {
            if (value === $('[name = oldPwd]').val()) {
                return "新密码不能与原密码一致！"
            }

        },
        // 确认密码
        confirmPwd: function (value) {
            if (value !== $('[name = newPwd]').val()) {
                return "两次密码输入不一致！"

            }
        },

    })

    // 修改密码
    $('#rePwd').on('click', function (e) {
        e.preventDefault();
        // 判断原密码是否正确
        $.post("/my/updatepwd", $('.layui-form').serialize(),
            function (res) {
                console.log(res)
                if (res.status === 1) {
                    return layui.layer.msg(res.message)
                }
                layui.layer.msg('更新密码成功！')
                $('#form')[0].reset()
            }
        );
    })



})