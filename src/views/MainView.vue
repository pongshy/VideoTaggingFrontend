<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <el-menu :default-openeds="['1']">
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-message"></i>导航一</template>
            <el-menu-item-group>
<!--              <template slot="title">会员管理</template>-->
              <el-menu-item index="1-1">
                <router-link :to="{name: 'MemberLevel', params: {id:3, username: $route.params.username}}">会员等级</router-link>
              </el-menu-item>
              <el-menu-item index="1-2">
                <router-link :to="{name: 'MemberList', params: {username: $route.params.username}}">会员列表</router-link>
              </el-menu-item>
              <el-menu-item index="1-3">
<!--                <router-link to="/goMain/admin123">回到首页</router-link>-->
                <router-link :to="{name: 'GoMain', params: {username: $route.params.username}}">回到首页</router-link>
              </el-menu-item>
            </el-menu-item-group>
<!--            <el-menu-item-group title="分组2">-->
<!--              <el-menu-item index="1-3">选项3</el-menu-item>-->
<!--            </el-menu-item-group>-->
<!--            <el-submenu index="1-4">-->
<!--              <template slot="title">选项4</template>-->
<!--              <el-menu-item index="1-4-1">选项4-1</el-menu-item>-->
<!--            </el-submenu>-->
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-message"></i>商品管理</template>
            <el-menu-item-group>
              <el-menu-item index="2-1">商品分类</el-menu-item>
              <el-menu-item index="2-2">商品列表</el-menu-item>
              <el-menu-item index="2-3">商品列表</el-menu-item>
              <el-menu-item index="2-4">商品列表</el-menu-item>
              <el-menu-item index="2-5">商品列表</el-menu-item>
              <el-menu-item index="2-6">商品列表</el-menu-item>
              <el-menu-item index="2-7">商品列表</el-menu-item>
              <el-menu-item index="2-8">商品列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>用户登录</el-dropdown-item>
              <el-dropdown-item>退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{ $route.params.username }}</span>
<!--          <span>admin</span>-->
        </el-header>

        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'MainView',
  props: ['username']
  // methods: {
  //   log () {
  //     console.log($route.params.name)
  //   }
  // }
}
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  .el-aside {
    color: #333;
  }
</style>
