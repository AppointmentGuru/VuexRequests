<style>
body{
  margin:0px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;;
  color: #5e6d82;
}
h1,h2,h3,h4,h5 { color: #1F2D3D; font-weight: 400; }
pre {
  color:white;
  background-color: #324057;
  padding: 10px;
}
</style>
<template>
<div id="app">
  <el-menu
    theme="light"
    mode="horizontal" >
    <el-menu-item index="1">Processing Center</el-menu-item>
  </el-menu>

  <el-row >
    <el-col :md='6' >
    <el-menu theme='dark' :router='true' >
      <el-menu-item
        v-for='route in routes'
        :key='route.path'
        :index='route.path' >{{route.name}}</el-menu-item>
    </el-menu>
    </el-col>
    <el-col :md='18' >
      <div style='margin:20px;' >
        <router-view></router-view>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import routes from './routes'

export default {
  routes,
  name: 'app',
  data () {
    return {
      routes: routes
    }
  }
}
</script>

