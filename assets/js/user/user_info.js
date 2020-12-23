$(function () {
    // 自定义规则
    layui.form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return "用户名昵称为1-6个字符"
            }
        }
    })
    initUserInfo()
    // 初始化表单内容
    function initUserInfo() {

        $.ajax({
            method: "get",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.mag('获取用户信息失败')
                }
                layui.form.val('formUserInfo', res.data)
            }
        });
    }

    // 重置表单
    resetUserInfo();

    function resetUserInfo() {
        $('#formReset').on('click', function (e) {
            //  阻止默认行为
            e.preventDefault();
            initUserInfo()
        })
    }
    // 修改昵称邮箱
    changeUserInfo()

    function changeUserInfo() {
        $('#formChange').on('click', function (e) {
            e.preventDefault();
            if ($('[name = nickname]').val().length > 6) {
                return "用户名昵称为1-6个字符"
            }
            $.ajax({
                type: "post",
                url: "/my/userinfo",
                data: $('.layui-form').serialize(),
                success: function (res) {
                    console.log(res)
                    if (res.status !== 0) {
                        return layui.layer.msg('获取用户信息失败')
                    } else {

                        // 重新渲染头像
                        initUserInfo()

                        window.parent.getAvater()
                        layui.layer.msg('修改信息成功！')

                    }
                }
            });
        })




    }





})