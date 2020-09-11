import axios from 'axios';

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    timeout: 5000,
    baseURL: '***'
  })

  // 设置axios的拦截器
  instance.interceptors.request.use(config => {
    return config
  }, err => {
    console.log(err);
  });

  instance.interceptors.response.use(res => {
    return res.data
  }, err => {
    console.log(err);
  });

  return instance(config)  // return PromiseLike
}
