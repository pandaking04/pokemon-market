import React, { useState } from "react";
import "../css/SearchBar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

interface SearchBarProps {
  onSearch: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");

  return (
    <div className="search-container">
      <div className="input-container">
        <FontAwesomeIcon icon={faSearch} />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by Name"
          className="input-style"
          onBlur={() => onSearch(searchTerm)}
        />
      </div>
    </div>
  );
};

export default SearchBar;
