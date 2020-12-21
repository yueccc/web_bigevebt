$.ajaxPrefilter(function (options) {
    // 每次通过jQuery发起ajax请求之前，都会调用这个函数
    options.url = 'http://ajax.frontend.itheima.net' + options.url
    // 自动添加headers数据
    if (options.url.indexOf('/my') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }
    options.complete = function (res) {
        var errormsg = JSON.parse(res.responseText);
        if (errormsg.status == 1 && errormsg.message == '身份认证失败！') {
            // 清空loken  强行跳转到login
            localStorage.removeItem('token')
            location.href = './../../login.html'
        }
    }

})