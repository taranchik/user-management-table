import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsers, selectUsers, setFilter } from "../../users/usersSlice";
import { RootState, AppDispatch } from "../../../app/store";
import FilterInput from "../FilterInput";
import { FilterField } from "../../users/types";
import "./style.scss";

const UsersTable: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector(selectUsers);
  const status = useSelector((state: RootState) => state.users.status);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleFilterChange = (field: FilterField, value: string) => {
    dispatch(setFilter({ field, value }));
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error loading users.</div>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>
              Name
              <FilterInput
                placeholder="Filter by name"
                onChange={(value) => handleFilterChange("name", value)}
              />
            </th>
            <th>
              Username
              <FilterInput
                placeholder="Filter by username"
                onChange={(value) => handleFilterChange("username", value)}
              />
            </th>
            <th>
              Email
              <FilterInput
                placeholder="Filter by email"
                onChange={(value) => handleFilterChange("email", value)}
              />
            </th>
            <th>
              Phone
              <FilterInput
                placeholder="Filter by phone"
                onChange={(value) => handleFilterChange("phone", value)}
              />
            </th>
          </tr>
        </thead>
        <tbody>
          {users && users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
              </tr>
            ))
          ) : (
            <tr className="no-users-cell">
              <td>No users found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTable;
