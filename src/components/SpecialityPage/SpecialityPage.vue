<template>
  <div class="flex-row m-6 overflow-y-auto h-5/6">
    <h1 class="text-5xl text-blue">{{speciality.name}}</h1>
    <div class="my-4">{{speciality.detail}}</div>
    <div class="justify-self-stretch bg-blue text-white rounded-xl"><i class="el-icon-s-management mx-2"></i>专家名片</div>
    <div v-for="dr in speciality.doctors" class="my-8 mx-4 border border-primary rounded-xl">
      <h2 class="text-2xl text-blue mt-4 ml-4"><i class="el-icon-user-solid mr-1"></i>{{dr.name}}</h2>
      <div class="m-4">{{dr.detail}}</div>
      <el-button type="primary" icon="el-icon-plus" :class="'mb-4 ml-4 id_'+dr.id" @click="btn_selected">立即挂号</el-button>
    </div>
    <el-dialog
        title="挂号"
        :visible.sync="dialogVisible"
        width="90%">
      <span>请简单描述一下您的病情：</span>
      <textarea id="detail" class="w-full bg-blue-light rounded-md my-4" v-model="msg"></textarea>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取消</el-button>
    <el-button type="primary" @click="goRegister">提交</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "SpecialityPage",
  props:['speciality'],
  data(){
    return{
      dialogVisible: false,
      msg:'',
      sid:''
    }
  },
  methods:{
    btn_selected(arg){
      let node = arg.target;
      if(arg.target.nodeName.toLowerCase() != 'button'){
        node=arg.target.parentNode;
      }
      this.$data.sid=node.className.split(' ')[4].substring(3);
      this.$data.dialogVisible=true;
    },
    goRegister(arg){
      this.$emit("submit",this.msg,this.sid);
      this.$data.dialogVisible=false;
      this.$data.msg='';
    }
  }
}
</script>

<style scoped>

</style>