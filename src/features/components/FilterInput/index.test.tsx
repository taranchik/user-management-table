import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilterInput from "./index";
import { filterInputMockData } from "./mock";

describe("FilterInput Component", () => {
  test("renders with the correct placeholder", () => {
    render(<FilterInput {...filterInputMockData} />);

    const inputElement = screen.getByPlaceholderText(
      filterInputMockData.placeholder
    );

    expect(inputElement).toBeInTheDocument();
  });

  test("renders with the correct initial value", () => {
    const initialValue = "Jane Doe";

    render(<FilterInput {...filterInputMockData} />);

    const inputElement = screen.getByPlaceholderText(
      filterInputMockData.placeholder
    );

    fireEvent.change(inputElement!, { target: { value: initialValue } });

    const changedInputElement = screen.getByDisplayValue(initialValue);

    expect(changedInputElement).toBeInTheDocument();
  });

  test("calls onChange handler when value changes", () => {
    const newValue = "Jane Doe";
    const onChange = jest.fn();

    render(<FilterInput {...filterInputMockData} onChange={onChange} />);

    const inputElement = screen.getByPlaceholderText(
      filterInputMockData.placeholder
    );

    fireEvent.change(inputElement!, { target: { value: newValue } });

    expect(onChange).toHaveBeenCalledWith(newValue);
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
