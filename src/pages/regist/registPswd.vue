<template>
    <div>
        <mt-header title="注册" class="head-tit">
            <router-link to="/" slot="left">
                <mt-button icon="back" class="head-back">返回</mt-button>
            </router-link>
        </mt-header>
        <div class="reg-con">
            <p class="phone-p">
                <label for="">密码</label>
                <input type="password" placeholder="6-16位数字、字母组合" v-model="pswd" minlength="6" maxlength="16" @blur="">
                <i></i>
            </p>
            <p class="phone-p">
                <label for="">确认密码</label>
                <input type="password" placeholder="请再次输入密码" v-model="rePswd" minlength="6" maxlength="16" @blur="">
            </p>
            <p>
                <button class="phone-btn" :class="{bg:isActive}" :disabled="isClick" @click="complete">完成</button>
            </p>
        </div>
    </div>
</template>

<script>
    import {Toast} from 'mint-ui';
    export default {
        data(){
            return{
                pswd:'',
                rePswd:'',
                isClick:true,//按钮是否可以点击
                isActive:false,//样式的显示与隐藏
                phone:this.$route.query.phone,//手机号
            }
        },
        methods:{
            //点击完成
            complete(){
                if (config.regPswd.test(this.pswd.trim()) == false) {
                    Toast({
                        message: '请输入6-16位字母数字组合密码',
                        position: 'middle',
                        duration: 1500
                    });
                    return false
                }
                if (this.pswd.trim() != this.rePswd.trim()) {
                    Toast({
                        message: '两次密码不一致',
                        position: 'middle',
                        duration: 1500
                    });
                    return false
                }
                console.log(this.phone);
                var val = this.phone.split('-');
                var str = '';
                val.forEach(item => {
                    str += item
                })
                var params = {
                    phone:str,
                    pswd:this.pswd
                }
                config.request('post','/api/user/regist',params).then(res => {
                    var data = res.data;
                    if (data.code == config.successCode) {
                        console.log(data.entity);
                    }
                }).catch(err => {
                    Toast({
                        message: '网络出错了哦！(；′⌒`)',
                        position: 'middle',
                        duration: 1500
                    });
                })
            }
        },
        watch:{
            //监听确认密码是否输入来确定按钮是否启用
            rePswd(newValue,oldValue) {
                if (newValue.length > oldValue.length) {
                    if (this.pswd != '') {
                        this.isClick = false;
                        this.isActive = true;
                    }
                } else {
                    if (newValue.length == 0) {
                        this.isClick = true;
                        this.isActive = false;
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
        color: #666;
        float: left;
        text-align: left;
        display: inline-block;
        width: 3.5rem;
        vertical-align: middle;
    }

    .phone-p input {
        border: none;
        color: #666;
        float: left;
        margin-left: 1.3rem;
        font-size: .9rem;
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
        -webkit-border-radius: 6rem 6rem;
        -moz-border-radius: 6rem 6rem;
        border-radius: 6rem 6rem;
        cursor: pointer;
    }
    .bg{
        background:#F9D34C !important;
        color: #000;
    }
</style>