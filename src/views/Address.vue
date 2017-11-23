<template>
	<div>
		<nav-header></nav-header>
		<nav-bread>
			<li slot = 'second'>
					<a href="#">Cart</a>
				</li>
			
			<li class="active" slot = 'active'>Address</li>
		</nav-bread>
		<rate-line v-bind:falg="1"></rate-line>
		
		</section>
		
		<section class="address-list">
			<h2>地址列表</h2>
			<ul>
				<li class="address-mode" v-for="(item,index) in addressListFilter"  v-bind:class="{'check':checkIndex == index}" @click="checkIndex = index;selectAddr = item.addressId"   >
					<div class="addr-inf">
						<span class="addr-name">{{item.userName}}</span>
						<p>{{item.streetName}}</p>
						<p>邮编：{{item.postCode}}</p>
						<span>电话：{{item.tel}}</span>
					</div>
					<div class="addr-edit" >
						<span v-if="item.isDefault">默认地址</span>
						<span class="noset setDefault" @click="setDefault(item.addressId)">设置默认地址</span>
						<i @click="delAddressModal(item.addressId)">删</i>
					</div>
				</li>

			</ul>
			<div class="addr-more">
				<span v-if="moreFlag" @click="chengeMore">更多</span>
				<span v-else @click="chengeMore">收起</span>
			</div>
		</section>
		<div style="position: relative; width: 90%;margin: 0 auto;height: 40px;">
			<div class="addr-next">
				<router-link v-bind:to="{path:'buyConfirm',query:{'addressId':selectAddr}}">NEXT</router-link>
			</div>
		</div>
		
		 <modal  v-bind:mdShow="modalConfirm" v-on:close="closeModal">
	  	  <p slot="message">你确认要删除地址吗？</p>
	  	  <div slot="btn-group">
	  	  	 	<a @click="modalConfirm = false">取消</a>
	  	  	 	<a @click="delAddress">确认</a>
	  	  </div>
	  </modal>
		<nav-footer></nav-footer>
	</div>
</template>

<script>
	import './../assets/css/reset.css'
	import './../assets/css/index.css'
	import './../assets/css/address.css'

	import NavHeader from '@/components/NavHeader.vue'
	import NavFooter  from '@/components/NavFooter.vue'
	import NavBread  from '@/components/NavBread.vue'
	import RateLine  from '@/components/RateLine.vue'
	import Modal from '@/components/Modal.vue'
	import axios from 'axios'
	export default{
		data(){
			return {
				addressList:[],
				moreFlag:true,
				limit:3,
				checkIndex:0,
				
				addid:'',
				selectAddr:'',
				modalConfirm:false
				
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
			addressListFilter(){
				return this.addressList.slice(0,this.limit);
			}
		},
		mounted(){
			this.init();
		},
		methods:{
			init(){
				axios.get("/users/addressList").then((resp)=>{
					let res = resp.data;
					this.addressList = res.result;
				});
			},
			chengeMore(){
				if(this.moreFlag){
					this.limit = this.addressList.length;
				}else{
					this.limit = 3;
				}
				this.moreFlag = !this.moreFlag;
				
			},
			setDefault(addressId){
				 axios.post("/users/setDefault",{
				 	addressId:addressId
				 }).then((resp)=>{
				 	let res =resp.data;
				 	if(res.status=='0'){
				 		console.log('set suc');
				 		this.init();
				 	}
				 })
			},
			closeModal(){
				this.modalConfirm =false;
			},
			delAddressModal(flag){
				this.modalConfirm = true;
				this.addrid = flag;
				console.log(flag);
				console.log(this.addrid);
			},
			delAddress(){
				axios.post("users/delAddress",{
					addressId:this.addrid
				}).then((resp)=>{
					let res = resp.data;
					if(res.status == '0'){
						this.modalConfirm =false;
						this.init();
					}
				})
			}
		}
	
	}
</script>

