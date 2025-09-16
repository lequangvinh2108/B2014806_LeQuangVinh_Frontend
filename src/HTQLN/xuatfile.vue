<template>
  <div class="p-6 max-w-2xl mx-auto">
    <h2 class="text-xl font-bold mb-4">Xuất Báo Cáo Tín Dụng</h2>

    <!-- Nhập file ngày 1 -->
    <div class="mb-4">
      <label class="block mb-2 font-semibold">Nhập file ngày 1 (10.08)</label>
      <input
        type="file"
        @change="onFileChange($event, 'file1')"
        accept=".xls,.xlsx"
      />
    </div>

    <!-- Nhập file ngày 2 -->
    <div class="mb-4">
      <label class="block mb-2 font-semibold">Nhập file ngày 2 (11.08)</label>
      <input
        type="file"
        @change="onFileChange($event, 'file2')"
        accept=".xls,.xlsx"
      />
    </div>

    <!-- Nút xuất báo cáo -->
    <button
      @click="generateReport"
      class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      :disabled="loading"
    >
      {{ loading ? "Đang xử lý..." : "Xuất báo cáo" }}
    </button>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "XFBC",
  data() {
    return {
      file1: null,
      file2: null,
      loading: false,
    };
  },
  methods: {
    // Xử lý khi chọn file
    onFileChange(e, type) {
      const file = e.target.files[0];
      if (type === "file1") this.file1 = file;
      if (type === "file2") this.file2 = file;
    },

    // Gửi file lên backend để tạo báo cáo
    async generateReport() {
      if (!this.file1 || !this.file2) {
        alert("⚠️ Vui lòng nhập đủ 2 file Excel!");
        return;
      }

      this.loading = true;
      try {
        const formData = new FormData();
        formData.append("file1", this.file1);
        formData.append("file2", this.file2);

        const response = await axios.post(
          "http://localhost:3000/api/BaoCaoTT/generateBC",
          formData,
          { responseType: "blob" } // để nhận file Excel
        );

        // Tạo link tải file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "BaoCaoTT-CN.xls");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        alert("✅ Xuất báo cáo thành công!");
      } catch (error) {
        console.error("❌ Lỗi khi xuất báo cáo:", error);
        alert("❌ Có lỗi xảy ra khi xuất báo cáo!");
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
