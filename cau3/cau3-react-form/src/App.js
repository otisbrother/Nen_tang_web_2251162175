import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initialUsers } from './data';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';

function App() {
  const [users, setUsers] = useState(initialUsers);

  const handleAdd = (newUser) => {
    const nextId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    setUsers([...users, { id: nextId, ...newUser }]);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Danh sách người dùng</h2>
      <UserForm onAdd={handleAdd} />
      <UserTable users={users} />
    </div>
  );
}

export default App;
