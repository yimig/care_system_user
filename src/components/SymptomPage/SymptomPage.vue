<template>
<div class="flex-row m-6 overflow-y-auto h-5/6">
  <h1 class="text-5xl text-blue">{{title}}</h1>
  <div v-for="sy in symptom" class="my-8 mx-4">
    <h2 class="text-2xl text-blue">{{sy.speciality}}</h2>
    <div class="mx-1 my-4"><i class="el-icon-info mr-1"></i>{{sy.detail}}</div>
    <el-button type="primary" icon="el-icon-arrow-right" @click="toSpeciality" :class="'id_'+sy.spid">前往科室</el-button>
  </div>
</div>
</template>

<script>
export default {
  name: "SymptomPage",
  props:['symptom','title'],
  methods:{
    toSpeciality(arg){
      let node = arg.target;
      if(arg.target.nodeName.toLowerCase() != 'button'){
        node=arg.target.parentNode;
      }
      this.$emit("toSpeciality",node.className.split(' ')[2].substring(3))
    }
  }
}
</script>

<style scoped>
</style>