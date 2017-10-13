<template>
	<div data-page="index" class="page">
	 	<div class="navbar">
	 	  <div class="navbar-inner">
	 	    <!-- We need cool sliding animation on title element, so we have additional "sliding" class -->
	 	    <div class="left">
  		      	<a href="javascript:void(0)" @click="gobackto($event)" class="link icon-only">
  		      		<i class="icon icon-back"></i>
                  	<span>返回</span>
  		      	</a>
	 	    </div>
	 	    <div class="center ent-title">资质列表</div>
	 	    <div class="right">
	 	      <a href="#" class="link icon-only">
	 	        <!-- <i class="icon icon-bars"></i> -->
	 	      </a>
	 	    </div>
	 	  </div>
	 	</div>
		<!-- Scrollable page content -->
	    <div class="page-content" v-show="categories.length>0">
	    	<div v-for="item in categories">
		 		<div class="content-block-title">{{item.categoryName}}</div>
	         	<div class="list-block">
		            <ul>
		                <li v-for="certificate in item.certificates">
		                  <router-link class="item-link item-content" :to="{path:'/certificateInfo',query: {id: certificate.id, certificateName: certificate.certificateName}}">
		                    <div class="item-media"><img width="29" height="29" :src="certificate.imgSrc"></div>
		                    <div class="item-inner">
		                      <div class="item-title">{{certificate.certificateName}}</div>
		                      <div class="item-after"></div>
		                    </div>
		                  </router-link>
		                </li>
		            </ul>
	         	</div>
	    	</div>
	    </div>
    	<div class="page-content no-data" v-show="nodata">
    	    <div class="content-block">
    	    	<img width="134" src="../common/images/no-cert.png">
    	    	<p class="tipT">暂无该证书信息</p>
    	    	<p class="advice">您可以通过一体化平台网站进行新增</p>
    	    </div>
        </div>
	</div>
</template>
<script type="text/javascript">
	import {entAjax} from '@/common/js/ajax'
	import {getRequest} from '@/common/js/gen'
	export default{
		data () {
		  return {
		    categories: [],
		    warehouses: [],
		    nodata: false,
		    showContent: false
		  };
		},
		created(){
			var _this = this;
			var param = {
				pathVar: '/appCertificateInfo/queryAppCertificateList.do',
			};
			entAjax('baseAction.do', param).then(result => {
				if(result.code === '0000'){
					var newlists = result.rows;
					var newlist = [];
					var certificateList = [];
					var tempArr = [];
					var tempCategory = [];
					if(newlist.length>0){
						_this.showContent = true
						_this.noresult = false
					}else{
						_this.showContent = false
						_this.noresult = true
					}
					newlists.forEach((certlist,index)=>{
						var imgSrc = '';
						if(certlist.certificateMark == 1){
							imgSrc = require("../common/images/produce.png")
						}
						if(certlist.certificateMark == 2){
							imgSrc = require("../common/images/storagee.png")
						}
						if(certlist.certificateMark == 3){
							imgSrc = require("../common/images/trade.png")
						}
						if(certlist.certificateMark == 4){
							imgSrc = require("../common/images/use.png")
						}
						if(certlist.certificateMark == 5){
							imgSrc = require("../common/images/dispose.png")
						}
						var obj = Object.assign(certlist,{imgSrc: imgSrc})
						newlist.push(obj)
					})
					newlist.forEach((list)=>{
						tempArr.push(list.categoryOrder)
					});
					
					for(var i = 0; i < tempArr.length; i ++){
						if(tempCategory.indexOf(tempArr[i]) === -1){
							tempCategory.push(tempArr[i])
						}
					};
					tempCategory.forEach((category,index)=>{
						var categoryName = '';
						newlist.forEach((list)=>{
							categoryName = list.categoryName;
							if(list.categoryOrder === category){
								certificateList.push(list)
							}
						})
						_this.categories.push({
							categoryName: categoryName,
							certificates: certificateList
						})
					})
					console.log(_this.categories)
				}	
			});
		},
		methods: {
		  linkToPage () {
		    window.history.go(-1);
		  },
		  gobackto(event) {
		  	window.location.href="../index/index5.html";

		  	event.stopPropagation();
		  	event.preventDefault();
		  }
		}

	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.content-block.warehouse-list
	margin 0
	padding 0
	& ul
		margin 0
		padding 0
		& li
			margin-left 0
			padding 5px 10px
			box-sizing border-box
			line-height 25px
			min-height 50px
</style>