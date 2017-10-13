<template>
	<div class="page">
		<!-- Scrollable page content -->
	    <div class="page-content" v-show="categories.length>0">
	    	
	    </div>
	</div>
</template>
<script type="text/javascript">
	export default{
		data () {
		  return {
		    categories: []
		  };
		},
		created(){
			this.$nextTick(()=>{
				$$('#navbar').show();
				$$('.ent-title').text('资质详情');
			});

		}

	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.init-app
	  .navbar
	    display block
</style>