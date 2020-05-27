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
      <el-table-column label="标题">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="室" width="50" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bedroomNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="厅" width="50" align="center">
        <template slot-scope="scope">
          {{ scope.row.hallNum }}
        </template>
      </el-table-column>
      <el-table-column label="总价（元）" width="100" align="center">
        <template slot-scope="scope">
          {{ scope.row.priceTotal }}
        </template>
      </el-table-column>
      <el-table-column label="单价（元/平米）" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.unitPrice }}
        </template>
      </el-table-column>
      <el-table-column label="面积（平米）" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.area }}
        </template>
      </el-table-column>
      <el-table-column label="小区" width="150" align="center">
        <template slot-scope="scope">
          {{ scope.row.community }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="fromTime" label="挂牌开始时间" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time"/>
          <span>{{ scope.row.fromTime | dateFilter}}</span>
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
import { getSecondHandHouse } from '@/api/table'
import { formatDate } from '@/utils/date'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      };
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
      getSecondHandHouse(this.pageParams).then(response => {
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
