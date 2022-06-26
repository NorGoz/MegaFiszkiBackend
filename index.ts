import {Application, json} from "express";
import express from "express";
import 'express-async-errors';
import cors from "cors";
import methodOverride from "method-override";

import { CategoriesRouter } from "./routers/categories";
import { WordRouter } from "./routers/word";
import { MyRouter } from "./types/my-router";
import { handleError } from "./utils/errors";


export class FlashCardApp {
    private app: Application;
    private readonly routers = [CategoriesRouter,WordRouter];
    constructor() {
        this.configureApp();
        this.setRoutes();
        this.run();
        this.setErrors();
    }

    private configureApp(): void{
        this.app = express();
        this.app.use(cors({
            origin:'http://localhost:3000',
        }))
        this.app.use(methodOverride('_method'));
        this.app.use(json());
        this.app.use(express.urlencoded({
            extended: true,
        }));
    }

    private setRoutes(): void {
        for (const router of this.routers) {
            const obj: MyRouter = new router(this);
            this.app.use(obj.urlPrefix, obj.router)
        }
    }
    private setErrors(): void{
        this.app.use(handleError);
    }

    private run(): void {
        this.app.listen(5000, '0.0.0.0', () => {
            console.log('Listening on http://localhost:5000');
        });
    }
}

new FlashCardApp();
