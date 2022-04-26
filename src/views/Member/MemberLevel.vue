<template>
  <div>
    会员等级 ID={{id}}
    {{username}}
  </div>
</template>

<script>
export default {
  props: ['id', 'username'],
  name: 'MemberLevel',
  beforeRouteEnter: (to, from, next) => {
    console.log('进入会员等级页面')
    // 跳到下一个钩子函数，或者是下一个要去的路由
    next(vm => {
      vm.getData()
    })
  },
  beforeRouteLeave: (to, from, next) => {
    console.log('离开会员等级页面')
    next()
  },
  methods: {
    getData () {
      this.axios({
        method: 'get',
        url: 'http://localhost:8081/api/tag/test'
      }).then(function (repos) {
        console.log(repos)
      }).catch(function (error) {
        console.log(error)
      })
    }
  }

}
</script>

<style scoped>

</style>
