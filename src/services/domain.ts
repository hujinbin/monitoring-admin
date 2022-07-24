import fetch from '../utils/request'

// 相关字段
// Id      bigint(20)                 
// Domain  string(255)   域名  


// 获取域名列表
// page  页码 
export const getDomainList = () =>
    fetch<any>({
        method: 'GET',
        url: '/domain/list'
    })
