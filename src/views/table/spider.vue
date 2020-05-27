<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="爬虫状态" width="80" align="center">
        <template slot-scope="scope">
          {{ scope.row.status }}
        </template>
      </el-table-column>
      <el-table-column label="爬取页数" width="80" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.pageCount }}</span>
        </template>
      </el-table-column>
      <el-table-column label="持续时间（毫秒）" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.duration }}
        </template>
      </el-table-column>
      <el-table-column label="爬取速度（毫秒/页）" width="200" align="center">
        <template slot-scope="scope">
          {{ scope.row.millSecondsPerPage }}
        </template>
      </el-table-column>
      <el-table-column label="线程数" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.threadAlive }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="startTime" label="开始时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.startTime | dateFilter }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getSecondHandHouseSpider } from '@/api/table'
import { formatDate } from '@/utils/date'

export default {
  filters: {
    dateFilter(data) {
      return formatDate(data);
    }
  },
  data() {
    return {
      list: null,
      listLoading:true,
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getSecondHandHouseSpider(this.pageParams).then(response => {
        this.list = [response.result];
        this.listLoading = false;
      });
    }
  }
}
</script>
