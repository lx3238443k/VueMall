<template>
	<div>
		<!--头部菜单-->
		<nav-header></nav-header>
		<!--头部菜单end-->	
		<nav-bread>
				
				
				<li class="active" slot = 'active'>GoodsList</li>
		</nav-bread>
		<!--广告部分iphoneX-->
		<section class="body-iphoneX">
			<div class="body-iphoneX-bt">
				<h1 class="body-iphoneX-title">iPhone X</h1>
				<h2 class="body-iphoneX-des">hello，未来。</h2>
			</div>
			
			<div class="iphoneX-box">
				<div class="body-iphoneX-img"></div>
			</div>
			
			<div class="body-iphoneX-buy">
				<a>进一步了解</a>
				<a>购买</a>
			</div>
		</section>
		<!--广告end-->
		<!--视频加载部分-->
		<section style="width: 100%;">
				<ul class="body-shoplist">
					<li>
						<div class="goods-side">
							<!--遮罩-->
							<div 	class="goods-side-mode">
								<div class="mode-text">
									<h3>设计和显示屏</h3>
									<p>全新的 5.8 英寸超视网膜显示屏几乎占据了整个表面。机身前后面板采用的是 iPhone 迄今最坚固耐用的玻璃材料。</p>
								</div>
							</div>
							<!--遮罩end-->
							<video width="" autoplay="autoplay" loop="loop" style="height: 100%;">
								<source src="../../static/video/large (5).mp4"></source>
							</video>
							
							
						</div>
					</li>
					<li>
						<div class="goods-side">
							
								<div 	class="goods-side-mode">
								<div class="mode-text">
									<h3>面容 ID</h3>
									<p>你的脸，就是你的密码。一种安全、私密的方式全新亮相，解锁设备、进行身份验证或支付，只需一眼就能搞定。</p>
								</div>
							</div>
							<!--遮罩end-->
							<video width="" autoplay="autoplay" loop="loop" style="height: 100%;">
								<source src="../../static/video/large (4).mp4"></source>
							</video>
							
							
						</div>
					</li>
					<li>
						<div class="goods-side">
							
								<div 	class="goods-side-mode">
								<div class="mode-text">
									<h3>原深感摄像头</h3>
									<p>空间虽小，科技俱全。有了原深感摄像头，面容 ID、人像模式、人像光效和“动话表情”等功能才得以实现</p>
								</div>
							</div>
							<!--遮罩end-->
							<video width="" autoplay="autoplay" loop="loop" style="height: 100%;">
								<source src="../../static/video/large (3).mp4"></source>
							</video>
							
							
						</div>
					</li>
					<li>
						<div class="goods-side">
							
								<div 	class="goods-side-mode">
								<div class="mode-text">
									<h3>A11 仿生</h3>
									<p>这款 iPhone 上有史以来最强大、最智能的芯片，拥有一个每秒运算次数最高可达 6000 亿次的神经网络</p>
								</div>
							</div>
							<!--遮罩end-->
							<video width="" autoplay="autoplay" loop="loop" style="height: 100%;">
								<source src="../../static/video/large (1).mp4"></source>
							</video>
							
							
						</div>
					</li>
				</ul>
			
			
			
				
		</section>
		<!--视频end-->
		<!--价格过滤-->
		<section class="body-priceFilter">
			<ul >
				<li @click="setPriceFilter('all')"><a v-bind:class="{'choose':priceChecked=='all'}" >all</a></li>
				<li v-for="(price,index) in priceFilter">
					<a v-bind:class="{'choose':priceChecked == index}" @click="setPriceFilter(index)">{{price.startPrice}}~{{price.endPrice}}</a>
				</li>
				
			</ul>

			<dl class="body-srot">
				<dd v-bind:class="{'active':sortStyle==1}">
					<a @click="sortGoodsUp">升序</a>
				</dd>
				<dd v-bind:class="{'active':sortStyle==-1}">
					<a @click="sortGoodsDown">降序</a>
				</dd>
			</dl>
		</section>
		<!--价格过滤end-->
		<!--商品-->
		<section class="body-goodslist">
			<nav class="goods-nav">
				<div class="goods" v-for="item in goodsList">
					<div class="goods-img">
						<img v-lazy="'/static/img/'+item.productImg"/>
					</div>
					<div class="goods-info">
						<em>{{item.productName}}</em>
						<span>{{item.productPrice}}</span><span>元</span>
						<div class="card" @click="addCart(item.productId)"></div>
					</div>
				</div>
			</nav>
			<div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="1">
  				   <span v-show="loading">Loading...</span>
			</div>
		</section>
		<!--商品end-->
		<modal v-bind:mdShow="mdShow" >
			  <p slot="message" v-on:close="closeModal">请先登陆</p>
			  <div slot="btn-group">
			  	<a @click="mdShow = false">关闭</a>
			  </div>
		</modal>
		
		<modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
			  <p slot="message">添加购物车成功</p>
			  <div slot="btn-group">
			  	<a @click="mdShowCart = false">继续购物</a>
			  	<router-link  href="javascript:;" to="/cart" style="margin-left: 40px;color: #F0F0F0;">查看购物车</router-link>
			  </div>
		</modal>
		<!--底部-->
		<nav-footer></nav-footer>
		<!--底部end-->
	</div>
