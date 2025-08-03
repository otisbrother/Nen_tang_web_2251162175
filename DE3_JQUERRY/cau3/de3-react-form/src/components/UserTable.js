import React from "react";

function UserTable({ users }) {
  return (
    <table className="table table-bordered">
      <thead>
        <tr>
          <th>STT</th>
          <th>Họ</th>
          <th>Tên</th>
          <th>Địa chỉ</th>
        </tr>
      </thead>
      <tbody>
        {users.map((u, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{u.ho}</td>
            <td>{u.ten}</td>
            <td>{u.diachi}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default UserTable;
