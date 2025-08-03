$().ready(function () {
  $.validator.addMethod("validatePassword", function (value, element) {
    return this.optional(element) || /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/i.test(value);
  }, "Hãy nhập password từ 8 đến 16 ký tự bao gồm chữ hoa, chữ thường và ít nhất một chữ số");

  $.validator.addMethod("phoneVN", function (value, element) {
    return this.optional(element) || /^0\d{9}$/.test(value);
  }, "Số điện thoại phải bắt đầu bằng 0 và đủ 10 chữ số");

  $("#demoForm").validate({
    onfocusout: false,
    onkeyup: false,
    onclick: false,
    rules: {
      "user": {
        required: true,
        email: true,
        maxlength: 50
      },
      "password": {
        required: true,
        validatePassword: true,
        minlength: 8
      },
      "re-password": {
        equalTo: "#password",
        minlength: 8
      },
      "phone": {
        required: true,
        phoneVN: true
      }
    },
    messages: {
      "user": {
        required: "Bắt buộc nhập email",
        email: "Vui lòng nhập email đúng định dạng.",
        maxlength: "Tối đa 50 ký tự"
      },
      "password": {
        required: "Bắt buộc nhập password",
        minlength: "Ít nhất 8 ký tự"
      },
      "re-password": {
        equalTo: "Hai mật khẩu phải giống nhau",
        minlength: "Ít nhất 8 ký tự"
      },
      "phone": {
        required: "Không được bỏ trống",
      }
    },
    submitHandler: function (form) {
      alert("Đăng ký thành công!");
      form.reset();
      $('#formModal').modal('hide');
    }
  });
});
