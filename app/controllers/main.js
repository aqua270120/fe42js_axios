var nguoiDung = new NguoiDungService();

function layDanhSach() {
    nguoiDung
        .layDanhSachNguoiDung()
        .then(function (result) {
            renderTable(result.data);
        })
        .catch(function (error) {
            console.log(error);
        });
    // renderTable();
    // phải để hàm render table trong then là do
    // javascript bất đồng bộ. Nó không chạy code từ trên xuống dưới
    // mà sẽ chạy những gì chạy được và chạy nhanh trước.Khi sử dụng axios,
    // yêu cầu phải có mạng thì sẽ chậm hơn nên nếu để render table ở ngoài thì nó sẽ chạy
    // renderTable lúc này đang là rỗng trước
}

function renderTable(mang) {
    var tbody = getEle("tblDanhSachNguoiDung");
    var contentHTML = "";
    mang.forEach(function (item, index) {
        contentHTML += `
            <tr>
                <td>${index + 1}</td>
                <td>${item.taiKhoan}</td>
                <td>${item.matKhau}</td>
                <td>${item.hoTen}</td>
                <td>${item.email}</td>
                <td>${item.soDT}</td>
                <td>${item.maLoaiNguoiDung}</td>
                <td>
                    <button id="btnSuaNguoiDung" class="btn btn-info" onclick="editUser(${item.id})" data-toggle="modal" data-target="#myModal">Sua</button>
                    <button class="btn btn-danger" onclick="delUser(${item.id})">Xoa</button>
                </td>
            </tr>
        `;
    });
    tbody.innerHTML = contentHTML;
};

getEle("btnThemNguoiDung").addEventListener("click", function () {
    var footer = "<button class='btn btn-success' onclick='addUser()' data-dismiss='modal'>Add User</button>";
    document.getElementsByClassName("modal-title")[0].innerHTML = "Add User";
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
});

function addUser() {
    getEle("Taikhoan").removeAttribute("disabled");
    var inputTK = getEle("TaiKhoan").value;
    var inputHoTen = getEle("HoTen").value;
    var inputMK = getEle("MatKhau").value;
    var inputEmail = getEle("Email").value;
    var inputSDT = getEle("SoDienThoai").value;
    var inputNguoiDung = getEle("loaiNguoiDung").value;
    var user = new NguoiDung(inputTK, inputHoTen, inputMK, inputEmail, inputSDT, inputNguoiDung);
    nguoiDung

        .themNguoiDung(user)
        .then(function (result) {
            layDanhSach();
            reset();
        })
        .catch(function (err) {
            console.log(err);
        })

}

function delUser(id) {
    nguoiDung
        .xoaNguoiDung(id)
        .then(function (result) {
            console.log(result);
            layDanhSach();
        })
        .catch(function (error) {
            console.log(error);
        });
}

function editUser(id) {
    var footer = `<button class='btn btn-success' onclick='updateUser(${id})' data-dismiss='modal'>Update User</button>`;
    document.getElementsByClassName("modal-title")[0].innerHTML = "Update User";
    document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
    nguoiDung
        .layTTNguoiDung(id)
        .then(function (result) {
            getEle("TaiKhoan").value = result.data.taiKhoan;
            getEle("TaiKhoan").setAttribute("disabled", true);
            getEle("HoTen").value = result.data.hoTen;
            getEle("MatKhau").value = result.data.matKhau;
            getEle("Email").value = result.data.email;
            getEle("SoDienThoai").value = result.data.soDT;
            getEle("loaiNguoiDung").value = result.data.maLoaiNguoiDung;
            console.log(result.data);
        })
        .catch(function (error) {
            console.log(error);
        })
}

function updateUser(id) {
    var inputTK = getEle("TaiKhoan").value;
    var inputHoTen = getEle("HoTen").value;
    var inputMK = getEle("MatKhau").value;
    var inputEmail = getEle("Email").value;
    var inputSDT = getEle("SoDienThoai").value;
    var inputNguoiDung = getEle("loaiNguoiDung").value;
    var user = new NguoiDung(inputTK, inputHoTen, inputMK, inputEmail, inputSDT, inputNguoiDung);
    nguoiDung.capNhatNguoiDung(id, user)
        .then(function (result) {
            layDanhSach();
            reset();
        })
        .catch(function (error) {
            console.log(error);
        })
}

function reset() {
    getEle("TaiKhoan").value = "";
    getEle("HoTen").value = "";
    getEle("MatKhau").value = "";
    getEle("Email").value = "";
    getEle("SoDienThoai").value = "";
    getEle("loaiNguoiDung").getElementsByTagName("option")[0].selected = "selected";
}
function getEle(id) {
    return document.getElementById(id);
}

layDanhSach();
