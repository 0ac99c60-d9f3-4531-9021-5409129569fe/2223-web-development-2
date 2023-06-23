import { IUser } from "../IUser";

export interface APILoginBody {
    username: string;
    password: string;
}

export type APILoginResponse = Omit<IUser, "password"> & {
    token: string;
};