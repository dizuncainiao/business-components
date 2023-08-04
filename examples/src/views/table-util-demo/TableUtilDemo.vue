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
import { BcTableUtil } from 'bdsaas-bc'

const token =
  'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJiZHNhYXMiLCJzdWIiOiI0MzM0OCIsImV4cCI6MTY5MTA4Mzk5Nn0.pcjoq8SMp0xDNtAf6Wku5zjpglVnLSDKpikbdSF60aQw_rwIm-E161ePJ9VC3OqMuA4Yk_wke37FQvS5UgCPDg'
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

const { tableData, pageConfig, search } = BcTableUtil(url, queryForm, {
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
})

setTimeout(() => {
  delete queryForm.allItem
  queryForm.onSale = 'type'
  search()
}, 10000)

defineOptions({
  name: 'TableUtilDemo'
})
</script>