</template>

<script>
	import './../assets/css/reset.css'
	import './../assets/css/index.css'
	import NavHeader from '@/components/NavHeader.vue'
	import NavFooter  from '@/components/NavFooter.vue'
	import NavBread  from '@/components/NavBread.vue'
	import Modal from '@/components/Modal.vue'
	import axios from 'axios'
	export default{
		data(){
			return{
				goodsList:[],
				sortStyle:1,
				page:1,
				pageSize:3,
				busy:true,
				loading:true,
				mdShow:false,
				mdShowCart:false,

				priceFilter:[
					{
						startPrice:'0.00',
						endPrice:'3000.00'
					},
					{
						startPrice:'3000.00',
						endPrice:'6000.00'
					},
					{
						startPrice:'6000.00',
						endPrice:'10000.00'
					}
				
				],
				priceChecked:'all'
			}
		},
		
		components:{
			NavHeader,
			NavFooter,
			NavBread,
			Modal
		},
		mounted:function(){
			this.getGoodsList();
			
		},
		methods:{

			getGoodsList(flag){

				let param ={
					page:this.page,
					pageSize:this.pageSize,
					sort:this.sortStyle,
					priceLevel:this.priceChecked
				}
				this.loading = true;
				axios.get("/goods/list",{
					params:param
				}).then((result)=>{
					var res = result.data;
					this.loading = false;
					if(res.status =='0'){
						if(flag){
							
							this.goodsList = this.goodsList.concat(res.result.list);
							
							if(res.result.count == 0){
								this.busy =true;
								console.log(res.result.count)
							}else {
								this.busy =false;
							

							}
						}
						else {
							this.goodsList = res.result.list;
							this.busy =false;

						}
					}
					else {
						this.goodsList =[];
					}
					
				})
			},
			sortGoodsUp(){
				this.sortStyle = 1;
				this.page = 1;
				this.getGoodsList();

			},
			sortGoodsDown(){
				this.sortStyle = -1;
				this.page = 1;
				this.getGoodsList();
			},
			loadMore(){
				
					this.busy = true;
			
					setTimeout(() => {
			       		this.page++;
			       		this.getGoodsList(true); 
			       
			     }, 1000);
			   
			},
			setPriceFilter(index){
				this.priceChecked =index;
				console.log(this.priceChecked);
				this.page=1;
				this.getGoodsList();

			},
			addCart(productId){
				axios.post("/goods/addCart",{
					productId:productId
				}).then((res)=>{
					console.log(res)
					if(res.data.status == 0){
						this.mdShowCart = true;
						this.$store.commit("updateCart",1);
					}
					else {
						this.mdShow = true;
					}
				})
			},
			closeModal(){
				this.mdShow = false;
				this.mdShowCart =false; 
			}

		}
		
	}
	
</script>

<style>
</style>