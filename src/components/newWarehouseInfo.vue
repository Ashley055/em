<template>
	<div class="page">
	 	<div class="navbar">
	 	  <div class="navbar-inner">
	 	    <!-- We need cool sliding animation on title element, so we have additional "sliding" class -->
	 	    <div class="left">
  		      	<a href="javascript:void(0)" class="link icon-only" @click="backToWarehouses">
  		      		<i class="icon icon-back"></i>
                  	<span>返回</span>
  		      	</a>
	 	    </div>
	 	    <div class="center ent-title">{{titleText}}</div>
	 	    <div class="right">
	 	      <a href="#" class="link icon-only">
	 	        <!-- <i class="icon icon-bars"></i> -->
	 	      </a>
	 	    </div>
	 	  </div>
	 	</div>
		<!-- Scrollable page content -->
	    <div class="page-content">
	    	<div class="basic-info">
		    	<form id="my-form">
			    	<div class="list-block mg0">
			    	  	<ul>
			    	    	<!-- Text inputs -->
			    	    	<li>
			    	    		<a href="javascript:void(0)" class="item-link item-content">
				    	        	<div class="item-inner" @class="infoshow? 'marb85':''">
				    	         		<div class="item-title label"><span class="color-red">*</span>仓库类型</div>
				    	          		<div class="item-input disClick">
				    	            		<input class="warehouseType" :value="warehouseInfo.warehouseType == 1?'实有仓库': '虚拟仓库'" :data-value="warehouseInfo.warehouseType" name="warehouseTypeN" type="text"  readonly>
				    	          		</div>
				    	          		 <div class="item-after" @click="getHelp"><span class="badge">!</span></div>
				    	        	</div>
				    	        </a>
				    	    </li>
				    	    <li class="w-help" v-show="help">
		    	         		<p class="row">
		    	         			<span class="c-gray col-30">实有仓库：</span>
		    	         			<span class="col-70">真实存在且在使用的仓库</span>
	    	         			</p>
    	          				<p class="row">
    	          					<span class="c-gray col-30">虚拟仓库：</span>
    	          					<span class="col-70">非实体仓库，学校等企事业单位危险品数量少、无专门存放要求，为方便建账创建的虚拟仓库</span>
	          					</p>
				    	    </li>
		        	    	<li>
		        	    		<a href="#" class="item-link item-content">
		    	    	        	<div class="item-inner">
		    	    	         		<div class="item-title label"><span class="color-red">*</span>货物类型</div>
		    	    	          		<div class="item-input">
		    	    	            		<input type="text" name="warehouseCategoryName" :value="warehouseInfo.warehouseCategoryName" :data-value="warehouseInfo.warehouseCategory" class="goodsType" readonly placeholder="请选择货物类型">
		    	    	          		</div>
		    	    	        	</div>
		    	    	        </a>
		    	    	    </li>
		        	    	<!-- Text inputs -->
		        	    	<li class="align-top">
		        	    	    <div class="item-content">
		        	    	       <div class="item-inner">
		        	    	         	<div class="item-title label"><span class="color-red">*</span>仓库名称</div>
		        	    	         	<div class="item-input">
		        	    	           		<textarea name="warehouseName" maxlength="100" :value="warehouseInfo.warehouseName" type="text" placeholder="请输入仓库名称"></textarea>
		        	    	         	</div>
		        	    	       </div>
		        	    	    </div>
		    	    	   </li>
			       	    	<li class="align-top">
			       	    		<div class="item-content">
			       	    			<div class="item-inner">
			       	    		 		<div class="item-title label"><span class="color-red">*</span>所在地区</div>
			       	    		  		<div class="item-input">
			       	    		    		<input name="areaName" class="w-area" :value="areaName" :data-value="warehouseInfo.area" type="text" readonly placeholder="请所在地区">
			       	    		  		</div>
			       	    		  		 <div class="item-after" @click="getLocated"><img height="27" src="../common/images/u458.png"></div>
		       	    		  		</div>
		       	    			</div>
			   	    	    </li>
		        	    	<li class="align-top">
		        	    	    <div class="item-content">
		        	    	       <div class="item-inner">
		        	    	         	<div class="item-title label"><span class="color-red">*</span>详细位置</div>
		        	    	         	<div class="item-input">
		        	    	           		<textarea class="" name="address" :value="warehouseInfo.address" type="text" placeholder="请输入详细位置"></textarea>
		        	    	         	</div>
		        	    	       </div>
		        	    	    </div>
		    	    	   </li>
			    	    </ul>
		    	    </div>
	    	    </form>
	    	    <p class="btn-wrap bg-white"><a href="javascript:void(0)" @click="storeDatas" class="button active b-next">下一步</a></p>
	    	</div>
	    </div>
	</div>
