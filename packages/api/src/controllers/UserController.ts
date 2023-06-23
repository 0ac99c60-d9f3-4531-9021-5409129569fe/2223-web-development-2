import { Body, Controller, Delete, Get, Params, Patch, Post, Response } from "@decorators/express";
import type { Response as RESTResponse } from "express";
import { UserService } from "@api/services/UserService";
import { userRequired } from "@api/middleware/userRequired";

@Controller("/users")
export class UserController {
    constructor(private userService: UserService) {
        this.userService = new UserService();
    }

    @Get("/:id", [userRequired])
    async getUser(@Response() res: RESTResponse, @Params("id") id: number | "@me") {
        const user = await this.userService.getUser(id === "@me" ? res.user.id : id);

        if (user === null) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        res.status(200).json(user.toJSON());
    }

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