import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { UsersState, User, FilterField } from "./types";

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk<User[]>(
  "https://jsonplaceholder.typicode.com/users",
  async () => {
    // Perform the fetch request
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    // Check if the response is okay
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    // Parse and return the JSON data
    const data = await response.json();

    return data as User[];
  }
);

const initialState: UsersState = {
  users: [],
  filteredUsers: [],
  filter: {
    name: "",
    username: "",
    email: "",
    phone: "",
  },
  status: "idle",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setFilter: (
      state,
      action: PayloadAction<{ field: FilterField; value: string }>
    ) => {
      state.filter[action.payload.field] = action.payload.value.toLowerCase();
      state.filteredUsers = state.users.filter((user) =>
        Object.keys(state.filter).every((key) =>
          user[key as keyof User]
            .toString()
            .toLowerCase()
            .includes(state.filter[key as FilterField])
        )
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.status = "idle";
        state.users = action.payload;
        state.filteredUsers = action.payload; // Initially, display all users
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setFilter } = usersSlice.actions;

export const selectUsers = (state: RootState) => state.users.filteredUsers;

export default usersSlice.reducer;
