import React from 'react';

export default function UserTable({ data }) {
  return (
    <table className="table table-bordered mt-4">
      <thead>
        <tr>
          <th>ID</th>
          <th>Khách hàng</th>
          <th>Nhân viên</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.customer}</td>
            <td>{item.employee}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
