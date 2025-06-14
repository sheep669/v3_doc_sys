<!--
 * @Author: 刘洋
 * @Date: 2025-02-23 18:55:41
 * @LastEditTime: 2025-02-24 11:50:21
 * @Description: 
-->
<template>
	<view class="container">
		<view class="header">
			<text class="title">Aion Feond</text>
			<up-search placeholder="搜索科室" v-model="keyword" searchIconColor="#55aa00"></up-search>
		</view>
		<up-scroll-list class="departments" :indicator="false" :scroll-y="true">
			<view v-for="(department, index) in departments" :key="index">
				<up-button class="department-button">{{ department }}</up-button>
			</view>
		</up-scroll-list>
		<view class="hot-doctors-header">
			<text class="hot-doctors-title">热门医生</text>
			<text class="all-doctors">全部 ></text>
		</view>
		<up-scroll-list :indicator="false" :scroll-y="true" class="doctor-list">
			<view class="doctor" v-for="(doctor, index) in doctors" :key="index" :class="['doctor-card']">
				<up-image :show-loading="true" :src="doctor.src" width="80px" height="80px" @click="click" class="doctor-image" />
				<view class="doctor-info">
					<view class="doctor-name-position">
						<text class="doctor-name">{{ doctor.name }}</text>
						<text class="doctor-position">{{ doctor.position }}</text>
					</view>
					<text class="doctor-department">{{ doctor.department }}</text>
					<view class="doctor-tags">
						<up-tag plain size="mini">{{ doctor.character1 }}</up-tag>
						<up-tag plain size="mini">{{ doctor.character2 }}</up-tag>
					</view>
				</view>
			</view>
		</up-scroll-list>
		<view class="hot-doctors-header">
			<text class="hot-doctors-title">健康科普</text>
			<text class="all-doctors">更多 ></text>
		</view>
		<view class="qa-section">
			<view class="qa-item">
				<text class="qa-question">长期不吃早餐可以减肥？</text>
				<view class="qa-answer">
					<up-button @click="toggleAnswer(0)">{{ answers[0] ? '是' : '否' }}</up-button>
				</view>
			</view>
			<view class="qa-item">
				<text class="qa-question">晚餐吃的少可以活得更久？</text>
				<view class="qa-answer">
					<up-button @click="toggleAnswer(1)">{{ answers[1] ? '是' : '否' }}</up-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const click = () => {}

	const keyword = ref('');

	// 定义科室数据
	const departments = ref(['心血管科', '呼吸科', '肠胃科', '肠胃科', '呼吸科', '心理科', '呼吸科']);

	// 定义医生数据，使用绝对路径
	const doctors = ref([{
			name: '周洪平',
			position: '主任医师',
			department: '耳鼻喉科',
			src: '/static/home/doctor1.png',
			character1: '科室专家',
			character2: '权威专家'
		},
		{
			name: 'Rayis',
			position: '副主任医师',
			department: '神经内科',
			src: '/static/home/doctor2.png',
			character1: '临床经验丰富',
			character2: '擅长治疗头痛'
		},
		{
			name: '雷雨',
			position: '主治医师',
			department: '中医科',
			src: '/static/home/doctor3.png',
			character1: '中医专家',
			character2: '擅长针灸'
		},
		{
			name: '李四',
			position: '主治医师',
			department: '中医科',
			src: '/static/home/doctor3.png',
			character1: '中医专家',
			character2: '擅长推拿'
		},
		{
			name: '王五',
			position: '主治医师',
			department: '中医科',
			src: '/static/home/doctor3.png',
			character1: '中医专家',
			character2: '擅长中药'
		},
	]);

	// 定义问答数据
	const answers = ref([false, false]); // 默认答案为否

	const toggleAnswer = (index) => {
		answers.value[index] = !answers.value[index]; // 切换答案
	}
</script>

