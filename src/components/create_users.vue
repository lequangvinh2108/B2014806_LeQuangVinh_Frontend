<template>
  <div class="full">
    <h2 class="text-2xl font-bold mb-4">Tạo Danh Sách Người Dùng</h2>

    <table
      class="w-full border-collapse border border-black bg-custom"
      style="margin-bottom: 10px"
    >
      <thead>
        <tr class="bg-gray-200">
          <th class="border border-black p-2">#</th>
          <th class="border border-black p-2">Mã GDV</th>
          <th class="border border-black p-2">Tên GDV</th>
          <th class="border border-black p-2">Tên tắt GDV</th>
          <th class="border border-black p-2">Chức vụ</th>
          <th class="border border-black p-2">Quyền SD</th>
          <th class="border border-black p-2">Mã đơn vị</th>
          <th class="border border-black p-2">Mã CN</th>
          <th class="border border-black p-2">Giấy ủy quyền</th>
          <th class="border border-black p-2">🔧</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index">
          <td class="border border-black p-2">{{ index + 1 }}</td>
          <td class="border border-black p-2">
            <input v-model="row.MaGDV" class="table-input" />
          </td>
          <td class="border border-black p-2">
            <input v-model="row.TenGDV" class="table-input" />
          </td>
          <td class="border border-black p-2">
            <input v-model="row.TentatGDV" class="table-input" />
          </td>
          <td class="border border-black p-2">
            <input v-model="row.Chucvu" class="table-input" />
          </td>
          <td class="border border-black p-2">
            <input v-model="row.Quyensd" class="table-input" />
          </td>
          <td class="border border-black p-2">
            <input v-model="row.Madonvi" class="table-input" />
          </td>
          <td class="border border-black p-2">
            <input v-model="row.MaCN" class="table-input" />
          </td>
          <td class="border border-black p-2">
            <input v-model="row.GiayUQ" class="table-input" />
          </td>
          <td class="border border-black p-2">
            <button
              @click="removeRow(index)"
              class="text-red-600 hover:underline"
            >
              🗑
            </button>
          </td>
        </tr>
        <tr v-if="rows.length === 0">
          <td colspan="10" class="border border-black p-3 text-center">
            Không có dòng nào
          </td>
        </tr>
      </tbody>
    </table>

    <div class="flex justify-between">
      <label
        for="file-upload"
        class="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
        style="
          width: 150px;
          height: 35px;
          border: 2px solid black;
          background-color: honeydew;
        "
      >
        📂 Nhập Excel
      </label>
      <input
        id="file-upload"
        type="file"
        @change="handleFileUpload"
        accept=".xlsx, .xls"
        style="display: none"
      />

      <button
        @click="addRow"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        style="width: 150px; height: 35px; margin-left: 20px"
      >
        ➕ Thêm dòng
      </button>

      <button
        @click="submit"
        class="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
        style="width: 150px; height: 35px; margin-left: 20px"
      >
        💾 Lưu tất cả
      </button>

      <button
        @click="goUserPage"
        class="bg-white text-black px-4 py-2 rounded font-bold hover:bg-gray-200"
        style="width: 150px; height: 35px; margin-left: 20px"
      >
        Thoát
      </button>
    </div>

    <div v-if="message" class="text-green-700 font-semibold mt-4">
      {{ message }}
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx";
import UserService from "@/services/users.service";

export default {
  name: "CreateUsers",
  data() {
    return {
      rows: [
        {
          MaCN: "",
          Madonvi: "",
          user: "",
          password: "",
          name: "",
          shortname: "",
          function: "",
          usage_rights: "",
          authority: "",
        },
      ],
      message: "",
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(worksheet);

        this.rows = jsonData.map((row) => ({
          Madonvi: row.Madonvi || "",
          MaCN: row.MaCN || "",
          MaGDV: row.MaGDV || "", // ✔ đúng tên field
          Matkhau: row.Matkhau || "123456", // ✔ đúng tên field
          TenGDV: row.TenGDV || "",
          TentatGDV: row.TentatGDV || "",
          Chucvu: row.Chucvu || "",
          Quyensd: row.Quyensd || "",
          GiayUQ: row.GiayUQ || "",
        }));
      };
      reader.readAsArrayBuffer(file);
    },
    addRow() {
      this.rows.push({
        Madonvi: "",
        MaCN: "",
        MaGDV: "",
        Matkhau: "123456",
        TenGDV: "",
        TentatGDV: "",
        Chucvu: "",
        Quyensd: "",
        GiayUQ: "",
      });
    },
    removeRow(index) {
      this.rows.splice(index, 1);
    },
    async submit() {
      try {
        const mappedRows = this.rows.map((row) => ({
          Madonvi: row.Madonvi || "",
          MaCN: row.MaCN || "",
          user: row.MaGDV || "",
          password: row.Matkhau || "123456",
          name: row.TenGDV || "",
          shortname: row.TentatGDV || "",
          function: row.Chucvu || "",
          usage_rights: row.Quyensd || "",
          authority: row.GiayUQ || "",
        }));

        console.log("Mapped Rows:", mappedRows);

        await UserService.createMany(mappedRows);
        this.message = "✅ Thêm người dùng thành công!";
        this.rows = [];
      } catch (error) {
        console.error(error);
        this.message = "❌ Có lỗi khi gửi dữ liệu.";
      }
    },

    goUserPage() {
      this.$router.push("/users");
    },
  },
};
</script>

<style scoped>
.full {
  font-size: x-small;
}

h2 {
  text-align: center;
  color: black;
}

.bg-custom {
  background-color: #b5d6b2;
}

.table-input {
  width: 100%;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  text-align: center;
}

th,
td {
  text-align: center;
  vertical-align: middle;
  padding: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
}
</style>
