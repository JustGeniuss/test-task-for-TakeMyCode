import { Router } from "express";
import SearchController from "./search.controller.js";
const router = new Router();

router.get("/getSearchHistory", SearchController.getSearchHistory.bind(SearchController));
router.post("/addOneSearch", SearchController.addNewSearch.bind(SearchController))

export default router;