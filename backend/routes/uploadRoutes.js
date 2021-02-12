import express from "express";
 import {imgUploadProduct} from "../controllers/fileController.js";

const router = express.Router()

router.route('/').post(imgUploadProduct)

export default router