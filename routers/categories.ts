import {Request, Response} from 'express';
import {BaseRouter} from "./base";
import {MyRouter} from "../types/my-router";
import {get} from "../decorators/rest.decorator";
import {WordRecord} from "../records/word.record";
import {ValidationError} from "../utils/errors";


type CategoriesResponse = [string];

export class CategoriesRouter extends BaseRouter implements MyRouter {
    public readonly urlPrefix = '/categories';

    @get('/')
    private showAllCategories = async (req:Request,res:Response): Promise<CategoriesResponse | void> => {
        const categories = await WordRecord.getAllCategory();
        console.log( typeof categories);
        res.json(categories)
    }
    @get('/:categories')
    private getWordsFromOneCategories = async (req:Request, res:Response): Promise<WordRecord[] | void> => {
        const {categories} = req.params
        const wordsFromOneCategories = await WordRecord.listAll(categories);
        // @todo walidacja przy braku kategori
        console.log(wordsFromOneCategories)
        res.json(wordsFromOneCategories);
    }



}
