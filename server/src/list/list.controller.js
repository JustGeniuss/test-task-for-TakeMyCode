import listService from "./list.service.js";

class ListController {
  constructor() {
    this.listService = listService;
  }
  getList(req, res, next) {
    try {
      const lists = this.listService.getList(req.query);

      return res.json(lists);
    } catch (e) {
      return res.status(404).json(e.message);
    }

  }

  sortList(req, res, next) {
    try {
      const { fromId, toId } = req.query;
      const result = this.listService.sortList(fromId, toId);

      return res.json(result);
    } catch (e) {
      return res.status(404).json(e.message);
    }
  }

  addOneElement(req, res, next) {
    try {
      const newElement = this.listService.addOneElement(req.body);
      
      return res.json(newElement);
    } catch (e) {
      return res.status(404).json(e.message);
    }
  }

  changeSelectionElement(req, res, next) {
    try {
      const id = req.query.id;
      const success = this.listService.changeSelectionElement(id);

      return res.json(success);
    } catch (e) {
      return res.status(404).json(e.message);
    }

  }

}
export default new ListController();
