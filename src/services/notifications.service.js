import createApiClient from "./api.service";

class NotificationsService {
    constructor(baseUrl = "/api/notifications") {
        this.api = createApiClient(baseUrl);
    }

    // 🔔 Tạo thông báo mới
    async create(data) {
        return (await this.api.post("/", data)).data;
    }

    // 🔔 Lấy tất cả thông báo
    async findAll() {
        return (await this.api.get("/")).data;
    }

    // 🔔 Lấy một thông báo theo ID
    async findOne(id) {
        return (await this.api.get(`/getbyid/${id}`)).data;
    }

    // 🔔 Lấy tất cả thông báo (hàm mới)
    async getAll() {
        return (await this.api.get("/")).data;
    }

    // 🔔 Lấy thông báo theo ID (hàm mới)
    async getById(id) {
        return (await this.api.get(`/getbyid/${id}`)).data;
    }

    // 🔔 Cập nhật thông báo theo ID
    async update(id, data) {
        return (await this.api.put(`/${id}`, data)).data;
    }

    // 🔔 Xóa thông báo theo ID
    async delete(id) {
        return (await this.api.delete(`/${id}`)).data;
    }

    // 🔔 Xóa tất cả thông báo
    async deleteAll() {
        return (await this.api.delete("/")).data;
    }
}

export default new NotificationsService();
