<template>
	<view class="discover-container">
		<!-- 顶部分类标签 -->
		<up-tabs :list="tabsList" @click="handleTabClick" :current="currentTab" activeColor="#32b16c"
			lineColor="#32b16c"></up-tabs>

		<!-- 文章列表 -->
		<view class="article-list">
			<!-- 文章项重复 -->
			<view class="article-item" v-for="(item, index) in articleList" :key="index">
				<view class="article-content">
					<view class="article-title">{{ item.title }}</view>
					<view class="article-source">{{ item.source }}</view>
				</view>
				<view class="article-image">
					<up-image :src="item.image" width="100px" height="70px" radius="4px"></up-image>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	import constant from "@/constant/api/index.js";
	import {
		doGetRequest,
		doPostRequest
	} from "@/api/index";

	// 顶部标签数据
	const tabsList = ref([]);

	const getTabList = () => {
		doGetRequest(constant.article.searchTab).then(res => {
			if (res.data.code === 200) {
				console.log(res.data.data.records);
				tabsList.value = res.data.data.records;
			} else {
				uni.$u.toast({
					type: 'error',
					message: '请求失败了,请检查网络或者服务器',
					duration: 1600
				});
			}
		})
	}
	getTabList();
	// 当前选中的标签
	const currentTab = ref(0);

	// 标签点击事件
	const handleTabClick = (item) => {
		currentTab.value = item.index;
		// 这里可以根据选中的标签加载不同的文章列表
		console.log('选中标签:', item.name);
	};

	// 文章列表数据
	const articleList = ref([{
			title: '如何正确选择婴儿奶粉？专家给出建议',
			source: '健康育儿网',
			image: '/static/discover/baby2.jpg'
		},
		{
			title: '产后恢复指南：如何快速恢复身材',
			source: '妈妈帮',
			image: '/static/discover/postpartum.jpg'
		},
		{
			title: '心脏病患者的日常护理，这些细节要注意',
			source: '心血管健康',
			image: '/static/discover/heart.png'
		},
		{
			title: '秋季皮肤干燥怎么办？保湿护肤小技巧',
			source: '美丽护肤网',
			image: '/static/discover/skin.png'
		},
		{
			title: '如何预防骨质疏松？补钙是关键',
			source: '健康骨骼',
			image: '/static/discover/bone.png'
		},
		{
			title: '儿童近视防控指南，家长必读',
			source: '眼科健康',
			image: '/static/discover/eye.jpg'
		},
		{
			title: '如何应对焦虑症？心理医生给出建议',
			source: '心理健康',
			image: '/static/discover/mental.jpg'
		},
		{
			title: '夏季防暑降温小妙招，让你清凉一夏',
			source: '生活小百科',
			image: '/static/discover/summer.jpg'
		}
	]);
</script>

<style scoped>
	.discover-container {
		background-color: #f5f5f5;
		min-height: 100vh;
	}

	/* 文章列表样式 */
	.article-list {
		padding: 10px;
	}

	.article-item {
		display: flex;
		justify-content: space-between;
		background-color: #ffffff;
		padding: 15px;
		margin-bottom: 10px;
		border-radius: 8px;
	}

	.article-content {
		flex: 1;
		margin-right: 10px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.article-title {
		font-size: 16px;
		font-weight: 500;
		color: #333;
		line-height: 1.4;
		margin-bottom: 10px;
	}

	.article-source {
		font-size: 12px;
		color: #999;
	}

	.article-image {
		width: 100px;
		height: 70px;
		border-radius: 4px;
		overflow: hidden;
	}
</style>