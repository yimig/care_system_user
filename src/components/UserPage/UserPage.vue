<template>
  <div class="h-full flex items-center">
    <div class="flex flex-col w-full mx-4">
      <div class="self-center info_avatar h-20 w-20 bg-white border-2 border-primary flex justify-center items-end select-none">
        <img v-if="avatar" :src="avatar" class="h-full w-full border-none object-cover select-none">
        <i v-else class="el-icon-user text-6xl text-blue"></i>
      </div>
      <div class="row mt-4">
        <div class="row_text">用户名：</div>
        <div class="row_content">{{uname}}</div>
      </div>
      <div class="row">
        <div class="row_text">真实姓名：</div>
        <div class="row_content">{{nname}}</div>
      </div>
      <div class="row">
        <div class="row_text">电话：</div>
        <div class="row_content">{{phone}}</div>
      </div>
      <div class="row">
        <div class="row_text">性别：</div>
        <div class="row_content">{{gender==1?'男':'女'}}</div>
      </div>
      <div class="row">
        <div class="row_text">生日：</div>
        <div class="row_content">{{birthday}}</div>
      </div>
      <div class="row">
        <div class="row_text">身高：</div>
        <div class="row_content">{{height+'cm'}}</div>
      </div>
      <div class="row">
        <div class="row_text">体重：</div>
        <div class="row_content">{{weight+'kg'}}</div>
      </div>
      <div class="row">
        <div class="row_text" id="long_label">是否过敏体质：</div>
        <div class="row_content">{{isAllergic==1?'是':'否'}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserPage",
  data(){
    return{
      avatar:'',
      uname:'',
      nname:'',
      gender:'',
      birthday:'',
      height:170,
      weight:60,
      isAllergic:'',
      phone:'',
    }
  }
}
</script>

<style scoped>
.row{
  @apply flex w-11/12 ml-2;
}
.row_text{
  @apply w-4/12;
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