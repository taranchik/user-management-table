import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../../users/usersSlice";
import UsersTable from "./index";
import { UsersState } from "../../users/types";

// Helper function to render with store and access it
const renderWithStore = () => {
  const store = configureStore({
    reducer: {
      users: usersReducer,
    },
  });

  // Render the component and return both the component and store
  return {
    ...render(
      <Provider store={store}>
        <UsersTable />
      </Provider>
    ),
    store, // Return the store for dispatching actions and accessing state
  };
};

describe("UsersTable Component", () => {
  test("renders table with users", async () => {
    const { store } = renderWithStore();
    let users: UsersState["users"] = [];

    // Wait for the users to be populated in the state
    await waitFor(() => {
      const state = store.getState();
      users = state.users.users;

      expect(users).not.toHaveLength(0); // Ensure the array is not empty
    });

    // Use waitFor to wait for the expected elements to appear
    await waitFor(() => {
      // Iterate over the expected names and check if each one is in the document
      users.forEach(({ name }) => {
        expect(screen.getByText(name)).toBeInTheDocument();
      });
    });
  });

  test("renders filtered users", async () => {
    const { store } = renderWithStore();
    let users: UsersState["users"] = [];

    // Wait for the users to be populated in the state
    await waitFor(() => {
      const state = store.getState();
      users = state.users.users;

      expect(users).not.toHaveLength(0); // Ensure the array is not empty
    });

    const firstUserName = users[0]["name"];

    const nameFilterInputElement =
      screen.getByPlaceholderText("Filter by name");

    fireEvent.change(nameFilterInputElement!, {
      target: { value: firstUserName },
    });

    expect(screen.getByText(firstUserName)).toBeInTheDocument();
    expect(screen.getByText(firstUserName).tagName).toBe("TD");
  });

  test("renders empty state message when no users match the filter", async () => {
    const { store } = renderWithStore();
    let users: UsersState["users"] = [];

    // Wait for the users to be populated in the state
    await waitFor(() => {
      const state = store.getState();
      users = state.users.users;

      expect(users).not.toHaveLength(0); // Ensure the array is not empty
    });

    const filterValue = "abcd";
    const emptyMessage = "No users found.";

    const nameFilterInputElement =
      screen.getByPlaceholderText("Filter by name");

    fireEvent.change(nameFilterInputElement!, {
      target: { value: filterValue },
    });

    expect(screen.getByText(emptyMessage)).toBeInTheDocument();
    expect(screen.getByText(emptyMessage).tagName).toBe("TD");
  });
});
