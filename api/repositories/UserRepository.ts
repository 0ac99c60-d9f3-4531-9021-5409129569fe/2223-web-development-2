import { User } from "api/models/User";
import type { User as IUser } from "@/interfaces/User";


export class UserRepository {
    constructor() { }

    async getUser(userId: number) {
        return User.findOneBy({ id: userId });
    }

    async createUser(user: IUser) {
        return User.save({
            email: user.email,
            username: user.username,
            password: user.password,
            profilePicture: user.profilePicture,
            createdAt: new Date(),
        });
    }
}