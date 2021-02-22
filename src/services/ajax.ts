import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { onError } from "@apollo/client/link/error"
import { API_HOST, WENQU_API_HOST, WENQU_SIMPLE_TOKEN } from '../constants/config'
import swal from 'sweetalert'
import profile from '../utils/profile'

console.log(API_HOST, profile)

export interface IBaseResponseData {
  status: Number
  msg: string
  data: any
}

let token = profile?.token

export async function request<T>(url: string, options: RequestInit = {}): Promise<T> {
  if (token) {
    options.headers = {
      ...(options.headers || {}),
      'Authorization': `Bearer ${token}`
    }
  }
  options.credentials = 'include'
  options.mode = 'cors'

  try {
    const response: IBaseResponseData = await fetch(API_HOST + '/api' + url, options).then(res => res.json())
    if (response.status >= 400 || (response as any).code >= 400) {
      throw new Error(response.msg || (response as any).error)
    }

    return response.data as T
  } catch (e) {
    swal({
      title: 'Oops',
      text: '请求挂了... 一会儿再试试',
      icon: 'info'
    })
    return Promise.reject(e)
  }
}

export function updateToken(t: string) {
  token = t
}

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers = {} }) => {
    if (!token) {
      return headers
    }

    return {
      headers: {
        ...headers,
        'Authorization': `Bearer ${token}`
      }
    }
  })

  return forward(operation)
})

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    swal({
      icon: 'error',
      title: graphQLErrors[0].message,
      text: graphQLErrors[0].message,
    })
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const httpLink = new HttpLink({
    uri: API_HOST + '/api/v2/graphql',
  })

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: errorLink.concat(authLink.concat(httpLink)),
})
