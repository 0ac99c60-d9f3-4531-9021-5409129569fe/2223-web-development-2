import { UserRepository } from "@api/repositories/UserRepository";
import { User } from "@api/models/User";
import type { IUser } from "@filmeye/common";

export class UserService {
    constructor(private userRepository?: UserRepository) {
        this.userRepository = new UserRepository();
    }

    async getUser(userId: number) {
        return this.userRepository.getUser(userId);
    }

    async createUser(user: IUser) {
        return this.userRepository.createUser(user);
    }
}