<style scoped>
	.container {
		padding: 20px;
		background-color: #f0f4f8; /* 背景颜色 */
	}

	.header {
		display: flex;
		flex-direction: column;
		align-items: center;
		margin-bottom: 20px;
	}

	.title {
		font-size: 28px;
		font-weight: bold;
		color: #333; /* 标题颜色 */
		margin-bottom: 10px;
	}

	.hot-doctors-header {
		display: flex; /* 水平排列 */
		justify-content: space-between; /* 两端对齐 */
		align-items: center; /* 垂直居中 */
		margin-bottom: 10px; /* 下边距 */
	}

	.hot-doctors-title {
		font-size: 24px; /* 热门医生标题字体大小 */
		font-weight: bold; /* 加粗 */
		color: #333; /* 热门医生标题颜色 */
	}

	.all-doctors {
		font-size: 16px; /* 全部标签字体大小 */
		color: #007AFF; /* 全部标签颜色 */
		cursor: pointer; /* 鼠标悬停时显示为手型 */
	}

	.search-bar {
		width: 100%; /* 搜索框宽度 */
		border: 1px solid #e0e0e0; /* 边框 */
		border-radius: 20px; /* 圆角 */
		padding: 10px; /* 内边距 */
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 阴影效果 */
	}

	.departments {
		display: flex;
		justify-content: space-around;
		margin-bottom: 20px;
	}

	.department-button {
		flex: 1;
		margin: 0 5px;
		background-color: #007AFF; /* 按钮背景颜色 */
		color: white; /* 按钮文字颜色 */
		border-radius: 20px; /* 圆角 */
	}

	.doctor-list {
		display: flex; /* 水平排列医生卡片 */
		overflow-x: auto; /* 允许水平滚动 */
	}

	.doctor {
		text-align: center;
		margin: 10px;
	}

	.doctor-card {
		border: 1px solid #e0e0e0; /* 边框 */
		border-radius: 8px; /* 圆角 */
		padding: 10px; /* 内边距 */
		margin: 10px; /* 外边距 */
		display: flex; /* 使用 flexbox 布局 */
		flex-direction: column; /* 垂直排列 */
		align-items: center; /* 水平居中 */
		background-color:#edf2ff; /* 背景颜色 */
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 阴影效果 */
	}

	.doctor-image {
		border-radius: 50%; /* 头像圆形 */
	}

	.doctor-info {
		margin-top: 10px; /* 上边距 */
		display: flex;
		flex-direction: column; /* 垂直排列 */
		justify-content: center; /* 垂直居中 */
		width: 150px; /* 设置宽度 */
		height: auto; /* 设置高度为自动 */
	}

	.doctor-name-position {
		display: flex; /* 水平排列 */
		justify-content: space-between; /* 在两端对齐 */
		width: 100%; /* 占满宽度 */
	}

	.doctor-name {
		font-size: 16px; /* 字体大小 */
		font-weight: bold; /* 加粗 */
		color: #333; /* 医生名字颜色 */
	}

	.doctor-position {
		font-size: 14px; /* 字体大小 */
		color: #000000; /* 设置为深黑色 */
		font-weight: normal; /* 设置为正常字体 */
	}

	.doctor-department {
		font-size: 13px; /* 字体大小比doctor-name小1/5 */
		color: #000000; /* 设置为深黑色 */
		font-weight: bold; /* 设置为正常字体 */
		text-align: left; /* 左对齐 */
	}

	.doctor-tags {
		display: flex; /* 水平排列标签 */
		gap: 10px; /* 设置标签之间的间隙 */
		margin-top: 5px; /* 上边距 */
	}

	.qa-section {
		margin-top: 20px; /* 问答部分上边距 */
		padding: 10px; /* 内边距 */
		background-color: #ffffff; /* 背景颜色 */
		border-radius: 8px; /* 圆角 */
		box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 阴影效果 */
	}

	.qa-item {
		margin-bottom: 15px; /* 问答项下边距 */
		padding: 10px; /* 内边距 */
		border: 1px solid #e0e0e0; /* 边框 */
		border-radius: 5px; /* 圆角 */
		background-color: #f9f9f9; /* 问答项背景颜色 */
	}

	.qa-question {
		font-size: 18px; /* 问题字体大小 */
		color: #333; /* 问题颜色 */
		font-weight: bold; /* 加粗 */
	}

	.qa-answer {
		margin-top: 5px; /* 答案上边距 */
		display: flex; /* 使用 flexbox 布局 */
		justify-content: flex-end; /* 右对齐 */
	}
</style>