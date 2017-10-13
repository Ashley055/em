<template>
	<div class="page">
	 	<div class="navbar">
	 	  <div class="navbar-inner">
	 	    <!-- We need cool sliding animation on title element, so we have additional "sliding" class -->
	 	    <div class="left">
  		      	<a href="javascript:void(0)" @click="backToWList" class="link icon-only">
  		      		<i class="icon icon-back"></i>
                  	<span>返回</span>
  		      	</a>
	 	    </div>
	 	    <div class="center ent-title">仓库详情</div>
	 	    <div class="right">
	 	      <a href="#" class="link icon-only" @click="wactions">
	 	        更多
	 	      </a>
	 	    </div>
	 	  </div>
	 	</div>
		<!-- Scrollable page content -->
	    <div class="page-content list-wrapper">
	    	<div class="content-block" style="margin-top: 0">
	    	    <div class="content-block-inner">
	    	        <div class="row" style="padding-top: 10px">
	    	            <img class="col-13" height="30px" style="vertical-align:middle" src="../common/images/org.png">
	    	            <span class="fbold col-70" style="vertical-align:middle">{{warehouseInfo.warehouseName || ''}}</span>
	    	            <span class="validate fbold col-17" style="vertical-align:middle" v-show="warehouseInfo.warehouseStatus">{{state}}</span>
	    	        </div>
	    	        <div class="row">
	    	            <p class="col-25 mb0">储存货物：</p>
	    	            <p class="col-25 mb0">{{warehouseInfo.warehouseCategoryName || ''}}</p>
	    	            <p class="col-25 mb0">仓库类型：</p>
	    	            <p class="col-25 mb0">{{warehouseInfo.warehouseTypeName || ''}}</p>    
	    	        </div>
	    	        <div class="row">
	    	            <p class="col-25 mb0">所在地区：</p>
	    	            <p class="col-75 mb0">{{warehouseInfo.areaName || ''}}</p>
	    	        </div>
	    	    </div>
	    	</div>
	    	<div class="list-block">
	    	    <ul>
	    	        <li>
	    	          <router-link to="/map" class="item-content row address-box">
	    	            <div class="col-10"><img src="../common/images/u458.png" width="30"></div>
	    	            <div class="col-65">
	    	              <div class="address-text">{{warehouseInfo.address}}</div>
	    	              <!-- <div class="item-after">待整改</div> -->
	    	            </div>
	    	            <span class="col-25 load-btn">
	    	            	<img width="21px" src="../common/images/loadup.png">
	    	            	<span class="load-text">{{warehouseInfo.longitude? "已上报" : "上报位置"}}</span>
	    	            </span>
	    	          </router-link>
	    	        </li>
	    	    </ul>
	    	</div>
	    	<div class="tab-wrapper">
    	         <div class="buttons-row">
    	           <a href="#tab1" class="button tab-link active">现存货物</a>
    	           <a href="#tab2" class="button tab-link">仓管人员</a>
    	           <a href="#tab3" class="button tab-link">其他信息</a>
    	         </div>
	        </div>
		 	<div class="tabs">
	            <div id="tab1" class="tab active">
	            	<div class="content-block-title" style="border-top: none">截止{{latest}}</div>
	            	<div class="list-block" v-show="goodsList.length>0">
	            	    <ul>
	            	        <li class="item-content" v-for="goods in goodsList">
	            	          <div class="item-inner row">
	            	            <div class="col-75">{{replaceString(goods.PRODUCT_NAME_NEW)}}</div>
								<div class="col-25">{{goods.GOODS_NUM
								}}{{goods.NAME}}</div>
	            	          </div>
	            	        </li>
	            	    </ul>
            	    </div>
    	    	    <div class="content-block" style="text-align: center;border-top: 1px solid #999;padding-top:50px" v-show="nodata">
    	    	    	<img width="50" src="../common/images/no-info.png">
    	    	    	<p class="tipT">暂无数据</p>
    	    	    </div>
	            </div>
	            <div id="tab2" class="tab">
    		    	<div class="content-block warehouse-list bg-white" v-show="warehouseManagers.length>0">
    	    	     	<ul>
    	    	     		<li class="content-block-inner wmanager" v-for="manager in warehouseManagers">
	    	     			  	<div class="item-inner">
	    	     			    	<div class="">人员姓名：<span>{{manager.managerName}}</span></div>
	    	     			    	<div class="">身份证号：<span>{{manager.managerIdCard}}</span></div>
	    	     			    	<div>联系电话：<span>{{manager.managerPhone}}</span></div>
	    	     			  	</div>
    	    	     		</li>
    	    	      	</ul>
    		        </div>
    		        <div class="content-block" style="text-align: center;border-top: 1px solid #999;padding-top:50px" v-show="noManager">
    		        	<img width="50" src="../common/images/no-info.png">
    		        	<p class="tipT">暂无数据</p>
    		        </div>
	            </div>
	            <div id="tab3" class="tab">
	              	<div class="list-block" v-show="warehouseProperties.length>0">
                	    <ul>
                	        <li class="item-content" v-for="property in warehouseProperties">
                	          <div class="item-inner">
                	            <div class="item-title">{{property.PROPERTY_DICT_NAME || ''}}：
									{{property.PROPERTY_VALUE}}</div>
                	          </div>
                	        </li>
                	    </ul>
	              	</div>
	              	<div class="content-block" style="text-align: center;border-top: 1px solid #999;padding-top:50px" v-show="noProperty">
	              		<img width="50" src="../common/images/no-info.png">
	              		<p class="tipT">暂无数据</p>
	              	</div>
	            </div>
	        </div>
	    </div>
    	<router-view></router-view>
	</div>
