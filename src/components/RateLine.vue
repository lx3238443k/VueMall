<template>
	<ul class="dan-liucheng">
				<li v-bind:class="{'ready':falg>0}">确认地址</li>
				<li v-bind:class="{'ready':falg>1}">确认订单</li>
				<li v-bind:class="{'ready':falg>2}">支付</li>
				<li v-bind:class="{'ready':falg>3}">交易成功</li>
	</ul>	
</template>

<script>
	export default{
		props:["falg"],
		data(){
			return{
				
			}
		}
	}
	
</script>

<style>
.dan-liucheng{
	display: flex;
	width: 90%;
	margin: 5px auto;
	height: 40px;
}


.dan-liucheng li{
	flex: 1;
	background-color: #E9E9E9;
	line-height: 40px;
}

.dan-liucheng .ready{
	background-color: #605F5F;
	color: #eee;
	font-size: 18px;
	
}

</style>