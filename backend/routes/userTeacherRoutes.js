import express from "express";
import userTeacherController from "../controllers/userTeacherController.js";
import { verifyToken } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, userTeacherController.createTeacherUser);
router.get("/all", verifyToken, userTeacherController.getAllTeacherUsers);
router.get("/:id", verifyToken, userTeacherController.getTeacherUserById);
router.put("/:id", verifyToken, userTeacherController.updateTeacherUser);
router.delete("/:id", verifyToken, userTeacherController.deleteTeacherUser);

export default router;
