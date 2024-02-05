import express from "express"
import * as productController from "../controllers/productControllers.js"
const router = express.Router()

router.get('/', productController.getProducts)
router.get('/:id', productController.getProduct)
router.post('/', productController.createProduct)
router.delete('/:id', productController.deleteProduct)
router.patch('/:id', productController.updateProduct)

export default router;