</template>
<script type="text/javascript">
	import {entAjax} from '@/common/js/ajax'
	import '@/common/plugin/toast/toast.css'
	import F7 from 'framework7/dist/js/framework7.min.js'
	import Toast from '@/common/plugin/toast/toast.js'
	import {getValues,selectArea,matchSelect,matchCategory} from '@/common/js/gen'
	export default{
		data () {
		  return {
		  	titleText: '',
		  	infoshow: false,
		  	help: false,
		  	warehouseInfo:{},
		  	formData: {},
		  	codes: [],
		  };
		},
		created(){
			var _this = this
			if(window.edit){
				this.titleText = '编辑仓库'
				this.warehouseInfo = window.warehouseInfo;
			}else{
				this.titleText = '新增仓库'
				this.warehouseInfo = Object.assign(this.warehouseInfo, {
					warehouseTypeName: '实有仓库',
					warehouseType: '1'
				});
				this.warehouseInfo = Object.assign(this.warehouseInfo, window.warehouseInfo)
			}
			this.$nextTick(function(){
				if(!window.edit){
					getValues('warehouseType', '.warehouseType')
				}
				selectArea('.w-area');
				_this.getCategory('.goodsType')
				Promise.all([matchSelect('warehouseType'),matchCategory()]).then(function(results){
					var types = results[0]
					var categoryNames = results[1][1]
					var categories = results[1][0]
					if(window.f7App.formGetData('#my-form')){
						if(_this.warehouseInfo){
							_this.warehouseInfo = Object.assign(_this.warehouseInfo,window.f7App.formGetData('#my-form'))
						}else{
							_this.warehouseInfo = window.f7App.formGetData('#my-form')
						}
						_this.warehouseInfo = Object.assign({warehouseCategory: categories[categoryNames.indexOf(window.f7App.formGetData('#my-form').warehouseCategoryName)], warehouseType: (types.indexOf(window.f7App.formGetData('#my-form').warehouseTypeN)) + 1, area: window.basicId.area}, _this.warehouseInfo)
						console.log(_this.warehouseInfo)
					}
				})
			});
		},
		computed: {
		  areaName () {
		    return this.warehouseInfo.areaName;
		  }
		},
		methods: {
			getInfo(){
				this.infoshow = !this.infoshow
				this.formData = window.f7App.formToJSON('#my-form') 
				f7App.formStoreData('#my-form', this.formData);
				var basicId = {}
				basicId.area = $$('.w-area').data('value');
				if(window.basicId){
					window.basicId = Object.assign(window.basicId, basicId)
				}else{
					window.basicId = basicId
				}
				
				event.stopPropagation();
				event.preventDefault();
			},
			getLocated(){
				this.formData = window.f7App.formToJSON('#my-form') 
				f7App.formStoreData('#my-form', this.formData);
				var basicId = {}
				basicId.area = $$('.w-area').data('value');
				if(window.basicId){
					window.basicId = Object.assign(window.basicId, basicId)
				}else{
					window.basicId = basicId
				}
				this.$router.push({path:'/locate',query: this.warehouseInfo})
			},
			storeDatas(){
				var options = {height: '50px',duration: 2000};
				var toast;
				this.formData = window.f7App.formToJSON('#my-form');
				if(this.formData.warehouseType == ''){
					toast = f7App.toast('仓库类型必填', '', options);
					toast.show();
					return
				}
				if(this.formData.goodsType == ''){
					toast = f7App.toast('货物类型必填', '', options);
					toast.show();
					return
				}
				if(this.formData.warehouseName == ''){
					toast = f7App.toast('仓库名称必填', '', options);
					toast.show();
					return
				}
				if(this.formData.wArea == ''){
					toast = f7App.toast('所在地区必填', '', options);
					toast.show();
					return
				}
				if(this.formData.address == ''){
					toast = f7App.toast('详细位置必填', '', options);
					toast.show();
					return
				}
				window.goodsType = window.$$('.goodsType').data('value')
				f7App.formStoreData('#my-form', this.formData);
				var basicId = {};
				basicId.warehouseType = $$('.warehouseType').data('value');
				basicId.goodsType = $$('.goodsType').data('value');
				basicId.area = $$('.w-area').data('value');
				basicId.warehouseId = this.warehouseInfo.warehouseId
				if(window.basicId){
					window.basicId = Object.assign(window.basicId, basicId)
				}else{
					window.basicId = basicId
				}
				this.$router.push('/otherInfo')	
			},
			getHelp(){
				this.help = !this.help
				this.formData = window.f7App.formToJSON('#my-form') 
				f7App.formStoreData('#my-form', this.formData);
			},
			getCategory(dom){
				var values = '';
				var displayValues = '';
				var categories = []
				var _this = this;
				var param = {
					pathVar: '/warehouseInfo/getBizType.do',
				};
				entAjax('baseAction.do', param).then(result => {
					if(result.code == '0000'){
						var newlist = result.desc;
						newlist.forEach((obj)=>{
							values= values + ' ' + obj.code
							displayValues= displayValues + ' ' + obj.name
							categories.push(obj.name)
						})
					}
				}).then(()=>{
					var pickerDescribe = window.f7App.picker({
					    input: dom,
					    // rotateEffect: true,
					    toolbarCloseText: '完成',
					    formatValue: function (picker, values, displayValues) {
					    	var datavalue = values;
					    	$$(dom).attr('data-value', datavalue);
					        
					        f7App.formDeleteData('#qz_info')
					        f7App.formDeleteData('#wh_info')
					        f7App.formDeleteData('#mb_info')
					        f7App.formDeleteData('#yb_info')
					        f7App.formDeleteData('#xs_info')
					        return displayValues;
					    },
					    cols: [
					        {
					            textAlign: 'left',
					            values: values.split(' '),
					            displayValues: displayValues.split(' '),
					        }
					    ]
					});
				})
			},
			// matchCategory(dom){
			// 	var _this = this
			// 	return new Promise(function(resolve, reject){
			// 		var categories = []
			// 		var _this = this;
			// 		var param = {
			// 			pathVar: '/warehouseInfo/getBizType.do',
			// 		};
			// 		entAjax('baseAction.do', param).then(result => {
			// 			console.log(result)
			// 			if(result.code == '0000'){
			// 				var newlist = result.desc;
			// 				newlist.forEach((obj)=>{
			// 					categories.push(obj.name)
			// 				})
			// 				resolve(categories)
			// 			}
			// 		})
			// 	})
			// },
			backToWarehouses(){
				if(window.edit){
					f7App.formDeleteData('#my-form')
					f7App.formDeleteData('#qz_info')
					f7App.formDeleteData('#wh_info')
					f7App.formDeleteData('#mb_info')
					f7App.formDeleteData('#yb_info')
					f7App.formDeleteData('#xs_info')
					f7App.formDeleteData('#wkeeper')
					this.$router.push({path:'/warehouseInfo',query:{id: warehouseInfo.warehouseId}})
					window.edit = false
				}else{
					f7App.formDeleteData('#my-form')
					f7App.formDeleteData('#qz_info')
					f7App.formDeleteData('#wh_info')
					f7App.formDeleteData('#mb_info')
					f7App.formDeleteData('#yb_info')
					f7App.formDeleteData('#xs_info')
					this.$router.push('/warehouses')
				}
				window.warehouseInfo = {}
			},

		},

	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.list-block,.content-block,.content-block-title
	  margin 15px 0
	  font-size 14px
	.page-content
		padding-bottom 50px !important
	.btn-wrap
		// position fixed
		// left 0 
		// bottom 0
		// width 100%
		padding 8px 30px
		box-sizing border-box
		.b-next
			padding 6px 0
			height auto
	.mg0
		margin 0
	.w-help
		background-color #f3f3f3
		padding 13px 20px
		font-size 14px
		& p
			margin-top 0
			margin-bottom 0
			color #1296db
			& .c-gray
				color #999
	.list-block input[type=date], .list-block input[type=datetime-local], .list-block input[type=email], .list-block input[type=number], .list-block input[type=password], .list-block input[type=search], .list-block input[type=tel], .list-block input[type=text], .list-block input[type=time], .list-block input[type=url], .list-block select, .list-block textarea
		font-size 14px
		
</style>