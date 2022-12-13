import "./App.css";
import { useEffect, useState, useRef, useCallback } from "react";

import {
  addOneSearch,
  getSearchHistory,
  changeSelectionList,
} from "./api/index.js";
import { ListItem } from "./components/ListItem";
import { Search } from "./components/Search";
import { SearchHistory } from "./components/SearchHistory";
import useSearchList from "./hooks/hooks"

const PAGE_SIZE = 20;

function App() {
  const [searchString, setSearchString] = useState("");
  const [realSearchString, setRealSearchString] = useState(searchString)

  const [searchHistory, setSearchHistory] = useState([]);
  const [dragedItem, setDragedItem] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const { isLoading, error, list, hasMore, setList } = useSearchList(pageNum, PAGE_SIZE, realSearchString);


  useEffect(() => {

    getSearchHistory().then((res) => {
      setSearchHistory(res.data);
    });
  }, []);

  const onSearch = () => {
    setPageNum(0);
    setRealSearchString(searchString);
    addOneSearch(searchString).then((res) => {
      const { success, id } = res.data;
      if (success) {
        setSearchHistory((prevValue) => {
          return [...prevValue, { id, text: searchString }];
        });
      }
    });
  };

  const onSearchHistoryClick = (text) => {
    setPageNum(0)
    setRealSearchString(text);
    setSearchString(text);


  };

  const onItemSelect = (id) => {
    changeSelectionList(id).then((res) => {
      const { success } = res.data;
      if (success) {
        setList((prevValue) => {
          return prevValue.map((item) =>
            item.id === id ? { ...item, isSelected: !item.isSelected } : item
          );
        });
      }
    });
  };

  const observer = useRef();
  const lastListElementRef = useCallback(
    (node) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore]
  );



  return (
    <div className="App">
      <div>
        <Search
          value={searchString}
          setPageNum={setPageNum}
          setRealSearchString={setRealSearchString}
          onSearch={onSearch}
          setSearchString={setSearchString}
        />
      </div>
      <SearchHistory
        searchHistory={searchHistory}
        onSearchHistoryClick={onSearchHistoryClick}
      />
      <div className="items-container">
        {list.map((item, i) => {
          return <ListItem
            callbackRef={list.length === i + 1 ? lastListElementRef : null}
            setList={setList}
            dragedItem={dragedItem}
            setDragedItem={setDragedItem}
            onItemSelect={onItemSelect}
            item={item}
            key={item.id}
          />
        })}
      </div>
    </div>
  );
}

export default App;
