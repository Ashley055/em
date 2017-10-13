<template>
	<div class="page">
	 	<div class="navbar">
	 	  <div class="navbar-inner">
	 	    <!-- We need cool sliding animation on title element, so we have additional "sliding" class -->
	 	    <div class="left">
  		      	<a href="javascript:void(0)" @click="backToOtherInfo" class="link icon-only">
  		      		<i class="icon icon-back"></i>
                  	<span>返回</span>
  		      	</a>
	 	    </div>
	 	    <div class="center ent-title">填写仓管员</div>
	 	    <div class="right">
	 	      <a href="#" class="link icon-only">
	 	        <!-- <i class="icon icon-bars"></i> -->
	 	      </a>
	 	    </div>
	 	  </div>
	 	</div>
	 	<div class="page-content">
	 		<form class="list-block" id="wkeeper">
	 		  <!-- First group-->
	 		  <div class="list-group" v-for="(wkeeper, index) in wkeepers">
	 		    <ul>
	 		      <li class="list-group-title">仓管员({{index + 1}}) <span class="delete" @click="deleteInfo(index)" v-show="index > 0">删除</span></li>
	 		      <li class="item-content">
	 		        <div class="item-inner">
    	         		<div class="item-title label"><span class="color-red">*</span>姓         名</div>
    	          		<div class="item-input">
    	            		<input class="kname" :name="'kname' + (index + 1)" type="text" placeholder="请输入姓名">
    	          		</div>
    	        	</div>
	 		      </li>
	 		      <li>
	    	    		<div class="item-content">
		    	        	<div class="item-inner">
		    	         		<div class="item-title label">身份证号</div>
		    	          		<div class="item-input">
		    	            		<input class="kidCard" :name="'kidCard' + (index + 1)" type="text" maxlength="18" onkeyup="this.value=this.value.replace(/[^\d\X]/g,'');" placeholder="请输入身份证号">
		    	          		</div>
		    	        	</div>
		    	        </div>
		    	    </li>
		    	    <li>
	    	    		<div class="item-content">
		    	        	<div class="item-inner">
		    	         		<div class="item-title label">联系电话</div>
		    	          		<div class="item-input">
		    	            		<input class="kphone" maxlength="13" onkeyup="this.value=this.value.replace(/[^\d\-]/g,'');" :name="'kphone' + (index + 1)" type="text" placeholder="请输入联系电话">
		    	          		</div>
		    	        	</div>
		    	        </div>
		    	    </li>
	 		    </ul>
	 		  </div>
	 		</form>
	 		<p class="bg-white color-blue newKeeper" @click="newKeeper"><i class="f7-icons size-22">add</i>增加仓管员</p>
		    <p class="btn-wrap bg-white"><a href="javascript:void(0)" @click="sumitDatas" class="button active b-next">提交</a></p>
	 	</div>
	</div>
