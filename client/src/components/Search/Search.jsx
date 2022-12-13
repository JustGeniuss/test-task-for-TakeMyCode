export const Search = ({
  value,
  onSearch,
  setSearchString
}) => {
  return (
    <>
      <input
        type="text"
        placeholder="Поиск"
        value={value}
        onChange={(e) => {
          setSearchString(e.target.value);
        }}
      />
      <button onClick={onSearch}>Искать</button>
    </>
  );
};
