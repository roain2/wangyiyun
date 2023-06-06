import axios from 'axios'

let url = ''

// 开发环境
if (process.env.NODE_ENV === "development") {
  url = '/api'
} else {
  // 生产环境
  url = 'http://124.222.23.222:3000/'
}

const requests = axios.create({
  baseURL: url,
  //设置请求超时的时间
  timeout: 8000,
  // 设置允许跨域 且默认带上cookie
  withCredentials: true,
})

//请求拦截器：在发请求之前，请求拦截器可以检测到，就可以在发送请求之前进行一些操作
requests.interceptors.request.use((config: any) => {
  const token = localStorage.getItem('token')
  token ? config.headers.Authorization = token : null
  return config
})

//响应拦截器
requests.interceptors.response.use(
  (res) => {
    //成功的回调函数，当数据返回成功之后，响应拦截器可以检测到，就可以做一些操作
    return res.data
  },
  (error) => {
    console.log('error', error)
    return Promise.reject(error)
  }
)

export default requests
