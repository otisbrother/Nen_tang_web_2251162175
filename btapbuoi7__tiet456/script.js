// Biến global để theo dõi chế độ chỉnh sửa
let isEditing = false;
let editingRowIndex = -1;

$(document).ready(function() {
    // Chức năng 5: Xử lý form bằng jQuery với validation
    $('#studentForm').on('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            if (isEditing) {
                capNhatSinhVien();
            } else {
                themSinhVien();
            }
        }
    });

    // Chức năng 4: Event delegation for action buttons
    $('#bangSinhVien tbody').on('click', 'button', function(e) {
        const action = $(this).data('action');
        const row = $(this).closest('tr');
        
        if (action === 'delete') {
            xoaSinhVien(row);
        } else if (action === 'edit') {
            suaSinhVien(row);
        }
    });

    // Xử lý nút hủy sửa
    $('#btnCancel').on('click', function() {
        huyChinhSua();
    });
});

// Chức năng 5: Validation form bằng jQuery
function validateForm() {
    let isValid = true;
    const errors = [];

    // Clear previous errors
    $('.form-errors').remove();

    // Validate mã sinh viên
    const maSV = $('#studentId').val().trim();
    if (!maSV) {
        showFieldError('#studentId', 'Mã sinh viên không được để trống');
        isValid = false;
    } else if (!/^SV\d+$/.test(maSV)) {
        showFieldError('#studentId', 'Mã sinh viên phải có định dạng SVxxx (ví dụ: SV01)');
        isValid = false;
    }

    // Validate họ tên
    const hoTen = $('#fullName').val().trim();
    if (!hoTen) {
        showFieldError('#fullName', 'Họ tên không được để trống');
        isValid = false;
    } else if (hoTen.length < 2) {
        showFieldError('#fullName', 'Họ tên phải có ít nhất 2 ký tự');
        isValid = false;
    }

    // Validate email
    const email = $('#email').val().trim();
    if (!email) {
        showFieldError('#email', 'Email không được để trống');
        isValid = false;
    } else if (!isValidEmail(email)) {
        showFieldError('#email', 'Email không đúng định dạng');
        isValid = false;
    }

    // Validate giới tính
    const gioiTinh = $('#gender').val();
    if (!gioiTinh) {
        showFieldError('#gender', 'Vui lòng chọn giới tính');
        isValid = false;
    }

    // Validate ngày sinh
    const ngaySinh = $('#birthDate').val();
    if (!ngaySinh) {
        showFieldError('#birthDate', 'Ngày sinh không được để trống');
        isValid = false;
    } else {
        const birthDate = new Date(ngaySinh);
        const today = new Date();
        const age = today.getFullYear() - birthDate.getFullYear();
        if (age < 16 || age > 60) {
            showFieldError('#birthDate', 'Tuổi phải từ 16 đến 60');
            isValid = false;
        }
    }

    return isValid;
}

