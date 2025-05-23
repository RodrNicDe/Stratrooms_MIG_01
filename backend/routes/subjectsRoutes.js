import express from "express";
import subjectController from "../controllers/subjectsController.js";
import { verifyToken } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, subjectController.createSubject);
router.get("/all", verifyToken, subjectController.getAllSubjects);
router.get("/:id", verifyToken, subjectController.getSubjectById);
router.put("/:id", verifyToken, subjectController.updateSubject);
router.delete("/:id", verifyToken, subjectController.deleteSubject);

export default router;
