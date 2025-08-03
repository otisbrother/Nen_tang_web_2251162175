import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { initialData } from './data';
import UserForm from './components/UserForm';
import UserTable from './components/UserTable';

function App() {
  const [data, setData] = useState(initialData);

  const handleAdd = (newItem) => {
    const nextId = data.length ? Math.max(...data.map(d => d.id)) + 1 : 1;
    setData([...data, { id: nextId, ...newItem }]);
  };

  return (
    <div className="container mt-5">
      <h2>Danh sách khách hàng & nhân viên</h2>
      <UserForm onAdd={handleAdd} />
      <UserTable data={data} />
    </div>
  );
}

export default App;
