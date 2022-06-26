import { pool } from "../utils/db";
import {v4 as uuid} from "uuid";
import { Word } from "../types/word";
import {ValidationError} from "../utils/errors";
import { FieldPacket } from "mysql2";

type WordRecordResults = [WordRecord[], FieldPacket[]];

export class WordRecord implements Word{
    id:string;
    polish: string;
    english: string;
    category: string;
    remember: boolean;

    constructor(obj:Word) {
        if(obj.polish.length < 3 || obj.english.length < 3 || obj.category.length < 3){
            throw new ValidationError('Polish words, English word and category must be longer than 3 characters ')
        }
        if(typeof (obj.polish) !== "string" || typeof (obj.english) !== "string" || typeof (obj.category) !== "string"){
            throw new ValidationError('Polish words, English word and category must be typeof string ')
        }

        this.id = obj.id;
        this.polish = obj.polish;
        this.english = obj.english;
        this.category = obj.category;
        this.remember = obj.remember;
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid();
        }

        await pool.execute("INSERT INTO `words`(`id`, `polish`,`english`,`category`) VALUES(:id, :polish, :english, :category)", {
            id: this.id,
            polish: this.polish,
            english: this.english,
            category: this.category,
        });
        return this.id;
    }

    static async listAll(category: string):Promise<WordRecord[]> {
        const [results] = (await pool.execute("SELECT * FROM `words` WHERE `category` = :category ORDER BY `remember` ASC",{
            category,
        })) as WordRecordResults;
        console.log(results.map((obj: Word) => new WordRecord(obj)))
        return results.map((obj: Word) => new WordRecord(obj));
    }


    static async getOne(id: string): Promise<null | WordRecord> {
        const [results] = (await pool.execute("SELECT * FROM `words` WHERE `id` = :id", {
            id,
        }))as WordRecordResults;
        return results.length === 0 ? null : new WordRecord(results[0]);
    }

    static async getAllCategory(): Promise<string[] | null | string> {
        const [results] = (await pool.execute("SELECT DISTINCT `category` FROM `words`")) as WordRecordResults;
        return results.map(categorie => categorie.category)
    }

    async update(obj: Word): Promise<void> {
        await pool.execute("UPDATE `words` SET `polish` = :polish, `english` = :english, `category` = :category WHERE `id` = :id", {
            id: this.id,
            polish: obj.polish,
            english: obj.english,
            category: obj.category,
        });
    }

    async remove(): Promise<void> {
        console.log(`id w remove ${this.id}`)
        await pool.execute("DELETE FROM `words` WHERE `id` =:id",{
            id:this.id,
        });
    }
}
