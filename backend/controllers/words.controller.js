import {getWords} from "../models/words.model.js";

export const WordsController = (async (req, res) => {
    const {id} = req.params
    try {
        const data = await getWords(id)
        res.json(data)
    } catch (e) {
        console.log(e)
    }
})
