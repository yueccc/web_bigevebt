$(function () {
    // 切换显示
    $('#link_reg').on('click', function () {
        $('.loginbox').hide();
        $('.regbox').show();
    })
    $('#link_login').on('click', function () {
        $('.regbox').hide();
        $('.loginbox').show();
    })

    // 自定义表单验证
    var form = layui.form;
    var layer = layui.layer;
    form.verify({
        // 密码验证
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        repwd: function (value) {
            var pwd = $('.regbox [name = password]').val()
            if (value !== pwd) {
                return "密码输入不一致!"
            }
        }
    })
    // 监听注册事件
    $('#form_reg').on('submit', function (e) {
        // 阻止跳转默认行为
        e.preventDefault();
        // 发起post请求
        let data = {
            username: $('#form_reg [name = username]').val(),
            password: $('#form_reg [name = password]').val(),
        }
        $.post("/api/reguser", data,
            function (res) {
                console.log(res)
                if (res.status != 0) {
                    layer.msg(res.message);
                } else {
                    layer.msg('注册成功');
                    // 点击去登录
                    $('#link_login').click()
                }
            }
        );
    })
    // 监听登录事件
    $('#form_login').on('submit', function (e) {
        // 阻止跳转默认行为
        e.preventDefault();
        // 发起post请求
        let data = {
            username: $('#form_login [name = username]').val(),
            password: $('#form_login [name = password]').val(),
        }
        $.post("/api/login", data,
            function (res) {
                console.log(res)
                if (res.status != 0) {
                    // 提示失败信息
                    layer.msg(res.message);
                } else {
                    // 保存到本地存储
                    localStorage.setItem('token', res.token)
                    // 跳转首页
                    location.href = '../../index.html'
                }
            }
        );
    })











})