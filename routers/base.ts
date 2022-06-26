import * as express from "express";
import {FlashCardApp} from "../index";
import {RestDecoratorInfo} from "../types/rest-decorator";

export class BaseRouter{
    public readonly router = express.Router();

    constructor( protected wapp: FlashCardApp) {
        this.wapp = wapp;
        this.setUpRoutes();
    }

    setUpRoutes() {
        const ar: RestDecoratorInfo[] = Reflect.get(this,'_restApiCalls') ?? [];

        for (const apiOp of ar) {
            this.router[apiOp.httpMethod](apiOp.path, (...args) => (this as any)[apiOp.propertyName](...args))
        }
    }
}
