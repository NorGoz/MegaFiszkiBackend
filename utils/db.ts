import {createPool} from "mysql2/promise";

export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'flash_card',
    namedPlaceholders: true,
    decimalNumbers: true,
});
