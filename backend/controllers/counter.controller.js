import {getCount} from "../models/counter.mode.js";

export const CountController = (async (req, res) => {
    try {
        const data = await getCount()
        if (data) {
            res.json(data)
        }
    } catch (e) {
        console.log(e)
    }
})