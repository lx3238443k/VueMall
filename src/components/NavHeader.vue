<template>
	<header class="header">
			<ul class="header-nav">
				<li>
					<a class="header-nav-logo"></a>
				</li>
				<li>
					<a class="header-nav-title">Mac</a>
				</li>
				<li>
					<a class="header-nav-title">iPad</a>
				</li>
				<li>
					<a class="header-nav-title">iPhone</a>
				</li>
				<li>
					<a class="header-nav-title">Watch</a>
				</li>
				<li>
					<a class="header-nav-title">Music</a>
				</li>
				<li>
					<a class="header-nav-title">技术支持</a>
				</li>
				<li>
					<span v-text="nickName" v-if="nickName"></span>
					<a class="header-nav-title" @click="openLogin" v-if="!nickName">Login</a>
					<a class="header-nav-title" @click="logout" v-if="nickName">Logout</a>
				</li>
				<li>
					<router-link to="/cart" class="header-nav-title header-cart"></router-link >
					<p class="cart-num" v-show="cartNum>0">{{cartNum}}</p>
				</li>
			</ul>
			
			<div class="tanc-modal"  v-show="showModal" >
				<div class="flag"></div>
				<div class="tanc-main" >
					<div>
						<span v-show="errorTip">用户名或密码错误！！</span>
					</div>
					<form >
						<label>账号</label>
						<input type="text" name="loginName"  v-model="userName" />
						<br />
						<label>密码</label>
						<input type="password" name="loginPass"  v-model="userPwd"  />
						<div style="border: 1px solid #222;" @click="login">Login</div>
						
					</form>
				</div>
			</div>
			
	</header>
	
	
</template>

<style>
	.cart-num{
		position: absolute;
		top: 3px;
		left: 7px;
		padding: 0 6px;
		background-color: rgba(255,255,255,0.5);
		
		height: 20px;
		line-height: 20px;
		font-size: 16px;
		border-radius: 10px;
	}
</style>

<script>
	import './../assets/css/login.css'
	import axios from 'axios'
	export default{
		data(){
			return{
				userName:'',
				userPwd:'',
				errorTip:false,
				showModal:false,
				nickName:''
			}
		},
		computed:{
			cartNum(){
				return this.$store.state.cartNum;
			}
		},
		mounted(){
			this.checkLogin();
			this.getcartNum();
		},
		methods:{
			checkLogin(){
				axios.get("/users/checkLogin").then((response)=>{
					let res = response.data;
					console.log(res);
					if(res.status == '0'){
						
						this.nickName = res.result;
						console.log(this.nickName);
					}
				})
			},
			closeModal(){
				this.showModal = false;
			},
			openLogin(){
				this.showModal = true;
			},
			login(){
				
				if(!this.userName || !this.userPwd){
					this.errorTip = true;
					return ;
				}
				
				axios.post("/users/login",{
					userName:this.userName,
					userPwd:this.userPwd
				}).then((resp)=>{
					let res =resp.data;
					if(res.status=='0'){
						this.errorTip = false;
						console.log('show');
						this.showModal = false;
						this.getcartNum();
						this.nickName = res.result.userName;
						
//						todo
					}
					else{
						this.errorTip = true;
						console.log('err');
					}
				});
			},
			logout(){
		
				axios.post("/users/logout").then((resp)=>{
					let res =resp.data;
					if(res.status=="0"){
						this.nickName = '';
						this.$store.commit("initCart",0);
						console.log('购物车重置')
					}
				})
			},
			getcartNum(){
				axios.get("/users/getCartNum").then((resp)=>{
					let res =resp.data;
					if(res.status == '0'){
						this.$store.commit("initCart",res.result);
					}
					
				})
			}
			
		}
	}
</script>

