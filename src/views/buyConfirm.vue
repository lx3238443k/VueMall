<template>
	<div>
			<nav-header></nav-header>
			<nav-bread>
				<li slot = 'second'>
						<a href="#">Cart</a>
					</li>
				
				<li class="active" slot = 'active'>Buy</li>
			</nav-bread>
		
			<rate-line v-bind:falg="2"></rate-line>
			<section class="body-cart">
		  		<div class="cart-title" style="width: 80%;margin: 0 auto;">
		  			<span>结算列表</span>
		  		</div>
		  		
		  		<table border="1" cellspacing="0" cellpadding="0" class="cart-list">
		  			<tr class="title">
		  				<th colspan="2">商品</th>
		  				<th>单价</th>
		  				<th>数量</th>
		  				<th>总价</th>
		  				
		  				
		  				
		  			</tr>
		  			<tr v-for="item in cartList" v-if="item.checked==1">
		  				<td>
		  					
		  					<span>{{item.productName}}</span>
		  				</td>
		  				<td>
		  					<img v-bind:src="'../../static/img/'+item.productImg" height="200"/>
		  				</td>
		  				<td>
		  					<span>{{item.productPrice | currency('¥')}}</span>
		  				</td>
		  				<td>
		  					<div class="num-ctr">
		  						
		  						<div class="num" >
		  							<span>{{item.productNum}}</span>
		  						</div>
		  				
		  					</div>
		  				</td>
		  				<td>
		  					<span>{{(item.productPrice*item.productNum) | currency('¥')}}</span>
		  				</td>
		  				
		  			</tr>
		  			
		  		</table>
	  		</section>
			<section class="buy-list">
				<ul>
					<li>
						<span>商品小计：</span>
						<span>{{totalPrice | currency('¥')}}</span>
					</li>
					<li>
						<span>运费：</span>
						<span>{{roadPrice | currency('¥')}}</span>
					</li>
					<li>
						<span>折扣：</span>
						<span>{{sales | currency('¥')}}</span>
					</li>
					<li>
						<span>订单总额：</span>
						<span style="color: orangered;">{{(totalPrice - sales + roadPrice) | currency('¥')}}</span>
					</li>
				</ul>
			</section>
			<section class="liucq" style="width: 90%;margin: 10px auto;">
				<div style="float: left;">
					<router-link to="/address">LAST</router-link>
						
					
				</div>
				<div style="float: right;" @click="payMent">
					<a>NEXT</a>
				</div>
			</section>
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
				cartList:[],
				sales:700,
				roadPrice:10,
				orderPrice:0
			
				
			}
		},
		components:{
			NavHeader,
			NavFooter,
			NavBread,
			RateLine,
			Modal
		},
		computed:{
			totalPrice(){
				var money = 0 ;
				this.cartList.forEach((item)=>{
					if(item.checked ==1){
						money += parseFloat(item.productPrice)*parseInt(item.productNum);
					}
				});
				return money;
			}
		
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){
				axios.get("/users/cartList").then((resp)=>{
					let res = resp.data;
					this.cartList = res.result;
					console.log(res.result);
					console.log(this.cartList);
				});
			},
			payMent(){
				
				let addressId = this.$route.query.addressId;
				this.orderPrice =this.totalPrice -this.sales + this.roadPrice;
				axios.post("/users/payMent",{
					addressId:addressId,
					totalPrice:this.orderPrice,
					roadPrice:this.roadPrice,
					sales:this.sales
				}).then((resp)=>{
					let res = resp.data;
					if(res.status == '0'){
						console.log(res);
						this.$router.push({
							path:`/orderSuccess?orderId=${res.result.orderId}`
						});
					}
				})
			}
		}
	}
</script>

