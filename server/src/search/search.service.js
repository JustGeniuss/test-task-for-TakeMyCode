class SearchService {
  constructor() {
    this.searchHistory = [];
    this.id = 1;
  }

  addNewSearch(text) {
    const lastSearch = { id: this.id, text };

    if (!text) {
      return { success: false };
    }

    if (this.searchHistory.length > 0) {
      const notUnique = this.searchHistory.find((search) => {
        return text === search.text;
      });
      if (notUnique) {
        return { success: false };
      }
    }

    this.id += 1;
    this.searchHistory.push(lastSearch);
    
    return { success: true, id: lastSearch.id };
  }

  listSearchHistory() {
    return this.searchHistory;
  }
}

export default new SearchService();
