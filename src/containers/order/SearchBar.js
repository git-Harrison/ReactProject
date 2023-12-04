import React from 'react';
import FormSearchInput from "../../components/input/FormSearchInput";
import Button from "../../components/button/Button";

const SearchBar = (props) => {
    const {loading, search, handleSearch, fetchSearchResults, label, placeholder} = props;

    return (
        <form className="search_nav" onSubmit={(e) => {
            e.preventDefault();
            fetchSearchResults();
        }}>
            <FormSearchInput
                type="text"
                className="search_input"
                placeholder={placeholder}
                onChange={handleSearch}
                id="search"
                name="search"
                label={label}
            />
            <Button
                type="submit"
                className="fetch_btn"
                label="Search"
                onClick={fetchSearchResults}
                disabled={loading || !search}>
            </Button>
        </form>
    );
}

export default SearchBar;