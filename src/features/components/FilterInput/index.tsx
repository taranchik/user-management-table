import React from "react";
import { FilterInputProps } from "./types";
import "./style.scss";

const FilterInput: React.FC<FilterInputProps> = ({ placeholder, onChange }) => {
  return (
    <input
      className="filter-input"
      type="text"
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default FilterInput;
