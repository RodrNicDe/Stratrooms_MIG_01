import express from "express";
import userStudentController from "../controllers/userStudentController.js";
import { verifyToken } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, userStudentController.createStudentUser);
router.get("/all", verifyToken, userStudentController.getAllStudentUsers);
router.get("/:id", verifyToken, userStudentController.getStudentUserById);
router.put("/:id", verifyToken, userStudentController.updateStudentUser);
router.delete("/:id", verifyToken, userStudentController.deleteStudentUser);

export default router;
