import { Router } from "express";
import { ProductController } from "../controller/product.controller.js";

const router = Router();
const productController = new ProductController();

router.get('/:count/:asc/query', productController.getProducts);
router.get('/query', productController.getProducts);
router.get('/', productController.getProducts);
router.post('/', productController.createProducts);
router.put('/:pid', productController.updateProduct);
router.delete('/:pid', productController.deleteProduct);

export default router;