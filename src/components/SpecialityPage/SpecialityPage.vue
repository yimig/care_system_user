<template>
  <div class="flex-row m-6 overflow-y-auto h-5/6">
    <h1 class="text-5xl text-blue">{{speciality.name}}</h1>
    <div class="my-4">{{speciality.detail}}</div>
    <div class="justify-self-stretch bg-blue text-white rounded-xl"><i class="el-icon-s-management mx-2"></i>专家名片</div>
    <div v-for="dr in speciality.doctors" class="my-8 mx-4 border border-primary rounded-xl">
      <h2 class="text-2xl text-blue mt-4 ml-4"><i class="el-icon-user-solid mr-1"></i>{{dr.name}}</h2>
      <div class="m-4">{{dr.detail}}</div>
      <el-button type="primary" icon="el-icon-plus" class="mb-4 ml-4">立即挂号</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpecialityPage",
  props:['speciality'],
  data(){
    return{
    }
  }
}
</script>

<style scoped>

</style>