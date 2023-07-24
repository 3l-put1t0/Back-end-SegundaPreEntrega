import { Router } from "express";
import { ViewController } from "../controller/view.controller.js";

const router = Router();
const viewController = new ViewController();


router.get('/products', viewController.getProducts);
router.get('/carts/:cid', viewController.getCart);

export default router;