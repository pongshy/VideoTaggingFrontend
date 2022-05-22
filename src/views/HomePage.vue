<template>
  <div class="all">
    <div class="header">
      <h1 style="color: #FFFFFF;margin-bottom: 150px;font-size: 65px;letter-spacing: 2px;">
        基于图像识别的视频分类与检索系统
      </h1>
      <div class="btn">
        <button class="search-btn" type="button" @click="jumpToSystem">进入</button>
      </div>
      <div class="passage">
        <span>开放</span>
        &emsp;
        <span>共享</span>
        &emsp;
        <span>聚集</span>
      </div>

    </div>
<!--    <div class="btn">-->
<!--      <button class="search-btn" type="button" @click="jumpToSystem">进入</button>-->
<!--    </div>-->
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  methods: {
    jumpToSystem () {
      console.log('----------')
      console.log('跳转到系统中')
      this.$router.push({
        name: 'FirstPage'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .all {
    background-image: url('http://www.pongshy.com/video/4.jpg');
    background-size: cover;
    background-position: center;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: sans-serif;
  }
  .btn {
    display: flex;
    justify-content: center;
    align: center;
    position: relative;
    margin-bottom: 60px;
  }
  .search-btn {
    height: 50px;
    width: 200px;
    background: #ffeb3b; //rgb(255,235,59)
    border: none;
    color: #000;
    border-radius: 25px;
    font-size: 25px;
    line-height: 50px;
    cursor: pointer;
    font-weight: bold;
    //box-shadow: -5px -5px 10px 2px rgb(255, 255, 255)
    //,10px 10px 20px 2px rgb(23, 11, 66);
    //opacity: 0.2;
  }
  .search-btn:hover {
    background: #ffc107;
    cursor: pointer;
  }
  .passage {
    display: flex;
    justify-content: center;
    align: center;
    position: relative;
    margin-top: 170px;
    font-size: 30px;
    color: #FFFFFF;
    font-family: SimSun-ExtB;
    font-weight: bold;
  }
</style>
