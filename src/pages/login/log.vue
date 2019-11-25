<template>
    <div>
        <div class="head"><i class="close">*</i></div>
        <div class="reg-con">
            <p class="phone-p">
                <label for="">手机号</label>
                <input type="text" placeholder="请输入手机号" v-model="phone" maxlength="13">
            </p>
            <p class="phone-p">
                <label for="">密码</label>
                <input type="password" placeholder="请输入密码" v-model="pswd" minlength="6" maxlength="16">
            </p>
            <p>
                <button class="phone-btn bg"   @click="loginClick">登录</button>
            </p>
            <p class="last-p">
                <span class="left-span" @click="rePswd">找回密码</span>
                <span class="right-span" @click="regist">注册</span>
            </p>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    import {MessageBox} from 'mint-ui';

    export default {
        data() {
            return {
                phone: '',
                pswd:'',
                isActive:false,
                isClick:true,//按钮是否可以点击
            }
        },
        methods: {
            //点击登录
            loginClick(){
                if (this.phone == '') {
                    Toast({
                        message: '请输入手机号',
                        position: 'middle',
                        duration: 1500
                    });
                    return false
                }
                if (this.pswd == '') {
                    Toast({
                        message: '请输入密码',
                        position: 'middle',
                        duration: 1500
                    });
                    return false
                }
                var val = this.phone.split('-');
                var str = '';
                val.forEach((item) => str += item)
                if (config.regPhone.test(str) == false) {
                    Toast({
                        message: '请输入正确的手机号',
                        position: 'middle',
                        duration: 1500
                    });
                    return false
                }
                if (config.regPswd.test(this.pswd.trim()) == false) {
                    Toast({
                        message: '密码格式错误',
                        position: 'middle',
                        duration: 1500
                    });
                    return false
                }
                this.regPost(str)
            },
            //发送请求
            regPost(str){
                var params = {
                    phone:str,
                    pswd:this.pswd.trim()
                }
                config.request('post','/api/user/login',params).then(res => {
                    var data = res.data;
                    if (data.code == config.successCode) {
                        this.$router.push({path:'/'});
                    }
                }).catch(err => {
                    Toast({
                        message: '网络出错了哦！(；′⌒`)',
                        position: 'middle',
                        duration: 1500
                    });
                })
            },
            //找回密码
            rePswd(){
                this.$router.push({path:'/rePswd',query:{phone:this.phone}});
            },
            //注册
            regist(){
                this.$router.push({path:'/regist'});
            },
        },
        watch:{
            // 通过watch来设置分隔符
            phone(newValue, oldValue) {
                if (newValue.length > oldValue.length) { // 文本框中输入
                    if (newValue.length === 3 || newValue.length === 8) {
                        this.phone += '-'
                    }
                }
            }
        }

    }
</script>

<style scoped>
    .reg-con {
        width: 80%;
        margin: 0 auto;
        margin-top: 3rem;
        font-size: 1rem;
        color: #000;
        font-weight: bold;
    }
    .head{
        height: 3.4rem;
        line-height: 3.4rem;
        padding-top: 1.4rem;
        overflow: hidden;
        position: relative;
    }
    .close{
        font-size: 2rem;
        float: right;
        position: absolute;
        right: 2rem;

    }
    .head-tit{
        font-size: 1rem !important;
    }
    .head-back{
        font-size: 0.8rem !important;
    }
    .reg-con .phone-p {
        padding-bottom: 1rem;
        border-bottom: 0.08rem solid #eee;
        font-size: 0.8rem;
        overflow: hidden;
        height: 2rem;
        line-height: 2rem;
        margin-bottom: 1rem;
    }

    .phone-p label {
        color: #000;
        float: left;
        text-align: left;
        font-size: 0.8rem;
        width: 3rem;
    }

    .phone-p input {
        border: none;
        color: #666;
        float: left;
        margin-left: 1.3rem;
        font-size: 0.8rem;
        height: 100%;
    }

    input::-webkit-input-placeholder {
        color: #ddd;
    }
    .phone-btn {
        outline: none;
        border: none;
        display: block;
        width: 100%;
        background: #eee;
        color: #bbb;
        margin-top: 2.5rem;
        height: 3rem;
        -webkit-border-radius: .7rem .7rem;
        -moz-border-radius: .7rem .7rem;
        border-radius: .7rem .7rem;
        cursor: pointer;
    }
    .bg{
        background:#F9D34C !important;
        color: #000;
    }
    .last-p{
        margin-top: 1.5rem;
        overflow: hidden;
        font-size: .8rem;
        color: #aaa;
    }
    .left-span{
        float: left;
    }
    .right-span{
        float: right;
    }
</style>