<template>
  <div class="full">
    <h2 class="text-2xl font-bold mb-4">Tạo Kế Hoạch Nghỉ Phép</h2>

    <table
      class="w-full border-collapse border border-black bg-custom"
      style="margin-bottom: 10px"
    >
      <thead>
        <tr class="bg-gray-200">
          <th class="border border-black p-2" rowspan="2">#</th>
          <th class="border border-black p-2" rowspan="2">Họ và tên</th>
          <th class="border border-black p-2" rowspan="2">Chức vụ</th>
          <th class="border border-black p-2" rowspan="2">Phòng ban</th>
          <th class="border border-black p-2" rowspan="2">Đơn vị</th>
          <th class="border border-black p-2" rowspan="2">Số ngày phép năm</th>
          <th class="border border-black p-2" rowspan="2">Số ngày đã nghỉ</th>
          <th class="border border-black p-2" rowspan="2">Số ngày đăng ký</th>
          <th class="border border-black p-2" colspan="2">
            Thời gian nghỉ phép bắt buộc
          </th>
          <th class="border border-black p-2" rowspan="2">Ghi chú</th>
          <th class="border border-black p-2" rowspan="2">🛠</th>
          <th class="border border-black p-2" rowspan="2">Đợt</th>
        </tr>
        <tr class="bg-gray-200">
          <th class="border border-black p-2">Phê duyệt theo VB 1409</th>
          <th class="border border-black p-2">Điều chỉnh</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, index) in rows" :key="index" class="text-center">
          <td class="border border-black p-2">{{ index + 1 }}</td>
          <td class="border border-black p-2">
            <input v-model="row.hoten" class="table-input" />
          </td>
          <td class="border border-black p-2">
            <input v-model="row.chucvu" class="table-input" />
          </td>
          <td class="border border-black p-2">
            <input v-model="row.phongban" class="table-input" />
          </td>
          <td class="border border-black p-2">
            <input v-model="row.donvi" class="table-input" />
          </td>
          <td class="border border-black p-2">
            <input
              type="number"
              v-model.number="row.tongsongaynghinam"
              class="table-input"
            />
          </td>
          <td class="border border-black p-2">
            <input
              type="number"
              v-model.number="row.songaydanghi"
              class="table-input"
            />
          </td>
          <td class="border border-black p-2">
            <input
              type="number"
              v-model.number="row.songaydk"
              class="table-input"
            />
          </td>
          <!-- VB 1409 -->
          <td class="border border-black p-2">
            <input type="date" v-model="row.vb1409Start" class="table-input" />
            <span> - </span>
            <input type="date" v-model="row.vb1409End" class="table-input" />
          </td>

          <!-- Điều chỉnh -->
          <td class="border border-black p-2">
            <input
              type="date"
              v-model="row.dieuchinhStart"
              class="table-input"
            />
            <span> - </span>
            <input type="date" v-model="row.dieuchinhEnd" class="table-input" />
          </td>

          <td class="border border-black p-2">
            <input v-model="row.ghichu" class="table-input" />
          </td>
          <td class="border border-black p-2">
            <button
              @click="removeRow(index)"
              class="text-red-600 hover:underline"
            >
              🗑
            </button>
          </td>
          <td class="border border-black p-2">
            <input v-model="row.dot" class="table-input" readonly />
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
      <!-- Nút chọn file Excel -->
      <!-- Button giả làm input file -->
      <label
        for="file-upload"
        class="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
        style="
          height: 35px;
          width: 150px;
          background-color: honeydew;
          border: 2px solid black;
        "
      >
        📂 Nhập Excel
      </label>

      <!-- Input file ẩn -->
      <input
        id="file-upload"
        type="file"
        @change="handleFileUpload"
        accept=".xlsx, .xls"
        style="display: none"
      />

      <!-- Nút Thêm dòng - Màu xanh -->
      <button
        @click="addRow"
        class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        style="
          background-color: green;
          height: 35px;
          width: 150px;
          margin-left: 20px;
        "
      >
        ➕ Thêm dòng
      </button>

      <!-- Nút Lưu tất cả - Màu vàng -->
      <button
        @click="submit"
        class="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
        style="
          background-color: yellow;
          margin-left: 20px;
          height: 35px;
          width: 150px;
        "
      >
        💾 Lưu tất cả
      </button>

      <button
        @click="goLeaveofAbsence"
        class="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
        style="
          height: 35px;
          width: 150px;
          border-radius: 5px;
          background-color: white;
          font-weight: bold;
          margin-left: 20px;
        "
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
import LeaveOfAbsenceService from "@/services/leaveofabsence.service";
import * as XLSX from "xlsx";

