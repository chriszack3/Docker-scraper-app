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

async function init() {
    const host = HOST;
    const user = USER;
    const password = PASSWORD;
    const database = DB;

    await waitPort({
        host,
        port: 3306,
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

    return await pool.query('CREATE TABLE IF NOT EXISTS todo_items (id varchar(36), name varchar(255), completed boolean) DEFAULT CHARSET utf8mb4')
}

init().then((res) => {
    console.log('Initialized');
    console.log(res);
})