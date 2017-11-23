<template>
	<div>
			<nav-header></nav-header>
			<nav-bread>
				<li slot = 'second'>
						<a href="#">Pay</a>
					</li>
				
				<li class="active" slot = 'active'>Success</li>
			</nav-bread>
		
			<rate-line v-bind:falg="4"></rate-line>
			<div class="order-suc">
				<h2>恭喜你，你的订单已经完成！</h2>
				<h3>你可以继续购物了！以下是您的订单信息</h3>
				<p>
					<span>订单号：{{orderId}}</span>
					<span>订单总价：{{orderPrice}}</span>
				</p>
				<div class="btn-ord">
					<router-link to="/cart">返回购物车</router-link>
					<router-link to="/">继续购物</router-link>
				</div>
			</div>
			<nav-footer></nav-footer>
	</div>
</template>

<script>
	import './../assets/css/reset.css'
	import './../assets/css/index.css'


	import NavHeader from '@/components/NavHeader.vue'
	import NavFooter  from '@/components/NavFooter.vue'
	import NavBread  from '@/components/NavBread.vue'
	import RateLine  from '@/components/RateLine.vue'
	import Modal from '@/components/Modal.vue'
	import axios from 'axios'
	export default{
		data(){
			return {
				orderId:'',
				orderPrice:''
			}
		},
		components:{
			NavHeader,
			NavFooter,
			NavBread,
			RateLine,
			Modal
		},
		mounted(){
			
			let orderId = this.$route.query.orderId;
			this.orderId = orderId;
			
			let param ={
				orderId:orderId
				
			}
			axios.get("/users/ordersuc",{
				params:param
			}).then((resp)=>{
				let res = resp.data;
				if(res.status=='0'){
					console.log(res);
					this.orderPrice = res.result.totalPrice;
				}
				
			})
		},
		methods:{
			
		}
	}
</script>

<style>
	
	.order-suc {
		padding: 20px 0;
	}
	
	
	.order-suc h2{
		font-size: 30px;
	}
	
	.order-suc h3{
			font-size: 18px;
		}
	
	.order-suc p{
		font-size: 16px;
	}	
	
	.btn-ord a{
		display: inline-block;
		width: 130px;
		height: 30px;
		line-height: 30px;
		font-size: 18px;
		margin-right: 10px;
		border: 1px solid #2C3E50;
		
	}	

		
</style>
