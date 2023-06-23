import { User } from "@api/models/User";
import { hashPassword } from "@api/utils/PasswordUtils";
import type { APILoginBody, APIRegisterBody } from "@filmeye/common";

export class UserRepository {
    async getUser(userId: number): Promise<User> {
        const user = await User.findOne({
            select: { password: false },
            where: { id: userId },
        });
        if (!user) return null;
        return user;
    }

    async createUser(body: APIRegisterBody): Promise<User> {
        // generate password hash
        const password = await hashPassword(body.password);
        // create user
        const user = await User.save({
            username: body.username,
            password,
            displayName: body.displayName,
            profilePicture: body.profilePicture,
            createdAt: new Date(),
        });
        if (!user) return null;
        return user;
    }

    async login(body: APILoginBody): Promise<User> {
        const password = await hashPassword(body.password);
        const user = await User.findOne({
            select: { password: false },
            where: {
                username: body.username,
                password,
            },
        });
        if (!user) return null;
        return user;
    }
}