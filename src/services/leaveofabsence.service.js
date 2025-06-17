import createApiClient from "./api.service";

class LeaveOfAbsenceService {
  constructor(baseUrl = "/api/leaveofabsence") {
    this.api = createApiClient(baseUrl);
  }

  // Tạo đơn xin nghỉ mới
  async create(data) {
    return (await this.api.post("/", data)).data;
  }

  // Lấy tất cả đơn xin nghỉ
  async findAll() {
    return (await this.api.get("/")).data;
  }

  // Lấy thông tin một đơn xin nghỉ theo ID
  async findOne(id) {
    return (await this.api.get(`/${id}`)).data;
  }

  // Cập nhật đơn xin nghỉ theo ID
  async update(id, data) {
    return (await this.api.put(`/${id}`, data)).data;
  }

  // Xóa một đơn xin nghỉ theo ID
  async delete(id) {
    return (await this.api.delete(`/${id}`)).data;
  }

  // Xóa tất cả đơn xin nghỉ
  async deleteAll() {
    return (await this.api.delete("/")).data;
  }

  async getAll() {
    return (await this.api.get("/getall")).data;
  }

  // Lấy thông tin người dùng theo ID
  async getById(id) {
    return (await this.api.get(`/getbyid/${id}`)).data;
  }
}

export default new LeaveOfAbsenceService();
