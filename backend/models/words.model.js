import {connection} from "../config/db.js";

const getWordsQuery = "SELECT * FROM words LIMIT ? OFFSET ?"
export const getWords = async (id) => {
    const offset = (id - 1) * 10

    try {
        const [words] = await connection.query(getWordsQuery, [10, offset])
        return words
    } catch (e) {
        console.log(e)
    }
}





