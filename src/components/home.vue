<template>
	<div class="page">
		<div class="navbar">
		  <div class="navbar-inner">
		    <!-- We need cool sliding animation on title element, so we have additional "sliding" class -->
		    <div class="left">
		    	<a href="#" class="link icon-only">
		    		<i></i>
		    	</a>
		    </div>
		    <div class="center ent-title">危企助手</div>
		    <div class="right">
		      <a href="#" class="link icon-only">
		        <i class="f7-icons color-black">person_fill</i>
		      </a>
		    </div>
		  </div>
		</div>
		<div class="page-content">
    	    <div class="content-block h-block">
    	        <div class="content-block-inner p-inner">
    	        	<div class="row">
	    	        	<div class="col-50 center">
	    	        		<router-link to="/orgInfo">
	    	        			<div><img width="60" height="60" src="../common/images/orgInfo.png"></div>
	    	        			<p>企业信息</p>
	    	        		</router-link>
	    	        	</div>
	    	        	<div class="col-50 center">
	    	        		<router-link to="/certificates">
	    	        			<div><img width="60" height="60" src="../common/images/certificates.png"></div>
	    	        			<p>企业资质</p>
	    	        		</router-link>
	    	        	</div>
    	        	</div>
	        	</div>
        	</div>
        	<div class="content-block">
        		<div class="content-block-title">常用功能</div>
        	    <div class="content-block-inner">
        	    	<div class="row">
        	    		<div class="col-25 center">
        	    			<div><img width="50" height="50" src="../common/images/icon-warehouse.png"></div>
        	    			<p>仓库管理</p>
        	    		</div>
						<div class="col-25 center">
							<div><img width="50" height="50" src="../common/images/icon-fluid.png"></div>
							<p>流向登记</p>
						</div>
						<div class="col-25 center">
							<div><img width="50" height="50" src="../common/images/icon-info.png"></div>
							<p>信息查询</p>
						</div>
						<div class="col-25 center">
							<div><img width="50" height="50" src="../common/images/icon-danger-info.png"></div>
							<p>隐患管理</p>
						</div>
        	    	</div>
        	    </div>

    	    </div>
	    	<div class="content-block-title">待整改隐患</div>
	    	<div class="list-block">
    	    	<ul>
    	    	    <li v-for="danger in dangerList">
    	    	      <a href="#" class="item-link item-content">
    	    	        <div class="item-media"><img height="14px" src="../common/images/warnning.png"></div>
    	    	        <div class="item-inner">
    	    	          <div class="item-title">{{danger.planName}}</div>
    	    	          <div class="item-after color-red">待整改</div>
    	    	        </div>
    	    	      </a>
    	    	    </li>
	    	    </ul>
    	    </div>
    	</div>
	</div>
</template>
<script>
import {entAjax} from '@/common/js/ajax'
export default {
	data () {
	  return {
	    dangerList:[]
	  };
	},
	created(){
		let param = {
		    page:1,
		    pageSize:10,
		    pathVar:'hiddenDangerInfo/querySuperviceTodo.do'
		};
		let _this = this
		entAjax('baseAction.do', param).then(data => {
			_this.dangerList = data.rows
			console.log(_this.dangerList)
		})

	}

}

        
  
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.content-block-inner:before
		display none
	.content-block.h-block
		margin-top 0
	.content-block-inner.p-inner
		padding-top 15px
	.center
		text-align center
	
</style>