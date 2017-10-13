<template>
	<div class="page">
	 	<div class="navbar">
	 	  <div class="navbar-inner">
	 	    <!-- We need cool sliding animation on title element, so we have additional "sliding" class -->
	 	    <div class="left">
  		      	<a href="javascript:void(0)" @click="backToNew" class="link icon-only">
  		      		<i class="icon icon-back"></i>
                  	<span>返回</span>
  		      	</a>
	 	    </div>
	 	    <div class="center ent-title">填写仓库信息</div>
	 	    <div class="right">
	 	      <a href="#" class="link icon-only">
	 	        <!-- <i class="icon icon-bars"></i> -->
	 	      </a>
	 	    </div>
	 	  </div>
	 	</div>
	 	<div class="page-content">
	    	<form id="my-form">
		    	<div class="list-block">
		    	  	<ul>
		    	    	<!-- Text inputs -->
		    	    	<li v-for="property in properties">

		    	    		<div class="item-content" v-if="property.select">
			    	        	<div class="item-inner">
			    	         		<div class="item-title label">{{property.PROPERTY_DICT_NAME}}</div>
			    	         		v
			    	          		<div class="item-input">
			    	            		<input  type="text" v-model="property.PROPERTY_VALUE" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d]/g,'');">
			    	          		</div>
			    	        	</div>
			    	        </div>
            	    		<div class="item-content" v-if="!property.select">
        	    	        	<div class="item-inner">
        	    	         		<div class="item-title label">{{property.PROPERTY_DICT_NAME}}</div>
        	    	         		v
        	    	          		<div class="item-input">
        	    	            		<input name="zWarehouses" type="text" v-model="property.PROPERTY_VALUE" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d]/g,'');">
        	    	          		</div>
        	    	        	</div>
        	    	        </div>
			    	    </li>
		    	    </ul>
	    	    </div>
    	    </form>
		    <p class="btn-wrap bg-white"><a href="javascript:void(0)" @click="upDatas" class="button active b-next">下一步</a></p>
	 	</div>
	</div>
</template>
<script type="text/javascript">
import {getValues,selectArea} from '@/common/js/gen'
import {entAjax} from '@/common/js/ajax'
export default {
	data () {
	  return {
	    properties: []
	  };
	},
	
	created(){
		this.properties = window.warehouseProperties
	},
	methods: {
	  upDatas () {
	    console.log(this.properties);
	  }
	}
}

</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.list-block,.content-block,.content-block-title
	  margin 15px 0
	  font-size 14px
	.btn-wrap
		padding 8px 30px
		box-sizing border-box
		.b-next
			padding 6px 0
			height auto
</style>