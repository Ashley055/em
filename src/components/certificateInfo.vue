<template>
	 <div class="page">
		<div class="navbar">
		  <div class="navbar-inner">
		    <!-- We need cool sliding animation on title element, so we have additional "sliding" class -->
		    <div class="left">
		      <a href="javascript:void(0)" @click="backToCert($event)" class="link icon-only">
		      	<i class="icon icon-back"></i>
                <span>返回</span>
		      </a>
		    </div>
		    <div class="center ent-title">资质详情</div>
		    <div class="right">
		      <a href="#" class="link icon-only">
		        <!-- <i class="icon icon-bars"></i> -->
		      </a>
		    </div>
		  </div>
		</div>
		<div class="page-content" v-show="showContent">
		    <div class="content-block" style="margin-top: 0">
		        <div class="content-block-inner">
		        	<div style="padding-top: 10px">
		        		<img class="certsign" height="30px" src="../common/images/certsign.png">
		        		<span class="certificate-name fbold">{{certificateName || ''}}</span>
		        		<span class="validate fbold">{{validate}}</span>
		        	</div>
		        	<p class="cert-no">证书编号： {{certificateInfo.certificateNo || ''}}</p>
		        </div>
	        </div>
    	    <div class="content-block">
    	        <div class="content-block-inner">
    	        	<div v-show="certificateInfo.enterpriseName">
    	        		<p class="fbold">企业名称</p>
    	        		<p class="">{{certificateInfo.enterpriseName || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.enterpriseType">
    	        		<p class="fbold">企业类型</p>
    	        		<p class="">{{certificateInfo.enterpriseType || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.economicType">
    	        		<p class="fbold">经济类型</p>
    	        		<p class="">{{certificateInfo.economicType || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.registeredAddress">
    	        		<p class="fbold">地址（住所）</p>
    	        		<p class="">{{certificateInfo.registeredAddress || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.productionAddress">
    	        		<p class="fbold">经营地址</p>
    	        		<p class="">{{certificateInfo.productionAddress || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.productionAddress">
    	        		<p class="fbold">仓储设施地址</p>
    	        		<p class="">{{certificateInfo.productionAddress || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.legalRepresentative">
    	        		<p class="fbold">法定代表人（负责人）</p>
    	        		<p class="">{{certificateInfo.legalRepresentative || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.managementMode">
    	        		<p class="fbold">经营方式</p>
    	        		<p class="">{{certificateInfo.managementMode || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.licensedVariety">
    	        		<p class="fbold">品种类别</p>
    	        		<p class="">{{certificateInfo.licensedVariety || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.licensedVariety">
    	        		<p class="fbold">品种类别</p>
    	        		<p class="">{{certificateInfo.licensedVariety || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.prevailingCurrent">
    	        		<p class="fbold">主要流向</p>
    	        		<p class="">{{certificateInfo.prevailingCurrent || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.productionAddress">
    	        		<p class="fbold">经营区域</p>
    	        		<p class="">{{certificateInfo.productionAddress || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.qualificationGrade">
    	        		<p class="fbold">资质等级</p>
    	        		<p class="">{{certificateInfo.qualificationGrade || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.registeredTrademark">
    	        		<p class="fbold">注册商标</p>
    	        		<p class="">{{certificateInfo.registeredTrademark || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.technicalLeader">
    	        		<p>技术负责人</p>
    	        		<p class="">{{certificateInfo.technicalLeader || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.annualProduction">
    	        		<p class="fbold">限制存放量</p>
    	        		<p class="">{{certificateInfo.annualProduction || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.certificateLevel">
    	        		<p class="fbold">承担资格</p>
    	        		<p class="">{{certificateInfo.certificateLevel || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.genericProductName">
    	        		<p class="fbold">产品通用名</p>
    	        		<p class="">{{certificateInfo.genericProductName || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.commodityName">
    	        		<p class="fbold">商品名</p>
    	        		<p class="">{{certificateInfo.commodityName || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.productForm">
    	        		<p class="fbold">产品形态</p>
    	        		<p class="">{{certificateInfo.productForm || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.bacteriaName">
    	        		<p class="fbold">有效菌种名称</p>
    	        		<p class="">{{certificateInfo.bacteriaName || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.mainTechnicalIndex">
    	        		<p class="fbold">主要技术指标</p>
    	        		<p class="">{{certificateInfo.mainTechnicalIndex || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.applyTo">
    	        		<p class="fbold">适用于</p>
    	        		<p class="">{{certificateInfo.applyTo || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.legalRepresentative">
    	        		<p class="fbold">港口经营人</p>
    	        		<p class="">{{certificateInfo.legalRepresentative || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.permissionScope">
    	        		<p class="fbold">作业区域范围</p>
    	        		<p class="">{{certificateInfo.permissionScope || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.managementMode">
    	        		<p class="fbold">作业方式</p>
    	        		<p class="">{{certificateInfo.managementMode || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.commodityName">
    	        		<p class="fbold">作业危险货物品名</p>
    	        		<p class="">{{certificateInfo.commodityName || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.annualProduction">
    	        		<p class="fbold">年生产量</p>
    	        		<p class="">{{certificateInfo.annualProduction || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.registeredTrademark">
    	        		<p class="fbold">是否营业性</p>
    	        		<p class="">{{certificateInfo.registeredTrademark || ''}}</p>
    	        	</div>
    	        	<div v-show="certificateInfo.firstAnnualDate">
    	        		<p class="fbold">年检情况</p>
    	        		<table class="table text-center" border="0" cellspacing="0" cellpadding="0">
    	        			<tr>
    	        				<th class="text-center">审验次数</th>
    	        				<th class="text-center">审验日期</th>
    	        				<th class="text-center dep">审验部门</th>
    	        				<th class="text-center">审验情况</th>
    	        			</tr>
    	        			<tr>
    	        				<td>第一次审验</td>
    	        				<td class="firstDate">{{certificateInfo.firstAnnualDate}}</td>
    	        				<td class="firstDep">{{certificateInfo.firstAnnualDepartment}}</td>
    	        				<td class="firstResult">{{certificateInfo.firstAnnualInfo}}</td>
    	        			</tr>
    	        			<tr>
    	        				<td>第二次审验</td>
    	        				<td class="secondDate">{{certificateInfo.secondAnnualDate}}</td>
    	        				<td class="secondDep">{{certificateInfo.secondAnnualDepartment}}</td>
    	        				<td class="secondResult">{{certificateInfo.secondAnnualInfo}}</td>
    	        			</tr>
    	        			<tr>
    	        				<td>第三次审验</td>
    	        				<td class="thirdDate">{{certificateInfo.thirdAnnualDate}}</td>
    	        				<td class="thirdDep">{{certificateInfo.thirdAnnualDepartment}}</td>
    	        				<td class="thirdResult">{{certificateInfo.thirdAnnualInfo}}</td>
    	        			</tr>
    	        		</table>
    	        	</div>
    	        </div>
            </div>
    	    <div class="content-block">
    	        <div class="content-block-inner">
    	        	<div class="row">
	    	        	<div class="col-100">
							<p class="fbold">经营许可范围</p>
							<p class="">{{certificateInfo.permissionScope || '--'}}</p>
	    	        	</div>
	    	        	<div class="col-100" v-show="certificateInfo.annualProduction">
							<p class="fbold">经营规模</p>
							<p class="">{{certificateInfo.annualProduction || '--'}}</p>
	    	        	</div>
    	        	</div>
    	        	<div class="row" v-show="certificateInfo.licenseScope">
    	        		<p class="fbold">经营许可范围</p>
    	        		<table class="table text-center" border="0" cellspacing="0" cellpadding="0">
    	        			<tr>
    	        				<th>品种名称</th>
    	        				<th>核定存储量</th>
    	        			</tr>
    	        			<tr v-for="item in certificateInfo.licenseScope">
    	        				<td>{{item.productName || '--'}}</td>
    	        				<td>{{item.productDetail || '--'}}</td>
    	        			</tr>
    	        		</table>
    	        	</div>
	    	        <div class="row">
	    	        	<div class="col-50">
							<p class="fbold">有效期</p>
							<p class="">{{certificateInfo.validityStartDate || ''}}{{certificateInfo.validityEndDate || ''}}</p>
	    	        	</div>
	            	    <div class="col-50">
	            	    	<p class="fbold">发证日期</p>
	            	    	<p class="">{{certificateInfo.issueDate || '--'}}</p>
	            	    </div>
	    	        </div>
	    	        <div class="row">
	    	        	<div class="col-50">
							<p class="fbold">发证机关</p>
							<p class="">{{certificateInfo.issueOffice || '--'}}</p>
	    	        	</div>
	            	    <div class="col-50">
	            	    	<p class="fbold">登记中心</p>
	            	    	<p class="">{{certificateInfo.registerCenter || '--'}}</p>
	            	    </div>
	    	        </div>
    	        </div>    	        
			</div>
			<div class="content-block">
			    <div class="content-block-inner">
			    	<p class="fbold">证书附件</p>
			    	<div><a href="#" class="pb-standalone-dark"><img @click="browsePic" width="100%" :src="imgURL"></a></div>
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
	export default{
		data () {
		  return {
		  	showContent: false,
		  	nodata: false,
		  	validate:  '',
		  	certificateName: '',
		  	imgURL: '',
		  	certificateInfo: {}
		  };
		},
		created(){

			this.$nextTick(()=>{
				f7App.showNavbar('.navbar')
				$$('.ent-title').text('资质详情');

				this.id = this.$route.query.id
				this.certificateName = this.$route.query.certificateName

				var param = {
					id: this.id,
					pathVar: '/appCertificateInfo/queryAppCertificateInfo.do',
				};
				var _this = this
				entAjax('baseAction.do', param).then(data => {
					console.log(data)
	    	    	if(data.code === '0000'){
	    	    		
    	    			if(data.row){
    	    				_this.showContent = true
    	    				_this.nodata = false
                            _this.certificateInfo = data.row
                            if(_this.validityEndDate == null){
                                _this.validate = '未知'
                            }
                            _this.imgURL = 'http://211.159.218.90:8081' + _this.certificateInfo.licenceAttachmentURI
    	    			}else{
    	    				_this.showContent = false
    	    				_this.nodata = true
    	    			}
	    	    	}else{
                        _this.showContent = false
                        _this.nodata = true
                    }
				})
			});
			
		},
		methods: {
		  browsePic () {
		  	var myPhotoBrowserStandalone = f7App.photoBrowser({
		  	    photos : [
		  	        this.imgURL
		  	    ]
		  	});
		    myPhotoBrowserStandalone.open();
		  },
          backToCert(event){
            this.$router.back();
            event.stopPropagation();
            event.preventDefault();
          }
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.page
		.no-data
			// position fixed
			// width 100%
			// top 50%
			text-align center
			transform:translateX(0)
			transform:translatey(16%)
		.advice
			color #666
		.tipT
			color #999	
		.certsign
			vertical-align top
		.certificate-name
			vertical-align middle
			display inline-block
			max-width 210px
			margin-left 10px
		.validate
			vertical-align middle
			display inline-block
			// height 30px
			// line-height 30px
			padding 5px 10px
			border 1px solid #223e93
			border-radius 5px
			font-size 12px
			color #223e93
			margin-left 10px
		.cert-no
			text-indent 46px
		.fbold
			font-weight bold
		.table
			width 100%
			border 1px solid #c8c7cc
			& th, & td
				padding 5px 0
				border 1px solid #c8c7cc
		.mt10
			margin-top 10px	
</style>