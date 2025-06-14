<template>
	<view class="order-container">
		<!-- 订单标题栏 -->
		<view class="order-header">
			<view class="order-title">
				<up-icon name="file-text" size="22" color="#32b16c"></up-icon>
				<text class="title-text">我的问诊</text>
			</view>
		</view>

		<!-- 状态标签栏 -->
		<view class="status-tabs">
			<view v-for="(tab, index) in tabs" :key="index"
				:class="['tab-item', { active: currentTab === index }]" @click="switchTab(index)">
				<text>{{ tab.name }}</text>
			</view>
		</view>

		<!-- 订单列表 -->
		<scroll-view scroll-y class="order-list">
			<view v-for="(order, index) in filteredOrders" :key="index" class="order-card">
				<view class="doctor-info">
					<up-image src="/static/home/doctor1.png" width="50px" height="50px" shape="circle"></up-image>
					<view class="info-content">
						<view class="name-dept">
							<text class="doctor-name">{{ order.doctorName }}</text>
							<text class="department">{{ order.department }}</text>
						</view>
						<text class="appointment-time">{{ order.time }}</text>
					</view>
					<view class="order-status">
						<text :class="['status-text', order.status]">{{ getStatusText(order.status) }}</text>
					</view>
				</view>
				<view class="order-actions">
					<up-button v-if="order.status === 'pending'" class="action-btn cancel" @click="cancelOrder(order.id)">取消预约</up-button>
					<up-button v-if="order.status === 'completed'" class="action-btn review" @click="reviewOrder(order.id)">评价</up-button>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script setup>
import { ref, computed } from 'vue';

// 标签页数据
const tabs = ref([
	{ name: '全部', status: 'all' },
	{ name: '待就诊', status: 'pending' },
	{ name: '已完成', status: 'completed' },
	{ name: '已取消', status: 'cancelled' }
]);

const currentTab = ref(0);

// 模拟订单数据
const orders = ref([
	{
		id: 1,
		doctorName: '张医生',
		department: '神经内科',
		time: '2024-01-20 14:30',
		status: 'pending'
	},
	{
		id: 2,
		doctorName: '李医生',
		department: '心内科',
		time: '2024-01-18 09:30',
		status: 'completed'
	},
	{
		id: 3,
		doctorName: '王医生',
		department: '骨科',
		time: '2024-01-15 16:00',
		status: 'cancelled'
	}
]);

// 根据当前标签筛选订单
const filteredOrders = computed(() => {
	const status = tabs.value[currentTab.value].status;
	return status === 'all' ? orders.value : orders.value.filter(order => order.status === status);
});

// 切换标签
const switchTab = (index) => {
	currentTab.value = index;
};

// 获取状态文本
const getStatusText = (status) => {
	const statusMap = {
		pending: '待就诊',
		completed: '已完成',
		cancelled: '已取消'
	};
	return statusMap[status];
};

// 取消预约
const cancelOrder = (orderId) => {
	// TODO: 实现取消预约逻辑
	uni.showModal({
		title: '提示',
		content: '确定要取消预约吗？',
		success: function(res) {
			if (res.confirm) {
				// 更新订单状态
				const order = orders.value.find(o => o.id === orderId);
				if (order) {
					order.status = 'cancelled';
				}
			}
		}
	});
};

// 评价订单
const reviewOrder = (orderId) => {
	// TODO: 跳转到评价页面
	uni.showToast({
		title: '即将跳转到评价页面',
		icon: 'none'
	});
};
</script>

<style scoped>
.order-container {
	background-color: #f5f5f5;
	min-height: 100vh;
}

.order-header {
	background-color: #fff;
	padding: 15px;
	border-bottom: 1px solid #eee;
}

.order-title {
	display: flex;
	align-items: center;
}

.title-text {
	margin-left: 8px;
	font-size: 16px;
	font-weight: bold;
	color: #333;
}

.status-tabs {
	display: flex;
	background-color: #fff;
	padding: 10px 0;
	border-bottom: 1px solid #eee;
}

.tab-item {
	flex: 1;
	text-align: center;
	padding: 8px 0;
	font-size: 14px;
	color: #666;
}

.tab-item.active {
	color: #32b16c;
	font-weight: bold;
}

.order-list {
	height: calc(100vh - 110px);
	padding: 15px 15px 15px 0;
	margin-left: 15px;
	overflow: visible;
}

.order-card {
	background-color: #fff;
	border-radius: 12px;
	padding: 15px;
	margin-bottom: 15px;
	margin-right: 28px;
	box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
	transition: all 0.3s ease;
}

.order-card:hover {
	transform: translateY(-2px);
	box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.doctor-info {
	display: flex;
	align-items: center;
}

.info-content {
	flex: 1;
	margin-left: 15px;
}

.name-dept {
	display: flex;
	align-items: center;
	margin-bottom: 6px;
}

.doctor-name {
	font-size: 17px;
	font-weight: 600;
	color: #333;
	margin-right: 10px;
}

.department {
	font-size: 13px;
	color: #666;
	background-color: #f0f0f0;
	padding: 3px 8px;
	border-radius: 6px;
}

.appointment-time {
	font-size: 14px;
	color: #888;
}

.order-status {
	padding-left: 20px;
}

.status-text {
	font-size: 15px;
	font-weight: 500;
	padding: 4px 10px;
	border-radius: 6px;
}

.status-text.pending {
	color: #32b16c;
	background-color: rgba(50, 177, 108, 0.1);
}

.status-text.completed {
	color: #666;
	background-color: #f5f5f5;
}

.status-text.cancelled {
	color: #999;
	background-color: #f0f0f0;
}

.order-actions {
	display: flex;
	justify-content: flex-end;
	margin-top: 15px;
	padding-top: 15px;
	border-top: 1px solid #eee;
}

.action-btn {
	padding: 8px 20px;
	font-size: 14px;
	border-radius: 6px;
	margin-left: 12px;
	transition: all 0.3s ease;
}

.action-btn.cancel {
	background-color: #fff;
	color: #666;
	border: 1px solid #ddd;
}

.action-btn.cancel:hover {
	background-color: #f5f5f5;
	border-color: #ccc;
}

.action-btn.review {
	background-color: #32b16c;
	color: #fff;
	border: none;
}

.action-btn.review:hover {
	background-color: #2a9d5d;
}
</style>