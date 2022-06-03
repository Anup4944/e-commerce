import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Search.css";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    setKeyword(e.target.value);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else {
      navigate("/products");
    }
  };
  return (
    <Fragment>
      <form className="searchBox" onSubmit={handleOnSubmit}>
        <input
          type="text"
          placeholder="Search products here...."
          onChange={handleOnChange}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