</template>
<script type="text/javascript">
	import {entAjax} from '@/common/js/ajax'
	import {matchSelect} from '@/common/js/gen'
	import F7 from 'framework7/dist/js/framework7.min.js'
	import Toast from '@/common/plugin/toast/toast.js'
	export default{
		data () {
		  return {
		  	id: '',
		  	nodata: false,
		  	noManager: false,
		  	noProperty: false,
		    warehouseInfo:{},
		    warehouseManagers:[],
		    warehouseProperties: [],
		    text: '',
		    state: '',
		    goodsList: [],
		    latest: ''
		  };
		},
		methods: {
			backToWList(){
				this.$router.push('/warehouses')
				window.warehouseInfo = {}
				window.warehouseManagers = []
				window.warehouseProperties = []
			},
		  	wactions () {
		        var buttons1 = [
		            {
		                text: '编辑',
		                bold: false,
    		            onClick: ()=> {
    		            	window.edit = 'edit'
                            this.$router.push('/newWarehouseInfo')
                        }
		            },
		            {
		                text: this.text,
		                bold: false,
    		            onClick: ()=> {
    		            	var _this = this
    		            	var options = {height: '50px',duration: 2000};
    		            	var toast;
    		            	if(this.text == '停用'){
    		            		var param = {
    		            			warehouseIds: this.id,
    		            			pathVar: 'warehouseInfo/delete.do',
    		            		};
    		            		entAjax('baseAction.do', param).then(result => {
    		            			if(result.code == '0000'){
		            					toast = f7App.toast('操作成功', '', options);
		            					toast.show();
    		            				_this.text = '启用'
    		            				_this.state = '停用'
    		            			}
    		            		})
    		            	}else{
    		            		var param = {
    		            			warehouseIds: this.id,
    		            			pathVar: 'warehouseInfo/updateStatus.do',
    		            		};
    		            		entAjax('baseAction.do', param).then(result => {
    		            			if(result.code == '0000'){
    		            				toast = f7App.toast('操作成功', '', options);
    		            				toast.show();
    		            				_this.text = '停用'
    		            				_this.state = '启用'
    		            			}
    		            		})
    		            		
    		            	}
                        }
		            }
		        ];
		        var buttons2 = [
		            {
		                text: '取消',
		                color: 'red'
		            }
		        ];
		        var groups = [buttons1, buttons2];
		        window.f7App.actions(groups);
			},
			matchUnit(categoryCode, propertyId,propertyValue){
				var arr = []
				var unit = ''
				if(categoryCode == 1){
					if(propertyId == 38){
						arr = this.qzUnits
						unit = arr[parseInt(propertyValue) -1]
					}else{
						unit = propertyValue
					}
					
				}
				if(categoryCode == 2){
					if(propertyId == 13){
						arr = this.dLevels
						unit = arr[parseInt(propertyValue) -1]
					}else if(propertyId == 15){
						arr = this.sMethods
						unit = arr[parseInt(propertyValue) -1]
					}else if(propertyId == 36){
						arr = this.whUnits
						unit = arr[parseInt(propertyValue) -1]
					}else{
						unit = propertyValue
					}

				}
				if(categoryCode == 3){
					if(propertyId == 33 || propertyId == 34){
						arr = this.zUnits
						unit = arr[parseInt(propertyValue) -1]
					}else{
						unit = propertyValue
					}
					
				}
				if(categoryCode == 5){
					if(propertyId == 17){
						arr = this.wLevels
						unit = arr[parseInt(propertyValue) -1]
					}else if(propertyId == 18){
						arr = this.rlevels
						unit = arr[parseInt(propertyValue) -1]
					}else if(propertyId == 37){
						arr = this.ybUnits
						unit = arr[parseInt(propertyValue) -1]
					}else{
						unit = propertyValue
					}
				}
				if(categoryCode == 6){
					if(propertyId == 39){
						arr = this.xsUnits
						unit = arr[parseInt(propertyValue) -1]
					}else{
						unit = propertyValue
					}
				}
				return unit
			},
			getInfo(){
				var _this = this;
				this.id = this.$route.query.id
				var param = {
					warehouseId: this.id,
					pathVar: '/warehouseInfo/getObjectByKey.do',
				};
				entAjax('baseAction.do', param).then(result => {
					console.log(result)
					_this.warehouseInfo = result.warehouseInfo;
					window.warehouseInfo = _this.warehouseInfo
					if(result.warehouseManagers.length>0){
						_this.warehouseManagers = result.warehouseManagers;
						window.warehouseManagers = _this.warehouseManagers;
						_this.noManager = false
					}else{
						_this.noManager = true
					}
					if(result.warehousePropertys.length>0){
						var tempArr =  result.warehousePropertys
						window.warehouseProperties = tempArr
						tempArr.forEach(function(item){
							_this.warehouseProperties.push({
								PROPERTY_DICT_NAME: item.PROPERTY_DICT_NAME,
								PROPERTY_VALUE: _this.matchUnit(_this.warehouseInfo.warehouseCategory, item.PROPERTY_DICT_ID,item.PROPERTY_VALUE)
							})
						})
						_this.noProperty = false
					}else{
						_this.noProperty = true
					}
					
					if(_this.warehouseInfo.warehouseStatus == 2){
						_this.text = '启用'
						_this.state = '停用'
					}else{
						_this.text = '停用'
						_this.state = '启用'
					}
				}).then(function(){
					_this.getGoodsInfo()
				})
			},
			getGoodsInfo(){
				var _this = this;
				this.id = this.$route.query.id
				var param = {
					category: _this.warehouseInfo.warehouseCategory,
					warehouseId: _this.id,
					pathVar: '/warehouseCheck/systemCheck.do',
				};
				entAjax('baseAction.do', param).then(result => {
					console.log(result)
					if(result.code == '0000'){
						if(result.desc.length>0){
							_this.latest = result.desc[0].CHECK_DATE
							_this.goodsList = result.desc
							_this.nodata = false
						}else{
							_this.nodata = true
						}
						
					}else{
						_this.nodata = true
					}
				})
			},
			replaceString(string){
				if(string && string.indexOf('$##$#&') >= 0){
					var tempArr = string.split('$##$#&')
					return tempArr[0] + '[' + tempArr[1] + ']'
				}else{
					return string
				}
			}
		},
		created(){
			var _self = this;
			Promise.all([matchSelect('gunOrAmmo'),matchSelect('qzMeasurementUnit'),matchSelect('whRiskGrade'),matchSelect('whStorageType'),matchSelect('whMeasurementUnit'),matchSelect('mbMeasurementUnit'),matchSelect('yhWarehouseLevel'),matchSelect('yhWarehouseDangerLevel'),matchSelect('yhMeasurementUnit'),matchSelect('xsMeasurementUnit')]).then(function(datas){
				_self.gunOrAmmos = datas[0];
				_self.qzUnits = datas[1];
				_self.dLevels = datas[2];
				_self.sMethods = datas[3];
				_self.whUnits = datas[4];
				_self.zUnits = datas[5];
				_self.wLevels = datas[6];
				_self.rlevels = datas[7];
				_self.ybUnits = datas[8];
				_self.xsUnits = datas[9];
				_self.getInfo();
			})

		},
		computed: {
		  showUnit () {

		    return true;
		  }
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.list-block,.content-block,.content-block-title
	  margin 15px 0
	  font-size 14px
	.infinite-scroll-preloader {
	  margin-top:-20px;
	  margin-bottom: 10px;
	  text-align: center;
	}
	.infinite-scroll-preloader .preloader {
	  width:34px;
	  height:34px;
	}
	.list-block,.content-block,.content-block-title
		margin 15px 0
	p.mb0
		margin-bottom 0
	.tab-wrapper
		padding 0 10px
	.content-block.warehouse-list
		padding 18px
		margin-top 15px
		li
			margin-bottom 15px
	.content-block-inner:before,.content-block-inner:after
		display none
	.content-block.warehouse-list ul li.wmanager
		width auto
		border 1px solid #d6ecf7  
	.address-box
		padding 10px
	.address-text
		color #000   
	.list-block,.content-block,.content-block-title
	  margin 15px 0
	  font-size 14px
	.load-btn
		padding 10px 2px
		background-color #7c96e5
		text-align center
	.load-text 
		display block
		color #fff
</style>