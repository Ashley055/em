<template>
	<div class="page">
		<div class="navbar">
		    <div class="navbar-inner">
		        <div class="left">
		            <a href="javascript:void(0)" @click="gobackto($event)" class="link">
		      			<i class="icon icon-back"></i>
	            		<span>返回</span>
		            </a>
		        </div>
		        <div class="center">仓库列表</div>
		        <div class="right">
		            <a href="#" class="link" @click="mactions">更多</a>
		        </div>
		    </div>
		</div>
		<!-- Scrollable page content -->
	    <div class="page-content infinite-scroll pull-to-refresh-content" data-distance="100" v-show="warehouses.length>0">
	    	<div class="pull-to-refresh-layer">
	    	    <div class="preloader"></div>
	    	    <div class="pull-to-refresh-arrow"></div>
    	    </div>
	    	<div class="content-block warehouse-list">
    	     	<ul>
    	     		<li class="content-block-inner" v-for="warehouse in warehouses">
    	     			<router-link class="item-link item-content color-black" :to="{path:'/warehouseInfo',query: {id: warehouse.warehouseId}}">
    	     			  <div class="item-inner">
    	     			    <div class="fbold warehouse-info">{{warehouse.warehouseName}}</div>
    	     			    <div class="warehouse-info">{{warehouse.address}}</div>
    	     			    <div class="state" :class="warehouse.latitude? 'bgcolorg':'bgcolorb'">{{warehouse.latitude?'已上报':'未上报'}}</div>
    	     			  </div>
    	     			</router-link>	
    	     		</li>
    	      	</ul>
	        </div>
	        <!-- 加载提示符 -->
	        <div class="infinite-scroll-preloader">
	            <div class="preloader color-black"></div>
	        </div>
	    </div>
    	<div class="page-content no-data" v-show="nodata">
    	    <div class="content-block">
    	    	<img width="80" src="../common/images/no-info.png">
    	    	<p class="tipT">还没有仓库信息，快来添加仓库吧</p>
    	    	<p><router-link to="/newWarehouseInfo" class="button active new-warehouse">新建仓库</router-link></p>
    	    </div>
        </div>
    		<router-view></router-view>
	</div>
</template>
<script type="text/javascript">
	import {entAjax} from '@/common/js/ajax'
	import {infinitLoading} from '@/common/js/gen'
	export default{
		data () {
		  return {
		  	nodata: false,
		    warehouses:[]
		  };
		},
		created(){
			var _this = this;
			
			var param = {
				page: 1,
				pagesize: 10,
				pathVar: '/warehouseInfo/queryForPageList.do',
			};
			entAjax('baseAction.do', param).then(result => {
				_this.warehouses = result.rows;
				var newlist = result.rows;
				if(newlist.length>0){
					_this.warehouses = newlist;
					if(newlist.length <= 10){
						setTimeout(()=>{
							$$('.infinite-scroll-preloader').hide();
						},1000)
					}
				}else{
					_this.nodata = true
				}
			}).then(result=>{
				var myApp = window.f7App;
				var $$ = window.$$;
				 
				// Loading flag
				var loading = false;
				 
				// Max items to load
				var pages = 0;
				var itemsPerLoad = 10;
				var currentPage = 2;

				myApp.attachInfiniteScroll(".infinite-scroll");
				// Attach 'infinite' event handler
				$$('.infinite-scroll').on('infinite', function () {
				 
				  // Exit, if loading in progress
				  if (loading) return;
				  $$('.infinite-scroll-preloader').show();
				  // Set loading flag
				  loading = true;
				  
				  var param = {
				  	page: currentPage,
				  	pagesize: itemsPerLoad,
				  	pathVar: '/warehouseInfo/queryForPageList.do',
				  };
				  entAjax('baseAction.do', param).then(result => {
				  	// Reset loading flag
				  	loading = false;
				  	// myApp.attachInfiniteScroll(".infinite-scroll"); 
				  	pages = Math.ceil(result.total / 10);
				  	
				  	if (currentPage > pages) {
				  	  // Nothing more to load, detach infinite scroll events to prevent unnecessary loadings
				  	  myApp.detachInfiniteScroll($$('.infinite-scroll'));
				  	  // Remove preloader
				  	  setTimeout(()=>{
				  	  	$$('.infinite-scroll-preloader').remove();
				  	  	$$('.content-block.warehouse-list').css('margin-bottom', 0)
				  	  },500)
				  	  return;
				  	}
				  	
				  	_this.warehouses = _this.warehouses.concat(result.rows);
				  	
					console.log(_this.warehouses);
				  	
				  	// Update last loaded index
				  	currentPage = currentPage + 1;
				  });				 				  
				});
			});
		},
		methods: {
		  	mactions () {
		        var buttons1 = [
		            {
		                text: '地图模式',
		                bold: false,
    		            onClick: ()=> {
                            this.$router.push('/locationMap')
                        }
		            },
		            {
		                text: '新增仓库',
		                bold: false,
    		            onClick: ()=> {
    		            	f7App.formDeleteData('#my-form')
    		            	f7App.formDeleteData('#qz_info')
    		            	f7App.formDeleteData('#wh_info')
    		            	f7App.formDeleteData('#mb_info')
    		            	f7App.formDeleteData('#yb_info')
    		            	f7App.formDeleteData('#xs_info')
    		            	f7App.formDeleteData('#wkeeper')
                            this.$router.push('/newWarehouseInfo')
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
			gobackto(event) {
		  		window.location.href="../index/index5.html";

		  		event.stopPropagation();
		  		event.preventDefault();
		  	}
		}

	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	.navbar .center
		text-align center
	.navbar .left, .navbar .right
		flex 1
	.navbar .right
		justify-content: flex-end !important
	.warehouse-info
		max-width 270px
		overflow hidden
		text-overflow ellipsis
		white-space nowrap
	.content-block.warehouse-list
		margin-bottom 55px
	.content-block.warehouse-list ul li
		overflow hidden
		line-height 35px
	.list-block,.content-block,.content-block-title
	  	margin 15px 0
	  	font-size 14px
	.warehouse-info
		max-width 270px
		overflow hidden
		text-overflow ellipsis
		white-space nowrap
	.state
		position absolute
		top 10px
		right -30px
		width 100px
		text-align center
		z-index 0
		color #fff
		line-height 25px
		transform:rotate(40deg);
		-ms-transform:rotate(40deg); 	/* IE 9 */
		-moz-transform:rotate(40deg); 	/* Firefox */
		-webkit-transform:rotate(40deg); /* Safari 和 Chrome */
		-o-transform:rotate(40deg);
	.bgcolorg
		background-color #9d9e9f
	.bgcolorb
		background-color #5aaae2
	.button.new-warehouse
		padding 6px 0
		line-height auto
		height auto
	.infinite-scroll-preloader {
	  margin-top:-20px;
	  margin-bottom: 10px;
	  text-align: center;
	}
	.infinite-scroll-preloader .preloader {
	  width:34px;
	  height:34px;
	}     
</style>