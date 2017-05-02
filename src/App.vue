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
.logo {
  height:50px; padding-top:5px;float:left;margin-right:10px;
}
.pull-right {
  float:right;;
}
.el-card {
  border-radius: 0px !important;
}
.el-card.compact .el-card__body {
  padding:10px !important;
}
.padd { padding: 10px; }
.margin { margin: 10px; }

.fade-enter-active, .fade-leave-active {
  transition: opacity .7s
}
.fade-enter, .fade-leave-to /* .fade-leave-active in <2.1.8 */ {
  opacity: 0
}
/* not working .. :^/; */
.slide-enter-active, .slide-leave-active {
  transition: height 5s
}
.slide-enter, .slide-leave-to /* .slide-leave-active in <2.1.8 */ {
  height:0px;
}
</style>
<template>
<div id="app">
  <el-menu
    theme="light"
    mode="horizontal" >
    <el-menu-item index="1">
      <img class='logo' src='./assets/logo.png' />
      Vuex Requests. <small>by AppointmentGuru</small>
    </el-menu-item>
  </el-menu>

  <el-row >
    <el-col :md='6' >
    <el-menu theme='dark' :router='true' >
      <template v-for='route in routes' >
       <el-submenu v-if='route.children' :index="route.path" >
        <template slot="title">{{route.name}}</template>
          <template v-for='childRoute in route.children' >
            <el-menu-item-group
            v-if='childRoute.type === "divider"'
            :title="childRoute.name"></el-menu-item-group>
            <el-menu-item
              v-else
              :index="route.path + '/' + childRoute.path">
                {{childRoute.name}}
            </el-menu-item>
          </template>

      </el-submenu>
      <el-menu-item v-else
        :index='route.path' >{{route.name}}</el-menu-item>
      </template>
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

