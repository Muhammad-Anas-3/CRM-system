import express from "express";
import {
    addCustomer,
    deleteCustomer,
    getCustomers,
    updateCustomer,
} from "../controllers/customerController.js";
import { verifyAdmin, verifyToken } from "../utils/verification.js";
const router = express.Router();

// @route   GET /api/customers
router.get("/", getCustomers);

// @route   POST /api/customers
router.post("/", verifyAdmin, addCustomer);

// @route   PUT /api/customers/:id
router.put("/:id", verifyAdmin, updateCustomer);

// @route   DELETE /api/customers/:id
router.delete("/:id", verifyAdmin, deleteCustomer);

export default router;
