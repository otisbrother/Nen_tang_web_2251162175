function themSinhVien() {
  // Lấy dữ liệu từ form
  const maSV = document.getElementById("studentId").value.trim();
  const hoTen = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const gioiTinh = document.getElementById("gender").value;
  const ngaySinh = document.getElementById("birthDate").value;
  const ghiChu = document.getElementById("notes").value.trim();
  const thongBao = document.getElementById("thongBao");

  // Kiểm tra dữ liệu
  if (!maSV || !hoTen || !email || !gioiTinh || !ngaySinh) {
    thongBao.style.color = "red";
    thongBao.innerText = "❌ Vui lòng điền đầy đủ thông tin!";
    setTimeout(() => thongBao.innerText = "", 3000);
    return;
  }

  // Tăng STT dựa trên số dòng hiện tại
  const table = document.getElementById("bangSinhVien").getElementsByTagName("tbody")[0];
  const stt = table.rows.length + 1;

  // Thêm dòng mới vào bảng
  const newRow = table.insertRow();
  newRow.insertCell(0).innerText = stt;
  newRow.insertCell(1).innerText = maSV;
  newRow.insertCell(2).innerText = hoTen;
  newRow.insertCell(3).innerText = email;
  newRow.insertCell(4).innerText = gioiTinh;
  newRow.insertCell(5).innerText = ngaySinh;
  newRow.insertCell(6).innerText = ghiChu;
  newRow.insertCell(7).innerHTML = `<button class="btn-delete" onclick="xoaDong(this)">Xóa</button>`;

  // Thông báo thành công
  thongBao.style.color = "green";
  thongBao.innerText = "✅ Thêm sinh viên thành công!";
  setTimeout(() => thongBao.innerText = "", 3000);

  // Reset form
  document.getElementById("studentForm").reset();
}

// Hàm xoá dòng
function xoaDong(button) {
  if (confirm("Bạn có chắc muốn xoá sinh viên này?")) {
    const row = button.parentElement.parentElement;
    row.remove();

    // Cập nhật lại STT
    const table = document.getElementById("bangSinhVien").getElementsByTagName("tbody")[0];
    for (let i = 0; i < table.rows.length; i++) {
      table.rows[i].cells[0].innerText = i + 1;
    }

    const thongBao = document.getElementById("thongBao");
    thongBao.style.color = "orange";
    thongBao.innerText = "🗑️ Đã xoá sinh viên.";
    setTimeout(() => thongBao.innerText = "", 3000);
  }
}
