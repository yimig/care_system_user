<template>
  <div id="register_page" class="h-full flex justify-center items-center">
    <div id="register" class="flex flex-col text-white rounded-xl">
      <div class="row mt-4">
        <div class="row_text">用户名：</div>
        <el-input v-model="uname" placeholder="请输入内容" class="row_input_text"></el-input>
      </div>
      <div class="row">
        <div class="row_text">密码：</div>
        <el-input v-model="password" placeholder="请输入内容" class="row_input_text"></el-input>
      </div>
      <div class="row">
        <div class="row_text">真实姓名：</div>
        <el-input v-model="nname" placeholder="请输入内容" class="row_input_text"></el-input>
      </div>
      <div class="row">
        <div class="row_text">电话：</div>
        <el-input v-model="phone" placeholder="请输入内容" class="row_input_text"></el-input>
      </div>
      <div class="row">
        <div class="row_text">性别：</div>
        <el-radio-group v-model="gender" class="radio_group">
          <el-radio :label="1" class="radio">男</el-radio>
          <el-radio :label="0" class="radio">女</el-radio>
        </el-radio-group>
      </div>
      <div class="row">
        <div class="row_text">生日：</div>
        <el-date-picker
            v-model="birthday"
            type="date"
            placeholder="选择日期" class="row_input_text">
        </el-date-picker>
      </div>
      <div class="row">
        <div class="row_text">身高：</div>
        <el-input-number v-model="height" :min="1" :max="300"></el-input-number>
        <div class="suffix">cm</div>
      </div>
      <div class="row">
        <div class="row_text">体重：</div>
        <el-input-number v-model="weight" :min="1" :max="300"></el-input-number>
        <div class="suffix">kg</div>
      </div>
      <div class="row">
        <div class="row_text text-sm" id="long_label">是否过敏体质：</div>
        <el-radio-group v-model="isAllergic" class="radio_group">
          <el-radio :label="1" class="radio">是</el-radio>
          <el-radio :label="0" class="radio">否</el-radio>
        </el-radio-group>
      </div>
      <el-button type="primary" class="mb-4 mx-4" @click="goRegister">提交</el-button>
    </div>
  </div>
</template>

<script>
import axios from "_axios@0.21.1@axios";
export default {
  name: "RegisterPage",
  data(){
    return{
      uname:'',
      password:'',
      nname:'',
      gender:'',
      birthday:'',
      height:170,
      weight:60,
      isAllergic:'',
      phone:''
    }
  },
  methods:{
    goRegister(){
      var __this=this;
      axios.post('http://192.168.50.237:3000/register',{
        uname:this.uname,
        password:this.password,
        nname:this.nname,
        gender:this.gender,
        birthday:this.birthday,
        height:this.height,
        weight:this.weight,
        allergic:this.isAllergic,
        phone:this.phone
      })
          .then(function (response) {
            if(response.data.uid>0){
              alert("注册成功！");
              __this.$emit("register_success",response.data.uid)
            }
          })
          .catch(function (error) {
            console.log(error)
          })
    }
  }
}
</script>

<style scoped>
#register_page{
  background: url('res/img/register.jpg') no-repeat center center;
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
.radio_group{
  line-height: 45px;
}
.suffix{
  line-height: 45px;
}
.radio{
  @apply text-white;
}
#register{
  background: rgba(91,162,255,0.6);
}
#long_label{
  @apply w-5/12;
}
</style>