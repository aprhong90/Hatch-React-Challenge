import "./SearchBar.css";

const SearchBar = ({ label, onChangeHandler }) => {
  return (
    <input
      className={`SearchBar_${label}`}
      type="text"
      placeholder={`Search by ${label}`}
      onChange={(e) => {
        onChangeHandler(e.target.value);
      }}
    />
  );
};

export default SearchBar;
