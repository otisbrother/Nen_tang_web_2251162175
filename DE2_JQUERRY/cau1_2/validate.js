$().ready(function () {
  $("#dataForm").validate({
    rules: {
      customer: {
        required: true,
        maxlength: 30
      },
      employee: {
        required: true,
        maxlength: 30
      }
    },
    messages: {
      customer: {
        required: "Không được để trống tên khách hàng",
        maxlength: "Tên khách hàng không quá 30 ký tự"
      },
      employee: {
        required: "Không được để trống tên nhân viên",
        maxlength: "Tên nhân viên không quá 30 ký tự"
      }
    },
    submitHandler: function (form) {
      alert("Lưu dữ liệu thành công (giả lập)");
      form.reset();
      $('#formModal').modal('hide');
    }
  });
});
