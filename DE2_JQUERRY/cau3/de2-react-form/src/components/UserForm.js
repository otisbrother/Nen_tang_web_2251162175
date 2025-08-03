import React, { useState } from 'react';

export default function UserForm({ onAdd }) {
  const [form, setForm] = useState({ customer: '', employee: '' });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let errs = {};
    if (!form.customer) errs.customer = "Không được để trống tên khách hàng";
    else if (form.customer.length > 30) errs.customer = "Tên khách hàng không quá 30 ký tự";

    if (!form.employee) errs.employee = "Không được để trống tên nhân viên";
    else if (form.employee.length > 30) errs.employee = "Tên nhân viên không quá 30 ký tự";

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onAdd(form);
    setForm({ customer: '', employee: '' });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <h4>Thêm dữ liệu mới</h4>
      <div className="mb-2">
        <label>Khách hàng:</label>
        <input className="form-control" value={form.customer}
          onChange={e => setForm({ ...form, customer: e.target.value })} />
        {errors.customer && <small className="text-danger">{errors.customer}</small>}
      </div>
      <div className="mb-2">
        <label>Nhân viên:</label>
        <input className="form-control" value={form.employee}
          onChange={e => setForm({ ...form, employee: e.target.value })} />
        {errors.employee && <small className="text-danger">{errors.employee}</small>}
      </div>
      <button type="submit" className="btn btn-success">Thêm mới</button>
    </form>
  );
}
