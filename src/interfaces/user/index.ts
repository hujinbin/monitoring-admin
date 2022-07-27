export interface IUserLogin {
    username: string
    password: string
}

export interface IUserRegister {
    username: string
    password: string
    code: string
}

export interface IUpdateUserPwd {
    oldPassword: string
    password: string
}

export interface ILoginResponse {
    apiKey: string,
    id: number,
    role: 0,
    token: string,
    userName: string
}
