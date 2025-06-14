<template>
	<view class="purchase-container">
		<up-cate-tab class="cate-tab" :tabList="medicineCategories" tabKeyName="name" itemKeyName="name"
			activeColor="#32b16c" lineColor="#32b16c">
			<template #pageItem="{pageItem}">
				<view class="w-full">
					<up-cell-group :border='false'>
						<up-cell :border='false'>
							<template #icon>
								<up-image :src="pageItem.image" width="80px" height="80px"></up-image>
							</template>
							<template v-slot:title>
								<view class="medicine-name">
									{{ pageItem.name }}
								</view>
							</template>
							<template v-slot:label>
								<view class="medicine-spec">{{ pageItem.spec }}</view>
								<view class="pt-1">
									<text class="current-price">￥{{ pageItem.currentPrice }}</text>
									<text class="original-price">￥{{ pageItem.originalPrice }}</text>
								</view>
								<view class="cart-button">
									<up-number-box v-model="pageItem.quantity" :min="0" color="#32b16c"></up-number-box>
								</view>
							</template>
							<template v-slot:value>
							</template>
						</up-cell>
					</up-cell-group>
				</view>
			</template>
		</up-cate-tab>
		<view class="cart-fixed-button" @click="navigateToCart">
			<up-badge :value="totalNum" shape="dot" v-if="totalNum>0"></up-badge>
			<view class="price-info">
				<text style="width: 20px;" >总计</text>
				<text class="total-price">¥{{totalPrice}}</text>
			</view>
			<up-button color="#32b16c" text="选好了,去结算" shape="circle"></up-button>
		</view>
	</view>
</template>

<script setup>
	import {
		ref
	} from 'vue';
	
	const navigateToCart=()=>{}
	
	const totalNum=ref(0)
	const totalPrice=ref(0)

	// 药品分类和列表数据
	const medicineCategories = ref([{
			name: '中药',
			children: [{
					name: '中理接骨七层片15片4板盒活血化瘀接骨',
					spec: '5盒',
					currentPrice: '89.00',
					originalPrice: '99.00',
					image: '/static/purchase/medicine1.jpg'
				},
				{
					name: 'OTC药品同仁堂仁乌鸡白凤丸补气养血调经止月经不调',
					spec: '3盒',
					currentPrice: '89.00',
					originalPrice: '99.00',
					image: '/static/purchase/medicine2.jpg'
				}
			]
		},
		{
			name: '西药',
			children: [{
				name: '白云山701跌打镇痛膏12贴急慢性扭伤止痛散瘀通络关节痛药品正品',
				spec: '1盒',
				currentPrice: '89.00',
				originalPrice: '99.00',
				image: '/static/purchase/medicine3.jpg'
			}]
		},
		{
			name: '男科药',
			children: [{
				name: '陈李济壮骨关节丸72丸健骨和胃泻热止痛缓解腰腿痛膝关节痛药品',
				spec: '20瓶',
				currentPrice: '89.00',
				originalPrice: '99.00',
				image: '/static/purchase/medicine4.jpg'
			}]
		},
		{
			name: '外伤药',
			children: [{
				name: '云南白药创可贴防水透气弹力创口贴',
				spec: '100片',
				currentPrice: '29.00',
				originalPrice: '39.00',
				image: '/static/purchase/medicine1.jpg'
			}]
		},
		{
			name: '抗菌药',
			children: [{
				name: '阿莫西林胶囊抗生素消炎药',
				spec: '24粒',
				currentPrice: '15.00',
				originalPrice: '20.00',
				image: '/static/purchase/medicine2.jpg'
			}]
		},
	]);
</script>

<style scoped>
	.purchase-container {
		height: 100vh;
		background-color: #f5f5f5;
	}

	.cate-tab {
		height: calc(100vh - 10px);
	}

	.medicine-name {
		font-size: 14px;
		color: #333;
		line-height: 1.4;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.medicine-spec {
		font-size: 12px;
		color: #999;
		margin-top: 5px;
	}

	.current-price {
		font-size: 16px;
		color: #ff5722;
		font-weight: bold;
		margin-right: 5px;
	}

	.original-price {
		font-size: 12px;
		color: #999;
		text-decoration: line-through;
	}

	.cart-button {
		margin-left: 10px;
	}

	.u-cate-tab__item-active[data-v-963a5e40]::before {
		border-left: 4px solid #32b16c;
	}

	.cart-fixed-button {
		position: fixed;
		bottom: 52px;
		left: 10px;
		right: 10px;
		z-index: 999;
		background-color: #333;
		border-radius: 25px;
		padding: 8px 12px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.cart-fixed-button .price-info {
		color: #fff;
		font-size: 14px;
		display: flex;
		flex-direction: column;
		padding-left: 6px;
		margin-right: 15px;
	}

	.cart-fixed-button .total-price {
		font-size: 18px;
		font-weight: bold;
	}

	.cart-fixed-button .discount-price {
		font-size: 12px;
		color: #999;
	}

	.cart-fixed-button :deep(.up-button) {
		border: none;
		padding: 8px 16px;
		border-radius: 20px;
		color: #333;
		width: 80px;
	}
	:deep(.up-image) {
		margin-right: 12px;
	}
</style>