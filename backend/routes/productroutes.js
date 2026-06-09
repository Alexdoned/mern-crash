import { getProducts, postProduct, updateProduct, deleteProduct } from "../controllers/productcontroller.js";
import  express from "express";

const router = express.Router();

router.get("/", getProducts);

router.post("/", postProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);


export default router;
