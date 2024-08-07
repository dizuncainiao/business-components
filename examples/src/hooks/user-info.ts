import md5 from 'md5'

export function useToken() {
  return (
    localStorage.getItem('_BDSAAS_TOKEN') ||
    'eyJhbGciOiJIUzUxMiJ9.eyJqdGkiOiJiZHNhYXMiLCJzdWIiOiI2NzA5OCIsImV4cCI6MTcyMzA1ODUyNH0.Y1EYjRbBW6PBaw63giwgKWQCiEmb5cijsRQ0O5JNoVplaXDFyDVV8VZscCPTIQUWuqNwpPu1bzdlfpKITjnBSQ'
  )
}

export function useCompanyId() {
  return localStorage.getItem('_BDSAAS_COMPANY_ID') || '2'
}

export function useUserInfo() {
  return JSON.parse(localStorage.getItem('_BDSAAS_userInfo') || '{}')
}

export function useCompanyName() {
  return useUserInfo().companyName || '安徽腾讯云计算有限公司'
}

export function useUploadUrl() {
  return `${window.origin}/base-oss-rest/oss/uploadFile`
}

export function useProfileId() {
  return useUserInfo().profileId || '67098'
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
