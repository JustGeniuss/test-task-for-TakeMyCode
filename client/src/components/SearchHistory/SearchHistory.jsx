export const SearchHistory = ({ searchHistory, onSearchHistoryClick }) => {
  return (
    <div className="search-history">
      {searchHistory.map((search) => (
        <button
          key={search.id}
          onClick={() => {
            onSearchHistoryClick(search.text);
          }}
        >
          {search.text}
        </button>
      ))}
    </div>
  );
};
