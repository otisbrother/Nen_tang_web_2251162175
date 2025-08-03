import React, { useState } from "react";

function UserForm({ onAdd }) {
  const [form, setForm] = useState({ ho: "", ten: "", diachi: "" });
  const [errors, setErrors] = useState({});

  const validate = () => {
    const errs = {};
    if (!form.ho.trim()) errs.ho = "Họ không được để trống";
    else if (form.ho.length > 20) errs.ho = "Họ không quá 20 ký tự";
    if (!form.ten.trim()) errs.ten = "Tên không được để trống";
    else if (form.ten.length > 15) errs.ten = "Tên không quá 15 ký tự";
    if (!form.diachi.trim()) errs.diachi = "Địa chỉ không được để trống";
    else if (form.diachi.length > 50) errs.diachi = "Địa chỉ không quá 50 ký tự";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length === 0) {
      onAdd(form);
      setForm({ ho: "", ten: "", diachi: "" });
      setErrors({});
    } else {
      setErrors(errs);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-3">
      <input
        className="form-control mb-2"
        placeholder="Họ"
        value={form.ho}
        onChange={(e) => setForm({ ...form, ho: e.target.value })}
      />
      {errors.ho && <div className="text-danger">{errors.ho}</div>}
      <input
        className="form-control mb-2"
        placeholder="Tên"
        value={form.ten}
        onChange={(e) => setForm({ ...form, ten: e.target.value })}
      />
      {errors.ten && <div className="text-danger">{errors.ten}</div>}
      <input
        className="form-control mb-2"
        placeholder="Địa chỉ"
        value={form.diachi}
        onChange={(e) => setForm({ ...form, diachi: e.target.value })}
      />
      {errors.diachi && <div className="text-danger">{errors.diachi}</div>}
      <button className="btn btn-primary mt-2">Thêm</button>
    </form>
  );
}

export default UserForm;
