<template>
  <div>
    <el-row type="flex" class="row-bg">
      <el-col :span="3">
        <div class="back">
          <el-button icon="el-icon-back" type="info" size="primary" @click="goBack">返回</el-button>
        </div>
      </el-col>
      <el-col :span="18" align="middle">
        <h1 style="color: #303133">
          {{this.video_name}}
        </h1>
      </el-col>
    </el-row>

    <div class="wrap">
      <p align="center">
        <video
          :src="videoURL"
          loop="loop"
          controls="true"
          fluid="true">
        </video>
      </p>
    </div>

<!--    <el-row type="flex" class="video-class" justify="center">-->
<!--      <el-col :span="20">-->
<!--        <div class="video-wrapper">-->
<!--          <video-player-->
<!--            class="video-player vjs-custom-skin"-->
<!--            ref="videoPlayer"-->
<!--            :playsline="true"-->
<!--            :options="playerOptions">-->
<!--          </video-player>-->
<!--        </div>-->
<!--      </el-col>-->
<!--    </el-row>-->
  </div>
</template>

<script>
import 'vue-video-player/src/custom-theme.css'
import 'video.js/dist/video-js.css'
import { videoPlayer } from 'vue-video-player'

export default {
  name: 'VideoPlay',
  props: ['address', 'video_name'],
  components: { videoPlayer },
  data () {
    return {
      // 视频播放
      videoURL: this.address,
      playerOptions: {
        playerOptions: {
          playbackRates: [0.5, 1.0, 1.5, 2.0], // 播放速度
          autoplay: false, // 如果true,浏览器准备好时开始回放。
          muted: false, // 默认情况下将会消除任何音频。
          loop: false, // 导致视频一结束就重新开始。
          preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
          language: 'zh-CN',
          aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
          fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
          sources: [{
            type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
            src: 'http://124.223.195.177:8080/video/t.mp4' // url地址
            // src: require('./汉服滑雪 - 1.汉服滑雪(Av78779035,P1).mp4')
          }],
          poster: '', // 你的封面地址
          // width: document.documentElement.clientWidth, // 播放器宽度
          notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
          controlBar: {
            timeDivider: true,
            durationDisplay: true,
            remainingTimeDisplay: false,
            fullscreenToggle: true // 全屏按钮
          }
        }
      }
    }
  },
  methods: {
    goBack () {
      console.log(this.address)
      this.$router.back()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}

.wrap{
  width: 100%;
  position: relative;
  padding-bottom: 50%;    /*需要用padding来维持16:9比例,也就是9除以16*/
  height: 0;
  .video{
    position: absolute;
    top:0;
    left: 0;
    width: 50%;
    height: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    object-fit: fill;
  }
}

</style>
