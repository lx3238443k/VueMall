<template>
	<div>
	  <nav-header></nav-header>
	  <nav-bread>
				
				<li class="active" slot = 'active'>Cart</li>
		</nav-bread>
	  <section class="body-cart">
	  		<div class="cart-title">
	  			<span>购物车列表</span>
	  		</div>
	  		
	  		<table border="1" cellspacing="0" cellpadding="0" class="cart-list">
	  			<tr class="title">
	  				<th colspan="2">商品</th>
	  				<th>单价</th>
	  				<th>数量</th>
	  				<th>总价</th>
	  				<th>编辑</th>
	  				
	  				
	  			</tr>
	  			<tr v-for="item in cartList">
	  				<td>
	  					<a href="javascript:;" class="select-btn" v-bind:class="{'check':item.checked==1}" @click="editCart('checked',item)"></a>
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
	  						<div class="btn" @click="editCart('add',item)" >+</div>
	  						<div class="num" >
	  							<span>{{item.productNum}}</span>
	  						</div>
	  						<div class="btn" @click="editCart('minus',item)">-</div>
	  					</div>
	  				</td>
	  				<td>
	  					<span>{{(item.productPrice*item.productNum) | currency('¥')}}</span>
	  				</td>
	  				<td>
	  					<div class="delet" @click="delCartConfirm(item.productId,item.productNum)">
	  						删
	  					</div>
	  				</td>
	  			</tr>
	  			
	  			
	  		</table>
	  		
	  		<div class="jiesuan">
	  			<div @click="togCheckAll">
	  				<i class="select-btn" v-bind:class="{'check':checkAll == true}" ></i>
	  				<span>全选</span>
	  			</div>
	  			<div>
	  				<span>{{totalPrice | currency('¥')}}</span>
	  			</div>
	  			<div  class="btn-ck" v-bind:class="{'btn-dis':checkedCount == 0}" @click="checkOut">结算</div>
	  		</div>
	  </section>
	  
	  <modal  v-bind:mdShow="modalConfirm" v-on:close="closeModal">
	  	  <p slot="message">你确认要删除数据吗？</p>
	  	  <div slot="btn-group">
	  	  	 	<a @click="modalConfirm = false">取消</a>
	  	  	 	<a @click="deletCart ">确认</a>
	  	  </div>
	  </modal>
	  <nav-footer></nav-footer>
	</div>
</template>

<script>
	import './../assets/css/reset.css'
	import './../assets/css/index.css'
	import './../assets/css/cart.css'
	import NavHeader from '@/components/NavHeader.vue'
	import NavFooter  from '@/components/NavFooter.vue'
	import NavBread  from '@/components/NavBread.vue'
	import Modal from '@/components/Modal.vue'
	import axios from 'axios'
	
	
	export default{
		data(){
			return {
				cartList:[],
				modalConfirm:false,
				productId:'',
				productNum:0
				
			}
		},
		components:{
			NavHeader,
			NavFooter,
			NavBread,
			Modal
		},
		mounted(){
			this.init();
		},
		computed:{
			checkAll(){
				return this.checkedCount == this.cartList.length;
			},
			checkedCount(){
				var i =0;
				this.cartList.forEach((item)=>{
					if(item.checked==1) i++;
				})
				return i;
			},
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
		methods:{
			init(){
				axios.get("/users/cartList",{
					
				}).then((result)=>{
					let res = result.data;
					this.cartList = res.result; 
					
				});
			},
			closeModal(){
				this.modalConfirm =false;
			},
			delCartConfirm(productId,productNum){
				this.productId = productId; 
				this.productNum = productNum;
				this.modalConfirm = true;	
			},
			deletCart(){
				console.log('shan');
				axios.post("/users/cartDel",{
					productId:this.productId
				}).then((resp)=>{
					let res = resp.data;
					if(res.status == '0'){
						this.modalConfirm =false;
						this.init();
						this.$store.commit("updateCart",-this.productNum);
					
					}
				})
			},
			editCart(flag,item){
				if(flag == 'add'){
					item.productNum++;
					this.$store.commit("updateCart",1);
				}
				else if(flag =='minus'){
					if(item.productNum<=1){
						return ;
					}
					item.productNum--;
					this.$store.commit("updateCart",-1);
				}else{
					item.checked = item.checked ==1?0:1; //取反..6666
				}
				
				axios.post("/users/cartEdit",{
					productId:item.productId,
					productNum:item.productNum,
					checked:item.checked
				}).then((resp)=>{
					let res = resp.data;
					console.log(res);
				})
			},
			togCheckAll(item){
				let flag  =!this.checkAll;
				this.cartList.forEach((item)=>{
					item.checked =flag?1:0;
				});
				axios.post("/users/editCheckAll",{
					checkAll:flag
				}).then((resp)=>{
					let res = resp.data;
					if(res.status==0){
						console.log("update suc");
					}
				})
			},
			checkOut(){
				if(this.checkedCount>0){
					this.$router.push({
						path:"/address"
					})
				}
			}
			
		}
		
	}
	
</script>

<style>
</style>