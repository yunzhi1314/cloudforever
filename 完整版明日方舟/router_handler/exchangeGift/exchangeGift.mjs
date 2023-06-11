import express from "express"
import {getGift,getContext} from "./exchangeGift_handler.mjs"

const router = express.Router()

router.get("/getContext",getContext)

router.post("/getGift",getGift)

export default router