<template>
	<view class="profile-container">
		<!-- 用户信息区域 -->
		<view class="user-info-section">
			<view class="user-info">
				<view class="avatar-container">
					<up-image src="/static/home/doctor1.png" width="60px" height="60px" shape="circle"></up-image>
					<view class="edit-icon">
						<up-icon name="edit-pen" size="16" color="#fff"></up-icon>
					</view>
				</view>
				<view class="user-details">
					<view class="user-name-container">
						<text class="user-name">刘洋</text>
					</view>
					<text class="user-phone">183****9051</text>
				</view>
			</view>
		</view>



		<!-- 功能列表 -->
		<view class="function-list">
			<!-- 收藏医生 -->
			<view class="function-item" @click="navigateTo('star')">
				<view class="function-left">
					<view class="function-icon green">
						<up-image src="/static/profile/star.png" width="40px" height="40px" shape="circle"></up-image>
					</view>
					<text class="function-title">收藏医生</text>
				</view>
				<view class="function-right">
					<up-icon name="arrow-right" size="16" color="#999"></up-icon>
				</view>
			</view>


			<!-- 意见反馈 -->
			<view class="function-item" @click="navigateTo('feedback')">
				<view class="function-left">
					<view class="function-icon green">
						<up-image src="/static/profile/return.png" width="39px" height="39px" shape="circle"></up-image>
					</view>
					<text class="function-title">意见反馈</text>
				</view>
				<view class="function-right">
					<up-icon name="arrow-right" size="16" color="#999"></up-icon>
				</view>
			</view>
			<!-- 退出登录 -->
			<view class="function-item" @click="logout">
				<view class="function-left">
					<view class="function-icon green">
						<up-image src="/static/profile/logout.png" width="38px" height="38px" shape="circle"></up-image>
					</view>
					<text class="function-title">退出登录</text>
				</view>
			</view>


		</view>

		<!-- 版本信息 -->
		<view class="version-info">
			<text>当前版本1.0</text>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';

	const logout = () => {
		uni.navigateTo({
			url: '/pages/login/login'
		});
	}

	// 导航到其他功能页面
	const navigateTo = (page) => {
		const pageMap = {
			mybook: '/pages/function/mybook',
			address: '/pages/function/address',
			star: '/pages/function/star',
			feedback: '/pages/function/feedback'
		};

		if (pageMap[page]) {
			uni.navigateTo({
				url: pageMap[page]
			});
		}
	};
</script>

<style scoped>
	.profile-container {
		background-color: #f5f5f5;
		min-height: 100vh;
		padding-bottom: 20px;
	}

	/* 用户信息区域样式 - 更改为绿色调 */
	.user-info-section {
		background: linear-gradient(to right, #32b16c, #4cd07d);
		padding: 20px 15px;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.user-info {
		display: flex;
		align-items: center;
	}

	.avatar-container {
		position: relative;
		margin-right: 15px;
	}

	.edit-icon {
		position: absolute;
		right: 0;
		bottom: 0;
		background-color: #32b16c;
		width: 24px;
		height: 24px;
		border-radius: 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		border: 2px solid #fff;
	}

	.user-details {
		display: flex;
		flex-direction: column;
	}

	.user-name-container {
		display: flex;
		align-items: center;
		margin-bottom: 5px;
	}

	.user-name {
		font-size: 18px;
		font-weight: bold;
		color: #fff;
		margin-right: 10px;
	}

	.verify-badge {
		background-color: #ff9500;
		color: #fff;
		font-size: 12px;
		padding: 2px 8px;
		border-radius: 10px;
	}

	.user-phone {
		font-size: 14px;
		color: rgba(255, 255, 255, 0.8);
	}

	.settings-icon {
		padding: 5px;
	}

	/* 功能列表样式 */
	.function-list {
		background-color: #fff;
		margin-bottom: 10px;
	}

	.function-item {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 15px;
		border-bottom: 1px solid #f5f5f5;
	}

	.function-left {
		display: flex;
		align-items: center;
	}

	.function-icon {
		width: 36px;
		height: 36px;
		border-radius: 18px;
		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 10px;
	}

	.green {
		background-color: #32b16c;
	}

	.function-title {
		font-size: 15px;
		color: #333;
	}

	.function-right {
		display: flex;
		align-items: center;
	}

	.badge-text {
		font-size: 14px;
		color: #999;
		margin-right: 5px;
	}

	.new-badge {
		background-color: #ff4d4f;
		color: #fff;
		font-size: 12px;
		padding: 2px 6px;
		border-radius: 10px;
		margin-right: 5px;
	}

	.service-time {
		font-size: 12px;
		color: #999;
		margin-right: 5px;
	}

	/* 版本信息样式 */
	.version-info {
		text-align: center;
		padding: 15px;
		color: #999;
		font-size: 12px;
	}
</style>