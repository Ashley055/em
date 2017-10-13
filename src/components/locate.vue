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
			<div class="map-wrapper">
				<div id="allmap"></div>
				<span class="pic"><img src="../common/images/single.png"></span>
			</div>
			<div class="addr-box">
				<div class="row">
				    <!-- Each "cell" has col-[widht in percents] class -->
				    <div class="col-25">
						所在区域: 
				    </div>
				    <div class="col-75">
				    	<input class="addr-input" readonly="readonly" :value="warehouseInfo.areaName" id="addr_box" name="">
				    </div>
				</div> 
				<div class="row">
					<div class="col-100">
						<input class="addr-input" :value="warehouseInfo.address" id="addr_detail" name="">
					</div>
				</div>
				<div class="row btn-wrapper">
					<div class="col-100">
						<a href="#" class="button active submit-addr" @click="saveAddr">保存</a>
					</div>
				</div>
			</div>
		</div>
	 </div>
</template>

<script type="text/javascript">
import {entAjax} from '@/common/js/ajax'
// import Vue from 'vue'
	export default{
		data () {
		  return {
		    warehouseInfo:{},
		    addrDetail: '',
		    district: ''
		  };
		},
		created(){
			var _this = this
			this.$nextTick(function(){
				this.warehouseInfo = this.$route.query
				_this.locateWarehouse ()
			})
		},
		methods: {
			backToWareh(){
				this.$router.back()
			},
		    locateWarehouse () {
		    	// 百度地图API功能
		    	var _this = this
		    	var nSumbArr = []
		    	var point
		    	this.map = new BMap.Map("allmap");
		    	this.geoc = new BMap.Geocoder(); 
		    	if(this.warehouseInfo.longitude != '' && this.warehouseInfo.longitude != null){
		    		point = new BMap.Point(parseFloat(_this.warehouseInfo.longitude), parseFloat(_this.warehouseInfo.latitude));
		    		this.map.centerAndZoom(point, 15);
		    	}else{
		    		
	    			function myFun(result){	    				
						var cityName = result.name;
						_this.map.setCenter(cityName);
						console.log("当前定位城市:"+cityName);
						point = new BMap.Point(parseFloat(result.center.longitude), parseFloat(result.center.latitude));
						_this.map.centerAndZoom(point, 15);
					}
					var myCity = new BMap.LocalCity();
					myCity.get(myFun);
					this.locate(_this)
		    	}
		    	
		    },
		    locate(_this){
		    	// 添加带有定位的导航控件
		    	var navigationControl = new BMap.NavigationControl({
		    	  // 靠左上角位置
		    	  anchor: BMAP_ANCHOR_TOP_RIGHT,
		    	  // LARGE类型
		    	  type: BMAP_NAVIGATION_CONTROL_LARGE,
		    	  // 启用显示定位
		    	  enableGeolocation: true
		    	});
		    	_this.map.addControl(navigationControl);
		    	// 添加定位控件
		    	var geolocationControl = new BMap.GeolocationControl();
		    	geolocationControl.addEventListener("locationSuccess", function(e){
		    	  // 定位成功事件
		    	  var address = '';
		    	  address += e.addressComponent.province;
		    	  address += e.addressComponent.city;
		    	  address += e.addressComponent.district;
		    	  address += e.addressComponent.street;
		    	  address += e.addressComponent.streetNumber;
		    	  _this.longitude = e.point.lng
		    	  _this.latitude = e.point.lat
		    	  // $$('#addr_box').val(address);
		    	});
		    	geolocationControl.addEventListener("locationError",function(e){
		    	// 定位失败事件
		    	  console.log(e.message);
		    	});
		    	_this.map.addControl(geolocationControl);
		    	_this.map.addEventListener("moveend",function(){
		    		var pp = _this.map.getCenter();
		    	    console.log(pp);
		    	    _this.longitude = pp.lng;
		    	    _this.latitude = pp.lat;
		    	    _this.geoc.getLocation(_this.map.getCenter(), function(rs){
		    	    var addComp = rs.addressComponents;
		    	    
		    	   var areaName = addComp.province + " " + addComp.city + " " + addComp.district
		    	   var address = addComp.street
		    	   _this.warehouseInfo = Object.assign(_this.warehouseInfo,{areaName: areaName,address: address})
		    	    _this.district = addComp.district
		    	  });        
		    	});
		    	_this.map.addEventListener("zoomend",function(){
		    	  console.log(_this.map.getCenter());
		    	});
		    },
		    saveAddr(){
		    	var areaName = $$('#addr_box').val()
		    	var detailAddr = $$('#addr_detail').val()
		    	var currentArea = window.areas.indexOf(this.district)
		    	var currentAreaCode = window.areasCodes[currentArea]
		    	if(window.warehouseInfo == null){
		    		window.warehouseInfo = {area:currentAreaCode,areaName: areaName,address: detailAddr,longitude: this.longitude, latitude: this.latitude}
		    	}else{
		    		window.warehouseInfo = Object.assign(window.warehouseInfo,{area:currentAreaCode,areaName: areaName, address: detailAddr,longitude: this.longitude, latitude: this.latitude})
		    	}
		    	// Vue.set(window.warehouseInfo, areaName, address)
		    	this.$router.push('/newWarehouseInfo')
		    }
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