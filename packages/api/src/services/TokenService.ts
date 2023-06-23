import * as jose from "jose";
import type { IUser } from "@filmeye/common";
import { User } from "@api/models/User";

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const ISSUER = "FilmEye";
const AUDIENCE = "https://filmeye.com";

export class TokenService {
    async generateToken(user: User) {
        const alg = "HS256";
        const payload = {
            id: user.id,
            username: user.username,
            displayName: user.displayName,
            createdAt: user.createdAt,
        } satisfies IUser;
        const jwt = await new jose.SignJWT({ user: payload })
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer(ISSUER)
            .setSubject(`${user.id}:${user.username}`)
            .setAudience(AUDIENCE)
            .setExpirationTime("1y")
            .sign(JWT_SECRET);
        return jwt;
    }

    async verifyToken(token: string) {
        try {
            const { payload } = await jose.jwtVerify(token, JWT_SECRET, {
                issuer: ISSUER,
                audience: AUDIENCE,
            });
            return payload;
        } catch (err) {
            return null;
        }
    }
}