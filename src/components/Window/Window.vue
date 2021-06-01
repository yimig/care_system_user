<template>
  <div class="flex h-full w-full">
    <el-menu class="el-menu-vertical-demo relative" :collapse="isCollapse" @select="handleSelect">
      <el-menu-item index="1">
        <i class="el-icon-house"></i>
        <span slot="title">主页</span>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-search"></i>
          <span slot="title">常见病症</span>
        </template>
        <el-menu-item-group v-for="bgroup in menu_illness" :key="bgroup.body">
          <span slot="title">{{bgroup.body}}</span>
          <el-menu-item v-for="illness in bgroup.illness" :index="'2-'+illness.id">{{illness.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="el-icon-files"></i>
          <span slot="title">科室</span>
        </template>
        <el-menu-item-group v-for="sp in menu_speciality" :key="sp.name">
          <el-menu-item :index="'3-'+sp.id">{{sp.name}}</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-menu-item index="4" class="absolute bottom-0" @click="goToUserInfoPage">
        <i class="el-icon-user"></i>
        <span slot="title">个人中心</span>
      </el-menu-item>
    </el-menu>
    <div class="flex-grow">
      <MainPage v-show="page_switch==0" @login_action="login_action" :uid="uid"></MainPage>
      <SymptomPage v-show="page_switch==1" :symptom="symptom_page_item" :title="symptom_page_title" @toSpeciality="toSpeciality"></SymptomPage>
      <SpecialityPage v-show="page_switch==2" :speciality="speciality_page_item" @submit="submit"></SpecialityPage>
      <RegisterPage v-show="page_switch==3" @register_success="login_success"></RegisterPage>
      <LoginPage v-show="page_switch==4" @login_success="login_success"></LoginPage>
      <UserPage v-show="page_switch==5" :info="user_info" :key="user_info.uname"></UserPage>
    </div>
  </div>
</template>

<script>
import axios from "_axios@0.21.1@axios";
import SymptomPage from "../SymptomPage/SymptomPage.vue";
import SpecialityPage from "../SpecialityPage/SpecialityPage.vue";
import MainPage from "../MainPage/MainPage.vue";
import RegisterPage from "../RegisterPage/RegisterPage.vue";
import LoginPage from "../LoginPage/LoginPage.vue";
import UserPage from "../UserPage/UserPage.vue";
export default {
  name: "Window",
  components: {SymptomPage,SpecialityPage,MainPage,RegisterPage,LoginPage,UserPage},
  data(){
    return{
      menu_illness:[],
      menu_speciality:[],
      symptom_page_item:{},
      symptom_page_title:'',
      speciality_page_item:{},

      illness_menu_index:0,
      page_switch:0,
      isCollapse:true,
      activeIndex: '1',
      activeIndex2: '1',
      uid:"-1",
      user_info:{
        uname:'',
        birthday:''
      }
    }
  },
  methods:{
    loadIllness(){
      var __this=this;
      axios.post('/getIllness',{})
          .then(function (response) {
            if(response.data.length>0){
              for (let i = 0; i < response.data.length; i++) {
                __this.$data.menu_illness.push(response.data[i])
              }
            }
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
    },
    loadSpeciality(){
      var __this=this;
      axios.post('/getSpeciality',{})
          .then(function (response) {
            if(response.data.length>0){
              for (let i = 0; i < response.data.length; i++) {
                __this.$data.menu_speciality.push(response.data[i])
              }
            }
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
    },
    getId(key){
      return key.substring(2);
    },
    getSpeciality(id){
      for (let i = 0; i < this.menu_speciality.length; i++) {
        if(this.menu_speciality[i].id==id)return this.menu_speciality[i];
      }
    },
    goToSpecialityPage(id){
      this.$data.speciality_page_item=this.getSpeciality(id);
      this.$data.page_switch=2;
    },
    goToUserInfoPage(){
      if(this.uid>0){
        this.updateUserInfo(this.uid);
        this.$data.page_switch=5;
      }
    },
    login_action(arg) {
      this.$data.page_switch=arg?3:4;
    },
    getIllness(key){
      let id = this.getId(key);
      for (let i = 0; i < this.menu_illness.length; i++) {
        for (let j = 0; j < this.menu_illness[i].illness.length; j++) {
          if (this.menu_illness[i].illness[j].id == id) return this.menu_illness[i].illness[j];
        }
      }
    },
    toSpeciality(spid){
      this.goToSpecialityPage(spid);
    },
    handleSelect(key, keyPath) {
      console.log([key, keyPath]);
      if(key.length>1){
        if(key[0]==2){
          let ill = this.getIllness(key);
          this.$data.symptom_page_title=ill.name;
          this.$data.symptom_page_item=ill.symptom;
          this.$data.page_switch=1;
        }else if(key[0]==3){
          this.goToSpecialityPage(this.getId(key));
        }
      }
      else{
        if(key==1){
          this.$data.page_switch=0;
        }else if(key==4){
          this.goToUserInfoPage();
        }
      }
    },
    login_success(uid){
      this.$data.uid=uid;
      this.$data.page_switch=0;
    },
    updateUserInfo(new_uid){
      var __this=this;
      axios.post('/getUserInfo',{uid:new_uid})
          .then(function (response) {
            __this.$data.user_info.avatar=response.data.avatar;
            __this.$data.user_info.uname=response.data.uname;
            __this.$data.user_info.nname=response.data.nname;
            __this.$data.user_info.gender=response.data.gender;
            __this.$data.user_info.birthday=response.data.birthday;
            __this.$data.user_info.height=response.data.height;
            __this.$data.user_info.weight=response.data.weight;
            __this.$data.user_info.isAllergic=response.data.isAllergic;
            __this.$data.user_info.phone=response.data.phone;
          })
          .catch(function (error) {
            console.log(error)
          })
    },
    goSubmit(msg,sid){
      var __this=this;
      axios.post('/addInfo',{detail:msg,sid:sid,uid:this.uid})
          .then(function (response) {
            if(response.data.result===1){
              alert("挂号成功")
            }
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
    },
    submit(msg,sid){
      console.log({msg:msg,sid:sid})
      if(this.uid>0){
        this.goSubmit(msg,sid)
      }else{
        alert("请先登录");
        this.$data.page_switch=4;
      }
    }
  },
  computed:{
  },
  mounted() {
    this.loadIllness();
    this.loadSpeciality();
  }
}
</script>

<style scoped>

</style>