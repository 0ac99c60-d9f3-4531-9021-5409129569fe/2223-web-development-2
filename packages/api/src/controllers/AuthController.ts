import { Body, Controller, Patch, Post, Request, Response } from "@decorators/express";
import type { Response as RESTResponse, Request as RESTRequest } from "express";
import multer from "multer";
import { UserService } from "@api/services/UserService";
import { userRequired } from "@api/middleware/userRequired";
import {
    type APIRegisterBody,
    type APILoginBody,
    VALID_USERNAME_REGEX,
    STRONG_PASSWORD_REGEX,
    MEDIUM_PASSWORD_REGEX,
    MAX_DISPLAY_NAME_LENGTH,
    VALID_IMAGE_TYPES,
    MAX_IMAGE_SIZE,
} from "@filmeye/common";

const upload = multer();

@Controller("/auth")
export class AuthController {
    constructor(private userService: UserService) {
        this.userService = new UserService();
    }

    @Post("/register", [upload.single("image")])
    async register(@Request() req: RESTRequest, @Response() res: RESTResponse, @Body("data") data: string) {
        const image = req.file;
        const body: APIRegisterBody = JSON.parse(data);

        // validate username
        if (!VALID_USERNAME_REGEX.test(body.username)) {
            return res.status(400).json({
                message: "Username is invalid",
            });
        }

        // validate password
        if (!STRONG_PASSWORD_REGEX.test(body.password) && !MEDIUM_PASSWORD_REGEX.test(body.password)) {
            return res.status(400).json({
                message: "Password is not strong enough",
            });
        }

        // validate display name
        if (body.displayName?.length > MAX_DISPLAY_NAME_LENGTH) {
            return res.status(400).json({
                message: "Display name is invalid",
            });
        }

        // validate profile picture
        if (!VALID_IMAGE_TYPES.includes(image?.mimetype) || image?.size > MAX_IMAGE_SIZE) {
            return res.status(400).json({
                message: "Profile picture is invalid",
            });
        }

        try {
            const user = await this.userService.createUser({
                ...body,
                profilePicture: image.buffer,
            });

            if (user === null) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            res.status(201).json(user);
        } catch (err) {
            if (err?.code === "SQLITE_CONSTRAINT") {
                return res.status(400).json({
                    code: "username_taken",
                    message: "Username is already taken",
                });
            }
            return res.status(500).json({
                message: "An error occured",
                err,
            });
        }
    }

    @Post("/login")
    async login(@Response() res: RESTResponse, @Body() body: APILoginBody) {
        if (!body.username || !body.password)
            return res.status(400).json({
                message: "Username and password are required",
            });

        const user = await this.userService.login(body);
        if (user === null) {
            return res.status(404).json({
                message: "Invalid credentials",
            });
        }

        res.status(200).json(user);
    }
}