</template>
<script type="text/javascript">
import '@/common/stylus/base.styl'
import {getValues,selectArea} from '@/common/js/gen'
import '@/common/plugin/toast/toast.css'
import F7 from 'framework7/dist/js/framework7.min.js'
import Toast from '@/common/plugin/toast/toast.js'
import {entAjax} from '@/common/js/ajax'
	export default{
		data () {
		  return {
		    n:1,
		    wkeepers: []
		  };
		},
		created(){
			if(window.wkeepers){
				this.wkeepers = window.wkeepers
			}else{
				this.infoObj = {"managerId": "", "managerName": "", "warehouseId": "", "managerPhone": "", "managerIdCard": ""}
				this.wkeepers.push(this.infoObj)
			}
			
			this.$nextTick(()=>{
				var wkeeperInfo = window.f7App.formGetData('#wkeeper');
				if(wkeeperInfo){
					window.f7App.formFromJSON('#wkeeper', wkeeperInfo)
				}
			})
		},
		methods: {
		  backToOtherInfo () {
		  	var wkeeperInfo = window.f7App.formToJSON('#wkeeper');
		  	window.f7App.formStoreData('#wkeeper', wkeeperInfo);
		  	window.wkeepers = this.wkeepers;
		    this.$router.back()
		  },
		  sumitDatas () {
		  	var propertys = window.propertys;
		  	var options = {height: '50px',duration: 2000};
		  	var toast;
		  	// var re = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{4}$/;
		  	var re = /^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{2}$/;
		  	// var rre = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
		  	var rre = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
		  	var formData = window.f7App.formToJSON('#wkeeper');
		  	var managers = '';
		  	var kname = window.$$('.kname');
		  	var kidCard = window.$$('.kidCard');
		  	var kphone = window.$$('.kphone');
		  	for(var i = 0; i < kname.length; i++){
		  		if(kname[i].value == ''){
		  			toast = f7App.toast('姓名必填', '', options);
		  			toast.show();
		  			return
		  		}
		  		if(kidCard[i].value != ''){
		  			// kidCard[i].attr({
		  			// 	on: 'value1',
		  			// 	property2: 'value2'
		  			// });
		  			if (!re.test(kidCard[i].value) || rre.test(kidCard[i].value) || kidCard[i].value.length < 15){
		  				toast = f7App.toast('请输入正确的身份证号！', '', options);
		  				toast.show();
		  				return
		  			}		  			
		  		}
		  		if(kphone[i].value != ''){
		  			if(!(/^1(3|4|5|7|8)\d{9}$/.test(kphone[i].value)) && !(/^0\d{2,3}-?\d{7,8}$/.test(kphone[i].value))){ 
		  				toast = f7App.toast('请输入正确的联系电话！', '', options);
		  				toast.show();
		  				return
		  			}		  			
		  		}
		  		var managerIdCard = kidCard[i].value || ''
		  		var managerName = kname[i].value || ''
		  		var managerPhone = kphone[i].value || ''
		  		if(managers == ''){
		  			managers = '{"managerIdCard":"' + managerIdCard + '", "managerName":"' + managerName +'", "managerPhone":"' + managerPhone + '"}'
		  		}else{
		  			managers = managers + ',' + '{"managerIdCard":"' + managerIdCard + '", "managerName":"' + managerName +'", "managerPhone":"' + managerPhone + '"}'
		  		}
		  	}
		  	var wkeeperInfo = window.f7App.formToJSON('#wkeeper');
		  	window.f7App.formStoreData('#wkeeper', wkeeperInfo);
		  	managers = '[' + managers + ']'
		    var basicInfo = f7App.formGetData('#my-form');
		    var _this = this;
		    var param = {
		    	address: basicInfo.address,
		    	area: window.basicId.area,
		    	gunOrAmmo: basicInfo.gunOrAmmo,
		    	managers:managers,
		    	// longitude: window.warehouseInfo.longitude,
		    	// latitude: window.warehouseInfo.latitude,
		    	propertys: propertys,
		    	warehouseCategory: window.basicId.goodsType,
		    	warehouseName: basicInfo.warehouseName,
		    	warehouseType: window.basicId.warehouseType,
		    	pathVar: '/warehouseInfo/insert.do',
		    };
		    entAjax('baseAction.do', param).then(result => {
		    	if(result.code == '0000'){
		    		toast = f7App.toast('保存成功', '', options);
		    		toast.show();
		    		setTimeout(function(){
		    			_this.$router.push('/warehouses')
		    			f7App.formDeleteData('#my-form')
		    			f7App.formDeleteData('#qz_info')
		    			f7App.formDeleteData('#wh_info')
		    			f7App.formDeleteData('#mb_info')
		    			f7App.formDeleteData('#yb_info')
		    			f7App.formDeleteData('#xs_info')
		    		},2000)
		    	}else{
		    		toast = f7App.toast('保存失败', '', options);
		    		toast.show();
		    	}
		    })
		  },
		  newKeeper(){
		  	this.wkeepers.push(this.infoObj)
		  },
		  deleteInfo(index){
		  	var _self = this
		  	f7App.confirm('确认删除该仓管员?', '提示',
		  	   function () {
		  	     _self.wkeepers.splice(index, index)
		  	   },
		  	   function () {
		  	    
		  	   }
		  	 )
		  }
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.btn-wrap
		width 100%
		padding 8px 30px
		box-sizing border-box
		z-index 99
		.b-next
			padding 6px 0
			height auto
	.list-block,.content-block
		margin 15px 0
		font-size 14px
	.newKeeper
		padding 6px 0
		text-align center
		margin-bottom 84px
	.size-22
		font-size 22px
		margin-right 5px
	.delete
		position absolute
		right 10px
		// top 10px
</style>