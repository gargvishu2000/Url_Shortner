import express from "express";
import { createShortUrl } from "../controller/short_url.controller.js";
import { createUrlRateLimiter } from "../middleware/rateLimiter.middleware.js";

const router = express.Router();

router.post("/",createUrlRateLimiter , createShortUrl);

export default router;