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
	 	<div class="page-content other-inf">
			<form id="mb_info" v-show="goodsType == 3">
				<div class="content-block-title">民爆类</div>
		    	<div class="list-block">
		    	  	<ul>
		    	    	<!-- Text inputs -->
		    	    	<li>
		    	    		<div class="item-content">
			    	        	<div class="item-inner">
			    	         		<div class="item-title label">炸药库房数</div>
			    	          		<div class="item-input">
			    	            		<input name="zWarehouses" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入炸药库房数">
			    	          		</div>
			    	        	</div>
			    	        </div>
			    	    </li>
	        	    	<li>
	        	    		<div class="item-content">
	    	    	        	<div class="item-inner">
	    	    	         		<div class="item-title label">库房面积(㎡)</div>
	    	    	          		<div class="item-input">
	    	    	            		<input name="zArea" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'').replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')" placeholder="请输入库房面积(㎡)">
	    	    	          		</div>
	    	    	        	</div>
	    	    	        </div>
	    	    	    </li>
	        	    	<li>
	        	    		<div class="item-content">
	    	    	        	<div class="item-inner">
	    	    	         		<div class="item-title label">最大储存量</div>
	    	    	          		<div class="item-input">
	    	    	            		<input name="zMaxStorage" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'').replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')" placeholder="请输入最大储存量">
	    	    	          		</div>
	    	    	        	</div>
	    	    	        </div>
	    	    	    </li>
	    	    	    <li>
	        	    		<div class="item-link item-content">
	    	    	        	<div class="item-inner">
	    	    	         		<div class="item-title label">储存单位</div>
	    	    	          		<div class="item-input">
	    	    	            		<input class="z-unit" readonly name="zUnit" type="text" placeholder="请选择储存单位">
	    	    	          		</div>
	    	    	        	</div>
	    	    	        </div>
	    	    	    </li>
		    	    </ul>
			    </div>
		    	<div class="list-block">
		    	  	<ul>
		    	    	<!-- Text inputs -->
		    	    	<li>
		    	    		<div class="item-content">
			    	        	<div class="item-inner">
			    	         		<div class="item-title label">雷管库房数</div>
			    	          		<div class="item-input">
			    	            		<input name="lWarehouses" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d]/g,'');" placeholder="请输入雷管库房数">
			    	          		</div>
			    	        	</div>
			    	        </div>
			    	    </li>
	        	    	<li>
	        	    		<div class="item-content">
	    	    	        	<div class="item-inner">
	    	    	         		<div class="item-title label">库房面积(㎡)</div>
	    	    	          		<div class="item-input">
	    	    	            		<input name="lArea" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'').replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')" placeholder="请输入库房面积(㎡)">
	    	    	          		</div>
	    	    	        	</div>
	    	    	        </div>
	    	    	    </li>
	        	    	<li>
	        	    		<div class="item-content">
	    	    	        	<div class="item-inner">
	    	    	         		<div class="item-title label">最大储存量</div>
	    	    	          		<div class="item-input">
	    	    	            		<input name="lMaxStorage" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'').replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')" placeholder="请输入最大储存量">
	    	    	          		</div>
	    	    	        	</div>
	    	    	        </div>
	    	    	    </li>
	    	    	    <li>
	        	    		<div class="item-link item-content">
	    	    	        	<div class="item-inner">
	    	    	         		<div class="item-title label">储存单位</div>
	    	    	          		<div class="item-input">
	    	    	            		<input class="l-unit" name="lunit" type="text" readonly placeholder="请选择储存单位">
	    	    	          		</div>
	    	    	        	</div>
	    	    	        </div>
	    	    	    </li>
		    	    </ul>
			    </div>
		    	<div class="list-block">
		    	  	<ul>
		    	    	<!-- Text inputs -->
	    	    	    <li>
	        	    		<div class="item-content">
	    	    	        	<div class="item-inner">
	    	    	         		<div class="item-title label">管、索类(万米)</div>
	    	    	          		<div class="item-input">
	    	    	            		<input name="tubes" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'').replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')" placeholder="请输入管、索类(万米)）">
	    	    	          		</div>
	    	    	        	</div>
	    	    	        </div>
	    	    	    </li>
		    	    </ul>
			    </div>
		    </form>
			<form id="wh_info" v-show="goodsType == 2">
				<div class="content-block-title">危化类</div>
		    	<div class="list-block">
		    	  	<ul>
		    	    	<!-- Text inputs -->
		    	    	<li>
		    	    		<div class="item-link item-content">
			    	        	<div class="item-inner">
			    	         		<div class="item-title label">风险等级</div>
			    	          		<div class="item-input">
			    	            		<input class="d-level" name="dLevel" type="text" readonly placeholder="请选择风险等级">
			    	          		</div>
			    	        	</div>
			    	        </div>
			    	    </li>
	        	    	<li>
	        	    		<div class="item-link item-content">
	    	    	        	<div class="item-inner">
	    	    	         		<div class="item-title label">储存方式</div>
	    	    	          		<div class="item-input">
	    	    	            		<input class="s-method" name="sMethod" type="text" readonly placeholder="请选择存储方式">
	    	    	          		</div>
	    	    	        	</div>
	    	    	        </div>
	    	    	    </li>
	        	    	<li>
	        	    		<div class="item-content">
	    	    	        	<div class="item-inner">
	    	    	         		<div class="item-title label">库房面积(㎡)</div>
	    	    	          		<div class="item-input">
	    	    	            		<input name="whArea" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'').replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')"  placeholder="请输入库房面积(㎡)">
	    	    	          		</div>
	    	    	        	</div>
	    	    	        </div>
	    	    	    </li>
	        	    	<li>
	        	    		<div class="item-content">
	    	    	        	<div class="item-inner">
	    	    	         		<div class="item-title label">最大储存量</div>
	    	    	          		<div class="item-input">
	    	    	            		<input name="whMaxStorage" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'').replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')" placeholder="请输入最大储存量">
	    	    	          		</div>
	    	    	        	</div>
	    	    	        </div>
	    	    	    </li>
	    	    	    <li>
	        	    		<div class="item-link item-content">
	    	    	        	<div class="item-inner">
	    	    	         		<div class="item-title label">储存单位</div>
	    	    	          		<div class="item-input">
	    	    	            		<input class="wh-unit" readonly name="whUnit" type="text" placeholder="请选择储存单位">
	    	    	          		</div>
	    	    	        	</div>
	    	    	        </div>
	    	    	    </li>
		    	    </ul>
			    </div>
		    </form>
			<form id="yb_info" v-show="goodsType == 5">
				<div class="content-block-title">烟花爆竹类</div>
		    	<div class="list-block">
		    	  	<ul>
		    	    	<!-- Text inputs -->
		    	    	<li>
		    	    		<div class="item-link item-content">
			    	        	<div class="item-inner">
			    	         		<div class="item-title label">库房级别</div>
			    	          		<div class="item-input">
			    	            		<input class="w-level" name="wLevel" type="text" readonly placeholder="请选择库房级别">
			    	          		</div>
			    	        	</div>
			    	        </div>
			    	    </li>
		    	    	<li>
		    	    		<div class="item-link item-content">
			    	        	<div class="item-inner">
			    	         		<div class="item-title label">危险等级</div>
			    	          		<div class="item-input">
			    	            		<input class="r-level" name="rlevel" type="text" readonly placeholder="请选择危险等级">
			    	          		</div>
			    	        	</div>
			    	        </div>
			    	    </li>
		    	    	<li>
		    	    		<div class="item-content">
			    	        	<div class="item-inner">
			    	         		<div class="item-title label">总建筑面积(㎡)</div>
			    	          		<div class="item-input">
			    	            		<input name="ybArea" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'').replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')" placeholder="总建筑面积(㎡)">
			    	          		</div>
			    	        	</div>
			    	        </div>
			    	    </li>
			    	    <li>
		    	    		<div class="item-content">
			    	        	<div class="item-inner">
			    	         		<div class="item-title label">回收间建筑面积(㎡)</div>
			    	          		<div class="item-input">
			    	            		<input name="ybrArea" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'').replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')" placeholder="回收间建筑面积(㎡)">
			    	          		</div>
			    	        	</div>
			    	        </div>
			    	    </li>
			    	    <li>
		    	    		<div class="item-content">
			    	        	<div class="item-inner">
			    	         		<div class="item-title label">生产区建筑面积(㎡)</div>
			    	          		<div class="item-input">
			    	            		<input name="ybpArea" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'').replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')" placeholder="生产区建筑面积(㎡)">
			    	          		</div>
			    	        	</div>
			    	        </div>
			    	    </li>
			    	    <li>
		    	    		<div class="item-content">
			    	        	<div class="item-inner">
			    	         		<div class="item-title label">生产辅助设施建筑面积(㎡)</div>
			    	          		<div class="item-input">
			    	            		<input name="ybpaArea" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'').replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')" placeholder="生产辅助设施建筑面积(㎡)">
			    	          		</div>
			    	        	</div>
			    	        </div>
			    	    </li><li>
		    	    		<div class="item-content">
			    	        	<div class="item-inner">
			    	         		<div class="item-title label">办公服务设施建筑面积(㎡)</div>
			    	          		<div class="item-input">
			    	            		<input name="ybwArea" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'').replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')" placeholder="办公服务设施建筑面积(㎡)">
			    	          		</div>
			    	        	</div>
			    	        </div>
			    	    </li><li>
		    	    		<div class="item-content">
			    	        	<div class="item-inner">
			    	         		<div class="item-title label">经营面积(㎡)</div>
			    	          		<div class="item-input">
			    	            		<input name="ybtArea" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'').replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')" placeholder="经营面积(㎡)">
			    	          		</div>
			    	        	</div>
			    	        </div>
			    	    </li><li>
		    	    		<div class="item-content">
			    	        	<div class="item-inner">
			    	         		<div class="item-title label">涉药库房面积(㎡)</div>
			    	          		<div class="item-input">
			    	            		<input name="ybcArea" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'').replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')" placeholder="涉药库房面积(㎡)">
			    	          		</div>
			    	        	</div>
			    	        </div>
			    	    </li>
		    	    	<li>
		    	    		<div class="item-content">
			    	        	<div class="item-inner">
			    	         		<div class="item-title label">最大储存量</div>
			    	          		<div class="item-input">
			    	            		<input name="ybMaxStorage" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'').replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')" placeholder="最大储存量">
			    	          		</div>
			    	        	</div>
			    	        </div>
			    	    </li>
			    	    <li>
		    	    		<div class="item-link item-content">
			    	        	<div class="item-inner">
			    	         		<div class="item-title label">储存单位</div>
			    	          		<div class="item-input">
			    	            		<input class="yb-unit" readonly name="ybUnit" type="text" placeholder="请选择储存单位">
			    	          		</div>
			    	        	</div>
			    	        </div>
			    	    </li>
		    	    </ul>
			    </div>
		    </form>
	    	<form id="qz_info" v-show="goodsType == 1">
	    		<div class="content-block-title">枪支类</div>
	        	<div class="list-block">
	        	  	<ul>
	        	    	<!-- Text inputs -->
	        	    	<li>
	        	    		<div class="item-link item-content">
	    	    	        	<div class="item-inner">
	    	    	         		<div class="item-title label">物品类型</div>
	    	    	          		<div class="item-input">
	    	    	            		<input class="g-type" name="gType" type="text" readonly placeholder="请选择物品类型">
	    	    	          		</div>
	    	    	        	</div>
	    	    	        </div>
	    	    	    </li>
	        	    	<li>
	        	    		<div class="item-content">
	    	    	        	<div class="item-inner">
	    	    	         		<div class="item-title label">库房面积(㎡)</div>
	    	    	          		<div class="item-input">
	    	    	            		<input name="qzArea" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'').replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')" placeholder="请输入库房面积(㎡)">
	    	    	          		</div>
	    	    	        	</div>
	    	    	        </div>
	    	    	    </li>
	        	    	<li>
	        	    		<div class="item-content">
	    	    	        	<div class="item-inner">
	    	    	         		<div class="item-title label">最大储存量</div>
	    	    	          		<div class="item-input">
	    	    	            		<input name="qzMaxStorage" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'').replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')" placeholder="请输入最大储存量">
	    	    	          		</div>
	    	    	        	</div>
	    	    	        </div>
	    	    	    </li>
	    	    	    <li>
	        	    		<div class="item-link item-content">
	    	    	        	<div class="item-inner">
	    	    	         		<div class="item-title label">储存单位</div>
	    	    	          		<div class="item-input">
	    	    	            		<input class="qz-unit" readonly name="qzUnit" type="text" placeholder="请选择储存单位">
	    	    	          		</div>
	    	    	        	</div>
	    	    	        </div>
	    	    	    </li>
	        	    </ul>
	    	    </div>
	        </form>
	    	<form id="xs_info" v-show="goodsType == 6">
		    	<div class="content-block-title">硝酸铵类</div>
	        	<div class="list-block">
	        	  	<ul>
	        	    	<!-- Text inputs -->
	        	    	<li>
	        	    		<div class="item-content">
	    	    	        	<div class="item-inner">
	    	    	         		<div class="item-title label">库房面积(㎡)</div>
	    	    	          		<div class="item-input">
	    	    	            		<input name="xsArea" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'').replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')" placeholder="请输入库房面积(㎡)">
	    	    	          		</div>
	    	    	        	</div>
	    	    	        </div>
	    	    	    </li>
	        	    	<li>
	        	    		<div class="item-content">
	    	    	        	<div class="item-inner">
	    	    	         		<div class="item-title label">最大储存量</div>
	    	    	          		<div class="item-input">
	    	    	            		<input name="xsMaxStorage" type="text" maxlength="50" onkeyup="this.value=this.value.replace(/[^\d\.]/g,'').replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3')" placeholder="请输入最大储存量">
	    	    	          		</div>
	    	    	        	</div>
	    	    	        </div>
	    	    	    </li>
	    	    	    <li>
	        	    		<div class="item-link item-content">
	    	    	        	<div class="item-inner">
	    	    	         		<div class="item-title label">储存单位</div>
	    	    	          		<div class="item-input">
	    	    	            		<input class="xs-unit" readonly name="xsUnit" type="text" placeholder="请选择储存单位">
	    	    	          		</div>
	    	    	        	</div>
	    	    	        </div>
	    	    	    </li>
	        	    </ul>
	    	    </div>
	        </form>
			
		    <p class="btn-wrap bg-white"><a href="javascript:void(0)" @click="saveDatas" class="button active b-next">下一步</a></p>
	 	</div>
	</div>
