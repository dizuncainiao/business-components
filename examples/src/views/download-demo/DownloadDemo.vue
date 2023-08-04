<template>
  <div>
    <BcDownload
      ref="BcDownloadDemo"
      action="https://demo.bdsaas.cn/call_record/2023/07/06/1564/bf1b017f37d8495d8f824e57949d4fa8..wav"
      file-name="测试下载录音"
    />

    <BcDownload
      :action="downloadAction"
      btn-name="下载模板"
      is-blob
      :headers="{
        'content-type': 'application/x-www-form-urlencoded'
      }"
      :params="{
        COMPANYID: 2740,
        token
      }"
    >
      <template #default>
        <button>下载模板</button>
      </template>
    </BcDownload>
  </div>
</template>

<script setup lang="ts">
import { defineComponent } from 'vue'
import { BcDownload } from 'bdsaas-bc'

// token: eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJiZHNhYXMiLCJzdWIiOiI0MjM0NSIsImV4cCI6MTY5MTA3NTUwN30.sAc3xlRNZswc64yrgutvF2lA6AOHcVTrF2RW8wG-GSnTCTkOaBI1Ct2zNjUrHMvr6mXvQ20S58Ercb7VpVaj0g
defineOptions({
  name: 'DownloadDemo'
})

// bdsaas/ajax/crm/queryMyCustomer.do
// sortFieldName 0 1 2

const token =
  'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJiZHNhYXMiLCJzdWIiOiI0MjM0NSIsImV4cCI6MTY5MTA3NTUwN30.sAc3xlRNZswc64yrgutvF2lA6AOHcVTrF2RW8wG-GSnTCTkOaBI1Ct2zNjUrHMvr6mXvQ20S58Ercb7VpVaj0g'

const downloadAction = `${
  window === window.parent ? window.origin : window.parent.origin
}/bdsaas/ajax/crm/downloadCustomerExcel.do`
</script>
