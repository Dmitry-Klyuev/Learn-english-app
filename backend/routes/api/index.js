import { WordsController} from "../../controllers/words.controller.js";
import {CountController} from "../../controllers/counter.controller.js";
import express from "express";

const router = express.Router();

router.get('/count', CountController)
router.get('/:id', WordsController)
router.use(function(req, res) {
    res.status(404).send('not found');
});
export default router