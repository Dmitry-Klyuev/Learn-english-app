import mysql from 'mysql2/promise';

export const connection = await mysql.createPool({
    host: '127.0.0.1', // имя хоста
    user: 'root',     // имя пользователя
    password: 'root',      // пароль
    database: 'en_words', // Имя БД
    port: 8889 // Порт MySQL
});