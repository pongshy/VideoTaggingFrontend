<template>
  <div class="upload">
<!--    <h2 style="font-size: 30px">文件上传部分：</h2>-->
<!--    <el-divider></el-divider>-->
    <br>
    <el-upload
      class="upload-demo"
      ref="uploadVideo"
      :action=url
      :on-success="successUpload"
      :on-error="errorUpload"
      :on-progress="processing"
      :before-upload="handleBeforeUpload"
      :on-exceed="handleExceed"
      :show-file-list="false">
      <span>请选择视频上传并自动分析: </span>
      <el-button size="medium" type="primary" :loading="loadFlag" icon="el-icon-upload">点击上传</el-button>
<!--      <div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过20MB</div>-->
    </el-upload>
    <br>
    <div class="show-data">
      <template>
        <el-table
          :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
          style="width: 100%"
          :stripe="true"
          :highlight-current-row="false"
          :header-cell-style="headStyle"
          :cell-style="rowStyle"
          :default-sort = "{prop: 'id', order: 'ascending'}"
        >
          <el-table-column
            prop="id"
            label="序号"
            sortable
            type="index"
            :index="IndexMethod"
            width="180">
          </el-table-column>
          <el-table-column
            prop="video_name"
            label="视频名称"
            width="180">
          </el-table-column>
          <el-table-column
            prop="duration"
            label="总时长(s)">
          </el-table-column>
          <el-table-column
            prop="frames"
            label="总帧数">
          </el-table-column>
          <el-table-column
            prop="bit_rate"
            label="码率(bps)">
          </el-table-column>
<!--          <el-table-column-->
<!--            :formatter="sportFormatter"-->
<!--            prop="is_sport"-->
<!--            label="运动体育类型">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            :formatter="animalFormatter"-->
<!--            prop="is_animal"-->
<!--            label="动物类型">-->
<!--          </el-table-column>-->
<!--          <el-table-column-->
<!--            :formatter="transportFormatter"-->
<!--            prop="is_transport"-->
<!--            label="交通工具类型">-->
<!--          </el-table-column>-->
          <el-table-column
            label="类型">
            <template slot-scope="scope">
              <!--            <el-tag :type="scope.row.is_sport === 1 ? 'success' : 'danger'">测试</el-tag>-->
              <el-tag v-if="scope.row.is_sport === 1" type="success">体育运动</el-tag>
              <el-tag v-if="scope.row.is_animal === 1">纪录片</el-tag>
              <el-tag v-if="scope.row.is_transport === 1" type="warning">新闻</el-tag>
              <el-tag v-if="scope.row.is_sport === 0 && scope.row.is_animal === 0 && scope.row.is_transport === 0" type="info">其他</el-tag>
            </template>
          </el-table-column>
          <el-table-column
            prop="date"
            label="处理时间"
            sortable>
          </el-table-column>
        </el-table>

        <el-pagination align='center'
                       @size-change="handleSizeChange"
                       @current-change="handleCurrentChange"
                       :current-page="currentPage"
                       :page-sizes="[1,5,10,20]"
                       :page-size="pageSize"
                       layout="total, sizes, prev, pager, next, jumper"
                       :total="tableData.length">
        </el-pagination>

      </template>

    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'VideoAnalysis',
  data () {
    return {
      url: 'http://localhost:8081/api/tag/upload',
      fileList: [
        {name: 'food.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'},
        {name: 'food2.jpeg', url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'}
      ],
      tableData: [],
      pageSize: 5,
      currentPage: 1,
      loadFlag: false
    }
  },
  computed: {
    getHeader: function () {
      var tmp = {'Content-Type': 'multipart/form-data'}

      return tmp
    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    beforeRemove (file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`)
    },
    handleBeforeUpload () {
      this.loadFlag = true
    },
    formatter (row, column) {
      return row.address
    },
    successUpload (res) {
      console.log('Successfully Upload')
      console.log(res)
      var tid = 1
      if (this.tableData.length > 0) {
        tid = this.tableData[this.tableData.length - 1]['id'] + 1
      }
      var d = res['data']
      var code = res['code']
      if (code === 200) {
        var t = {
          id: tid,
          video_name: this.handleVideoName(d['videoname']),
          duration: d['duration'],
          frames: d['frames'],
          bit_rate: d['bitRate'],
          is_sport: d['sport'],
          is_animal: d['animal'],
          is_transport: d['transport'],
          date: d['modifytime']
        }
        this.tableData.unshift(t)
        console.log(t)
        this.$notify({
          title: '成功',
          message: '视频分析成功',
          type: 'success'
        })
      } else {
        this.$notify.error({
          title: '错误',
          message: '视频分析失败'
        })
      }
      this.loadFlag = false
    },
    errorUpload () {
      console.log('Error Upload')
      this.$notify.error({
        title: '错误',
        message: '视频上传失败'
      })
      this.loadFlag = false
    },
    processing () {
      console.log('Processing')
    },
    headStyle () {
      return 'text-align: center'
    },
    rowStyle () {
      return 'text-align: center'
    },
    // 每页条数改变时触发 选择一页显示多少行
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.currentPage = 1
      this.pageSize = val
    },
    // 当前页改变时触发 跳转其他页
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    },
    // 动态转换数据
    sportFormatter (row, column) {
      let tag = row.is_sport
      if (tag === 1) {
        return '是'
      } else if (tag === 0) {
        return '否'
      } else {
        return '未知'
      }
    },
    animalFormatter (row, column) {
      let tag = row.is_animal
      if (tag === 1) {
        return '是'
      } else if (tag === 0) {
        return '否'
      } else {
        return '未知'
      }
    },
    transportFormatter (row, column) {
      let tag = row.is_transport
      if (tag === 1) {
        return '是'
      } else if (tag === 0) {
        return '否'
      } else {
        return '未知'
      }
    },
    handleVideoName (vname) {
      let index = vname.lastIndexOf('.')
      let res = vname.substring(0, index)
      return res
    },
    IndexMethod (index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    loadVideoInfo () {
      console.log('---------------')
      console.log('加载页面')
      console.log('---------------')
      axios
        .get('http://127.0.0.1:8081/api/tag/load')
        .then((res) => {
          this.tableData = []
          console.log(res)
          let ds = res['data']['data']
          console.log(ds)
          if (ds != null) {
            for (let i = 0; i < ds.length; ++i) {
              let tmp = ds[i]
              let d = {
                // id: tid,
                video_name: this.handleVideoName(tmp['videoname']),
                duration: tmp['duration'],
                frames: tmp['frames'],
                bit_rate: tmp['bitRate'],
                is_sport: tmp['sport'],
                is_animal: tmp['animal'],
                is_transport: tmp['transport'],
                date: tmp['modifytime'],
                address: tmp['address']
              }
              this.tableData.push(d)
              // tid += 1
            }
            this.$notify({
              title: '成功',
              message: '加载完成',
              type: 'success'
            })
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted () {
    this.loadVideoInfo()
  }
}
</script>

<style lang="scss" scoped>

</style>
