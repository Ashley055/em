<template>
	<!-- Page, "data-page" contains page name -->
	<div class="page bg-blue ent-page">
	  <!-- Scrollable page content -->
	  <div class="page-content">
	    <div>
	    	<p class="symble">
	    		<img src="../common/images/symble.png">
	    	</p>
	    	<p class="color-white text-center">危企助手</p>
	    </div>
	    <div class="content-block">
            <div class="login-box">
            	<div class="username">
            		<span><i class="f7-icons size-12 color-white">person</i></span>
            		<input class="bg-blue color-white" v-model="userName" type="text" name="text" placeholder="请输入用户名">
            	</div>
            	<div class="password">
            		<span><i class="f7-icons size-12 color-white">lock</i></span>
            		<input class="bg-blue color-white" v-model="passWord" type="password" name="password" placeholder="请输入密码">
            	</div>
            	<div class="btn-login"><button class="bg-blue color-white" @click="uselogin">登录</button></div>
            </div>
        </div>
	  </div>
	</div>
</template>
<script>
import {hex_md5} from "@/common/js/md5"
import {entAjax} from '@/common/js/ajax'

export default{
	data () {
	  return {
	    userName:'',
	    passWord:''
	  };
	},
	methods: {
	  uselogin () {
	  	var password = hex_md5(this.passWord)
	  	var param = {
	  	    userName: this.userName,
	  	    userPwd: password,
	  	    pathVar:'mobileLogin.do'
	  	};

	  	var _this = this;
	  	var url = "baseAction.do";

	  	entAjax(url, param).then(data => {
	  		console.log(data)
	  		if(data.code === '0000'){
	  			_this.$router.push('/home');
	  		}
	  	});

	  	// $$.ajax({
	   //  	url: ,
    // 	    data: param,
	  	//     xhrFields: {
    //            withCredentials: true
    //         },
    //         crossDomain: true,
    // 	    dataType: "json",
    // 	    method: "post",
    // 	    success: function (result){
    	    	
    	    	
    // 	    }
	   //  })
	  }
	},
	created() {
		// var mainView = myApp.addView('.view-main', {
		  // 让这个视图支持动态导航栏
		//   dynamicNavbar: true
		// });
		// this.$nextTick(()=>{
		// 	f7App.hideNavbar('.navbar');
		// });
	}
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
.ent-page
  	.symble
    	margin 0 auto
    	width 80px
    	height 80px
    	img
      		width 100%
      		height 100%
	.username
		margin-top 40px
	.username, .password
		margin 26px 28px
		border-bottom 1px solid #fff
		& input, & input
			margin-left 5px
			line-height 22px
			font-size 14px
			border none
			outline none
	.btn-login
		padding 0 26px
		& button
			margin-top 40px
			width 100%
			padding 8px 0
			border 1px solid #fff		
			border-radius 3px
	.size-12
		font-size 20px	
</style>