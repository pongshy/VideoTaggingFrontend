<template>
  <div>
    <div>
      <el-input v-model="input" placeholder="请输入与视频标题相关的内容" style="width: 500px"></el-input>
      <el-select v-model="value" placeholder="请选择" @change="changeEvent">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button type="primary" size="medium" @click="search" icon="el-icon-search">搜索</el-button>
    </div>
    <br>
    <div>
      <el-table
        :data="tableData.slice((currentPage-1)*pageSize, currentPage*pageSize)"
        style="width: 100%"
        :stripe="true"
        :highlight-current-row="false"
        :header-cell-style="headStyle"
        :cell-style="rowStyle"
        v-loading="loading"
        :default-sort = "{prop: 'id', order: 'ascending'}"
      >
        <el-table-column
          prop="id"
          label="序号"
          type="index"
          :index="IndexMethod"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="video_name"
          label="视频名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="duration"
          label="总时长(s)"
          sortable>
        </el-table-column>
        <el-table-column
          prop="frames"
          label="总帧数"
          sortable>
        </el-table-column>
        <el-table-column
          prop="bit_rate"
          label="码率(bps)"
          sortable>
        </el-table-column>
        <el-table-column
          prop="is_sport"
          label="是否为体育类型视频"
          :formatter="tagFormatter">
        </el-table-column>
        <el-table-column
          prop="date"
          label="处理时间"
          sortable>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="primary"
              icon="el-icon-video-camera"
              @click="handleWatch(scope.$index, scope.row)">观看</el-button>
            <el-button
              size="primary"
              type="success"
              icon="el-icon-download"
              @click="handleDownload(scope.$index, scope.row)">下载</el-button>
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

  </div>
</template>

<script>
import axios from 'axios'
import Qs from 'qs'

export default {
  name: 'VideSearch',
  data () {
    return {
      input: '',
      options: [
        {
          label: '全部',
          value: -1
        },
        {
          label: '体育运动类',
          value: 1
        },
        {
          label: '其他类',
          value: 0
        }
      ],
      value: -1,
      tableData: [],
      currentPage: 1,
      pageSize: 5,
      url: 'http://localhost:8081/api/tag/select',
      loading: false
    }
  },
  methods: {
    changeEvent () {
      console.log(this.value)
    },
    headStyle () {
      return 'text-align: center'
    },
    rowStyle () {
      return 'text-align: center'
    },
    search () {
      console.log('搜索')
      let data = {
        title: this.input,
        tag: this.value
      }
      // let tid = 1
      this.loading = true
      axios
        .post(this.url, data)
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
                is_sport: tmp['tag'],
                date: tmp['modifytime'],
                address: tmp['address']
              }
              this.tableData.push(d)
              // tid += 1
            }
            this.$notify({
              title: '成功',
              message: '检索成功',
              type: 'success'
            })
          } else {
            this.$notify.error({
              title: '错误',
              message: '检索失败'
            })
          }
          this.loading = false
        })
        .catch(error => {
          console.log(error)
          this.loading = false
        })
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
    sleep (millisecond) {
      for (let t = Date.now(); Date.now() - t <= millisecond;) {

      }
    },
    // 动态转换数据
    tagFormatter (row, column) {
      let tag = row.is_sport
      if (tag === 1) {
        return '是'
      } else if (tag === 0) {
        return '否'
      } else {
        return '未知'
      }
    },
    IndexMethod (index) {
      return (this.currentPage - 1) * this.pageSize + index + 1
    },
    handleWatch (index, row) {
      console.log('----------')
      console.log(index, row)
      this.$router.push({
        name: 'VideoPlay',
        params: {'address': row['address'], 'video_name': row['video_name']}
      })
    },
    handleDownload (index, row) {
      // console.log(index, row)
      // console.log(row['address'])
      console.log('开始下载')
      const d = {'path': row['address']}
      let instance = {
        baseURL: `/api/tag/download`,
        method: 'POST',
        data: Qs.stringify(d),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        responseType: 'arraybuffer',
        timeout: 100000
      }
      axios(instance)
        .then((res) => {
          console.log('下载文件接口请求成功')
          console.log(res)
          const blob = new Blob([res.data])
          const filename = row['video_name']

          const link = document.createElement('a')
          link.download = filename
          link.style.display = 'none'
          link.href = URL.createObjectURL(blob)
          link.click()
          URL.revokeObjectURL(link.href)
          document.body.removeChild(link)
        }).catch((err) => {
          console.log(err)
        })
      console.log('finished')
      // const d = {
      //   'id': 123,
      //   'address': row['address']
      // }
      // console.log(Qs.stringify(d))
      // let instance = {
      //   url: '/api/tag/testP',
      //   method: 'post',
      //   headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      //   data: Qs.stringify(d)
      // }
      // axios(instance)
      //   .then((res) => {
      //     console.log(res)
      //   }).catch((err) => {
      //     console.log(err)
      //   })
      // axios
      //   .get('/api' + '/tag/test')
      //   .then((res) => {
      //     console.log(res.data)
      //   }).catch((err) => {
      //     console.log(err)
      //   })
    },
    handleVideoName (vname) {
      let index = vname.lastIndexOf('.')
      let res = vname.substring(0, index)
      return res
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
