$(document).ready(function () {
  function renderTable() {
    $("#userTable tbody").empty();
    data.forEach((user, i) => {
      $("#userTable tbody").append(`
        <tr>
          <td>${i + 1}</td>
          <td>${user.ho}</td>
          <td>${user.ten}</td>
          <td>${user.diachi}</td>
        </tr>
      `);
    });
  }

  renderTable();

  $("#userForm").on("submit", function (e) {
    e.preventDefault();
    let ho = $("#ho").val().trim();
    let ten = $("#ten").val().trim();
    let diachi = $("#diachi").val().trim();

    let isValid = true;
    $("#errHo, #errTen, #errDiachi").text("");

    if (!ho) {
      $("#errHo").text("Họ không được để trống");
      isValid = false;
    } else if (ho.length > 20) {
      $("#errHo").text("Họ không vượt quá 20 ký tự");
      isValid = false;
    }

    if (!ten) {
      $("#errTen").text("Tên không được để trống");
      isValid = false;
    } else if (ten.length > 15) {
      $("#errTen").text("Tên không vượt quá 15 ký tự");
      isValid = false;
    }

    if (!diachi) {
      $("#errDiachi").text("Địa chỉ không được để trống");
      isValid = false;
    } else if (diachi.length > 50) {
      $("#errDiachi").text("Địa chỉ không vượt quá 50 ký tự");
      isValid = false;
    }

    if (isValid) {
      data.push({ ho, ten, diachi });
      renderTable();
      $("#userForm")[0].reset();
      const modal = bootstrap.Modal.getInstance($("#userModal")[0]);
      modal.hide();
    }
  });
});
