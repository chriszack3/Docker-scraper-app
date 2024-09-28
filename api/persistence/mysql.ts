import mysql from 'mysql2/promise';
import waitPort from 'wait-port';

const {
    MYSQL_HOST: HOST,
    MYSQL_USER: USER,
    MYSQL_PASSWORD: PASSWORD,
    MYSQL_DB: DB,
} = process.env;
// Create the connection pool. The pool-specific settings are the defaults
let pool: mysql.Pool;

const init = async (port: number) => {
    const host = HOST;
    const user = USER;
    const password = PASSWORD;
    const database = DB;

    await waitPort({
        host,
        port,
        timeout: 10000,
        waitForDns: true,
    });

    pool = mysql.createPool({
        connectionLimit: 5,
        host,
        user,
        password,
        database,
        charset: 'utf8mb4',
    });
    console.log('Connected to MySQL');
}

const getHeadlines = async (table: string) => { 
    return await pool.query(`SELECT * FROM headlines.${table};`);
}

export { init, getHeadlines }