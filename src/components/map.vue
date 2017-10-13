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
						上报位置: 
				    </div>
				    <div class="col-75" v-show="warehouseInfo">
				    	<input class="addr-input" :value="warehouseInfo.address.substring(0,13)" id="addr_box" name="">
				    	<!-- <p class="addrp" v-show="resubmit">{{}}</p> -->
				    </div>
				</div> 
				<div class="row" v-show="warehouseInfo">
					<div class="col-100"><input class="addr-input" :value="warehouseInfo.address.substring(13)" name="" id="addr_detail" style="outline: none"></div>
				</div>
				<div class="row btn-wrapper">
					<div class="col-100">
						<a href="#" class="button active submit-addr" @click="submitAddr" v-show="submit">上报位置</a>
						<a href="#" class="button active resubmit-addr" @click="confirm" v-show="resubmit">重新上报</a>
					</div>
				</div>
			</div>
		</div>
	 </div>
</template>

<script type="text/javascript">
import {entAjax} from '../common/js/ajax'
import '@/common/plugin/toast/toast.css'
import F7 from 'framework7/dist/js/framework7.min.js'
import Toast from '@/common/plugin/toast/toast.js'
	export default{
		data () {
		  return {
		    submit:false,
		    resubmit: false,
		    warehouseInfo: {},
		    latitude: '',
		    longitude: '',
		    address: '',
		    map: '',
		    point: '',
		    geoc: ''
		  };
		},
		created(){
			var _this = this
			_this.warehouseInfo = window.warehouseInfo
			this.$nextTick(function(){
				_this.geoc = new BMap.Geocoder(); 
				_this.map = new BMap.Map("allmap");
				_this.createMap ()
			})
		},
		methods: {
			backToWareh(){
				this.$router.back()
			},
		  	createMap () {
			    var Flag = false;
			    var enterpriseName;
			    var maparams;
			    var _this = this
		    	if(window.warehouseInfo.latitude && window.warehouseInfo.longitude){
			    	this.resubmit = true
			    	this.submit = false;
		    	 	this.longitude = parseFloat(window.warehouseInfo.longitude)
		    	 	this.latitude = parseFloat(window.warehouseInfo.latitude)
	    	 		this.point = new BMap.Point(this.longitude,this.latitude)
	    	 	    this.map.centerAndZoom(this.point,15);
	    	 	    this.map.disableDragging();
	    	 	    this.map.disableDoubleClickZoom();
	    	 	    this.map.disablePinchToZoom();
	    	 	    $$('.addr-input').attr('readonly', 'readonly');
		    	}else{
		    		$$('.addr-input').removeAttr('readonly');
		    	 	this.resubmit = false
		    	 	this.submit = true;
	    			this.map.enableDragging();
	    			this.map.enableDoubleClickZoom();
	    			this.map.enablePinchToZoom();
	    			$$('.addr-input').removeAttr('readonly');
	    		    function myFun(result){
	    				var cityName = result.name;
	    				_this.map.setCenter(cityName);
	    				console.log("当前定位城市:"+cityName);
	    			}
	    			var myCity = new BMap.LocalCity();
	    			myCity.get(myFun);
	    			this.point = new BMap.Point(this.longitude,this.latitude)
	    		    this.map.centerAndZoom(this.point,15);
	    		    this.locate(_this)
	    		    // var geolocation = new BMap.Geolocation();
	    		    // geolocation.getCurrentPosition(function(r){
	    		    //   if(this.getStatus() == BMAP_STATUS_SUCCESS){
	    		    //     _this.map.panTo(r.point);
	    		    //     console.log('您的位置：'+r.point.lng+','+r.point.lat);
	    		    //   }
	    		    //   else {
	    		    //     console.log('定位失败！');
	    		    //   }        
	    		    // },{enableHighAccuracy: true})
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
		        	    $$('#addr_box').val(addComp.province + " " + addComp.city + " " + addComp.district + ' ');
		        	    $$('#addr_detail').val(addComp.street);
	        	    });        
	        	});
	        	_this.map.addEventListener("zoomend",function(){
	        	  console.log(_this.map.getCenter());
	        	});
	        },
	        confirm(){
	        	var _this = this
	        	f7App.confirm('是否确定重新上报?', 
	        	    function () {
	        	    	_this.resubmit = false
	        	    	_this.submit = true
	        	    	_this.map.enableDragging();
	        	    	_this.map.enableDoubleClickZoom();
	        	    	_this.map.enablePinchToZoom();
	        	    	$$('.addr-input').removeAttr('readonly');
	        	    	_this.locate(_this)
	        	    },
	        	    function () {
	        	    }
	    	    );
	        },
	        submitAddr(){
	        	var _this = this
	        	$$('.submit-addr').attr('disabled', true);
	        	var addr = $$('#addr_box').val() + $$('#addr_detail').val()
	        	var param = {
	        		address: addr,
	        		warehouseId: window.warehouseInfo.warehouseId,
	        		latitude: this.latitude,
	        		longitude: this.longitude,
	        		pathVar: 'warehouseInfo/updateLocation.do'
	        	}
	        	entAjax('baseAction.do', param).then(result => {
	        		console.log(result)
	        		var options = {height: '50px',duration: 2000};
	        		var toast;
	        		if(result.code == '0000'){
	        			toast = f7App.toast('保存成功', '', options);
	        			toast.show();
	        			setTimeout(function(){
	        				$$('.submit-addr').removeAttr('disabled');
	        				_this.resubmit = true
	        				_this.submit = false
	        				var tempObj = {
	        					address: addr,
	        					warehouseId: window.warehouseInfo.warehouseId,
	        					latitude: _this.latitude,
	        					longitude: _this.longitude,
	        				}
	        				if(window.warehouseInfo){
	        					window.warehouseInfo = Object.assign(window.warehouseInfo,tempObj)
	        				}else{
	        					window.warehouseInfo = tempObj
	        				}
	        			},1000)
	        		}else{
	        			toast = f7App.toast('保存失败', '', options);
	        			toast.show();
	        		}
	        	})
	        }
    }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.list-block,.content-block,.content-block-title
	  margin 15px 0
	  font-size 14px
	.map-wrapper
		height 70%
	#allmap
		height 100%
	.addr-box
		padding 10px 20px
		background-color: #fff;
		line-height: 40px
		input
			width 100%
			border none
			border-bottom 1px solid #dedede
			line-height 28px
	.BMap_noprint
		right: 10px !important
		left: auto !important
		bottom: 250px !important
	.anchorBL img
		opacity 0
	.submit-addr
		padding 6px 0 !important
		height auto !important
	.resubmit-addr
		padding 6px 0 !important
		height auto !important
	.pic
		position absolute
		top 35%
		left 50%;
		margin-left -15px
		margin-top -26px
	.addrp
		margin-top 0 
	.btn-wrapper
		margin-top 15px
</style>