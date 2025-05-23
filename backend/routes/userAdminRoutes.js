import express from "express";
import userAdminController from "../controllers/userAdminController.js";
import { verifyToken } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, userAdminController.createAdminUser);
router.get("/all", verifyToken, userAdminController.getAllAdminUsers);
router.get("/:id", verifyToken, userAdminController.getAdminUserById);
router.put("/:id", verifyToken, userAdminController.updateAdminUser);
router.delete("/:id", verifyToken, userAdminController.deleteAdminUser);

export default router;
