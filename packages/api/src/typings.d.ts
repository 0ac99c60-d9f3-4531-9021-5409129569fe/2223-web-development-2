// import {Express} from "express-serve-static-core";
import type { IUser } from "@filmeye/common";

declare module "express" {
    export interface Response {
        user?: IUser;
    }
}