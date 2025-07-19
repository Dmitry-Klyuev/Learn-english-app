import mysql from 'mysql2/promise';
import 'dotenv/config'

export const connection = await mysql.createPool({
    host: 'localhost', // имя хоста
    user: process.env.DB_LOGIN,     // имя пользователя
    password: process.env.DB_PASSWORD,      // пароль
    database: process.env.DB_NAME, // Имя БД
});
console.log(process.env.DB_LOGIN)