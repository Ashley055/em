<template>
    <div>
        <router-view></router-view>
             <div class="page">
                <div class="navbar">
                  <div class="navbar-inner">
                    <!-- We need cool sliding animation on title element, so we have additional "sliding" class -->
                    <div class="left">
                      <router-link to="/home" class="link icon-only">
                        <i class="icon icon-back"></i>
                        <span>返回</span>
                      </router-link>
                    </div>
                    <div class="center ent-title">{{title}}</div>
                    <div class="right">
                      <a href="#" class="link icon-only">
                        <!-- <i class="icon icon-bars"></i> -->
                      </a>
                    </div>
                  </div>
                </div>
                <div class="page-content">
                    <div class="content-block" style="margin-top: 0">
                        <div class="content-block-inner">
                            <div style="padding-top: 10px">
                                <img height="30px" style="vertical-align:middle" src="../common/images/org.png">
                                <span class="fbold" style="vertical-align:middle">{{orgInfo.enterpriseName || ''}}</span>
                                <span class="validate fbold" style="vertical-align:middle" v-show="orgInfo.registerStatusName">{{orgInfo.registerStatusName}}</span>
                            </div>
                            <div class="row">
                                <p class="col-50">法人代表人：{{orgInfo.legalRepresentative || ''}} </p>
                                <p class="col-50">行政区划：{{orgInfo.areaName || ''}}</p>         
                            </div>
                            <div class="row">
                                <p class="col-50">注册资本：{{orgInfo.registeredCapital || ''}}</p>
                                <p class="col-50">注册时间：{{orgInfo.establishmentDate || ''}}</p>         
                            </div>
                        </div>
                    </div>
                    <div class="list-block">
                        <ul>
                            <li>
                              <router-link to="map" class="item-link item-content">
                                <div class="item-media"><img src="../common/images/u458.png" width="30"></div>
                                <div class="item-inner">
                                  <div class="item-title">{{orgInfo.address}}</div>
                                  <!-- <div class="item-after">待整改</div> -->
                                </div>
                              </router-link>
                            </li>
                        </ul>
                    </div>
                    <div class="content-block">
                        <div class="content-block-inner">
                            <div class="org">
                                <div class="row">
                                    <div class="col-50">
                                        <p class="fbold">注册号</p>
                                        <p class="">{{orgInfo.registeredNo || ''}}</p>
                                    </div>
                                    <div class="col-50">
                                        <p class="fbold">统一社会信用代码</p>
                                        <p class="">{{orgInfo.creditCode || ''}}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-50">
                                        <p class="fbold">企业类型</p>
                                        <p class="">{{orgInfo.enterpriseTypeName || ''}}</p>
                                    </div>
                                    <div class="col-50">
                                        <p class="fbold">经营状态</p>
                                        <p class="">{{orgInfo.registerStatusName || ''}}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="enterprise" v-show="orgInfo.enterpriseProperty == 2">
                                <div class="row">
                                    <div class="col-50">
                                        <p class="fbold">社会信用代码</p>
                                        <p class="">{{orgInfo.creditCode || ''}}</p>
                                    </div>
                                    <div class="col-50">
                                        <p class="fbold">经费来源</p>
                                        <p class="">{{orgInfo.fundingSourcesName || ''}}</p>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-100">
                                        <p class="fbold">举办单位</p>
                                        <p class="">{{orgInfo.organizer || ''}}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="content-block">
                        <div class="content-block-inner">
                            <div class="row">
                                <div class="col-100">
                                    <p class="fbold">经营范围</p>
                                    <p class="">{{orgInfo.businessScope || '--'}}</p>
                                </div>
                                <div class="col-100">
                                    <p class="fbold">经营期限</p>
                                    <p class="">{{orgInfo.operatingFromDate || '--'}}</p>
                                    <p class="">{{orgInfo.operatingToDate || '--'}}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-50">
                                    <p class="fbold">核准时间</p>
                                    <p>{{orgInfo.approvedDate || '--'}}</p>
                                </div>
                                <div class="col-50">
                                    <p class="fbold">登记机关</p>
                                    <p>{{orgInfo.registerOffice || '--'}}</p>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-50">
                                    <p class="fbold">制发机关</p>
                                    <p class="">{{orgInfo.issueOffice || '--'}}</p>
                                </div>
                                <div class="col-50">
                                    <p class="fbold">登记管理机关</p>
                                    <p class="">{{orgInfo.registerOffice || '--'}}</p>
                                </div>
                            </div>
                        </div>              
                    </div>
                    <div class="content-block">
                        <div class="content-block-inner">
                            <p class="fbold">营业执照</p>
                            <div><a href="#" class="pb-standalone-dark"><img @click="browsePic" width="100%" :src="imgURL"></a></div>
                        </div>
                    </div>
                </div>
             </div>
    </div>
	 
</template>
<script type="text/javascript">
	import {entAjax} from '@/common/js/ajax'
	export default{
		data () {
		  return {
		  	validate: '',
		  	imgURL: '',
            title: '',
		  	orgInfo: {}
		  };
		},
		created(){

			this.$nextTick(()=>{
				var param = {
					pathVar: '/appEnterpriseInfo/queryBasicEnterpriseInfo.do',
				};
				var _this = this
				entAjax('baseAction.do', param).then(data => {
					console.log(data)
	    	    	if(data.code === '0000'){
	    	    		_this.orgInfo = data.row
                        if(_this.orgInfo.enterpriseProperty == 2){
                            _this.title = '单位详情'
                        }else{
                            _this.title = '企业详情'
                        }
    	    			_this.imgURL = 'http://211.159.218.90:8081' + _this.orgInfo.businessLicenseFileUri
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