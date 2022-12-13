import { getListMock } from "../mocks/index.js";
import { uuid } from "../utils/index.js";

class ListService {
  constructor() {
    this.list = getListMock();
  }

  getList(query) {
    const { text, page = 0, limit = 20 } = query;

    const isLastPage = +page === Math.floor(this.list.length / limit);

    let filteredList = [...this.list];
    if (text) {
      filteredList = filteredList.filter((element) => {
        return element.text.includes(text);
      });
    }

    filteredList = filteredList.splice(page * limit, limit);

    return { list: filteredList, isLastPage, totalElements: filteredList.length };
  }

  addOneElement(body) {
    if (!body.text) {
      throw new Error("Нечего добавлять");
    }
    const element = { id: uuid(), isSelected: false, text: body.text };
    this.list.push(element);
    return  element;

  }

  sortList(fromId, toId) {
    if (!fromId || !toId) {
      throw new Error("Не указан id для сортировки");
    }

    const fromIndex = this.list.indexOf(this.list.find(item => item.id === fromId));
    const toIndex = this.list.indexOf(this.list.find(item => item.id === toId));

    const movingElement = this.list.splice(fromIndex, 1)[0];

    this.list.splice(toIndex, 0, movingElement);

    return { success: true };
  }

  changeSelectionElement(id) {
    const element = this.list.find((element) => {
      return element.id === id;
    });

    if (!element) {
      throw new Error("Не найдем элемент с таким id");
    }
    
    element.isSelected = !element.isSelected;

    return { success: true };
  }
}

export default new ListService();
