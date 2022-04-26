<template>
  <div>
    <el-form ref="form" :model="form" :rules="rules" class="login-boxed">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="用户名" prop="name">
        <el-input type="text" placeholder="请输入用户名" v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('form')">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      form: {
        name: '',
        password: ''
      },
      rules: {
        name: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
          // { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$router.push({
            name: 'MainView',
            params: {
              username: this.form.name,
              password: this.form.password
            }
          })
        } else {
          this.$message({
            message: '请输入用户名或密码',
            type: 'warning'
          })
          return false
        }
      })
    }
  }
}
</script>

<style scoped lang="scss">
  .login-boxed{
    width: 350px;
    margin: 150px auto;
    border: 1px solid #DCDFE6;
    // 内边距
    padding: 20px;
    border-radius: 5px;
    // 阴影
    box-shadow: 0 0 30px #DCDFE6;
  }
  .login-title{
    text-align: center;
  }
</style>
