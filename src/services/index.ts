import fetch from '../utils/request';

export const pingNetworks = () => fetch<any>({
    method: 'GET',
    url: '/ping'
})