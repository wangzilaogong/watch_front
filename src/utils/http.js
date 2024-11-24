/**
 * axios的二次封装
 */
import axios from 'axios';
import 'element-plus/es/components/message/style/css'
import { ElMessage, ElNotification } from 'element-plus'

const baseUrl = import.meta.env.VITE_APP_BASE_API

const service = axios.create({
    baseURL: baseUrl,
    // timeout: 30000,
})

// request拦截器
service.interceptors.request.use(config => {
    // 一般情况下在请求头里塞token
    config.headers['Authorization'] = ' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJteS1jLWwtaS1lLW4tdC1hcHAiLCJleHAiOjIwNDY0MTE4MTcsImlhdCI6MTczMTA1MTgxNywiaXNzIjoid2F0Y2gtc2VydmljZSIsInN1YiI6ImNsaWVudC01NTQ0MzQifQ.hGu1cDsxTjB4sBoLeg_T7igsFUJ3hsn_1wsRvyWlHeM'
    return config
}, error => {
    Promise.reject(error)
})

// response拦截器
service.interceptors.response.use(response => {
    // 根据后端定义的规则去进行封装返回的数据
    if (response.status === 401) {
        ElMessage.warning('Login status has expired, please log in again')
        localStorage.removeItem('token')
        location.reload();
    } else if (response.status === 500) {
        ElMessage.error(response.data.msg)
    } else if (response.status!== 200&&response.status !== 201) {
        ElNotification({
            title: 'Error',
            message: response.data.msg,
            type: 'error',
            position: 'top-left',
        })
    } else {
        return response
    }
}, error => {
    Promise.reject(error)
})

export default service