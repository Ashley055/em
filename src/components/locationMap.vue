<template>
	 <div class="page">
		<div class="navbar">
		  <div class="navbar-inner">
		    <!-- We need cool sliding animation on title element, so we have additional "sliding" class -->
		    <div class="left">
		      <a class="link icon-only" @click="backToWareh">
		      	<i class="icon icon-back"></i>
                <span>返回</span>
		      </a>
		    </div>
		    <div class="center ent-title">仓库位置</div>
		    <div class="right">
		      <a href="#" class="link icon-only">
		        <!-- <i class="icon icon-bars"></i> -->
		      </a>
		    </div>
		  </div>
		</div>
		<div class="page-content">
			<div id="allmap"></div>
		</div>
	 </div>
</template>

<script type="text/javascript">
import {entAjax} from '@/common/js/ajax'
	export default{
		created(){
			var _this = this
			
			this.$nextTick(function(){
				_this.getwarehouses()
			})
		},
		methods: {
			backToWareh(){
				this.$router.back()
			},
			getwarehouses(){
		    	var _this = this
	    		var param = {
	    			page: 1,
	    			pagesize: 10,
	    			pathVar: '/warehouseInfo/queryForPageList.do',
	    		};
	    		entAjax('baseAction.do', param).then(result => {
	    			if(result.total > 10){
	    				Promise.all(_this.moreInfo(result)).then(function(datas){
	    					
	    					var tempArr = [];
	    					tempArr = tempArr.concat(result.rows);

	    					datas.forEach(function(arr){
	    						tempArr = tempArr.concat(arr);
	    					});

	    					console.log(tempArr);
	    					
	    					_this.locateWarehouse (tempArr)
	    				})
	    			}else{
	    				_this.locateWarehouse (result.rows)
	    			}
	    			
	    		})
			},
			moreInfo(result){
				var pages = Math.ceil(result.total / 10) 
				var promises = []
				for(let i = 2; i <= pages; i ++){
					
					var p = new Promise(function(resolve, reject){
						var params = {
							page: i,
							pagesize: 10,
							pathVar: '/warehouseInfo/queryForPageList.do',
						};
						entAjax('baseAction.do', params).then(data => {

							resolve(data.rows)
						})
					})
					promises.push(p)
				}
				return promises				
			},
		    locateWarehouse (lists) {
		    	// 百度地图API功能
		    	var _this = this
		    	var nSumbArr = []
	    		var map = new BMap.Map("allmap");
	    		var point = new BMap.Point(116.404, 39.915);
	    		var tipText = ''
	    		var btnText = ''
	    		if(lists.length == 0){
	    			tipText = '还没有仓库信息'
	    			btnText = '点击新增仓库'
	    		}else{
	    			tipText = '暂无已上报位置的仓库'
	    			btnText = '上报位置'
	    		}
	    		map.centerAndZoom(point, 13);
    			function myFun(result){
					var cityName = result.name;
					map.setCenter(cityName);
					console.log("当前定位城市:"+cityName);
				}
				var myCity = new BMap.LocalCity();
				myCity.get(myFun);

				// 添加标注
				lists.forEach(function(item){
					if(item.longitude && item.latitude){
						var point = new BMap.Point(parseFloat(item.longitude), parseFloat(item.latitude));
						var marker = new BMap.Marker(point);
						map.addOverlay(marker);
						var label = new BMap.Label(item.warehouseName,{offset:new BMap.Size(20,-10)});
						marker.setLabel(label);
						label.setStyle({maxWidth: '110px', overflow: 'hidden',textOverflow:'ellipsis',whiteSpace: 'nowrap'})
						label.addEventListener('click',function() {
							_this.$router.push({path:'/warehouseInfo',query: {id: item.warehouseId}})
						});
					}else{
						nSumbArr.push(item)
					}
				})
				if(nSumbArr.length == lists.length){
					window.f7App.modal({
						title: '提示',
						text: tipText,
						buttons: [
							{
								text: btnText,
								onClick: function() {
									if(btnText == '上报位置'){
										_this.$router.push('/warehouses')
									}else{
										f7App.formDeleteData('#my-form')
										f7App.formDeleteData('#qz_info')
										f7App.formDeleteData('#wh_info')
										f7App.formDeleteData('#mb_info')
										f7App.formDeleteData('#yb_info')
										f7App.formDeleteData('#xs_info')
										f7App.formDeleteData('#wkeeper')
										_this.$router.push('/newWarehouseInfo')
									}
						          	
						        }
							}
						]
					})
				}
		    }
		},
		destroyed(){
			f7App.closeModal()
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.list-block,.content-block,.content-block-title
	  margin 15px 0
	  font-size 14px
	#allmap
		height 100%
</style>