export default {
  name: "CreateLeaveOfAbsence",
  data() {
    return {
      rows: [
        {
          hoten: "",
          chucvu: "",
          donvi: "",
          tongsongaynghinam: 0,
          songaydanghi: 0,
          vb1409Start: "",
          vb1409End: "",
          dieuchinhStart: "",
          dieuchinhEnd: "",
          ghichu: "",
          dot: "",
        },
      ],

      message: "",
    };
  },
  methods: {
    formatDate(dateStr) {
      const d = new Date(dateStr);
      if (isNaN(d)) return "";
      return `${String(d.getDate()).padStart(2, "0")}/${String(
        d.getMonth() + 1
      ).padStart(2, "0")}/${d.getFullYear()}`;
    },

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
          hoten: row.hoten || "",
          chucvu: row.chucvu || "",
          phongban: row.phongban || "",
          donvi: row.donvi || "",
          tongsongaynghinam: Number(row.tongsongaynginam || 0),
          songaydanghi: Number(row.sonagydanghi || 0),
          songaydk: Number(row.songaydk || 0),
          vb1409Start: this.convertDateRange(row.pheduyettheoVB1409, 0),
          vb1409End: this.convertDateRange(row.pheduyettheoVB1409, 1),
          dieuchinhStart: this.convertDateRange(row.dieuchinhthoigiannghi, 0),
          dieuchinhEnd: this.convertDateRange(row.dieuchinhthoigiannghi, 1),
          ghichu: row.ghichu || "",
          dot: row.dot || "",
        }));
      };
      reader.readAsArrayBuffer(file);
    },

    convertDateRange(dateRangeStr, index) {
      if (!dateRangeStr || typeof dateRangeStr !== "string") return "";
      const parts = dateRangeStr.split("-");
      if (parts.length !== 2) return "";
      const date = parts[index];
      if (!/^\d{8}$/.test(date)) return "";

      const year = date.slice(4);
      const month = date.slice(2, 4);
      const day = date.slice(0, 2);
      return `${year}-${month}-${day}`; // YYYY-MM-DD
    },
    addRow() {
      const year = new Date().getFullYear();
      const dotNumber = this.rows.length + 1;
      this.rows.push({
        hoten: "",
        chucvu: "",
        donvi: "",
        tongsongaynghinam: 0,
        songaydanghi: 0,
        vb1409Start: "",
        vb1409End: "",
        dieuchinhStart: "",
        dieuchinhEnd: "",
        ghichu: "",
        dot: `${year} - đợt ${dotNumber}`,
      });
    },
    removeRow(index) {
      this.rows.splice(index, 1);
    },
    async submit() {
      try {
        for (const row of this.rows) {
          const newRow = {
            ...row,
            pheduyentheoVB1409: `${this.formatDate(
              row.vb1409Start
            )} - ${this.formatDate(row.vb1409End)}`,
            dieuchinhthoigiannghi: `${this.formatDate(
              row.dieuchinhStart
            )} - ${this.formatDate(row.dieuchinhEnd)}`,
            dot: row.dot || `${new Date().getFullYear()} - đợt 1`, // fallback nếu dot trống
          };
          await LeaveOfAbsenceService.create(newRow);
        }
        this.message = "✅ Tạo đơn nghỉ thành công!";
        this.rows = [
          {
            hoten: "",
            chucvu: "",
            donvi: "",
            tongsongaynghinam: 0,
            songaydanghi: 0,
            vb1409Start: "",
            vb1409End: "",
            dieuchinhStart: "",
            dieuchinhEnd: "",
            ghichu: "",
            dot: `${new Date().getFullYear()} - đợt 1`,
          },
        ];
      } catch (err) {
        console.error(err);
        this.message = "❌ Có lỗi khi gửi dữ liệu.";
      }
    },
    goLeaveofAbsence() {
      this.$router.push("/leaveofabsence");
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
  background-color: rgb(154, 167, 44);
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
