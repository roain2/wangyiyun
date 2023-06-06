<template>
    <div class="login">
      <div class="loginTop">欢迎登录</div>
      <div class="loginContent">
        <input
          type="text"
          name="phone"
          class="phone"
          v-model="phone"
          placeholder="请输入手机号码"
        />
        <input
          type="password"
          name="passworld"
          class="passworld"
          v-model="password"
          placeholder="请输入密码"
        />
        <button class="btn" @click="login">登录</button>
      </div>
    </div>
  </template>
<script>
export default{
  data(){
    return{
      phone:'',
      password:''
    }
  },
  methods:{
    login:function(){
      this.$store.dispatch('getlogin',{phone:this.phone,password:this.password})
    }
  }
}
</script>
  <style lang="less" scoped>
  .login {
    width: 100%;
    height: 16.34rem;
    padding: 0.2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: rgb(248, 97, 97);
    .loginTop {
      margin-top: 1rem;
      font-size: 1rem;
      color: #fff;
    }
    .loginContent {
      width: 100%;
      height: 300px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      margin-top: 2rem;
      .phone,
      .passworld {
        width: 5rem;
        height: 1rem;
        border: 0.02rem solid #999;
      }
      .btn{
          width: 2rem;
          height: .6rem;
      }
    }
  }
  </style>