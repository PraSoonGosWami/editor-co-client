import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import classes from "./styles.module.css";

const SearchInput = ({ onChange, value, ...otherProps }) => {
  return (
    <section className={classes.search}>
      <div className={classes.searchIcon}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search documents"
        inputProps={{ "aria-label": "search" }}
        style={{ width: "100%" }}
        onChange={onChange}
        {...otherProps}
      />
    </section>
  );
};

export default SearchInput;
