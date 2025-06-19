
import express from "express";

import { authMidlleware } from "../middleware/auth.middleware.js";
import { getAllUserUrl } from "../controller/user.controller.js";

const router =express.Router();

router.get("/url",authMidlleware, getAllUserUrl);

export default router;