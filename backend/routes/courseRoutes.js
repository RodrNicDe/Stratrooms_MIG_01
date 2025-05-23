import express from "express";
import courseController from "../controllers/courseController.js";
import { verifyToken } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, courseController.createCourse);
router.get("/all", verifyToken, courseController.getAllCourses);
router.get("/:id", verifyToken, courseController.getCourseById);
router.put("/:id", verifyToken, courseController.updateCourse);
router.delete("/:id", verifyToken, courseController.deleteCourse);

router.post("/enroll", verifyToken, courseController.enrollInCourse);
router.post("/unenroll", verifyToken, courseController.unenrollFromCourse);
router.get("/mycourses/:id", verifyToken, courseController.getMyCourses);

export default router;
