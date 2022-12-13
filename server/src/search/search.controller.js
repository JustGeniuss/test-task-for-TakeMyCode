import searchService from "./search.service.js";

class SearchController {
  constructor() {
    this.searchService = searchService;
  }

  getSearchHistory(req, res, next) {
    try {
      const searchHistory = this.searchService.listSearchHistory();
      return res.json(searchHistory);
    } catch (e) {
      return res.status(404).json(e.message);
    }

  }


  addNewSearch(req, res, next) {
    try {
      const result = this.searchService.addNewSearch(req.query.text);
      return res.json(result);
    } catch (e) {
      return res.status(404).json(e.message);
    }

  }




}
export default new SearchController();
