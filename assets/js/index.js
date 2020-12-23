// $(function () {
    // 进入首页发起Ajax请求 获得数据
    function getAvater() {
        $.ajax({
            method: "get",
            url: "/my/userinfo",
            success: function (res) {
                if (res.status !== 0) {
                    layui.layer.msg('获取用户数据失败')
                } else {
                    var username = res.data.nickname || res.data.username
                    // 生成欢迎xxx
                    $('.welcome').html('欢迎&nbsp ' + username)
                    setAvater(res.data, username)
                }
            }
        });
    }
    getAvater()

    // 退出功能
    $('#btnLogout').on('click', function () {
        // 清空本地储存  跳转login
        layui.layer.confirm('是否确认退出?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            //do something
            localStorage.removeItem('token')
            location.href = './../../login.html'
            layer.close(index);
        });

    });





// })
// 渲染头像
function setAvater(user, username) {
    var pic = user.user_pic;
    if (pic == null) {
        var first = username[0].toUpperCase()
        $('.text-avater').html(first).show();
        $('.layui-nav-img').hide();
    } else {
        $('.text-avater').hide();
        $('.layui-nav-img').attr('src', pic).show();
    }
}