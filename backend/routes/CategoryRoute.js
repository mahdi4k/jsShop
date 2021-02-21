import {createCategory} from "../controllers/categoryController.js";
import {admin, protect} from "../middleware/authMiddleware.js";
import express from 'express'
const router = express.Router()

router.route('/').post(protect, admin, createCategory)

export default router