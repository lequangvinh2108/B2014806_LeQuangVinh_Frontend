import createApiClient from "./api.service";

class UsersService {
  constructor(baseUrl = "/api/users") {
    this.api = createApiClient(baseUrl);
  }

  // Tạo người dùng mới
  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  // Lấy tất cả người dùng
  async findAll() {
    return (await this.api.get("/")).data;
  }

  // Lấy thông tin một người dùng theo ID
  async findOne(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  // Cập nhật thông tin người dùng theo ID
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  // Xóa một người dùng theo ID
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  // Xóa tất cả người dùng
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }

  // 🔥 Hàm đăng nhập (Gửi request tới API `/login`) 🔥
  async login(user, password) {
    return (await this.api.post("/login", { user, password })).data;
  }

  // 🔥 Lấy danh sách tất cả người dùng 🔥
  async getAll() {
    return (await this.api.get("/getall")).data;
  }

  // 🔥 Lấy thông tin một người dùng theo tên đăng nhập 🔥
  async getUser(user) {
    return (await this.api.get(`/getuser/${user}`)).data;
  }

  // 🔥 Cập nhật thông tin người dùng theo tên đăng nhập 🔥
  async updateUser(user, data) {
    return (await this.api.put(`/updateuser/${user}`, data)).data;
  }

  // Lấy thông tin người dùng theo ID
  async getById(id) {
    return (await this.api.get(`/getbyid/${id}`)).data;
  }

  async updateAuthority(name, data) {
    return (
      await this.api.put(`/updateauthority/${encodeURIComponent(name)}`, data)
    ).data;
  }

  // 🔒 Cập nhật mật khẩu người dùng theo ID
  async updatePassword(id, password) {
    return (await this.api.put(`/updatepassword/${id}`, { password })).data;
  }

  // 🔁 Import nhiều người dùng từ Excel
  async createMany(dataArray) {
    return (await this.api.post("/createmany", dataArray)).data;
  }
}

export default new UsersService();
