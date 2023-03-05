import { axiosService, Response } from "./axios.service";
import { adminUrls } from "../constants";
import { IItem, IItems } from "../interfaces";

const adminItemService = {
  getAll: (url: string): Response<IItems> => axiosService.get(adminUrls.admin + "/" + url),
  getById: (url: string, id: String): Response<IItem> => axiosService.get(adminUrls.admin + "/" + url + "/" + id),
  create: (url: string, item: IItem): Response<IItem> => axiosService.post(adminUrls.admin + "/" + url, item),
  delete: (url: string, id: String): Response<IItem> => axiosService.delete(adminUrls.admin + "/" + url + "/" + id),
  update: (url: string, id: String, newItem: IItem): Response<IItem> => axiosService.put(adminUrls.admin + "/" + url + "/" + id, newItem),
};

export { adminItemService };
