import express from "express";
import branchController from "../controllers/branchController.js";
import { verifyToken } from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/create", verifyToken, branchController.createBranch);
router.get("/all", verifyToken, branchController.getAllBranches);
router.get("/:id", verifyToken, branchController.getBranchById);
router.put("/:id", verifyToken, branchController.updateBranch);
router.delete("/:id", verifyToken, branchController.deleteBranch);

export default router;
