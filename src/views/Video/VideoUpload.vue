<template>
  <div>
    <br>
    <el-upload
      class="upload-demo"
      ref="uploadVideo"
      :action=url
      :on-success="successUpload"
      :on-error="errorUpload"
      :before-upload="handleBeforeUpload"
      :show-file-list="false">
      <span style="font-size: 20px;">请选择视频上传: </span>
      <el-button size="medium" type="primary" :loading="loadFlag" icon="el-icon-upload">点击上传</el-button>
      <!--      <div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过20MB</div>-->
    </el-upload>
    <br>
    <el-table
      :data="tableData"
      style="width: 100%"
      stripe="true"
      :header-cell-style="headStyle"
      :cell-style="rowStyle">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-width="auto" label-position="left" inline class="demo-table-expand">
            <el-form-item label="Link only: ">
<!--              <span>{{ props.row.upURL }}</span>-->
              <el-input type="text" style="width: 600px" :value="props.row.upURL"></el-input>
            </el-form-item>
            <el-form-item>
              <span></span>
            </el-form-item>
            <el-form-item label="HTML: ">
<!--              <span>{{ props.row.htmlD }}</span>-->
              <el-input type="text" style="width: 600px" :value="props.row.htmlD"></el-input>
            </el-form-item>
<!--            <el-form-item label="商品 ID">-->
<!--              <span>{{ props.row.id }}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="店铺 ID">-->
<!--              <span>{{ props.row.shopId }}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="商品分类">-->
<!--              <span>{{ props.row.category }}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="店铺地址">-->
<!--              <span>{{ props.row.address }}</span>-->
<!--            </el-form-item>-->
<!--            <el-form-item label="商品描述">-->
<!--              <span>{{ props.row.desc }}</span>-->
<!--            </el-form-item>-->
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="序号"
        type="index"
        :index="IndexMethod">
      </el-table-column>
      <el-table-column
        label="视频名"
        prop="video_name">
      </el-table-column>
      <el-table-column
        label="视频大小(MB)"
        prop="videoSize">
      </el-table-column>
      <el-table-column
        label="上传时间"
        prop="dealTime">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="medium"
            type="danger"
            icon="el-icon-delete"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
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
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'VideoUpload',
  data () {
    return {
      loadFlag: false,
      url: 'http://localhost:8081/api/tag/upvideo',
      tableData: [],
      pageSize: 5,
      currentPage: 1
    }
  },
  methods: {
    headStyle () {
      return 'text-align: center'
    },
    rowStyle () {
      return 'text-align: center'
    },
    errorUpload () {
      console.log('Error Upload')
      this.$notify.error({
        title: '错误',
        message: '视频上传失败'
      })
      this.loadFlag = false
    },
    successUpload (res) {
      console.log('Successfully Upload')
      console.log(res)
      // var tid = 1
      // if (this.tableData.length > 0) {
      //   tid = this.tableData[this.tableData.length - 1]['id'] + 1
      // }
      var d = res['data']
      var code = res['code']
      if (code === 200) {
        var t = {
          // id: tid,
          video_name: this.handleVideoName(d['videoname']),
          upURL: d['url'],
          // eslint-disable-next-line no-useless-escape
          htmlD: '<iframe src=\"' + d['url'] + '\" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height=498 width=510></iframe>',
          dealTime: d['dealTime'],
          videoSize: d['fileSize']
        }
        this.tableData.unshift(t)
        console.log(t)
        this.$notify({
          title: '成功',
          message: '视频上传成功',
          type: 'success'
        })
      } else {
        this.$notify.error({
          title: '错误',
          message: '视频上传失败'
        })
      }
      this.loadFlag = false
    },
    handleBeforeUpload () {
      this.loadFlag = true
    },
    handleVideoName (vname) {
      let index = vname.lastIndexOf('.')
      let res = vname.substring(0, index)
      return res
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
    IndexMethod (index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    loadVideoInfo () {
      console.log('---------------')
      console.log('加载页面')
      console.log('---------------')
      axios
        .get('http://127.0.0.1:8081/api/tag/loadBed')
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
                upURL: tmp['url'],
                // eslint-disable-next-line no-useless-escape
                htmlD: '<iframe src=\"' + tmp['url'] + '\" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height=498 width=510></iframe>',
                dealTime: tmp['dealTime'],
                videoSize: tmp['fileSize']
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
    },
    handleDelete (index, row) {
      console.log('删除按钮')
      console.log('-----------------')
      console.log(row.upURL)
      let i = row.upURL.lastIndexOf('/')
      var vn = row.upURL.substring(i + 1)
      console.log(vn)
      console.log('------------------')
      axios
        .get('http://www.pongshy.com:8081/api/tag/delete', {params: {'vn': vn}})
        .then((res) => {
          this.tableData = []
          console.log(res)
          let ds = res['data']['data']
          console.log(ds)
          // 清空列表，重新加载
          this.tableData.splice(0, this.tableData.length)
          if (ds != null) {
            for (let i = 0; i < ds.length; ++i) {
              let tmp = ds[i]
              let d = {
                // id: tid,
                video_name: this.handleVideoName(tmp['videoname']),
                upURL: tmp['url'],
                // eslint-disable-next-line no-useless-escape
                htmlD: '<iframe src=\"' + tmp['url'] + '\" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height=498 width=510></iframe>',
                dealTime: tmp['dealTime'],
                videoSize: tmp['fileSize']
              }
              this.tableData.push(d)
              // tid += 1
            }
            this.$notify({
              title: '成功',
              message: '删除成功',
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
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
