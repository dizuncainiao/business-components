import md5 from 'md5'

export function useToken() {
  return (
    localStorage.getItem('_BDSAAS_TOKEN') ||
    'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJiZHNhYXMiLCJzdWIiOiIyNzk3IiwiZXhwIjoxNzE1ODU4NDQzfQ.803De7EHZnUoKSbrvKDZsdY8QRJwX6DP6Gu_mOtgDhhSs6noNgY32-9Xmra4bodirdtZw0VwAokadAcspBZ5LA'
  )
}

export function useCompanyId() {
  return localStorage.getItem('_BDSAAS_COMPANY_ID') || '1564'
}

export function useUserInfo() {
  return JSON.parse(localStorage.getItem('_BDSAAS_userInfo') || '{}')
}

export function useCompanyName() {
  return useUserInfo().companyName || '深圳八度云计算有限公s犀利'
}

export function useUploadUrl() {
  return `${window.origin}/base-oss-rest/oss/uploadFile`
}

export function useProfileId() {
  return useUserInfo().profileId || '2797'
}

export function useProfileName() {
  return useUserInfo().companyRealName || '汪博'
}

export function useAuthList(): string[] {
  try {
    return JSON.parse(localStorage.getItem('_BDSAAS_authList') as string) || []
  } catch (e) {
    console.warn('_BDSAAS_authList has no value in localStorage!')
    return []
  }
}

export function hasAuth(authKey: string) {
  const authList = useAuthList()

  return authList.includes(authKey)
}

// X-WS-Security
export function useXWSSecurity() {
  const token = useToken()
  const timestamp = new Date().getTime()

  return {
    xwsse: md5(`token${token}timestamp${timestamp}`),
    timestamp
  }
}
