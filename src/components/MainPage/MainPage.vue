<template>
<div id="main" class="h-full flex flex-col justify-center items-center">
  <div id="main_title">
    <h1 class="text-bluelight text-4xl text-center my-20 mx-2">欢迎使用A医院智能分诊系统</h1>
    <div class="flex justify-center w-full mb-10">
      <el-button type="primary" @click="login_action(0)">登录</el-button>
      <el-button @click="login_action(1)">注册</el-button>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: "MainPage",
  methods:{
    login_action(arg){
      this.$emit('login_action',arg);
    }
  }
}
</script>

<style scoped>
#main{
  background: url('res/img/main.jpg') no-repeat center center;
  background-size: cover;
}

#main_title{
  background: rgba(91,162,255,0.6);
}
</style>