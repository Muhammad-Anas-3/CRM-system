import express from "express";
import {
    addCustomer,
    deleteCustomer,
    getCustomer,
    getCustomers,
    updateCustomer,
} from "../controllers/customerController.js";
import { verifyToken } from "../utils/verification.js";
const router = express.Router();

// @route   GET /api/customers
router.get("/", getCustomers);

// @route   GET /api/customers
router.get("/:id", getCustomer);

// @route   POST /api/customers
router.post("/", verifyToken, addCustomer);

// @route   PUT /api/customers/:id
router.put("/:id", verifyToken, updateCustomer);

// @route   DELETE /api/customers/:id
router.delete("/:id", verifyToken, deleteCustomer);

export default router;
