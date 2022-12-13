import { Router } from "express";
import ListController from "./list.controller.js";
const router = new Router();

router.get("/getList", ListController.getList.bind(ListController));
router.post("/addOne", ListController.addOneElement.bind(ListController));
router.get("/sortList", ListController.sortList.bind(ListController));
router.put("/changeSelectedElement", ListController.changeSelectionElement.bind(ListController));

export default router;
