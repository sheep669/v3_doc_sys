<template>
	<view class="container">
		<view class="header">
			<up-search placeholder="搜索医生/科室" v-model="keyword" searchIconColor="#55aa00" class="search-box"></up-search>
		</view>
		<view class="fun">
			<view class="icon-box" @click="navigateToAI">
				<up-image :show-loading="true" src="/static/funIcons/AI.png" width="50px" height="50px"
					@click="click" />
				<text class="icon-text">AI问诊</text>
			</view>
			<view class="icon-box" @click="navigateToBooking">
				<up-image :show-loading="true" src="/static/funIcons/Booking.png" width="50px" height="50px"
					@click="click" />
				<text class="icon-text">在线预约</text>
			</view>
		</view>

		<!-- 		<up-scroll-list class="departments" :indicator="false" :scroll-y="true">
			<view v-for="(department, index) in departments" :key="index" class="department-item">
				<up-button class="department-button">
					<image avatar="/static/departments/neurology.svg" mode="aspectFit" class="icon"></image>
					{{ department }}
				</up-button>
			</view>
		</up-scroll-list> -->
		<view class="hot-doctors-header">
			<text class="hot-doctors-title">热门医生</text>
			<view class="all-doctors" @click="navigateToBooking">
				<text>全部</text>
				<up-icon name="arrow-right"></up-icon>
			</view>
		</view>
		<up-scroll-list :indicator="false" :scroll-y="true" class="doctor-list">
			<view class="doctor" v-for="(doctor, index) in doctors" :key="index" :class="['doctor-card']"
				@click="navigateToBookingWithDoctor(doctor)">
				<up-image :show-loading="true" :src="doctor.avatar" width="80px" height="80px" class="doctor-image" />
				<view class="doctor-info">
					<view class="doctor-name-title">
						<text class="doctor-name">{{ doctor.name }}</text>
						<text class="doctor-title">{{ doctor.title }}</text>
					</view>
					<text class="doctor-department">{{ getDepartmentName(doctor.departmentId) }}</text>
					<view class="doctor-tags">
						<up-tag bgColor="#32b16c" color="#fff" size="mini">{{ doctor.character1 }}</up-tag>
						<up-tag bgColor="#32b16c" color="#fff" size="mini">{{ doctor.character2 }}</up-tag>
					</view>
				</view>
			</view>
		</up-scroll-list>
		<view class="hot-doctors-header">
			<text class="hot-doctors-title">健康科普</text>
			<view class="all-doctors">
				<text>全部</text>
				<up-icon name="arrow-right"></up-icon>
			</view>
		</view>
		<view class="qa-section">
			<view class="qa-item" v-for="(qa, index) in qas" :key="index">
				<up-badge value="每日问答" bgColor="#32b16c" shape="horn" class="qa-badge"></up-badge>
				<view class="qa-content">
					<text class="qa-question">{{ qa.question }}</text>
					<view class="qa-answer">
						<view class="answer-buttons">
							<view class="answer-button" :class="{ 'active': qa.answer === '是' }"
								@click="qa.answer = '是'">是</view>
							<view class="answer-button" :class="{ 'active': qa.answer === '否' }"
								@click="qa.answer = '否'">否</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import { useStringStore } from '@/stores/stringStore'; // 引入 Pinia Store
	import {
		ref
	} from 'vue';
    import constant from "@/constant/api/index.js";
	import {
		doGetRequest
	} from "@/api/index";

	const click = () => {
		navigateToBooking()
	}

	const navigateToAI = () => {
		uni.navigateTo({
			url: '/pages/AI/AI'
		});
	}
	const navigateToBooking = () => {
		uni.navigateTo({
			url: '/pages/book/book'
		});
	}

	const navigateToBookingWithDoctor = (doctor) => {
		uni.navigateTo({
			url: '/pages/book/book?doctor=' + encodeURIComponent(JSON.stringify(doctor))
		});
	}

	const keyword = ref('');


    const stringStore = useStringStore()
    
    // 获取科室列表
    const getDepartmentName = (departmentId) => {
        const department = stringStore.state.departmentId.find(item => item.value === departmentId);
        return department ? department.label : '';
    };
	console.log( getDepartmentName(1))  

	const doctors = ref([]);
	//获取医生数据
	const getDoctorData = async () => {
	    const res = await doGetRequest(
	        constant.doctor.getAllUrl
	    );
	    if (res.data.code === 200) {
	        doctors.value = res.data.data.records;
	    } else {
	        uni.$u.toast({
	            type: 'error',
	            message: '请求失败了,请检查网络或者服务器',
	            duration: 1600
	        });
	    }
	};
	//setup包含了生命周期函数
	getDoctorData();


	// 定义问答数据
	const qas = ref([{
			question: '长期不吃早餐可以减肥？',
			answer: '否'
		},
		{
			question: '晚餐吃的少可以活得更久？',
			answer: '否'
		}
	]);
