import React, { useState } from "react";
import data from "./data";
import UserForm from "./components/UserForm";
import UserTable from "./components/UserTable";

function App() {
  const [users, setUsers] = useState(data);

  const handleAdd = (newUser) => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Danh sách người dùng</h2>
      <UserForm onAdd={handleAdd} />
      <UserTable users={users} />
    </div>
  );
}

export default App;
