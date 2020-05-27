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
      <el-table-column align="center" label="ID" width="50">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="行政区" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.district }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="infoTime" label="时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.infoTime | dateFilter }}</span>
        </template>
      </el-table-column>
      <el-table-column label="二手房总数" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.totalHouseCount }}
        </template>
      </el-table-column>
      <el-table-column label="平均总价（元/平米）" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.avgTotalPrice }}
        </template>
      </el-table-column>
      <el-table-column label="平均单价（元/平米）" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.avgUnitPrice }}
        </template>
      </el-table-column>
    </el-table>
    <div class="block" v-show="true">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="pageParams.page"
        :page-size="pageParams.size"
        :page-sizes="[2, 10, 50, 100, 200, 500]"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageParams.totalCount" >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { getSecondHandHouseSummary } from '@/api/table'
import { formatDate } from '@/utils/date'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    dateFilter(data) {
      return formatDate(data);
    }
  },
  data() {
    return {
      list: null,
      listLoading:true,
      pageParams: {
        page:1,
        size:10,
        totalCount: 1000,
      },
    }
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getSecondHandHouseSummary(this.pageParams).then(response => {
        this.list = response.result.rows;
        this.listLoading = false;
        this.pageParams.totalCount = response.result.total;
      });
    },
    handleSizeChange(val) {
      this.pageParams.size = val;
      this.fetchData();
    },
    handleCurrentChange(val) {
      this.pageParams.page = val;
      this.fetchData();
    }
  }
}
</script>
