<template>
  <div class="container">
    <div class="upload-header">
      <el-upload
        class="upload-demo"
        :action="`${base_url}/upload/excel`"
        multiple
        :data="{ id: this.$route.params.id }"
        :headers="headers"
        :on-success="success"
      >
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传excel文件</div>
      </el-upload>
    </div>
    <div class="table">
      <el-table :data="records.list" style="width: 100%">
        <el-table-column prop="id" label="ID"> </el-table-column>
        <el-table-column prop="name" label="名称"> </el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <router-link :to="`/goods/info/${scope.row.id}`">详情</router-link>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <div class="total">共{{ pagination.total }}条数据</div>
        <el-pagination
          background
          :hide-on-single-page="true"
          layout="prev, pager, next"
          :total="pagination.total"
          :current-page="query.page"
          @current-change="changePage"
          :page-size="20"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { tableList } from '@/api/goods'
import { getToken } from '@/utils/auth'
export default {
  name: '',
  data () {
    return {
      records: [],
      headers: {},
      query: {},
      base_url: process.env.VUE_APP_BASE_API,
      pagination: {}
    }
  },
  components: {
  },
  mounted () {
    // console.log(this.$route.params)
    this.getTableList()
    this.headers = { Authorization: `Bearer ${getToken()}` }
  },
  methods: {
    async getTableList () {
      this.query.id = this.$route.params.id
      const result = await tableList(this.query)
      this.records = result.data
      this.pagination.total = result.data.total
    },
    changePage (page) {
      this.query.page = page
      this.getTableList()
    },
    success () {
      console.log(123)
      this.getTableList()
    }
  }
}
</script>

<style lang="scss" scoped>
.upload-header {
  border-bottom: 1px solid #eee;
  padding-bottom: 20px;
}
</style>
