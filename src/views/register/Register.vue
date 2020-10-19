<template>
  <div class="register">
    <nav-bar class="register-nav">
      <div slot="center">
        注册页
      </div>
    </nav-bar>
    <el-form ref="form" :model="userInfo" label-width="80px" :rules="registerFormRules">
      <el-form-item label="用户名">
        <el-input v-model="userInfo.uname"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="userInfo.pw"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="userInfo.gender">
          <el-radio label="男"></el-radio>
          <el-radio label="女"></el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="userInfo.age"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input v-model="userInfo.email"></el-input>
      </el-form-item>
      <el-form-item label="电话号码">
        <el-input v-model="userInfo.phone"></el-input>
      </el-form-item>
      <el-form-item label="角色">
        <el-select v-model="userInfo.role" placeholder="请选择角色">
          <el-option label="普通用户" value="普通用户"></el-option>
          <el-option label="管理员" value="管理员"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="家乡">
        <el-input v-model="userInfo.hometown"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="el-button_" @click="onSubmit">立即注册</el-button>
        <el-button @click="resetForm">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  // common cpn
  import NavBar from "../../components/common/navbar/NavBar";

  // fn
  import {addUser} from "../../network/register";

  export default {
    name: "Register",
    components: {
      NavBar,
    },
    data() {
      return {
        userInfo: {
          uname: '',
          pw: '',
          gender: '',
          age: '',
          email: '',
          phone: '',
          role: '',
          hometown: '',
          avatar: ''
        },
        registerFormRules: {
          uname: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 15, message: '长度在3-15个字符', trigger: 'blur'}
          ],
          pw: [
            {required: true, message: '请输入密码', trigger: 'blur'},
            {min: 6, max: 15, message: '长度在6-15个字符', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      onSubmit() {
        addUser(this.userInfo).then(res => {
          console.log(res);
          if (res.status === 200) {
            alert('注册成功')
          }
        }).catch(err => {
          alert('注册失败，' + err);
        });
      },
      resetForm() {
        this.$refs.form.resetFields();
      }
    }
  }
</script>

<style scoped>
  .register-nav {
    font-weight: 600;
    background-color: var(--color-tint);
    color: #ffffff;
  }

  .el-form {
    margin-top: 20px;
  }

  .el-input {
    width: 250px;
  }

  .el-button_ {
    font-weight: 700;
    background-color: var(--color-tint);
    color: #ffffff;
  }
</style>