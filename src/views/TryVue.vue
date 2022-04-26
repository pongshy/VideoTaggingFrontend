<template>
  <div id="app">
    黑恶黑
    <template>
      <el-table
        :data="tableData"
        style="width: 100%"
        :stripe="true"
        :highlight-current-row="false"
        :default-sort = "{prop: 'date', order: 'descending'}"
      >
        <el-table-column
          prop="id"
          label="序号"
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
          label="总时长"
          width="180">
        </el-table-column>
        <el-table-column
          prop="frames"
          label="总帧数">
        </el-table-column>
        <el-table-column
          prop="bit_rate"
          label="视频比特率">
        </el-table-column>
        <el-table-column
          prop="is_sport"
          label="是否为体育类型视频">
        </el-table-column>
        <el-table-column
          prop="date"
          label="处理时间"
          sortable>
        </el-table-column>
      </el-table>
    </template>
  </div>
</template>

<script>
export default {
  name: 'TryVue',
  data () {
    return {
      message: 'Hello Vue.js!',
      items: [
        {message: 'HEIEHIEHIEHI'},
        {message: 'Bar'}
      ],
      tableData: [
        {
          id: '12222',
          video_name: '2222',
          duration: '3',
          frames: '4',
          bit_rate: '5',
          is_sport: '6',
          date: '1000'
        }
      ]
    }
  },
  methods: {
    reverseMessage () {
      this.message = this.message.split('').reverse().join('')
    },
    formatter (row, column) {
      return row.frames
    }
  }
}
</script>

<style scoped>

</style>
