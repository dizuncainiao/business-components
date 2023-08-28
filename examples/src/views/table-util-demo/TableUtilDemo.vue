<template>
  <div>
    <bn-table :data="tableData" :columns="columns"></bn-table>
    <bn-pagination
      :page-config="pageConfig"
      :page-sizes="[10, 20, 30, 40, 50]"
      layout="prev, pager, next,sizes"
    ></bn-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { BcTableUtil, BcPageMixinComposition, BcOperateComposition } from 'bdsaas-bc'

const token =
  'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJiZHNhYXMiLCJzdWIiOiI0MzM0OCIsImV4cCI6MTY5MzIxMzc1OH0.Bq_Z69Bsu9UKI891teLCuiBozFCwPIE5l_SA8z4nAdkrMEWrBRycN8vJiBc5fG3dylSt_wTjYu5e9Nsu6nw8Vw'
localStorage.setItem('_BDSAAS_TOKEN', token)

const columns = ref([
  {
    prop: 'id',
    title: 'ID'
  },
  {
    prop: 'itemTitle',
    title: '商品名称',
    width: 120
  }
])

const queryForm = {
  token,
  COMPANYID: 704,
  allItem: 'type'
}

const url = '/bdsaas/ajax/item/companyItem/selectALLBySkuCriteria.do'

// 由于我们的后端规范并不是遵循RestFul架构，所以操作的url需要手动传递，这里只是为了演示
// 此Composition API主要是为了组合方便大家不关注接口回调，只关注数据和操作方法
// 由于业务的不同，此PageMixin没有多余定制过多内容，后续可继续按照业务需求进行定制
// 或者自己使用BcTableUtil + BcOperateComposition进行组合使用，定制属于自己的PageMixin

console.log(BcTableUtil, BcOperateComposition)

const { tableData, pageConfig, search, handleCancelOperate, handleCreate, handleDelete } = BcPageMixinComposition({
  url,
  queryForm,
  options: {
    method: 'postJson',
    headers: {
      'content-type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    paramPageKey: 'page',
    paramPageSizeKey: 'pagesize',
    totalKey: 'pagination.total',
    recordsKey: 'result',
    pageSizeKey: 'pagination.pagesize',
    pageNumKey: 'pagination.page'
  }
}, {
  url: '示范新增参数配置',
  type: 'create',
  operateForm: {},
  options: {}
}, {
  url: '示范删除参数配置',
  type: 'del',
  operateForm: {},
  options: {}
})

console.log(handleCreate, handleDelete, handleCancelOperate)

setTimeout(() => {
  delete queryForm.allItem
  queryForm.onSale = 'type'
  search()
}, 10000)

defineOptions({
  name: 'TableUtilDemo'
})
</script>
