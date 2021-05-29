<template>
  <div id="login_page" class="h-full flex justify-center items-center">
    <div id="login" class="flex flex-col text-white rounded-xl">
      <div class="row mt-4">
        <div class="row_text">用户名：</div>
        <el-input v-model="uname" placeholder="请输入内容" class="row_input_text"></el-input>
      </div>
      <div class="row">
        <div class="row_text">密码：</div>
        <el-input v-model="password" placeholder="请输入内容" class="row_input_text"></el-input>
      </div>
      <el-button type="primary" class="my-4 mx-4" @click="goLogin">提交</el-button>
    </div>
  </div>
</template>

<script>
import axios from "_axios@0.21.1@axios";
export default {
  name: "LoginPage",
  data(){
    return{
      uname:'',
      password:''
    }
  },
  methods:{
    goLogin(){
      var __this=this;
      axios.post('http://192.168.50.237:3000/login',{uname:this.uname,password:this.password})
          .then(function (response) {
            if(response.data.uid>0){
              __this.$emit("login_success",response.data.uid);
            }
            else{
              alert("登陆失败")
            }
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
    }
  }
}
</script>

<style scoped>
#login{
  background: rgba(91,162,255,0.6);
}
#login_page{
  background: url('res/img/login.jpg') no-repeat center center;
  background-size: cover;
}
.row{
  @apply flex w-11/12 ml-2;
}
.row_text{
  @apply w-4/12;
  line-height: 45px;
}
.row_input_text{
  @apply w-8/12
}
</style>