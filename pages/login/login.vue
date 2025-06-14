<template>
	<view class="login-container">
		<view class="logo-box">
			<text class="title">智慧医疗系统</text>
		</view>

		<view class="form-box">
			<up-form :model="form" :rules="rules" ref="loginForm" labelPosition="left">
				<up-form-item label="用户名" prop="username" borderBottom labelWidth="60">
					<up-input v-model="form.username" placeholder="请输入用户名" border="none"
						class="custom-input"></up-input>
				</up-form-item>

				<up-form-item label="密码" prop="password" borderBottom labelWidth="60">
					<up-input v-model="form.password" type="password" placeholder="请输入密码" border="none"
						class="custom-input"></up-input>
				</up-form-item>

				<up-form-item label="验证码" prop="verCode" borderBottom labelWidth="60">
					<view class="captcha-box">
						<up-input v-model="form.verCode" placeholder="验证码, 单击图片刷新" border="none"
							class="custom-input"></up-input>
						<image class="captcha-img" :src="captchaUrl" @tap="refreshCaptcha"></image>
					</view>
				</up-form-item>
			</up-form>

			<view class="btn-box">
				<u-button type="primary" text="登录" @click="handleLogin"></u-button>
				<view class="register-link">
					<text>还没有账号？</text>
					<text class="link" @click="goToRegister">立即注册</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				form: {
					username: '',
					password: '',
					verCode: '',
					role: 'patient'
				},
				rules: {
					username: [{
						required: true,
						message: '请输入用户名',
						trigger: 'blur'
					}],
					password: [{
							required: true,
							message: '请输入密码',
							trigger: 'blur'
						},
						{
							min: 6,
							message: '密码长度不能少于6位',
							trigger: 'blur'
						}
					],
					verCode: [{
							required: true,
							message: '请输入验证码',
							trigger: 'blur'
						},
						{
							len: 5,
							message: '验证码长度为5位',
							trigger: 'blur'
						}
					]
				},
				captchaUrl: 'http://localhost:8080/captcha?' + Date.now()
			}
		},
		onReady() {
			// 如果需要兼容微信小程序，最好通过setRules方法设置rules规则
			this.$refs.loginForm.setRules(this.rules);
		},
		methods: {
			// 刷新验证码
			refreshCaptcha() {
				this.captchaUrl = 'http://localhost:8080/captcha?' + Date.now();
			},

			// 处理登录
			handleLogin() {
				// 发送登录请求
				uni.request({
					url: 'http://localhost:8080/login',
					method: 'POST',
					data: this.form,
					success: (res) => {
						if (res.data.code === 200) {
							// 提示登录成功
							uni.showToast({
								title: '登录成功',
								icon: 'success'
							});

							// 跳转到首页
							setTimeout(() => {
								uni.switchTab({
									url: '/pages/home/home'
								});
							}, 1500);
						} else {
							// 登录失败
							uni.showToast({
								title: res.data.message || '登录失败',
								icon: 'none'
							});
							// 刷新验证码
							this.refreshCaptcha();
						}
					},
					fail: () => {
						uni.showToast({
							title: '网络错误，请稍后重试',
							icon: 'none'
						});
					}
				});
			},

			// 跳转到注册页面
			goToRegister() {
				uni.navigateTo({
					url: '/pages/register/register'
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	.login-container {
		padding: 40rpx;
		background-color: #ffffff;

		.logo-box {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 60rpx;
			margin-bottom: 80rpx;

			.logo {
				width: 180rpx;
				height: 180rpx;
			}

			.title {
				font-size: 36rpx;
				font-weight: bold;
				margin-top: 20rpx;
				color: #333;
			}
		}

		.form-box {
			margin-top: 40rpx;
			background-color: #ffffff;
			border-radius: 12rpx;
			padding: 30rpx;


			:deep(.custom-input) {
				background-color: #f8f8f8;
				border-radius: 8rpx;
				padding: 0 20rpx;
				height: 80rpx;
			}

			:deep(.up-form-item) {
				margin-bottom: 20rpx;
			}

			:deep(.up-form-item__body) {
				padding: 10rpx 0;
			}

			:deep(.up-form-item__body__right) {
				flex: 1;
			}

			.captcha-box {
				display: flex;
				align-items: center;

				.captcha-img {
					width: 200rpx;
					height: 80rpx;
					margin-left: 20rpx;
					border-radius: 8rpx;
					border: 1px solid #eee;
				}
			}

			.btn-box {
				margin-top: 60rpx;

				:deep(.up-button) {
					height: 90rpx;
					border-radius: 45rpx;
					font-size: 32rpx;
					font-weight: bold;
				}

				.register-link {
					display: flex;
					justify-content: center;
					margin-top: 30rpx;
					font-size: 28rpx;
					color: #666;

					.link {
						color: #2979ff;
						margin-left: 10rpx;
					}
				}
			}
		}
	}
</style>