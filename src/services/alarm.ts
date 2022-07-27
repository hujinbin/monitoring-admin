import fetch from '../utils/request';

// 相关字段
// `Id`
//   `Uid`   用户id',
//   `Secret`  '钉钉的秘钥',
//   `AccessToken` c '钉钉的秘钥',
//   `AtAll`  '是否开始@所有人' ,  true开启  false 关闭
//   `Phone` '需要@用户的号码',

// 获取告警信息
export const getAlarmInfo = () =>
    fetch<any>({
        method: 'GET',
        url: '/alarm/info',
    });

// 设置告警信息
//   `Secret`   require  '钉钉的秘钥',
//   `AccessToken` require '钉钉的秘钥',
//   `AtAll`   require  '是否开始@所有人' ,  true开启  false 关闭 默认false
//   `Phone`  '需要@用户的号码',
export const setAlarm = () =>
    fetch<any>({
        method: 'POST',
        url: '/alarm/set',
    });
