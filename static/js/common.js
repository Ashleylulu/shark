/*
* 公用方法
* */
var config = {};
config.pagesize = 15; //页容量
config.pagenumber = 1; //页码
config.successCode = '000'; //请求成功
config.regPhone = /^1[3456789]\d{9}$/;//校验手机号
config.regPswd = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;//校验密码 6-16位字母数字混合
config.request = (request,url,data) => {
    const promise = new Promise((resolve,reject) => {
        axios({
            method: request,
            url: url,
            data: data,
        }).then((data) => {
            resolve(data);
        }).catch((err) => {
            reject(err);
        });
    })
    return promise
}
