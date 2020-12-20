$.ajaxPrefilter(function (options) {
    // 每次通过jQuery发起ajax请求之前，都会调用这个函数
    options.url = 'http://ajax.frontend.itheima.net' + options.url
})