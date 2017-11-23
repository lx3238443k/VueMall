<template>
	<div class="tanc-modal" @click="closeModal" v-show="mdShow">
				<div class="flag"></div>
				<div class="tanc-main">
					<div>
						<slot name = "message"></slot>
					</div>
					<div class="btn-go">
						<slot name ="btn-group"></slot>
					</div>
				
				</div>
			</div>
</template>

<script>
	
	export default{
		props:["mdShow"],
		data(){
			return{
				
			}
		},
		methods:{
			closeModal(){
		   		this.$emit("close");
			}
			
		}
		
	}
	
</script>

