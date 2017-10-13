<template>
  <div class="init-app">
    <!-- Views -->
    <div class="views">
      <!-- Your main view, should have "view-main" class -->
      <div class="view view-main">
        <!-- <router-view></router-view> -->
        <!-- Pages container, because we use fixed-through navbar and toolbar, it has additional appropriate classes-->
        <div class="pages navbar-through toolbar-through">
              <router-view></router-view>
        </div>
       
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    created() {
      // setTimeout(()=>{
        // console.dir(this);
        // var mainView = window.f7App.addView('.view-main', {
          // Because we want to use dynamic navbar, we need to enable it for this view:
          // dynamicNavbar: true
          // });
        
        // },20)
    }

  }

        
  
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .init-app
    width 100%
    height 100%
    .pages
      background #f3f3f3
  .page-content
    padding-bottom 0 !important
</style>
