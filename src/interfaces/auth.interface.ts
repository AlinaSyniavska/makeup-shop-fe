export interface IAuth {
  user?: {
    _id?: string;
    name: string;
    surname: string;
    gender: string;
    phone: string;
    age: number;
    email: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
  };
  access_token: string;
  refresh_token: string;
}
