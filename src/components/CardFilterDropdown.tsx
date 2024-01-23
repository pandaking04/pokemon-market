import React, { useState, useEffect } from "react";
import '../css/CardFilterDropdown.css'


interface CardFilterDropdownProps {
  filterType: "Set" | "Rarity" | "Type";
  onFilterChange: (selectedFilter: string) => void;
}

const CardFilterDropdown: React.FC<CardFilterDropdownProps> = ({
  filterType,
  onFilterChange,
}) => {
  const [options, setOptions] = useState<string[]>([]);
  const [selectedFilter, setSelectedFilter] = useState("");

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        let apiUrl = "";
        if (filterType === "Set") {
          apiUrl = "https://api.pokemontcg.io/v2/sets";
        } else if (filterType === "Rarity") {
          apiUrl = "https://api.pokemontcg.io/v2/rarities";
        } else if (filterType === "Type") {
          apiUrl = `https://api.pokemontcg.io/v2/types`;
        }
  
        const response = await fetch(apiUrl);
        const data = await response.json();
        let filterOptions: any[] = [];
  
        if (filterType === "Set") {
          filterOptions = data.data || [];
          setOptions(filterOptions.map((item) => item.name));
        } else {
          filterOptions = data.data || [];
          setOptions(filterOptions);
        }
      } catch (error) {
        console.error(`Error fetching ${filterType}s:`, error);
      }
    };
  
    fetchOptions();
  }, [filterType]);

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectedFilter(selectedValue);
    const uiValue = filterType === "Set" ? options.find((option) => option === selectedValue) || "" : selectedValue;
    onFilterChange(uiValue);
  };

  return (
    <div className="dropdown">
      <select
        id={filterType}
        value={selectedFilter}
        onChange={handleFilterChange}
        className="select-style"
      >
        <option value="">{filterType}</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CardFilterDropdown;