</script>

<style scoped>
	.icon-box {
		width: 200px;
		display: flex;
		flex-direction: row;
		/* 文字和图标水平排列 */
		align-items: center;
		padding: 10px;
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		/* 添加阴影 */
		border-radius: 8px;
		/* 圆角边框 */
		background-color: #fff;
		/* 背景颜色 */
		cursor: pointer;
	}

	.search-box {
		width: 90%;
		max-width: 600px;
		/* 最大宽度 */
		border-radius: 20px;
		/* 圆角边框 */
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		/* 阴影效果 */
		background-color: #ffffff;
		/* 背景颜色 */
		padding: 10px;
		/* 内边距 */
	}

	.container {
		padding: 20px;
		background-color: #f0f4f8;
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20px;
	}


	.fun {
		display: flex;
		justify-content: center;
		/* 水平居中 */
		align-items: center;
		/* 垂直居中（如果需要） */
		margin-bottom: 20px;
		gap: 20px;
		/* 图标之间的间距 */
	}

	.up-image {
		width: 60px;
		height: 60px;
		cursor: pointer;
	}

	.title {
		font-size: 28px;
		font-weight: bold;
		color: #333;
		margin-bottom: 10px;
	}

	.hot-doctors-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20px;
	}

	.hot-doctors-title {
		font-size: 18px;
		font-weight: bold;
		color: #333;
	}

	.all-doctors {
		display: flex;
		align-items: center;
		font-size: 15px;
		font-weight: 400;
		color: #333;
		cursor: pointer;
		gap: 5px;
		/* 添加间距 */
	}

	.departments {
		display: flex;
		overflow-x: auto;
		margin-bottom: 20px;
		padding-bottom: 10px;
	}

	.department-item {
		margin: 0 5px;
	}

	.department-button {
		/* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
		box-shadow: 0 2px 4px rgba(50, 177, 108, 0.12);
		max-width: 150px;
		/* 设置最大宽度 */
		min-width: 100px;
		/* 设置最小宽度 */
		background-color: rgb(50, 177, 108, 0.15);
		font-size: 14px;
		font-weight: 600;
		color: #333;
		border-radius: 15px;
		padding: 10px;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
		/* 防止内容换行 */
		white-space: nowrap;
		/* 防止文本换行 */
		text-overflow: ellipsis;
		/* 文本溢出时显示省略号 */
		overflow: hidden;
	}

	.department-button:active {}

	.doctor-list {
		display: flex;
		overflow-x: auto;
	}

	.doctor {
		text-align: center;
		margin: 10px;
	}

	.doctor-card {
		border-radius: 8px;
		padding: 10px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	.doctor-image {
		border-radius: 50%;
	}

	.doctor-info {
		margin-top: 10px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 150px;
	}

	.doctor-name-title {
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.doctor-name {
		font-size: 16px;
		font-weight: bold;
		color: #333;
	}

	.doctor-title {
		font-size: 14px;
		color: #333333;
	}

	.doctor-department {
		margin-top: 4px;
		font-size: 13px;
		color: #333333;
		font-weight: bold;
		text-align: left;
	}

	.doctor-tags {
		display: flex;
		gap: 10px;
		margin-top: 10px;
	}

	.qa-section {
		margin-top: 20px;
		padding: 15px;
		background-color: #ffffff;
		border-radius: 8px;
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	}

	.qa-item {
		display: flex;
		align-items: flex-start;
		margin-bottom: 15px;
		padding: 15px;
		border: 1px solid #e0e0e0;
		border-radius: 5px;
		background-color: #f9f9f9;
	}

	.qa-badge {
		margin-right: 15px;
	}

	.qa-content {
		display: flex;
		flex-direction: column;
		flex: 1;
	}

	.qa-question {
		font-size: 15px;
		color: #333;
		font-weight: 700;
	}

	.qa-answer {
		margin-top: 10px;
	}

	.answer-buttons {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
	}

	.answer-button {
		padding: 5px 20px;
		border-radius: 20px;
		border: 1px solid #e0e0e0;
		background-color: #ffffff;
		color: #333;
		font-size: 14px;
	}

	.answer-button.active {
		background-color: #32b16c;
		color: #ffffff;
		border-color: #32b16c;
	}

	.icon {
		width: 20px;
		height: 20px;
		margin-right: 5px;
	}

	.icon-text {
		margin-left: 12px;
	}
</style>