export interface IAuth {
    user?: {
        _id: string,
        name: string,
        email: string,
        phone?: string,
        age: number,
    },
    access_token: string,
    refresh_token: string,
}
