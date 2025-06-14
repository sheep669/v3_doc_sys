<template>
	<view class="doctor-booking">
		<view class="doctor" v-if="doctor" :class="['doctor-card']">
			<view class="doctor-info">
				<view class="doctor-basic-info">
					<!-- 左侧简介 -->
					<view class="doctor-details">
						<view class="doctor-name-position">
							<text class="doctor-name">{{ doctor.name }}</text>
							<text class="doctor-position">{{ doctor.position }}</text>
						</view>
						<text class="doctor-department">{{ getDepartmentName(doctor.departmentId) }}</text>
						<view class="doctor-tags">
							<up-tag bgColor="#32b16c" color="#fff" size="mini">{{ doctor.character1 }}</up-tag>
							<up-tag bgColor="#32b16c" color="#fff" size="mini">{{ doctor.character2 }}</up-tag>
						</view>
					</view>
					<!-- 右侧头像 -->
					<up-image :show-loading="true" :src="doctor.avatar" width="80px" height="80px" class="doctor-image" />
				</view>
				<up-button primary color="#32b16c" style="margin-top: 15px;" @click="showPopup = true">
					在线预约
				</up-button>
			</view>

			<!-- 弹出框 -->
			<up-popup :show="showPopup" mode="center" @close="closePopup" class="custom-popup">
				<view class="popup-content">
					<view class="popup-header">
						<text class="cancel-btn" @click="closePopup">取消</text>
						<text class="popup-title">筛选</text>
						<text class="reset-btn" @click="resetSelections">重置</text>
					</view>

					<view class="date-section">
						<view class="section-title">日期选择</view>
						<up-datetime-picker hasInput placeholder="请选择日期" mode="datetime" v-model="currentSelectedTime">
						</up-datetime-picker>
					</view>

					<view class="submit-section">
						<up-button primary color="#32b16c" style="width: 100%;" @click="submitBooking">
							确认预约
						</up-button>
					</view>
				</view>
			</up-popup>
		</view>
	</view>
</template>

<style scoped>
.doctor-basic-info {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	gap: 15px;
	margin-bottom: 15px;
}

.doctor-details {
	flex: 1;
	text-align: left;
}

.doctor-image {
	border-radius: 50%;
	flex-shrink: 0;
}
</style>

<script setup>
import { useStringStore } from '@/stores/stringStore'; // 引入 Pinia Store
import {
	ref
} from 'vue';
const currentSelectedTime = ref(null);

const stringStore = useStringStore()

const emit = defineEmits(['booking-confirmed']);


const submitBooking = () => {
	if (!currentSelectedTime.value) {
		uni.showToast({
			title: '请选择预约时间',
			icon: 'none'
		});
		return;
	}
	const bookingInfo = props.doctor;
	// 将时间戳转换为数据库要求的格式
	const date = new Date(currentSelectedTime.value);
	const formattedTime = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}:${String(date.getSeconds()).padStart(2, '0')}`;
	console.log(formattedTime)
	bookingInfo.selectedTime = formattedTime;
	emit('booking-confirmed', bookingInfo);
	closePopup();
};
const resetSelections = () => {
	currentSelectedTime.value = null;
}



// 获取科室列表
const getDepartmentName = (departmentId) => {
	const department = stringStore.state.departmentId.find(item => item.value === departmentId);
	return department ? department.label : '';
};
// 定义组件接收的属性
const props = defineProps({
	doctor: {
		type: Object,
		required: true
	}
});

// 控制弹出框显示/隐藏
const showPopup = ref(false);


// 关闭弹出框的方法
const closePopup = () => {
	showPopup.value = false;
};

</script>

<style scoped>
.doctor-booking {
	width: 100%;
}

.doctor {
	text-align: center;
	margin: 10px;
}

.doctor-card {
	border-radius: 8px;
	padding: 10px;
	box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
	background-color: #ffffff;
}

.doctor-info {
	margin-top: 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
}

.doctor-name-position {
	display: flex;
	justify-content: space-between;
	width: 100%;
}

.doctor-name {
	font-size: 16px;
	font-weight: bold;
	color: #333;
}

.doctor-position {
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

/* 弹出框的样式 */
.custom-popup {
	width: 80%;
	height: auto;
	max-height: 80%;
	overflow-y: auto;
}

.popup-content {
	padding: 0;
	background-color: white;
	border-radius: 10px;
	box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
}

.popup-header {
	display: flex;
	justify-content: space-between;
	align-items: center;
	padding: 15px;
	border-bottom: 1px solid #eee;
}

.popup-title {
	font-size: 16px;
	font-weight: bold;
	color: #333;
}

.cancel-btn {
	color: #666;
	font-size: 14px;
}

.reset-btn {
	color: #32b16c;
	font-size: 14px;
}

.section-title {
	font-size: 14px;
	color: #333;
	margin-bottom: 10px;
}

.date-section,
.time-section,
.type-section,
.submit-section {
	padding: 15px;
	border-bottom: 1px solid #eee;
}

.date-month {
	display: flex;
	justify-content: center;
	margin-bottom: 10px;
}

.month-nav {
	font-size: 14px;
	color: #32b16c;
	cursor: pointer;
	padding: 0 10px;
	font-size: 16px;
}

.month-text {
	font-size: 14px;
	font-weight: bold;
	margin: 0 10px;
	color: #333;
}

.date-days {
	display: flex;
	justify-content: space-between;
}

.day-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 50px;
	padding: 8px 0;
	border-radius: 5px;
}

.day-item.active {
	background-color: #32b16c;
	color: white;
}

.day-name {
	font-size: 12px;
	margin-bottom: 5px;
}

.day-number {
	font-size: 16px;
	font-weight: bold;
}

.time-slots {
	display: flex;
	justify-content: space-around;
}

.time-slot {
	margin-left: 4px;
	padding: 6px 10px;
	border: 1px solid #ddd;
	border-radius: 5px;
	font-size: 14px;
	color: #333;
}

.time-slot.active {
	background-color: #32b16c;
	color: white;
	border-color: #32b16c;
}

.type-options {
	display: flex;
	gap: 15px;
}

.type-option {
	padding: 8px 20px;
	border: 1px solid #ddd;
	border-radius: 5px;
	font-size: 14px;
	color: #333;
}

.type-option.active {
	background-color: #32b16c;
	color: white;
	border-color: #32b16c;
}

.submit-section {
	border-bottom: none;
}
</style>