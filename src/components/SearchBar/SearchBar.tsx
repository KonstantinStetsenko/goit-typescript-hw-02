import React from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";

interface SearchBarProps {
  onSearch: (search: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const form = evt.target as HTMLFormElement;
    const searchInput = form.elements.namedItem("search") as HTMLInputElement;

    const search = searchInput.value;

    if (search.trim() === "") {
      toast.success("Поле не заполненно");
      return;
    }

    onSearch(search);
    form.reset();
  };

  return (
    <header className={css.headerSearch}>
      <form onSubmit={handleSubmit}>
        <input
          className={css.inputSerch}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          name="search"
        />
        <button className={css.buttonSearch} type="submit">
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
