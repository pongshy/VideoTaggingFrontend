<template>
  <el-container>
    <el-header>
      <div class="logo">
<!--        logo-->
<!--        <template slot-scope="scope">-->
<!--          <img src="../assets/logo.png" style="width: 5px; height: 5px;">-->
<!--        </template>-->
        <i class="el-icon-orange"></i>
        <span style="color: #eeeeee">基于图像识别的视频分类与检索系统</span>
      </div>
    </el-header>
    <el-container>
      <el-aside width="200px">
        <el-menu
          router
          :default-active="this.$route.path"
          active-text-color="#ffd04b">
          <el-menu-item index="/firstPage/va">
            <i class="el-icon-document"></i>
            <span class="item" slot="title">视频分析</span>
          </el-menu-item>
          <el-menu-item index="/firstPage/vs">
            <i class="el-icon-coin"></i>
            <span class="item" slot="title">视频检索</span>
          </el-menu-item>
          <el-menu-item index="/firstPage/vup">
            <i class="el-icon-folder"></i>
            <span class="item" slot="title">视频图床</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-container>
        <el-main>
          <router-view></router-view>
        </el-main>
        <el-footer>上海大学-18120196-谢鹏-毕业设计</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: 'FirstPage',
  methods: {
    test () {
      console.log(this.$route.path)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #409EFF;
  color: #333;
  text-align: left;
  line-height: 60px;
}

.logo {
  font-size: 25px;
  color: #303133;
  font-family: "Helvetica Neue";
}

.el-footer {
  background-color: #B3C0D1;
  color: #606266;
  text-align: center;
  line-height: 60px;
}

.item {
  font-size: 20px;
  //color: #606266;
  //background-color: #eeeeee;
}

.el-menu-item {
  background-color: #FFFFFF;
  //border-style: dashed;
  border-width: 2px;
  //border-color: #EF7A82;
  //text-shadow: 10px 10px 5px #888888;
}

.el-aside {
  background-color: #FFFFFF;
  color: #333;
  text-align: center;
  line-height: 200px;
  bottom: 0;
  margin-left: -10px;
  //border-style: solid;
  //border-width: 1px;
}

.el-main {
  background-color: rgb(249,250,252);
  color: #333;
  box-shadow: 15px 15px rgb(245,247,249) inset;
  //            0px -10px 10px red;
  //text-align: center;
  //line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
