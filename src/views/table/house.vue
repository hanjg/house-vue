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
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="title">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="bedroomNum" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.bedroomNum }}</span>
        </template>
      </el-table-column>
      <el-table-column label="hallNum" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.hallNum }}
        </template>
      </el-table-column>
      <el-table-column label="priceTotal" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.priceTotal }}
        </template>
      </el-table-column>
      <el-table-column label="rentArea" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.rentArea }}
        </template>
      </el-table-column>
      <el-table-column label="community" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.community }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="fromTime" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.fromTime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getRentingHouse } from '@/api/table'

export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      list: null,
      listLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      getRentingHouse().then(response => {
        this.list = response.rows
        this.listLoading = false
      })
    }
  }
}
</script>
