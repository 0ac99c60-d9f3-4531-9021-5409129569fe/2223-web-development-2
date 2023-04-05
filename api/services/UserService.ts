import type { UserRepository } from "../repositories/UserRepository";
import { User } from "../models/User";
import type { User as IUser } from "@/interfaces/User";

export class UserService {
    constructor(private userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    async getUser(userId: number) {
        return this.userRepository.getUser(userId);
    }

    async createUser(user: IUser) {
        return this.userRepository.createUser(user);
    }
}