import type { IUser } from "../IUser";

export interface APIRegisterBody {
    username: string;
    password: string;
    displayName: string;
    // @ts-ignore
    profilePicture: Buffer;
}

export type APIRegisterResponse = Omit<IUser, "password"> & {
    token: string;
};