import {axiosService, Response} from "./axios.service";
import {urls} from "../constants";
import {IAuth, ILogin, IUser} from "../interfaces";

const authService = {
    login: (user: ILogin): Response<IAuth> => axiosService.post(urls.login, user),
    logout: (user: IUser, access_token: string): Response<IAuth> => axiosService.post(urls.logout, {user, access_token}),
    refresh: (): Response<IAuth> => axiosService.post(urls.refresh),
}

export {
    authService
}