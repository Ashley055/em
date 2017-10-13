import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import home from '@/components/home'
import orgInfo from '@/components/orgInfo'
import detail from '@/components/detail'
import map from '@/components/map'
import locationMap from '@/components/locationMap'
import certificates from '@/components/certificates'
import warehouses from '@/components/warehouses'
import certificateInfo from '@/components/certificateInfo'
import warehouseInfo from '@/components/warehouseInfo'
import newWarehouseInfo from '@/components/newWarehouseInfo'
import otherInfo from '@/components/otherInfo'
import wkeeper from '@/components/wkeeper'
import updateWKeeper from '@/components/updateWKeeper'
import locate from '@/components/locate'


Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'login',
    //   component: login
    // },
    // {
    //   path: '/home',
    //   name: 'home',
    //   component: home
    // },
    {
      path: '/',
      name: 'certificates',
      component: certificates
    },
    {
      path: '/orgInfo',
      name: 'orgInfo',
      component: orgInfo,
    },
    // {
    //   path: '/certificates',
    //   name: 'certificates',
    //   component: certificates
    // },
    {
      // path: '/certificateInfo/:id/:certificateName',
      path: '/certificateInfo',
      name: 'certificateInfo',
      component: certificateInfo
    },
    {
      path: '/warehouses',
      name: 'warehouses',
      component: warehouses
    },
    {
      path: '/warehouseInfo',
      name: 'warehouseInfo',
      component: warehouseInfo
    },
    {
      path: '/map',
      name: 'map',
      component: map
    },
    {
      path: '/locationMap',
      name: 'locationMap',
      component: locationMap
    },
    {
      path: '/newWarehouseInfo',
      name: 'newWarehouseInfo',
      component: newWarehouseInfo,
    },
    {
      path: '/otherInfo',
      name: 'otherInfo',
      component: otherInfo,
    },
    {
      path: '/wkeeper',
      name: 'wkeeper',
      component: wkeeper,
    },
    {
      path: '/updateWKeeper',
      name: 'updateWKeeper',
      component: updateWKeeper,
    },
    {
      path: '/locate',
      name: 'locate',
      component: locate,
    }
  ],
  linkActiveClass:'active'
})
