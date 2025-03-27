import React from "react";
import { useDispatch } from "react-redux";
import { changeFilter } from "../../redux/filtersSlice";
import css from "./SearchBox.module.css";

const SearchBox = () => {
  const dispatch = useDispatch();

  const handleSearchChange = (e) => {
    dispatch(changeFilter(e.target.value));
  };

  return (
    <div className={css.containerSearchBox}>
      <p className={css.label}>Find contacts by name</p>
      <input
        className={css.field}
        name="filter"
        type="text"
        onChange={handleSearchChange}
        placeholder="Search contacts"
      />
    </div>
  );
};
export default SearchBox;
