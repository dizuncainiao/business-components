# 八度前端业务组件bc-table-utils

## API

### 入参

| 参数名称      | 类型     | 必传 | 默认值 | 描述                   |
|-----------|--------|------|----|----------------------|
| url       | String | 是   | '' | 请求数据源的接口地址           |
| queryForm | Object | 否  | {} | 请求数据源的查询参数表单，不包括分页参数 |
| options   | Object | 否  | {} | 额外配置，参考下放Options说明   |

### Options

| 属性名称             | 类型       | 必传 | 默认值        | 描述                                                | 可选值/如何被使用                                                                 |
|------------------|----------|------|------------|---------------------------------------------------|---------------------------------------------------------------------------|
| method           | String   | 否  | 'get'      | 请求数据源的接口请求方法                                      | 'get'、'postJson'、'postForm'                                               |
| params           | Object   | 否  | {}         | 请求数据源除查询参数表单和分页参数外的特定额外参数，如companyId等             |                                                                           |
| headers          | headers  | 否  | {}         | 请求数据源的额外头信息                                       | 原封不动的叠加到已知头信息里传递                                                          |
| recordsKey       | String   | 否  | 'records'  | 请求数据源返回list数据的key                                 | 传入其他值比如'list'，获取表格数据将会使用`data.list`来处理                                    |
| totalKey         | String   | 否  | 'total'    | 请求数据源返回总数的key                                     | 传入其他值比如'totalCount'，获取总条数数据将会使用`data.totalCount`来处理                       |
| pageNumKey       | String   | 否  | 'pages'    | 请求数据源返回当前页码的key                                   | 传入其他值比如'pageNo'，获取当前页码数据将会使用`data.pageNo`来处理                              |
| pageSizeKey      | String   | 否  | 'size'     | 请求数据源返回每页条数的key                                   | 传入其他值比如'pageSize'，获取每页条数数据将会使用`data.pageSize`来处理                          |
| paramPageKey     | String   | 否  | 'pageNo'   | 请求数据源时分页参数内页码key                                  | 传入其他值比如'page'，传递接口的分页页码参数会变为`{ page: 1 }`                                 |
| paramPageSizeKey | String   | 否  | 'pageSize' | 请求数据源时分页参数内每页条数key                                | 传入其他值比如'no'，传递接口的分页条数参数会变为`{ no: 10 }`                                    |
| autoSearch       | Boolean  | 否  | 否        | 是否自动进行第一次查询                                       | 设定为false，则在页面初次mount时将不会执行查询动作，需手动添加代码调用                                  |
| dataFilter       | Function | 否  | (data: []) => [] | 数据过滤函数。函数参数将会是请求返回的`data[recordsKey]`数据，返回值必须为数组  | 若传递此函数，接口请求返回表格数据后会调用此函数处理数据                                              |
| formHandler       | Function | 否  | (form: TypeQueryForm) => TypeQueryForm | 表单处理函数。函数参数将会是请求返回的`options.queryForm`数据，返回值必须为对象 | 若传递此函数，最终请求参数将通过此函数进行处理且不会影响页面回显参数，如date-picker的参数绑定值为array，提交参数为start和end |
| afterSearch | Function | 否  | () => void       | 查询完成后回调函数。                                     | 查询完成后回调函数                                              |


### 出参

| 参数名称             | 类型       | 描述        |
|------------------|----------|-----------|
| search           | Function | 查询方法      |
| handleSizeChange | Function | 每页条数变化回调  |
| handlePageChange | Function | 页码变化回调    |
| queryCurrentPage | Function | 查询当前页码数据  |
| handlePrevPage   | Function | 上一页回调     |
| handleNextPage   | Function | 下一页回调     |
| tableData        | Array    | 表格数据      |
| pageConfig       | Object   | 分页配置 `{page: 1, pageSize: 10, total: 0}` |

## 使用示例

```vue
<template>
  <div>
    <el-form :inline="true" :model="queryForm" class="demo-form-inline">
      <el-form-item label="姓名">
        <el-input v-model="queryForm.name" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="年龄">
        <el-input v-model="queryForm.age" placeholder="请输入年龄"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="search">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="age" label="年龄"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handlePageChange"
      :current-page="pageConfig.page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="pageConfig.pageSize"
      :total="pageConfig.total"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<script setup lang="ts">
  import { BcTableUtil } from 'bdsaas-bc'

  const { search,
    handleSizeChange,
    handlePageChange,
    queryCurrentPage,
    handlePrevPage,
    handleNextPage, tableData, pageConfig, tableLoading } = BcTableUtil('api/v1/test/url', queryForm, {})

</script>
```
