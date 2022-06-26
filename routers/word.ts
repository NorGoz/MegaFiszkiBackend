import {Request, Response, Router} from 'express';
import {MyRouter} from "../types/my-router";
import {WordRecord} from "../records/word.record";
import {Word} from "../types/word";


export class WordRouter implements MyRouter {
    public readonly urlPrefix = '/word';
    public readonly router :Router = Router();

    constructor() {
        this.setUpRoutes()
    }

    setUpRoutes() {
        this.router.post('/',this.addWord);
        this.router.delete('/:id',this.deleteWord);
        this.router.put('/:id',this.editWord);
    }

    private addWord = async (req:Request,res:Response): Promise<void> => {
        const word: Word = req.body;
        const newWord = new WordRecord(word);
        const response = await newWord.insert();
        res.json(response)
    }

    private deleteWord = async (req:Request,res:Response): Promise<void> => {
        const {id} = req.params
        const word = await WordRecord.getOne(id);
        await word.remove();
        res.end();
    }

    private editWord = async (req:Request,res:Response): Promise<void> => {
        const {id} = req.params
        const obj: Word = req.body
        const word = await WordRecord.getOne(id);
        await word.update(obj);
        res.end();
    }
}