</template>
<script type="text/javascript">
import {getValues,selectArea,matchSelect} from '@/common/js/gen'
import {entAjax} from '@/common/js/ajax'
	export default{
		data () {
		  return {
		    goodsType:''
		  };
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
				_self.$nextTick(function(){
					if(window.edit){
						_self.fillInDatas();
					}else{
						getValues('gunOrAmmo', '.g-type')
					}
					getValues('mbMeasurementUnit', '.z-unit')
					getValues('mbMeasurementUnit', '.l-unit')
					getValues('whRiskGrade', '.d-level')
					getValues('whStorageType', '.s-method')
					getValues('whMeasurementUnit', '.wh-unit')
					getValues('yhWarehouseLevel', '.w-level')
					getValues('yhWarehouseDangerLevel', '.r-level')
					getValues('yhMeasurementUnit', '.yb-unit')
					getValues('qzMeasurementUnit', '.qz-unit')
					getValues('xsMeasurementUnit', '.xs-unit')

					var storeMbInfo = window.f7App.formGetData('#mb_info')
					var storeQzInfo = window.f7App.formGetData('#qz_info')
					var storeWhInfo = window.f7App.formGetData('#wh_info')
					var storeYbInfo = window.f7App.formGetData('#yb_info')
					var storeXsInfo = window.f7App.formGetData('#xs_info')

					if(storeMbInfo){
						window.f7App.formFromJSON('#mb_info', storeMbInfo);
					}
					if(storeQzInfo){
						window.f7App.formFromJSON('#qz_info', storeQzInfo);
					}
					if(storeWhInfo){
						window.f7App.formFromJSON('#wh_info', storeWhInfo);
					}
					if(storeYbInfo){
						window.f7App.formFromJSON('#yb_info', storeYbInfo);
					}
					if(storeXsInfo){
						window.f7App.formFromJSON('#xs_info', storeXsInfo);
					}
				})
			})
			this.goodsType = window.goodsType
		},
		methods: {
		  backToNew () {
		    // this.$emit('backTo')
		    var qzformData = window.f7App.formToJSON('#qz_info');
		    window.f7App.formStoreData('#qz_info', qzformData);
		    var whformData = window.f7App.formToJSON('#wh_info');
		    window.f7App.formStoreData('#wh_info', whformData);
		    var mbformData = window.f7App.formToJSON('#mb_info');
		    window.f7App.formStoreData('#mb_info', mbformData);
		    var ybformData = window.f7App.formToJSON('#yb_info');
		    window.f7App.formStoreData('#yb_info', ybformData);
		    var xsformData = window.f7App.formToJSON('#xs_info');
		    window.f7App.formStoreData('#xs_info', xsformData);
		    this.$router.back()
		  },
		  fillInDatas(){
		  	if(window.goodsType == 1){
		  		var qzUnit = getValues('qzMeasurementUnit')
		  		var qzProperties = {}
		  		var qzProperty = []
		  		window.warehouseProperties.forEach(function(property){
		  			qzProperty.push(property.PROPERTY_VALUE)
		  		})
		  		var property1 = window.warehouseInfo.gunOrAmmo? this.gunOrAmmos[parseInt(window.warehouseInfo.gunOrAmmo)] : ''
		  		var property2 = qzProperty[0] || ''
		  		var property3 = qzProperty[1] || ''
		  		var property4 = qzProperty[2]? this.qzUnits[parseInt(qzProperty[2]) - 1] : ''
		  		qzProperties = Object.assign({
		  			"gType":  property1,
		  			"qzArea": property3,
		  			"qzMaxStorage": property2,
		  			"qzUnit": property4
		  		})
		  		window.f7App.formFromJSON('#qz_info', qzProperties);
		  	}
		  	if(window.goodsType == 2){
		  		var whProperties = {}
		  		var whProperty = []
		  		window.warehouseProperties.forEach(function(property){
		  			whProperty.push(property.PROPERTY_VALUE)
		  		})
		  		var property1 = whProperty[0]? this.dLevels[parseInt(whProperty[0]) -1] : ''
		  		var property2 = whProperty[2]? this.sMethods[parseInt(whProperty[2]) -1] : ''
		  		var property3 = whProperty[1] || ''
		  		var property4 = whProperty[3] || ''
		  		var property5 = whProperty[4]?this.whUnits[parseInt(whProperty[4]) -1] : ''
		  		whProperties = Object.assign({
		  			"dLevel": property1,
		  			"sMethod": property2,
		  			"whArea": property3,
		  			"whMaxStorage": property4,
		  			"whUnit": property5
		  		})
		  		window.f7App.formFromJSON('#wh_info', whProperties);
		  	}
		  	if(window.goodsType == 3){
		  		var mbProperties = {}
		  		var mbProperty = []
		  		window.warehouseProperties.forEach(function(property){
		  			mbProperty.push(property.PROPERTY_VALUE)
		  		})
		  		var property1 = mbProperty[0] || ''
		  		var property2 = mbProperty[1] || ''
		  		var property3 = mbProperty[2] || ''
		  		var property4 = mbProperty[3] || ''
		  		var property5 = mbProperty[4] || ''
		  		var property6 = mbProperty[5] || ''
		  		var property7 = mbProperty[6] || ''
		  		var property8 = mbProperty[7]? this.zUnits[parseInt(mbProperty[7]) -1] : ''
		  		var property9 = mbProperty[8]? this.zUnits[parseInt(mbProperty[8]) -1] : ''
		  		mbProperties = Object.assign({
		  			"zWarehouses": property1,
		  			"zArea": property2,
		  			"zMaxStorage": property3,
		  			"zUnit": property8,
		  			"lWarehouses": property4,
		  			"lArea": property5,
		  			"lMaxStorage": property6,
		  			"lunit": property9,
		  			"tubes": property7
		  		})
		  		window.f7App.formFromJSON('#mb_info', mbProperties);
		  	}
		  	if(window.goodsType == 5){
		  		var ybProperties = {}
		  		var ybProperty = []
		  		window.warehouseProperties.forEach(function(property){
		  			ybProperty.push(property.PROPERTY_VALUE)
		  		})
		  		var property1 = ybProperty[0]? this.wLevels[parseInt(ybProperty[0]) - 1] : ''
		  		var property2 = ybProperty[1]? this.rlevels[parseInt(ybProperty[1]) - 1] : ''
		  		var property3 = ybProperty[2] || ''
		  		var property4 = ybProperty[3] || ''
		  		var property5 = ybProperty[4] || ''
		  		var property6 = ybProperty[5] || ''
		  		var property7 = ybProperty[6] || ''
		  		var property8 = ybProperty[7] || ''
		  		var property9 = ybProperty[8] || ''
		  		var property10 = ybProperty[9] || ''
		  		var property11 = ybProperty[10]? this.ybUnits[parseInt(ybProperty[10]) -1] : ''
		  		ybProperties = Object.assign({
		  			"wLevel": property1,
		  			"rlevel": property2,
		  			"ybArea": property3,
		  			"ybrArea": property4,
		  			"ybpArea": property5,
		  			"ybpaArea": property6,
		  			"ybwArea": property7,
		  			"ybtArea": property8,
		  			"ybcArea": property9,
		  			"ybMaxStorage": property10,
		  			"ybUnit": property11
		  		})
		  		window.f7App.formFromJSON('#yb_info', ybProperties);
		  	}
		  	if(window.goodsType == 6){
		  		var xsProperties = {}
		  		var xsProperty = []
		  		window.warehouseProperties.forEach(function(property){
		  			xsProperty.push(property.PROPERTY_VALUE)
		  		})
		  		var property1 = xsProperty[0] || ''
		  		var property2 = xsProperty[1] || ''
		  		var property3 = xsProperty[2]? this.xsUnits[parseInt(xsProperty[2]) -1] : ''
		  		xsProperties = Object.assign({
		  			"xsArea": property1,
		  			"xsMaxStorage": property2,
		  			"xsUnit": property3,
		  		})
		  		window.f7App.formFromJSON('#xs_info', xsProperties);
		  	}
		  },
		  saveDatas(){
		  	var propertys;
		  	var qzformData = window.f7App.formToJSON('#qz_info');
		  	window.f7App.formStoreData('#qz_info', qzformData);
		  	var whformData = window.f7App.formToJSON('#wh_info');
		  	window.f7App.formStoreData('#wh_info', whformData);
		  	var mbformData = window.f7App.formToJSON('#mb_info');
		  	window.f7App.formStoreData('#mb_info', mbformData);
		  	var ybformData = window.f7App.formToJSON('#yb_info');
		  	window.f7App.formStoreData('#yb_info', ybformData);
		  	var xsformData = window.f7App.formToJSON('#xs_info');
		  	window.f7App.formStoreData('#xs_info', xsformData);
		  	if(window.goodsType == 1){
		  		var qzunit
		  		if(window.edit){
		  			if(qzformData.qzUnit){
		  				qzunit = this.qzUnits.indexOf(qzformData.qzUnit) >=0 ? 
		  				this.qzUnits.indexOf(qzformData.qzUnit) + 1: '';
		  			}
		  		}else{
		  			qzunit = $$('.qz-unit').data('value') || ''
		  		}
		  		var qzArea = qzformData.qzArea || ''
		  		var qzMaxStorage = qzformData.qzMaxStorage || ''
		  		window.gunOrAmmo = $$('.g-type').data('value');
		  		propertys ='[{"propertyDictId": "27", "propertyValue":"' + qzArea + '"},{"propertyDictId": "28", "propertyValue":"' + qzMaxStorage +'"},{"propertyDictId": "38", "propertyValue": "' + qzunit + '"}]'
		  	}
		  	if(window.goodsType == 2){
		  		var dlevel
		  		var smethod
		  		var whUnit
		  		if(window.edit){
		  			if(whformData.dLevel){
		  				dlevel = this.dLevels.indexOf(whformData.dLevel) >=0 ? 
		  				this.dLevels.indexOf(whformData.dLevel) + 1: '';
		  			}
		  			if(whformData.sMethod){
		  				smethod = this.sMethods.indexOf(whformData.sMethod) >=0 ? 
		  				this.sMethods.indexOf(whformData.sMethod) + 1: '';
		  			}
		  			if(whformData.whUnit){
		  				whUnit = this.whUnits.indexOf(whformData.whUnit) >=0 ? 
		  				this.whUnits.indexOf(whformData.whUnit) + 1: '';
		  			}
		  		}else{
		  			dlevel = $$('.d-level').data('value') || ''
		  			smethod = $$('.s-method').data('value') || ''
		  			whUnit = $$('.wh-unit').data('value') || ''
		  		}
		  		var whArea = whformData.whArea || ''
		  		var whMaxStorage = whformData.whMaxStorage || ''
		  		// var whUnit = $$('.wh-unit').data('value') || ''
		  		propertys = '[{"propertyDictId": "13", "propertyValue":"' + dlevel + '"},{"propertyDictId": "14", "propertyValue":"' + whArea + '"},{"propertyDictId": "15", "propertyValue":"' + smethod + '"},{"propertyDictId": "16", "propertyValue":"' + whMaxStorage + '"},{"propertyDictId": "36", "propertyValue":"' + whUnit + '"}]'
		  	}
		  	if(window.goodsType == 3){
		  		var zunit
		  		var lunit
		  		if(window.edit){
		  			if(mbformData.zUnit){
		  				zunit = this.zUnits.indexOf(mbformData.zUnit) >=0 ? 
		  				this.zUnits.indexOf(mbformData.zUnit) + 1: '';
		  			}
		  			if(mbformData.lunit){
		  				lunit = this.zUnits.indexOf(mbformData.lunit) >=0 ? 
		  				this.zUnits.indexOf(mbformData.lunit) + 1: '';
		  			}
		  		}else{
		  			zunit = $$('.z-unit').data('value') || ''
		  			lunit = $$('.l-unit').data('value')|| ''
		  		}
		  		var zWarehouses = mbformData.zWarehouses || ''
		  		var zArea = mbformData.zArea || ''
		  		var zMaxStorage = mbformData.zMaxStorage || ''
		  		var lWarehouses = mbformData.lWarehouses || ''
		  		var lArea = mbformData.lArea || ''
		  		var lMaxStorage = mbformData.lMaxStorage || ''
		  		var tubes = mbformData.tubes || ''
		  		propertys = '[{"propertyDictId": "1", "propertyValue":"' + zWarehouses + '"},{"propertyDictId": "2", "propertyValue":"' + zArea + '"},{"propertyDictId": "3", "propertyValue":"' + zMaxStorage + '"},{"propertyDictId": "33", "propertyValue":"' + zunit + '"},{"propertyDictId": "5", "propertyValue":"' + lWarehouses +'"},{"propertyDictId": "6", "propertyValue":"' + lArea +'"},{"propertyDictId": "7", "propertyValue":"'  + lMaxStorage + '"},{"propertyDictId": "34", "propertyValue":"' + lunit + '"},{"propertyDictId": "32", "propertyValue":"' + tubes + '"}]'
		  	}
		  	if(window.goodsType == 5){
		  		var wlevel
		  		var rlevel
		  		var ybunit
		  		if(window.edit){
		  			if(ybformData.wLevel){
		  				wlevel = this.wLevels.indexOf(ybformData.wLevel) >=0 ? 
		  				this.wLevels.indexOf(ybformData.wLevel) + 1: '';
		  			}
		  			if(ybformData.rlevel){
		  				rlevel = this.rlevels.indexOf(ybformData.rlevel) >=0 ? 
		  				this.rlevels.indexOf(ybformData.rlevel) + 1: '';
		  			}
		  			if(ybformData.ybUnit){
		  				ybunit = this.ybUnits.indexOf(ybformData.ybUnit) >=0 ? 
		  				this.ybUnits.indexOf(ybformData.ybUnit) + 1: '';
		  			}
		  		}else{
		  			wlevel = $$('.w-level').data('value') || ''
		  			rlevel = $$('.r-level').data('value') || ''
		  			ybunit = $$('.yb-unit').data('value') || ''
		  		}
	  			var ybArea = ybformData.ybArea || ''
	  			var ybrArea = ybformData.ybrArea || ''
	  			var ybpArea = ybformData.ybpArea || ''
	  			var ybpaArea = ybformData.ybpaArea || ''
	  			var ybwArea = ybformData.ybwArea || ''
	  			var ybtArea = ybformData.ybtArea || ''
	  			var ybcArea = ybformData.ybcArea || ''
	  			var ybMaxStorage = ybformData.ybMaxStorage || ''
		  		propertys = '[{"propertyDictId": "17", "propertyValue":"' + wlevel + '"},{"propertyDictId": "18", "propertyValue":"' + rlevel + '"},{"propertyDictId": "19", "propertyValue":"' + ybArea + '"},{"propertyDictId": "20", "propertyValue":"' + ybrArea + '"},{"propertyDictId": "21", "propertyValue":"' + ybpArea + '"},{"propertyDictId": "22", "propertyValue":"' + ybpaArea + '"},{"propertyDictId": "23", "propertyValue":"' + ybwArea + '"},{"propertyDictId": "24", "propertyValue":"' + ybtArea + '"},{"propertyDictId": "25", "propertyValue":"' + ybcArea + '"},{"propertyDictId": "26", "propertyValue":"'+ ybMaxStorage + '"},{"propertyDictId": "37", "propertyValue":"'+ ybunit +'"}]'
		  	}
		  	if(window.goodsType == 6){
		  		var xsunit
		  		if(window.edit){
		  			if(xsformData.xsUnit){
		  				xsunit = this.xsUnits.indexOf(xsformData.xsUnit) >=0 ? 
		  				this.xsUnits.indexOf(xsformData.xsUnit) + 1: '';
		  			}
		  		}else{
		  			xsunit = $$('.xs-unit').data('value') || ''
		  		}
		  		var xsArea = xsformData.xsArea || ''
		  		var xsMaxStorage = xsformData.xsMaxStorage || ''
		  		propertys = '[{"propertyDictId": "29", "propertyValue":"' + xsArea + '"},{"propertyDictId": "30", "propertyValue":"' + xsMaxStorage + '"},{"propertyDictId": "39", "propertyValue":"' + xsunit + '"}]'
		  	}
		  	window.propertys = propertys;
		  	if(window.edit){
		  		this.$router.push('/updateWKeeper')
		  		window.edit = false
		  	}else{
		  		this.$router.push('/wkeeper')
		  	}
		  },
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.list-block,.content-block,.content-block-title
	  	margin 15px 0
	  	font-size 14px
	.content-block-title
			margin 15px 15px 10px
	.btn-wrap
		padding 8px 30px
		box-sizing border-box
		.b-next
			padding 6px 0
			height auto
	.other-inf
		position fixed
		width 100%
		height 100%
		top 0 
		left 0 
		z-index 99
	.list-block input[type=date], .list-block input[type=datetime-local], .list-block input[type=email], .list-block input[type=number], .list-block input[type=password], .list-block input[type=search], .list-block input[type=tel], .list-block input[type=text], .list-block input[type=time], .list-block input[type=url], .list-block select, .list-block textarea
		font-size 14px
</style>