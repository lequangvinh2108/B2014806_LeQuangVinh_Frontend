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
          <!-- <th class="border border-black p-2" rowspan="2">🛠</th> -->
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
          <!-- <td class="border border-black p-2">
            <button
              @click="removeRow(index)"
              class="text-red-600 hover:underline"
            >
              🗑
            </button>
          </td> -->
        </tr>
        <tr v-if="rows.length === 0">
          <td colspan="10" class="border border-black p-3 text-center">
            Không có dòng nào
          </td>
        </tr>
      </tbody>
    </table>
    <div style="margin-top: 10px">
      <!-- <button class="edit text-white px-3 py-1 rounded" type="submit">
        Cập nhật
      </button> -->
      <button
        @click="updateLeaveofabsence"
        class="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-500"
        style="
          background-color: green;
          margin-left: 20px;
          height: 35px;
          width: 150px;
        "
      >
        Cập nhật
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
import LeaveOfAbsenceService from "../services/leaveofabsence.service";

export default {
  name: "CreateLeaveOfAbsence",
  data() {
    return {
      id: this.$route.params.id,
      rows: [
        {
          hoten: "",
          chucvu: "",
          phongban: "",
          donvi: "",
          tongsongaynghinam: 0,
          songaydanghi: 0,
          songaydk: 0,
          vb1409Start: "",
          vb1409End: "",
          dieuchinhStart: "",
          dieuchinhEnd: "",
          ghichu: "",
        },
      ],
      message: "",
    };
  },
  async created() {
    await this.fetchUser();
  },
  methods: {
    async fetchUser() {
      try {
        const userData = await LeaveOfAbsenceService.getById(this.id);
        if (userData) {
          // Tách chuỗi ngày và chuyển định dạng
          const [vbStart, vbEnd] = (userData.pheduyentheoVB1409 || " - ").split(
            " - "
          );
          const [dcStart, dcEnd] = (
            userData.dieuchinhthoigiannghi || " - "
          ).split(" - ");

          const formatDate = (dateStr) => {
            if (!dateStr || dateStr.trim() === "") return "";
            const [day, month, year] = dateStr.split("/");
            return `${year}-${month}-${day}`; // yyyy-MM-dd
          };

          this.rows[0] = {
            hoten: userData.hoten || "",
            chucvu: userData.chucvu || "",
            phongban: userData.phongban || "",
            donvi: userData.donvi || "",
            tongsongaynghinam: userData.tongsongaynghinam || 0,
            songaydanghi: userData.songaydanghi || 0,
            songaydk: userData.songaydk || 0,
            vb1409Start: formatDate(vbStart),
            vb1409End: formatDate(vbEnd),
            dieuchinhStart: formatDate(dcStart),
            dieuchinhEnd: formatDate(dcEnd),
            ghichu: userData.ghichu || "",
          };
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu: ", error);
      }
    },
    goLeaveofAbsence() {
      this.$router.push("/leaveofabsence");
    },
    async updateLeaveofabsence() {
      const row = this.rows[0];

      // Kiểm tra bắt buộc
      if (!row.hoten || row.hoten.trim() === "") {
        this.message = "Họ tên không được để trống!";
        return;
      }

      // Hàm chuyển ngày từ yyyy-MM-dd sang dd/MM/yyyy
      const formatDate = (isoDate) => {
        if (!isoDate || isoDate.trim() === "") return "";
        const [year, month, day] = isoDate.split("-");
        return `${day}/${month}/${year}`;
      };

      // Tạo chuỗi ngày nghỉ dạng "dd/MM/yyyy - dd/MM/yyyy"
      const pheduyet =
        row.vb1409Start && row.vb1409End
          ? `${formatDate(row.vb1409Start)} - ${formatDate(row.vb1409End)}`
          : " - ";

      const dieuchinh =
        row.dieuchinhStart && row.dieuchinhEnd
          ? `${formatDate(row.dieuchinhStart)} - ${formatDate(
              row.dieuchinhEnd
            )}`
          : " - ";

      // Chuẩn bị dữ liệu gửi lên server
      const updatedData = {
        hoten: row.hoten,
        chucvu: row.chucvu,
        phongban: row.phongban,
        donvi: row.donvi,
        tongsongaynghinam: row.tongsongaynghinam,
        songaydanghi: row.songaydanghi,
        songaydk: row.songaydk,
        pheduyentheoVB1409: pheduyet,
        dieuchinhthoigiannghi: dieuchinh,
        ghichu: row.ghichu,
      };

      try {
        await LeaveOfAbsenceService.update(this.id, updatedData);
        this.message = "Cập nhật thành công rồi nha!!!";
        setTimeout(() => {
          this.$router.push("/leaveofabsence");
        }, 2000);
      } catch (error) {
        console.error("Lỗi khi cập nhật: ", error);
        this.message = "Có lỗi xảy ra khi cập nhật!";
      }
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
