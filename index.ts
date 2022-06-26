import {Application, json} from "express";
import express from "express";
import 'express-async-errors';
import cors from "cors";


export class FlashCardApp {
    private app: Application;

    // private readonly routers = [HomeRouter,CategoriesRouter,WordRouter];
    constructor() {
        this.configureApp();
        this.run();
    }

    private configureApp(): void {
        this.app = express();
        this.app.use(cors({
            origin:'http://localhost:3000',
        }));
        this.app.use(json());
    }

    private run(): void {
        this.app.listen(5000, '0.0.0.0', () => {
            console.log('Listening on http://localhost:5000');
        });
    }
}

new FlashCardApp();
