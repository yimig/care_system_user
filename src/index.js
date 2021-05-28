import './res/styles/index.less';
import 'element-ui/lib/theme-chalk/index.css';
import 'tailwindcss/tailwind.css'
import Vue from 'vue';
import less from 'less';
import ElementUI from 'element-ui'
import Window from "./components/Window/Window.vue";

Vue.use(less);
Vue.use(ElementUI);
new Vue({
    el:'#window',
    render:(h,props)=>h(Window,{})
});