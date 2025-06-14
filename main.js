/*
 * @Author: 刘洋
 * @Date: 2025-02-23 15:59:16
 * @LastEditTime: 2025-02-23 18:58:14
 * @Description: 
 */
import App from './App'

// #ifndef VUE3

import Vue from 'vue'
import './uni.promisify.adaptor'



Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.$mount()
// #endif

// #ifdef VUE3
import {createSSRApp} from 'vue'
// 导入uviewPlus
import uviewPlus from '@/uni_modules/uview-plus'
//引入pinia状态管理器
import { createPinia } from 'pinia';
const pinia = createPinia();

export function createApp() {
	const app = createSSRApp(App)
	//使用uviewPlus
	app.use(uviewPlus);
	app.use(pinia);
	return {
		app
	}
}
// #endif