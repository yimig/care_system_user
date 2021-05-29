<template>
  <div class="h-full flex items-center">
    <div class="flex flex-col w-full mx-4">
      <div class="self-center info_avatar h-20 w-20 bg-white border-2 border-primary flex justify-center items-end select-none">
        <img v-if="info.avatar" :src="info.avatar" class="h-full w-full border-none object-cover select-none">
        <i v-else class="el-icon-user text-6xl text-blue"></i>
      </div>
      <div class="row mt-4">
        <div class="row_text">用户名：</div>
        <div class="row_content">{{info.uname}}</div>
      </div>
      <div class="row">
        <div class="row_text">真实姓名：</div>
        <div class="row_content">{{info.nname}}</div>
      </div>
      <div class="row">
        <div class="row_text">电话：</div>
        <div class="row_content">{{info.phone}}</div>
      </div>
      <div class="row">
        <div class="row_text">性别：</div>
        <div class="row_content">{{info.gender==1?'男':'女'}}</div>
      </div>
      <div class="row">
        <div class="row_text">生日：</div>
        <div class="row_content">{{info.birthday==undefined?info.birthday.substring(0,10):''}}</div>
      </div>
      <div class="row">
        <div class="row_text">身高：</div>
        <div class="row_content">{{info.height+'cm'}}</div>
      </div>
      <div class="row">
        <div class="row_text">体重：</div>
        <div class="row_content">{{info.weight+'kg'}}</div>
      </div>
      <div class="row">
        <div class="row_text" id="long_label">过敏体质：</div>
        <div class="row_content">{{info.isAllergic==1?'是':'否'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "_axios@0.21.1@axios";
export default {
  name: "UserPage",
  props:['uname','info'],
  data(){
    return{
    }
  },
  watch:{
  },
  methods:{

  }
}
</script>

<style scoped>
.row{
  @apply flex w-11/12 ml-2;
}
.row_text{
  line-height: 45px;
}
.row_content{
  line-height: 45px;
}
#long_label{
  @apply w-5/12;
}
.info_avatar{
  border-radius: 5rem;
}
</style>