function showFieldError(fieldSelector, message) {
    const errorDiv = $('<div class="form-errors"></div>').text(message);
    $(fieldSelector).parent().append(errorDiv);
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Chức năng thêm sinh viên (đã có từ trước, cải thiện)
function themSinhVien() {
    // Lấy dữ liệu từ form
    const maSV = $('#studentId').val().trim();
    const hoTen = $('#fullName').val().trim();
    const email = $('#email').val().trim();
    const gioiTinh = $('#gender').val();
    const ngaySinh = $('#birthDate').val();
    const ghiChu = $('#notes').val().trim();

    // Kiểm tra trùng mã sinh viên (chỉ khi thêm mới)
    if (!isEditing && kiemTraTrungMaSV(maSV)) {
        showNotification('❌ Mã sinh viên đã tồn tại!', 'error');
        return;
    }

    // Tăng STT dựa trên số dòng hiện tại
    const table = $('#bangSinhVien tbody');
    const stt = table.find('tr').length + 1;

    // Thêm dòng mới vào bảng
    const newRow = `
        <tr>
            <td>${stt}</td>
            <td>${maSV}</td>
            <td>${hoTen}</td>
            <td>${email}</td>
            <td>${gioiTinh}</td>
            <td>${ngaySinh}</td>
            <td>${ghiChu}</td>
            <td>
                <button class="btn-edit" data-action="edit">✏️ Sửa</button>
                <button class="btn-delete" data-action="delete">🗑️ Xóa</button>
            </td>
        </tr>
    `;
    
    table.append(newRow);

    // Thông báo thành công
    showNotification('✅ Thêm sinh viên thành công!', 'success');

    // Reset form
    resetForm();
}

// Chức năng 6: Sửa sinh viên
function suaSinhVien(row) {
    isEditing = true;
    editingRowIndex = row.index();
    
    // Lấy dữ liệu từ dòng được chọn
    const cells = row.find('td');
    $('#studentId').val(cells.eq(1).text());
    $('#fullName').val(cells.eq(2).text());
    $('#email').val(cells.eq(3).text());
    $('#gender').val(cells.eq(4).text());
    $('#birthDate').val(cells.eq(5).text());
    $('#notes').val(cells.eq(6).text());
    
    // Thay đổi giao diện form
    $('#formTitle').text('Sửa thông tin sinh viên');
    $('#btnSubmit').html('💾 Cập nhật sinh viên');
    $('#btnCancel').show();
    
    // Scroll to form
    $('html, body').animate({
        scrollTop: $('#studentForm').offset().top - 100
    }, 500);
    
    showNotification('📝 Đang chỉnh sửa sinh viên. Vui lòng cập nhật thông tin.', 'warning');
}

function capNhatSinhVien() {
    // Lấy dữ liệu từ form
    const maSV = $('#studentId').val().trim();
    const hoTen = $('#fullName').val().trim();
    const email = $('#email').val().trim();
    const gioiTinh = $('#gender').val();
    const ngaySinh = $('#birthDate').val();
    const ghiChu = $('#notes').val().trim();

    // Tìm dòng đang sửa
    const row = $('#bangSinhVien tbody tr').eq(editingRowIndex);
    
    // Cập nhật dữ liệu
    row.find('td').eq(1).text(maSV);
    row.find('td').eq(2).text(hoTen);
    row.find('td').eq(3).text(email);
    row.find('td').eq(4).text(gioiTinh);
    row.find('td').eq(5).text(ngaySinh);
    row.find('td').eq(6).text(ghiChu);

    // Thông báo thành công
    showNotification('✅ Cập nhật sinh viên thành công!', 'success');

    // Reset form và trạng thái
    huyChinhSua();
}

function huyChinhSua() {
    isEditing = false;
    editingRowIndex = -1;
    
    // Khôi phục giao diện form
    $('#formTitle').text('Thêm sinh viên mới');
    $('#btnSubmit').html('➕ Thêm sinh viên');
    $('#btnCancel').hide();
    
    // Reset form
    resetForm();
    
    showNotification('❌ Đã hủy chỉnh sửa', 'warning');
}

// Chức năng 4: Xóa sinh viên với event delegation
function xoaSinhVien(row) {
    const tenSinhVien = row.find('td').eq(2).text();
    
    // Sử dụng confirm của jQuery UI hoặc browser
    if (confirm(`Bạn có chắc muốn xóa sinh viên "${tenSinhVien}"?`)) {
        row.remove();

        // Cập nhật lại STT
        capNhatSTT();

        showNotification('🗑️ Đã xóa sinh viên successfully!', 'warning');
    }
}

function capNhatSTT() {
    $('#bangSinhVien tbody tr').each(function(index) {
        $(this).find('td').eq(0).text(index + 1);
    });
}

function kiemTraTrungMaSV(maSV) {
    let trung = false;
    $('#bangSinhVien tbody tr').each(function() {
        if ($(this).find('td').eq(1).text() === maSV) {
            trung = true;
            return false; // break loop
        }
    });
    return trung;
}

function resetForm() {
    $('#studentForm')[0].reset();
    $('.form-errors').remove();
}

function showNotification(message, type) {
    const notification = $('#thongBao');
    notification.removeClass('success error warning');
    notification.addClass(type);
    notification.text(message);
    notification.fadeIn();
    
    setTimeout(function() {
        notification.fadeOut();
    }, 3000);
}
