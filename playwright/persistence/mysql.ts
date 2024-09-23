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

const init = async() => {
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

    return await pool.query('CREATE TABLE IF NOT EXISTS Another_Debate_2024 (id INT AUTO_INCREMENT PRIMARY KEY, scrapedAtMS BIGINT, publisher VARCHAR(255), title VARCHAR(255) UNIQUE, url VARCHAR(255), description VARCHAR(255), publishedAgo VARCHAR(255));')
}

const addHeadlines = async () => {
    return await pool.query(
        'INSERT INTO Another_Debate_2024 (scrapedAtMS, publisher, title, url, description, publishedAgo) VALUES (?,?,?,?,?,?)',
        [Date.now(), 'sgasf', 'asdfsdss', 'dg', 'fsdfgsdgfsdfgsd', 'asfdasdfasfasfsdsad']
    );
}

const getAllHeadlines = async () => { 
    return await pool.query('SELECT * FROM Another_Debate_2024');
}

export { init, addHeadlines, getAllHeadlines}