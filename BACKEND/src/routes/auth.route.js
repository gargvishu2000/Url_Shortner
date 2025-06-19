
import express from "express";
import { login_user, register_user,logout_user } from "../controller/auth.controller.js";
import { authMidlleware } from "../middleware/auth.middleware.js";
const router =express.Router();

router.post("/register", register_user);
router.post("/login", login_user);
router.post("/logout", logout_user);
router.get("/me", authMidlleware, (req, res) => {
    res.status(200).json({user: req.user});
});

export default router;