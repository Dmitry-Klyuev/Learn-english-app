import {connection} from "../config/db.js";

export const getCount = async () => {
    try {
        const [count] = await connection.query("SELECT COUNT(*) as count FROM words")
        return count
    } catch (e) {
        console.log(e)
    }
}