import React from "react";
import UsersTable from "./features/components/UsersTable";

const App: React.FC = () => {
  return (
    <div className="App">
      <h1>User Management</h1>
      <UsersTable />
    </div>
  );
};

export default App;
