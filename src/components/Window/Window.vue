<template>
  <div class="flex h-full w-full">
    <el-menu class="el-menu-vertical-demo" :collapse="isCollapse" @select="handleSelect">
      <el-menu-item index="1" class="mt-14">
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
    </el-menu>
    <div class="flex-row flex-grow">
      <el-menu :default-active="activeIndex" class="el-menu-demo flex-grow" mode="horizontal" @select="handleSelect">
        <el-menu-item index="1">主页</el-menu-item>
        <el-menu-item index="2">个人中心</el-menu-item>
      </el-menu>
      <SymptomPage v-show="page_switch==1" :symptom="symptom_page_item" :title="symptom_page_title"></SymptomPage>
      <SpecialityPage v-show="page_switch==2" :speciality="speciality_page_item"></SpecialityPage>
    </div>
  </div>
</template>

<script>
import axios from "_axios@0.21.1@axios";
import SymptomPage from "../SymptomPage/SymptomPage.vue";
import SpecialityPage from "../SpecialityPage/SpecialityPage.vue";
export default {
  name: "Window",
  components: {SymptomPage,SpecialityPage},
  data(){
    return{
      menu_illness:[
        {
          body:'头部',
          illness: [{
            name:'眩晕',
            id:1,
            symptom:[{
              detail:'头晕与头的位置改变有关，如躺下或翻身头晕',
              speciality:'耳鼻喉科',
              spid:1
            },{
              detail:'站不稳，眼球乱转，甚至意识不清',
              speciality:'神经内科',
              spid:2,
            },{
              detail:'晕时心前区疼痛、心慌、心脏不适',
              speciality:'心内科',
              spid:3,
            }]
          },{
            name:'头痛',
            id:2,
            symptom:[{
              detail:'伴有眩晕、耳鸣，或者鼻塞、流涕',
              speciality:'神经内科',
              spid:2,
            },{
              detail:'一侧头痛，疲劳、紧张时加重',
              speciality:'神经内科',
              spid:2,
            }]
          }]
        },
        {
          body:'身体',
          illness: [{
            name:'肚子疼',
            id:3,
            symptom:[{
              detail:'右上腹和左下腹的急性腹痛',
              speciality:'普外科',
              doctor_name:'郭刚',
              sid:1
            },{
              detail:'腹痛伴有反酸、呕吐、腹泻',
              speciality:'消化内科',
              spid:2,
            }]
          },{
            name:'胸痛',
            id:4,
            symptom:[{
              detail:'胸口或胸前疼痛，有压迫感，伴有心慌气短',
              speciality:'心内科',
              spid:2,
            },{
              detail:'因骨折等外伤所致，在进行弯腰、侧弯时疼痛加剧',
              speciality:'骨科',
              spid:2,
            }]
          }]
        }
      ],
      menu_speciality:[
        {
          name:'耳鼻喉科',
          id:1,
          detail:'耳鼻喉科介绍',
          doctors:[{
            name:'郭刚',
            id:1
          },{
            name:'刘乐',
            id:2
          }]
        },{
          name:'神经内科',
          id:2,
          detail:'神经内介绍',
          doctors:[{
            name:'郭刚',
            id:1
          },{
            name:'刘乐',
            id:2
          }]
        },{
          name:'骨科',
          id:3,
          detail:'骨科介绍',
          doctors:[{
            name:'郭刚',
            id:1
          },{
            name:'刘乐',
            id:2
          }]
        }
      ],
      symptom_page_item:{},
      symptom_page_title:'',
      speciality_page_item:{},

      illness_menu_index:0,
      page_switch:2,
      isCollapse: true,
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods:{
    'pass':function (sid){
      this.$data.sid=sid;
      var __this=this;
      axios.post('http://localhost:3000/getInfo',{
        'sid':sid,
        'iid':-1,
        'content':''
      })
          .then(function (response) {
            if(response.data.length>0){
              for (let i = 0; i < response.data.length; i++) {
                __this.$data.info_list.push(response.data[i])
              }
            }
            console.log(response)
          })
          .catch(function (error) {
            console.log(error)
          })
    },
    getId(key){
      return key.substring(2,3);
    },
    getSpeciality(key){
      let id = this.getId(key);
      for (let i = 0; i < this.menu_speciality.length; i++) {
        if(this.menu_speciality[i].id==id)return this.menu_speciality[i];
      }
    },
    getIllness(key){
      let id = this.getId(key);
      for (let i = 0; i < this.menu_illness.length; i++) {
        for (let j = 0; j < this.menu_illness[i].illness.length; j++) {
          if (this.menu_illness[i].illness[j].id == id) return this.menu_illness[i].illness[j];
        }
      }
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
          this.$data.speciality_page_item=this.getSpeciality(key);
          this.$data.page_switch=2;
        }
      }
    }
  },
  computed:{

  }
}
</script>

<style scoped>

</style>