<template>
		<section>
			<ol class="a-breadcrumb">
				<li>
					<router-link to="/">Home</router-link >
				</li>
				
				<slot name ='second'></slot>
			
				<slot name = 'active'></slot>
			
			</ol>
		</section>	
</template>

<script>
</script>
