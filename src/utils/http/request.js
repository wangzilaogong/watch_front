import http from '../http.js'

export const Post = (url, data) => http({
    method: 'post',
    url: url,
    data: data
})
export const Get = (url, data) => http({
    method: 'get',
    url: url,
    params: data
})
export const Delete = (url, data) => http({
    method: 'delete',
    url: url,
    data: data
})