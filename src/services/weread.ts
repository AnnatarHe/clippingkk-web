import { request } from './ajax'

export function postWereadLoginInfo(uid: string): Promise<any> {
  return request<any>('/v2/weread/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ uid })
  })
}
