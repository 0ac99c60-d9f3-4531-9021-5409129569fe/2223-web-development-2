import { Body, Controller, Delete, Get, Params, Patch, Post, Response } from "@decorators/express";
import type { Response as RESTResponse } from "express";
import { User } from "@api/models/User";
import { UserService } from "@api/services/UserService";

@Controller("/users")
export class UserController {
    constructor(private userService: UserService) {
        this.userService = new UserService();
    }

    @Get("/hello")
    hello(@Response() res: RESTResponse) {
        res.status(200).json({ message: "hello" });
    }

    @Get("/:id")
    async getUser(@Response() res: RESTResponse, @Params("id") id: number) {
        try {
            const user = await this.userService.getUser(id);

            if (user === null) {
                return res.status(404).json({
                    message: "User not found",
                });
            }

            res.status(200).json(user);
        } catch (err) {
            // if (err instanceof MongooseError.CastError && err.kind === "ObjectId") {
            //     return res.status(404).json({
            //         message: "User not found",
            //     });
            // }

            console.error(err);
            res.status(500).json({
                message: "An error occured",
                error: err,
            });
        }
    }

    // @Get("/")
    // async getUsers(@Response() res: RESTResponse) {
    //     try {
    //         const users = await User.find(null, { Password: false });

    //         res.status(200).json(users);
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).json({
    //             message: "An error occured",
    //             error: err,
    //         });
    //     }
    // }

    // @Post("/")
    // async addUser(@Response() res: RESTResponse, @Body() body: IUser) {
    //     try {
    //         const user = new User(body);
    //         await user.save();

    //         res.status(201).json(user);
    //     } catch (err) {
    //         console.error(err);
    //         res.status(500).json({
    //             message: "An error occured",
    //             error: err,
    //         });
    //     }
    // }

    // @Patch("/:id")
    // async updateUser(@Response() res: RESTResponse, @Params("id") id: string, @Body() body: Partial<IUser>) {
    //     try {
    //         const user = await User.findByIdAndUpdate(id, body, {
    //             new: true,
    //             runValidators: true,
    //         });
    //         if (user === null) {
    //             return res.status(404).json({
    //                 message: "User not found",
    //             });
    //         }

    //         res.status(200).json(user);
    //     } catch (err) {
    //         if (err instanceof MongooseError.CastError && err.kind === "ObjectId") {
    //             return res.status(404).json({
    //                 message: "User not found",
    //             });
    //         }

    //         console.error(err);
    //         res.status(500).json({
    //             message: "An error occured",
    //             error: err,
    //         });
    //     }
    // }

    // @Delete("/:id")
    // async deleteUser(@Response() res: RESTResponse, @Params("id") id: string) {
    //     try {
    //         const user = await User.findByIdAndDelete(id);
    //         res.status(200).json(user);
    //     } catch (err) {
    //         if (err instanceof MongooseError.CastError && err.kind === "ObjectId") {
    //             return res.status(404).json({
    //                 message: "User not found",
    //             });
    //         }

    //         console.error(err);
    //         res.status(500).json({
    //             message: "An error occured",
    //             error: err,
    //         });
    //     }
    // }
}