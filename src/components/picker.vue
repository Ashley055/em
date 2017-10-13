<template>
	<div>
		<input type="text" placeholder="请选择" readonly class="picker-describe">
	</div>
</template>
<script type="text/javascript">
	import {entAjax} from '@/common/js/ajax'
	export default{
		// props:['key'],
		created(){
			
		},
		methods: {
		  	getValues (key) {
		  		var values = '';
		    	var param = {
		    		key: key,
		    		pathVar: '/mgtdict/getDictByKeys.do',
		    	};
		    	entAjax('baseAction.do', param).then(result => {
		    		if(result.code == '0000'){
		    			var valueList = JSON.parse(result.desc)
		    			valueList.forEach((value)=>{
		    				values = values +' ' + value.name
		    			})
		    		}
		    	}).then(()=>{
		    		var pickerDescribe = window.f7App.picker({
		    		    input: '.picker-describe',
		    		    // rotateEffect: true,
		    		    cols: [
		    		        {
		    		            textAlign: 'left',
		    		            values: values.split(' ')
		    		        }
		    		    ]
		    		});
		    		pickerDescribe.open();
		    	})
		    	
		  	}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.list-block,.content-block,.content-block-title
	  margin 15px 0
	  font-size 14px
</style>