<template>
	<view class="article-detail-container">
		<!-- 文章标题 -->
		<view class="article-title">
			{{ articleDetail.title }}
		</view>

		<!-- 文章来源和时间 -->
		<view class="article-info">
			<text class="source">{{ articleDetail.source }}</text>
			<text class="time">{{ articleDetail.createTime }}</text>
		</view>

		<!-- 文章封面图 -->
		<view class="article-cover" v-if="articleDetail.image">
			<up-image :src="articleDetail.image" width="100%" height="200px" radius="8px"></up-image>
		</view>

		<!-- 文章内容 -->
		<view class="article-content">
			<rich-text :nodes="articleDetail.content"></rich-text>
		</view>
	</view>
</template>

<script setup>
	import { ref, onMounted } from 'vue';
	import constant from "@/constant/api/index.js";
	import { doQueryRequest } from "@/api/index";

	// 文章详情数据
	const articleDetail = ref({
		title: '',
		source: '',
		createTime: '',
		image: '',
		content: ''
	});

	// 获取页面参数
	const articleId = ref('');

	onMounted(() => {
		// 获取页面传递的文章ID
		const pages = getCurrentPages();
		const currentPage = pages[pages.length - 1];
		articleId.value = currentPage.$page?.options?.id;

		// 获取文章详情
		if (articleId.value) {
			getArticleDetail();
		}
	});

	// 获取文章详情
	const getArticleDetail = () => {
		console.log(articleId.value)
		//获取文章详情
		doQueryRequest(constant.article.getArticleDetail,articleId.value).then(res=>{
			if (res.data.code === 200) {
				articleDetail.value=res.data.data.records;
			} else {
				uni.$u.toast({
					type: 'error',
					message: '请求失败了,请检查网络或者服务器',
					duration: 1600
				});
			}
		})
	};
</script>

<style scoped>
	.article-detail-container {
		padding: 20px;
		background-color: #ffffff;
		min-height: 100vh;
	}

	.article-title {
		font-size: 20px;
		font-weight: bold;
		color: #333;
		line-height: 1.4;
		margin-bottom: 15px;
	}

	.article-info {
		display: flex;
		align-items: center;
		margin-bottom: 20px;
	}

	.source {
		font-size: 14px;
		color: #666;
		margin-right: 15px;
	}

	.time {
		font-size: 14px;
		color: #999;
	}

	.article-cover {
		margin-bottom: 20px;
	}

	.article-content {
		font-size: 16px;
		color: #333;
		line-height: 1.8;
		padding-bottom: 60px;
	}

	.back-button {
		position: fixed;
		bottom: 20px;
		right: 20px;
		background-color: #32b16c;
		color: #ffffff;
		padding: 6px 16px;
		border-radius: 20px;
		font-size: 14px;
		box-shadow: 0 2px 8px rgba(50, 177, 108, 0.3);
		z-index: 100;
	}
</style>