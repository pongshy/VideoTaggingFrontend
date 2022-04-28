import Vue from 'vue'
import Router from 'vue-router'
import SelectTest from '../components/SelectTest'
import Login from '../views/Login'
import MainView from '../views/MainView'
import MemberList from '../views/Member/MemberList'
import MemberLevel from '../views/Member/MemberLevel'
import TryVue from '../views/TryVue'
import NotFound from '../views/NotFound'
// import ShowView from '../views/ShowView'
import FirstPage from '../views/FirstPage'
import VideoAnalysis from '../views/Video/VideoAnalysis'
import VideoSearch from '../views/Video/VideoSearch'
import VideoPlay from '../views/Video/VideoPlay'

Vue.use(Router)

export default new Router({
  routes: [
    {
      // 路由跳转
      path: '/',
      // redirect: '/firstPage',
      redirect: '/firstPage',
      // 路由名称
      name: 'TryVue',
      // 路由跳转的组件
      component: TryVue
    },
    {
      path: '/firstPage',
      name: 'FirstPage',
      component: FirstPage,
      children: [
        {
          // 视频分析
          path: '/firstPage/va',
          name: 'VideoAnalysis',
          component: VideoAnalysis
        },
        {
          // 视频检索
          path: '/firstPage/vs',
          name: 'VideoSearch',
          component: VideoSearch,
          meta: {
            keepAlive: true
          }
        },
        {
          // 视频播放
          path: '/firstPage/vs/play',
          name: 'VideoPlay',
          component: VideoPlay,
          props: true
        }
      ]
    },
    // {
    //   path: '/firstPage',
    //   name: 'ShowView',
    //   component: ShowView
    // },
    {
      path: '/select',
      name: 'selectTest',
      component: SelectTest
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/main',
      name: 'MainView',
      component: MainView,
      children: [
        {
          // 会员列表
          path: '/main/member/list',
          name: 'MemberList',
          component: MemberList,
          props: true
        },
        {
          // 会员等级
          path: '/main/member/level/:id',
          name: 'MemberLevel',
          component: MemberLevel,
          // 启动props的方式进行传参
          props: true
        }
      ]
    },
    {
      path: '/goMain',
      name: 'GoMain',
      redirect: '/main',
      props: true
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound
    }
  ],
  mode: 'history'
})
