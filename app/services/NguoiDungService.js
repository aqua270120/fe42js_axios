function NguoiDungService() {
    this.layDanhSachNguoiDung = function () {
        // AXIOS giúp kết nối backend với front end và lấy dữ liệu trong databse từ backend
        // thông qua API(1 đường link)
        return axios({
            url: "https://5eea03d6b13d0a00164e408f.mockapi.io/api/NguoiDung",
            method: "GET"
        });
    };
    this.themNguoiDung = function (user) {
        return axios({
            url: "https://5eea03d6b13d0a00164e408f.mockapi.io/api/NguoiDung",
            method: "POST",
            data: user
        });
    };

    this.xoaNguoiDung = function (id) {
        return axios({
            url: `https://5eea03d6b13d0a00164e408f.mockapi.io/api/NguoiDung/${id} `,
            method: "DELETE"
        })
    };

    this.layTTNguoiDung = function (id) {
        return axios({
            url: `https://5eea03d6b13d0a00164e408f.mockapi.io/api/NguoiDung/${id} `,
            method: "GET"
        });
    }

    this.capNhatNguoiDung = function (id, user) {
        return axios({
            url: `https://5eea03d6b13d0a00164e408f.mockapi.io/api/NguoiDung/${id} `,
            method: "PUT",
            data: user
        });
    };

};