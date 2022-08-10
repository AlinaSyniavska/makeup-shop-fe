import {IUser} from "../interfaces";
import {axiosService, Response} from "./axios.service";
import {urls} from "../constants";

const userService = {
    getAll: (page: string, perPage: string): Response<IUser[]> => axiosService.get(urls.users, {params: {page, perPage}}),
    getById: (id: String): Response<IUser> => axiosService.get(`${urls.users}/${id}`),
    create: (user: IUser): Response<IUser> => axiosService.post(urls.users, user),
    delete: (id: String): Response<IUser> => axiosService.delete(`${urls.users}/${id}`),
    update: (id: String, newUser: IUser): Response<IUser> => axiosService.put(`${urls.users}/${id}`, newUser),
};

export {
    userService,
}
