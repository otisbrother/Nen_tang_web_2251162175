import React, { useState } from 'react';

export default function UserForm({ onAdd }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errs = {};
    if (!form.name) errs.name = "Tên không được trống";
    if (!form.email) errs.email = "Email không được trống";
    else if (!/\S+@\S+\.\S+/.test(form.email)) errs.email = "Email không hợp lệ";
    if (!form.phone) errs.phone = "SĐT không được trống";
    else if (!/^0\d{9}$/.test(form.phone)) errs.phone = "SĐT phải bắt đầu bằng 0 và đủ 10 số";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onAdd(form);
    setForm({ name: '', email: '', phone: '' });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h4>Thêm người dùng mới</h4>
      <div className="mb-2">
        <label>Họ tên:</label>
        <input className="form-control" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}/>
        {errors.name && <small className="text-danger">{errors.name}</small>}
      </div>
      <div className="mb-2">
        <label>Email:</label>
        <input className="form-control" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })}/>
        {errors.email && <small className="text-danger">{errors.email}</small>}
      </div>
      <div className="mb-2">
        <label>SĐT:</label>
        <input className="form-control" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })}/>
        {errors.phone && <small className="text-danger">{errors.phone}</small>}
      </div>
      <button type="submit" className="btn btn-success">Thêm mới</button>
    </form>
  );
}
