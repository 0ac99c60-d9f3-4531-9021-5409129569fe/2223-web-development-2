import { UserRepository } from "@api/repositories/UserRepository";
import { TokenService } from "@api/services/TokenService";
import type { APILoginBody, APIRegisterBody } from "@filmeye/common";

export class UserService {
    private userRepository: UserRepository;
    private tokenService: TokenService;

    constructor() {
        this.userRepository = new UserRepository();
        this.tokenService = new TokenService();
    }

    async getUser(userId: number) {
        return this.userRepository.getUser(userId);
    }

    async createUser(body: APIRegisterBody) {
        const user = await this.userRepository.createUser(body);
        if (!user) return null;
        const token = await this.tokenService.generateToken(user);
        return { ...user, token };
    }

    async login(body: APILoginBody) {
        const user = await this.userRepository.login(body);
        if (!user) return null;
        const token = await this.tokenService.generateToken(user);
        return { ...user, token };
    }
}