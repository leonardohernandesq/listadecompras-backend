import { Router, Request, Response } from "express";
import userRoutes from "../routes/UserRoutes";
import ShoppingItemRoutes from "./ShoppingItemRoutes";
import ShoppingListRoutes from "./ShoppingListRoutes";
import CategoryRoutes from "./CategoryRoutes";

const router = Router();

router.use("/api/users", userRoutes);
router.use("/api/item", ShoppingItemRoutes);
router.use("/api/list", ShoppingListRoutes);
router.use("/api/category", CategoryRoutes);

router.get("/", (req: Request, res: Response) => {
    res.send("API Working");
});

export default router;
