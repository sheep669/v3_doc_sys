<template>
	<view class="discover-container">
		<!-- 顶部分类标签 -->
		<up-tabs :list="tabsList" @click="handleTabClick" :current="currentTab" activeColor="#32b16c"
			lineColor="#32b16c"></up-tabs>

		<!-- 文章列表 -->
		<view class="article-list">
			<!-- 文章项重复 -->
			<view class="article-item" v-for="(item, index) in articleList" :key="index" @click="handleArticleClick(item)">
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
		doPostRequest,
		doQueryRequest
	} from "@/api/index";

	// 顶部标签数据
	const tabsList = ref([]);

	const getTabList = () => {
		doGetRequest(constant.article.searchTab).then(res => {
			if (res.data.code === 200) {
				const tabNames = res.data.data.records;
				const result = tabNames.map(name => ({
					name
				}));
				tabsList.value = result;
				
				// 获取第一个标签的文章数据
				if (result.length > 0) {
					doQueryRequest(constant.article.getArticlesByTabName, result[0].name).then(res => {
						if (res.data.code === 200) {
							articleList.value = res.data.data.records;
							console.log(articleList.value)
						}
					});
				}
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
		doQueryRequest(constant.article.getArticlesByTabName, item.name).then(res => {
			if (res.data.code === 200) {
				articleList.value = res.data.data.records
			} else {
				uni.$u.toast({
					type: 'error',
					message: '请求失败了,请检查网络或者服务器',
					duration: 1600
				});
			}
		})
		// 这里可以根据选中的标签加载不同的文章列表
		console.log('选中标签:', item.name);
	};

	// 文章列表数据
	const articleList = ref([]);

	// 文章点击事件处理
	const handleArticleClick = (item) => {
		console.log(item)
		// 跳转到文章详情页
		uni.navigateTo({
			url: `/pages/discover/article-detail?id=${item.id}`
		});
	};
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