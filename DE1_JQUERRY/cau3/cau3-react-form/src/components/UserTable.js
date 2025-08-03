import React from 'react';

export default function UserTable({ users }) {
  return (
    <table className="table table-bordered mt-4">
      <thead>
        <tr>
          <th>ID</th><th>Họ tên</th><th>Email</th><th>SĐT</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u) => (
          <tr key={u.id}>
            <td>{u.id}</td>
            <td>{u.name}</td>
            <td>{u.email}</td>
            <td>{u.phone}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
