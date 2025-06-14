<template>
	<view class="chat-container">
		<view class="chat-messages" scroll-y>
			<view v-for="(message, index) in chatMessages" :key="index"
				:class="['message', message.fromUser ? 'user-message' : 'bot-message']">
				<up-image class="avatar" :src="message.fromUser ? avatars.user : avatars.doctor" width="40px"
					height="40px" />
				<view class="message-content">
					<view class="message-inner">
						<text class="message-text">{{ message.text }}</text>
						<text class="message-timestamp">{{ message.timestamp }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="chat-input-container">
			<input v-model="userInput" @confirm="sendMessage" placeholder="请问你要咨询什么..." class="chat-input" />
			<button @click="sendMessage" class="send-button">发送</button>
		</view>
	</view>
</template>

<script>
	import {
		ref,
		computed,
		onMounted
	} from 'vue';
	import OpenAI from 'openai';

	export default {
		setup() {
			const chatMessages = ref([]);
			const userInput = ref('');
			const botName = '医生';

			// 使用相对路径
			const avatars = ref({
				user: '/static/AI/user.png',
				doctor: '/static/AI/doctor.png',
			});

			// 修改为 Baichuan API 配置
			const openai = new OpenAI({
				baseURL: 'https://api.baichuan-ai.com/v1',
				apiKey: 'sk-af6655c76ea3c104d30266995e1eeb98', // 请替换为您的 API key
				dangerouslyAllowBrowser: true,
			});

			const sendMessage = async () => {
				if (userInput.value.trim()) {
					const userMessage = {
						text: userInput.value,
						fromUser: true,
						timestamp: new Date().toLocaleTimeString(),
						avatar: avatars.user
					};
					chatMessages.value.push(userMessage);

					try {
						const completion = await openai.chat.completions.create({
							model: 'Baichuan2-Turbo',
							messages: [{
									role: 'system',
									content: '你是一位专业的医生助手。请只回答与医疗健康相关的问题。如果用户询问与医疗无关的问题，请礼貌地提醒他们这是一个医疗咨询平台。保持专业、严谨的态度，使用平易近人的语言。不要给出具体的诊断和用药建议，而是提供一般性的健康建议和指导。对于严重的症状，建议用户及时就医。'
								},
								{
									role: 'user',
									content: userInput.value
								}
							],
							temperature: 0.3,
							stream: false
						});

						const botMessage = {
							text: completion.choices[0].message.content,
							fromUser: false,
							timestamp: new Date().toLocaleTimeString(),
							avatar: avatars.doctor
						};
						chatMessages.value.push(botMessage);
					} catch (error) {
						console.error('API Error:', error);
						let errorMessage = botName + '：抱歉，我遇到了一个错误。请稍后再试。';
						if (error.status === 402) {
							errorMessage = botName + '：余额不足。请给您的帐户充值。';
						}
						chatMessages.value.push({
							text: errorMessage,
							fromUser: false,
							timestamp: new Date().toLocaleTimeString(),
							avatar: avatars.doctor
						});
					}

					userInput.value = '';
				}
			};

			return {
				chatMessages,
				userInput,
				sendMessage,
				botName,
				avatars,
			};
		},
	};
</script>

<style scoped>
	.chat-container {
		background-color: #fff;
		display: flex;
		flex-direction: column;
		height: calc(100% - 45px);
		min-height: 600px;
		max-height: calc(100vh - 165px);
		padding: 0;
		margin: 10px auto;
		border: 1px solid #eee;
		border-radius: 8px;
		position: relative;
	}

	.chat-messages {
		flex: 1;
		padding: 12px;
		overflow-y: auto;
		overflow-x: hidden;
		background-color: #f7f7f7;
	}

	.message {
		margin-bottom: 12px;
		display: flex;
		align-items: flex-start;
		gap: 8px;
	}

	.user-message {
		flex-direction: row-reverse;
	}

	.message-content {
		display: inline-block;
		max-width: calc(60% - 48px);
		min-width: 40px;
		padding: 8px 12px;
		border-radius: 16px;
		position: relative;
		font-size: 14px;
		line-height: 1.4;
	}

	.message-inner {
		display: flex;
		align-items: flex-start;
		gap: 8px;
	}

	.message-text {
		flex: 1;
		word-wrap: break-word;
		white-space: pre-wrap;
		padding-top: 2px;
	}

	.message-timestamp {
		font-size: 12px;
		color: #999;
		white-space: nowrap;
		margin-top: 4px;
	}

	.user-message .message-content {
		background-color: #95ec69;
		color: #000000;
		border-top-right-radius: 4px;
	}

	.bot-message .message-content {
		background-color: #ffffff;
		color: #000000;
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
		border-top-left-radius: 4px;
	}

	.chat-input-container {
		display: flex;
		padding: 8px;
		background-color: #f7f7f7;
		border-top: 1px solid #eee;
		height: 50px;
		align-items: center;
	}

	.chat-input {
		flex: 1;
		padding: 8px 12px;
		border: none;
		border-radius: 20px;
		margin-right: 8px;
		background-color: #ffffff;
		font-size: 14px;
	}

	.chat-input:focus {
		outline: none;
		box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
	}

	.send-button {
		padding: 4px 8px;
		background-color: #07c160;
		color: white;
		border: none;
		border-radius: 24px;
		cursor: pointer;
		font-size: 14px;
		transition: background-color 0.3s ease;
		width: 100px;
	}

	.send-button:hover {
		background-color: #06ae56;
	}

	.send-button:active {
		background-color: #059a4f;
		transform: scale(0.98);
	}
</style>



