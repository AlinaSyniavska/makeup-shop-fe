import {axiosService, Response} from "./axios.service";
import {urls} from "../constants";
import {IAuth, ILogin} from "../interfaces";

const authService = {
    login: (user: ILogin): Response<IAuth> => axiosService.post(urls.login, user),
    logout: (access_token: string): Response<IAuth> => axiosService.post(urls.logout, {access_token}),
    refresh: (): Response<IAuth> => axiosService.post(urls.refresh),
}

export {
    authService
}