import axios from 'axios';

export function request(config) {
  // 创建axios实例
  const instance = axios.create({
    timeout: 5000,
    baseURL: 'http://106.54.54.237:8000/api/mn'
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

export function request_(config) {
  const instance = axios.create({
    timeout: 5000,
    baseURL: 'http://xkfwuxi.top:8080'
  })
  return instance(config);  // return PromiseLike
}
