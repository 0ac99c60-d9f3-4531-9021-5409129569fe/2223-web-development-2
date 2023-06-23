import type { Request, Response, NextFunction } from "express";
import { TokenService } from "@api/services/TokenService";
import type { IUser } from "@filmeye/common";

const tokenService = new TokenService();

export async function userRequired(req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization?.startsWith("Bearer "))
        return res.status(401).json({ message: "Unauthorized" });

    const token = req.headers.authorization.split(" ")[1];
    const payload = await tokenService.verifyToken(token);

    if (!payload?.user)
        return res.status(401).json({ message: "Unauthorized" });

    res.user = payload.user as IUser;
    next();
}