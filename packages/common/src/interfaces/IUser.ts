export class IUser {
    id: number;
    username: string;
    password?: string;
    displayName: string;
    profilePicture?: string;
    createdAt: Date;
}