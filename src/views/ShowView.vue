<template>
  <div class="show-view">
    <el-container style="height: 80%; border: 1px solid #eee">
      <el-header class="view-header">
        <div class="logo">视频内容分析与检索系统</div>
      </el-header>
      <el-aside class="aside" width="200px">
        <el-menu>
          <el-menu-item index="1">
            <i class="el-icon-document"></i>
            <span slot="title">视频分析</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-coin"></i>
            <span slot="title">视频检索</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
      </el-main>
      <el-container>
        <el-footer class="view-footer">测试</el-footer>
      </el-container>
<!--      <el-container>-->
<!--        <el-aside class="aside" width="200px">-->
<!--          <el-menu>-->
<!--            <el-menu-item index="1">-->
<!--              <i class="el-icon-document"></i>-->
<!--              <span slot="title">视频分析</span>-->
<!--            </el-menu-item>-->
<!--            <el-menu-item index="2">-->
<!--              <i class="el-icon-coin"></i>-->
<!--              <span slot="title">视频检索</span>-->
<!--            </el-menu-item>-->
<!--          </el-menu>-->
<!--        </el-aside>-->
<!--        <el-container>-->
<!--            <el-main>-->
<!--            </el-main>-->
<!--          <el-footer class="view-footer">测试</el-footer>-->
<!--        </el-container>-->
<!--      </el-container>-->
    </el-container>
  </div>
</template>

<script>
export default {
  name: 'ShowView'
}
</script>

<style lang="scss" scoped>
  .show-view {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

  }

  .el-container {
    //width: 100%;
    min-height: 90vh;
  }

  .view-header {
    background-color: #EF7A82;
    color: #333;
    line-height: 60px;
    text-align: left;
    font-size: 25px;
    //font-family: SimSun;
    margin: -8px;
  }

  .view-footer {
    //display: flex;
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  .aside {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom:0;
    margin-left: -10px;
    /*background: #2E363F;*/
  }
  .aside > ul {
    height: 100%;
  }
  .el-menu-item {
    font-size: 20px;
    text-align: center;
    color: #42b983;
    font-family: SimSun;
  }
</style>
