<template>
  <div class="app">
    <el-container>
      <el-header>
        <div class="header">
          <div class="logo"><router-link to="/">山狼智能数据分析工具</router-link></div>
          <div><a href="javascript:void(0)" @click="logout">退出</a></div>
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <div class="side">
            <el-menu :default-active="$route.meta.active"  :router="true" class="el-menu-vertical-demo">
              <el-menu-item v-for="item in cateList" :key="item.cate_id" :index="`/goods/category/${item.cate_id}`">
                <i class="el-icon-menu"></i>
                <span slot="title">{{item.title}}</span>
              </el-menu-item>
            </el-menu>
          </div>
        </el-aside>
        <el-main><router-view /></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { category } from '@/api/goods'
export default {
  name: '',
  data () {
    return {
      cateList: []
    }
  },
  components: {
  },
  mounted () {
    this.getCategory()
  },
  methods: {
    async getCategory () {
      const result = await category()
      this.cateList = result.data
    },
    logout () {
      this.$store.dispatch('user/resetToken')
      window.location.reload()
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  text-align: left;
}
.el-main {
  background: #fafafa;
}
.el-header {
  padding: 0;
  overflow: hidden;
}
.el-menu::after,
.el-menu::before {
  display: inline;
}
.header {
  width: 100%;
  height: 64px;
  background: #ffffff;
  padding: 0 40px;
  display: flex;
  justify-content: space-between;
  box-shadow: 0px -1px 0px 0px #e4e4e5 inset;
  align-items: center;
  position: fixed;
  z-index: 20;
  display: flex;
  justify-content: space-between;
}
.side {
  min-height: calc(100vh - 64px);
  height: 100%;
  border-right: solid 1px#e4e4e5;
  background: #fff;
  padding-top: 20px;
  ul {
    text-align: center;
  }
}
</style>
