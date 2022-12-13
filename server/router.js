import listRouter from "./src/list/list.router.js";
import searchRouter from "./src/search/search.router.js";



export default function routes(app) {
    app.use("/list", listRouter);
    app.use("/search", searchRouter);
}