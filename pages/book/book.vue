<template>
	<view class="container">
		<!-- 首页点击某个医生 -->
		<view v-if="selectedDoctor">
			<doctor-booking :doctor="selectedDoctor" @booking-confirmed="handleBookingConfirmed"></doctor-booking>
		</view>
		<!-- 点击在线预约按钮 -->
		<view v-else class="doctor-list">
			<view class="doctor" v-for="(doctor, index) in doctors" :key="index" :class="['doctor-card']" @click="selectDoctor(doctor)">
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
					<up-button primary color="#32b16c" style="margin-top: 15px;" @click.stop="selectDoctor(doctor)">
						选择医生
					</up-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script setup>
	import {
		useStringStore
	} from '@/stores/stringStore'; // 引入 Pinia Store
	import constant from "@/constant/api/index.js";
	import {
		doGetRequest,
		doPostRequest
	} from "@/api/index";

	import {
		ref,
		onMounted
	} from 'vue';
	import DoctorBooking from '../../components/DoctorBooking.vue';

	// 选中的医生
	const selectedDoctor = ref(null);

	// 选择医生
	const selectDoctor = (doctor) => {
		selectedDoctor.value = doctor;
	};

	// 处理预约确认
	const handleBookingConfirmed = (bookingInfo) => {
		console.log('预约信息:', bookingInfo);
		doPostRequest(constant.doctor.updateUrl, bookingInfo).then(res => {
			if (res.data.code === 200) {
				uni.showToast({
					title: '预约成功',
					icon: 'success'
				});
			}

		})
	};


	const stringStore = useStringStore()

	// 获取科室列表
	const getDepartmentName = (departmentId) => {
		const department = stringStore.state.departmentId.find(item => item.value === departmentId);
		return department ? department.label : '';
	};
	console.log(getDepartmentName(1))

	const doctors = ref([]);
	//获取医生数据
	const getDoctorData = async () => {
		const res = await doGetRequest(
			constant.doctor.getAllUrl
		);
		if (res.data.code === 200) {
			doctors.value = res.data.data.records;
		} else {
			uni.showToast({
				title: '网络错误',
				icon: 'error'
			});
		}
	};


	onMounted(() => {
		const pages = getCurrentPages();
		const currentPage = pages[pages.length - 1];
		const options = currentPage.options;

		if (options.doctor) {
			try {
				selectedDoctor.value = JSON.parse(decodeURIComponent(options.doctor));
			} catch (error) {
				console.error('解析医生信息失败:', error);
			}
		} else {
			//setup包含了生命周期函数
			getDoctorData();
		}
	});
</script>

<style>
	.container {
		padding: 20px;
		background-color: #ffffff;
	}

	.doctor-list {
		display: flex;
		flex-direction: column;
		gap: 15px;
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

	.doctor-image {
		border-radius: 50%;
		margin-bottom: 10px;
		align-self: center;
	}
</style>

<style>
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

/* 其他样式保持不变 */
</style>