import http from "../http-common"; // 👈 thêm dòng này

class HTQLNService {
  upload(formData) {
    return http.post("/HTQLN/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }
}

export default new HTQLNService();
