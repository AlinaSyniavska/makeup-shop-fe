import { axiosService, Response } from "./axios.service";

import { IProduct, IUser } from "../interfaces";
import { urls } from "../constants";

const userService = {
  getAll: (): Response<IUser[]> => axiosService.get(urls.users),
  getById: (id: String): Response<IUser> => axiosService.get(`${urls.users}/${id}`),
  create: (user: IUser): Response<IUser> => axiosService.post(urls.users, user),
  delete: (id: String): Response<IUser> => axiosService.delete(`${urls.users}/${id}`),
  update: (id: String, newUser: Partial<IUser>): Response<IUser> => axiosService.patch(`${urls.users}/${id}`, newUser),

  getFavoriteListById: (id: String): Response<IUser> => axiosService.get(`${urls.userFavoriteList}/${id}`),
  getPopulatedUserById: (id: String): Response<IProduct[]> => axiosService.get(`${urls.populatedUser}/${id}`),
};

export { userService };
