import type { IUser } from "../IUser";

export interface APIRegisterBody {
    username: string;
    password: string;
    displayName: string;
    profilePicture: Buffer;
}

export type APIRegisterResponse = Omit<IUser, "password"> & {
    token: string;
};