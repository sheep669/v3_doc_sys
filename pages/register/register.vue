<template>
    <view class="register-container">
        <view class="title">用户注册</view>

        <view class="form-box">
            <u-form :model="form" ref="uForm" errorType="message">
                <u-form-item label="用户名" prop="username" borderBottom>
                    <u-input v-model="form.username" placeholder="请输入用户名" />
                </u-form-item>
                <u-form-item label="密码" prop="password" borderBottom>
                    <u-input v-model="form.password" type="password" placeholder="请输入密码" />
                </u-form-item>
                <u-form-item label="确认密码" prop="confirmPassword" borderBottom>
                    <u-input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" />
                </u-form-item>
                <u-form-item label="验证码" prop="captcha" borderBottom>
                    <view class="captcha-box">
                        <u-input v-model="form.captcha" placeholder="请输入验证码" />
                        <image class="captcha-img" :src="captchaUrl" @tap="refreshCaptcha"></image>
                    </view>
                </u-form-item>
            </u-form>

            <view class="btn-box">
                <u-button type="primary" text="注册" @click="handleRegister"></u-button>
                <view class="login-link">
                    <text>已有账号？</text>
                    <text class="link" @click="goToLogin">立即登录</text>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        // 自定义验证规则：确认密码
        const validateConfirmPassword = (rule, value, callback) => {
            if (value !== this.form.password) {
                callback(new Error('两次输入的密码不一致'));
            } else {
                callback();
            }
        };

        return {
            form: {
                username: '',
                password: '',
                confirmPassword: '',
                captcha: ''
            },
            rules: {
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 20, message: '用户名长度在3-20个字符之间', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' }
                ],
                confirmPassword: [
                    { required: true, message: '请再次输入密码', trigger: 'blur' },
                    { validator: validateConfirmPassword, trigger: 'blur' }
                ],
                captcha: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { len: 4, message: '验证码长度为4位', trigger: 'blur' }
                ]
            },
            // Remove the errorType array and use it directly in the template
            captchaUrl: '/api/captcha?' + Date.now() // 初始验证码
        }
    },
    onReady() {
        this.$refs.uForm.setRules(this.rules);
    },
    methods: {
        // 刷新验证码
        refreshCaptcha() {
            this.captchaUrl = '/api/captcha?' + Date.now();
        },

        // 处理注册
        handleRegister() {
            this.$refs.uForm.validate(valid => {
                if (valid) {
                    uni.showLoading({
                        title: '注册中...'
                    });

                    // 发送注册请求
                    uni.request({
                        url: '/api/register',
                        method: 'POST',
                        data: this.form,
                        success: (res) => {
                            if (res.data.code === 200) {
                                // 注册成功
                                uni.showToast({
                                    title: '注册成功',
                                    icon: 'success'
                                });

                                // 跳转到登录页面
                                setTimeout(() => {
                                    uni.navigateTo({
                                        url: '/pages/login/login'
                                    });
                                }, 1500);
                            } else {
                                // 注册失败
                                uni.showToast({
                                    title: res.data.message || '注册失败',
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
                        },
                        complete: () => {
                            uni.hideLoading();
                        }
                    });
                }
            });
        },

        // 跳转到登录页面
        goToLogin() {
            uni.navigateTo({
                url: '/pages/login/login'
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.register-container {
    padding: 40rpx;

    .title {
        font-size: 36rpx;
        font-weight: bold;
        text-align: center;
        margin: 60rpx 0;
        color: #333;
    }

    .form-box {
        margin-top: 40rpx;

        .captcha-box {
            display: flex;
            align-items: center;

            .captcha-img {
                width: 200rpx;
                height: 80rpx;
                margin-left: 20rpx;
            }
        }

        .btn-box {
            margin-top: 60rpx;

            .login-link {
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