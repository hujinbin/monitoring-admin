export interface ICommonResponse<T = any> {
    code: number
    msg: string
    data: T
}
