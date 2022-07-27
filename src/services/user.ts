import fetch from '../utils/request';
import { IUserLogin, IUserRegister, IUpdateUserPwd, ILoginResponse } from '../interfaces/user';

// 相关字段
//  `Id`,
//   `Username` ,
//   `Password` ,
//   `LoginTime` , 登录时间
//   `LoginNum` '登录次数',
//   `RegTime`   注册时间
//   `ApiKey`  'apikey 用于tool使用的秘钥
//   `Role`  '账号权限: 0 普通用户, 100:管理员',

// 登录接口
// username  require  5-20位用户名
// password  require  5-20位的密码
export const fetchUserLogin = (data: IUserLogin) =>
    fetch<any>({
        method: 'POST',
        url: '/login',
        data,
    });

// 注册接口
// username  require  5-20位用户名
// password  require  5-20位的密码
// code   require  验证码
export const fetchUserRegister = (data: IUserRegister) =>
    fetch<ILoginResponse>({
        method: 'POST',
        url: '/reg',
        data,
    });

//  ===============================  以下接口需登录 ========================
// headers  {Authentication: }

// 修改密码
// oldPassword  require 原密码
// password   require  新密码
export const fetchUserChangePwd = (data: IUpdateUserPwd) =>
    fetch<any>({
        method: 'PUT',
        url: '/user/changePassword',
        data,
    });

// 用户列表
// page  页码
// 返回值：
// eslint-disable-next-line no-tabs
// "data": { "list"  用户列表  "page":  当前页码	"total": 总条数  },
export const getUserList = () =>
    fetch<any>({
        method: 'GET',
        url: '/user/list',
    });
