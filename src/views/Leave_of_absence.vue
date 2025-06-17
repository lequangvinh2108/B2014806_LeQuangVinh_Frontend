<template>
  <div class="full">
    <h2 class="text-2xl font-bold mb-4">Danh sách nghỉ phép</h2>

    <div class="row button-row21">
      <div>
        <button class="add-user-btn" @click="goCreateLeaveofAbsence()">
          + Tạo danh sách
        </button>
        <button class="delete-all-btn" @click="deleteAllLeaveofabsences">
          🗑️ Xóa tất cả
        </button>
      </div>

      <div class="filter">
        <label for="dot" style="margin-right: 10px; font-weight: bold"
          >Chọn đợt:</label
        >
        <select
          v-model="selectedDot"
          @change="filterLeaveofabsences"
          class="filter-dropdown"
        >
          <option value="">Tất cả đợt</option>
          <option v-for="dot in dotList" :key="dot" :value="dot">
            {{ dot }}
          </option>
        </select>
      </div>

      <div class="filter">
        <label for="donvi" style="margin-right: 10px; font-weight: bold"
          >Chọn đơn vị:</label
        >
        <select
          v-model="selectedDonvi"
          @change="filterLeaveofabsences"
          class="filter-dropdown"
        >
          <option value="">Tất cả đơn vị</option>
          <option v-for="donvi in donviList" :key="donvi" :value="donvi">
            {{ donvi }}
          </option>
        </select>
      </div>
    </div>

    <div class="table-wrapper">
      <table
        class="w-full border-collapse border border-black bg-custom"
        style="margin-bottom: 100px"
      >
        <thead>
          <tr class="header-row-1">
            <th rowspan="2">STT</th>
            <th rowspan="2">Họ và tên</th>
            <th rowspan="2">Chức vụ</th>
            <th rowspan="2">Phòng ban</th>
            <th rowspan="2">Số ngày phép năm</th>
            <th rowspan="2">Số ngày đã nghỉ</th>
            <th rowspan="2">Số ngày đăng ký</th>
            <th colspan="2">Thời gian nghỉ phép bắt buộc</th>
            <th rowspan="2">Ghi chú</th>
            <th rowspan="2">Hành động</th>
          </tr>
          <tr class="header-row-2">
            <th>Phê duyệt theo VB 1409</th>
            <th>Điều chỉnh</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in groupedLeaveofabsences"
            :key="item._id || 'header-' + index"
            :class="{ 'highlight-row': selectedRowIndex === index }"
          >
            <template v-if="item.isDonviHeader">
              <td colspan="11" class="text-left font-bold bg-green-200">
                🔶 <b>{{ item.donvi.toUpperCase() }}</b>
              </td>
            </template>

            <template v-else-if="item.isGroupHeader">
              <td colspan="11" class="text-left font-bold bg-yellow-200">
                🔷 <b>{{ item.phongban.toUpperCase() }}</b>
              </td>
            </template>

            <template v-else>
              <td>{{ index }}</td>
              <td style="text-align: left">{{ item.hoten }}</td>
              <td style="text-align: left">{{ item.chucvu }}</td>
              <td style="text-align: left">{{ item.phongban }}</td>
              <td>{{ item.tongsongaynghinam }}</td>
              <td>{{ item.songaydanghi }}</td>
              <td>{{ item.songaydk }}</td>
              <td>{{ item.pheduyentheoVB1409 }}</td>
              <td>{{ item.dieuchinhthoigiannghi }}</td>
              <td>{{ item.ghichu }}</td>
              <td>
                <button
                  class="edit text-white px-3 py-1 rounded"
                  @click="
                    $router.push({
                      name: 'editleaveofabsence',
                      params: { id: item._id },
                    })
                  "
                >
                  Sửa
                </button>
                <button
                  class="delete text-white px-3 py-1 rounded"
                  @click="deleteLeaveofabsence(item._id)"
                >
                  Xóa
                </button>
              </td>
            </template>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import LeaveOfAbsenceService from "../services/leaveofabsence.service";

export default {
  data() {
    return {
      selectedRowIndex: null,

      leaveofabsences: [],
      filteredLeaveofabsences: [],
      selectedDonvi: "Agribank chi nhánh tỉnh Kiên Giang",
      selectedDot: "",
      dotList: [],
      donviList: [
        "Agribank chi nhánh tỉnh Kiên Giang",
        "PGD Số 1",
        "Agribank chi nhánh huyện Kiên Lương Kiên Giang",
        "Agribank chi nhánh huyện Hòn Đất Kiên Giang",
        "Agribank chi nhánh huyện Kiên Hải Kiên Giang",
        "Agribank chi nhánh TP Hà Tiên Kiên Giang",
        "PGD Giang Thành",
        "Agribank chi nhánh huyện Ba Hòn Kiên Giang",
        "PGD Bình An",
        "Agribank chi nhánh huyện Rạch Sỏi Kiên Giang",
        "PGD Mong Thọ",
        "Agribank chi nhánh TP Rạch Giá Kiên Giang",
        "PGD Số 2",
        "Agribank chi nhánh Mỹ Lâm Kiên Giang",
        "PGD Sóc Sơn",
      ],
    };
  },
  computed: {
    groupedLeaveofabsences() {
      const normalize = (str) => str?.trim().toLowerCase() || "khác";

      if (this.selectedDonvi) {
        // Đã chọn 1 đơn vị => nhóm theo phòng ban
        const grouped = {};
        for (const item of this.filteredLeaveofabsences) {
          const phongban = normalize(item.phongban);
          if (!grouped[phongban]) {
            grouped[phongban] = [];
          }
          grouped[phongban].push(item);
        }

        const result = [];
        for (const phongban in grouped) {
          result.push({ isGroupHeader: true, phongban });
          result.push(...grouped[phongban]);
        }

        return result;
      } else {
        // Tất cả đơn vị => nhóm theo donvi > phòng ban
        const grouped = {};
        for (const item of this.filteredLeaveofabsences) {
          const donvi = item.donvi?.trim() || "Khác";
          const phongban = normalize(item.phongban);

          if (!grouped[donvi]) {
            grouped[donvi] = {};
          }

          if (!grouped[donvi][phongban]) {
            grouped[donvi][phongban] = [];
          }

          grouped[donvi][phongban].push(item);
        }

        const result = [];
        for (const donvi in grouped) {
          result.push({ isDonviHeader: true, donvi });

          for (const phongban in grouped[donvi]) {
            result.push({ isGroupHeader: true, phongban });
            result.push(...grouped[donvi][phongban]);
          }
        }

        return result;
      }
    },
  },

  methods: {
    async fetchUsers() {
      try {
        const response = await LeaveOfAbsenceService.findAll();
        this.leaveofabsences = response;

        // Tạo danh sách các đợt duy nhất
        const dots = [
          ...new Set(
            this.leaveofabsences.map((item) => item.dot).filter(Boolean)
          ),
        ];
        this.dotList = dots.sort();

        this.filterLeaveofabsences();
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nghỉ phép:", error);
      }
    },
    filterLeaveofabsences() {
      this.filteredLeaveofabsences = this.leaveofabsences.filter((item) => {
        const matchDonvi =
          !this.selectedDonvi || item.donvi === this.selectedDonvi;
        const matchDot = !this.selectedDot || item.dot === this.selectedDot;
        return matchDonvi && matchDot;
      });
      this.sortLeaveofabsences();
    },

    async deleteAllLeaveofabsences() {
      if (confirm("Bạn có chắc chắn muốn xóa toàn bộ danh sách nghỉ phép?")) {
        try {
          await LeaveOfAbsenceService.deleteAll();
          this.fetchUsers();
        } catch (error) {
          console.error("Lỗi khi xóa tất cả danh sách:", error);
        }
      }
    },
    handleRowDblClick(index) {
      this.selectedRowIndex = index;
    },

    goCreateLeaveofAbsence() {
      this.$router.push({ path: "/createleaveofabsence" });
    },

    filterByDonvi() {
      if (this.selectedDonvi) {
        this.filteredLeaveofabsences = this.leaveofabsences.filter(
          (item) => item.donvi === this.selectedDonvi
        );
      } else {
        this.filteredLeaveofabsences = this.leaveofabsences;
      }
      this.sortLeaveofabsences();
    },

    async deleteLeaveofabsence(id) {
      if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
        try {
          await LeaveOfAbsenceService.delete(id);
          this.fetchUsers();
        } catch (error) {
          console.error("Lỗi khi xóa người dùng:", error);
        }
      }
    },

    sortLeaveofabsences() {
      const donviOrder = [
        "Agribank chi nhánh tỉnh Kiên Giang",
        "PGD Số 1",
        "Agribank chi nhánh huyện Kiên Lương Kiên Giang",
        "Agribank chi nhánh huyện Hòn Đất Kiên Giang",
        "Agribank chi nhánh huyện Kiên Hải Kiên Giang",
        "Agribank chi nhánh TP Hà Tiên Kiên Giang",
        "PGD Giang Thành",
        "Agribank chi nhánh huyện Ba Hòn Kiên Giang",
        "PGD Bình An",
        "Agribank chi nhánh huyện Rạch Sỏi Kiên Giang",
        "PGD Mong Thọ",
        "Agribank chi nhánh TP Rạch Giá Kiên Giang",
        "PGD Số 2",
        "Agribank chi nhánh Mỹ Lâm Kiên Giang",
        "PGD Sóc Sơn",
      ];

      const phongbanOrder = [
        "ban giám đốc",
        "phòng kt&nq",
        "phòng tổng hợp",
        "phòng ktgsnb",
        "phòng kh & qlrr",
        "phòng khcn",
        "phòng khdn",
      ];

      const chucvuOrderMap = {
        "giám đốc": 0,
        "phó giám đốc": 1,
        "trưởng phòng": 2,
        "phó phòng": 3,
        "cán bộ": 4,
        "giao dịch viên": 5,
      };

      const normalize = (str) =>
        str?.toLowerCase().trim().replace(/\s+/g, " ") || "";

      this.filteredLeaveofabsences.sort((a, b) => {
        const donviA = normalize(a.donvi);
        const donviB = normalize(b.donvi);
        const indexDonviA =
          donviOrder.findIndex((d) => normalize(d) === donviA) !== -1
            ? donviOrder.findIndex((d) => normalize(d) === donviA)
            : 999;
        const indexDonviB =
          donviOrder.findIndex((d) => normalize(d) === donviB) !== -1
            ? donviOrder.findIndex((d) => normalize(d) === donviB)
            : 999;

        if (indexDonviA !== indexDonviB) return indexDonviA - indexDonviB;

        const phongbanA = normalize(a.phongban);
        const phongbanB = normalize(b.phongban);
        const indexPhongbanA =
          phongbanOrder.indexOf(phongbanA) !== -1
            ? phongbanOrder.indexOf(phongbanA)
            : 999;
        const indexPhongbanB =
          phongbanOrder.indexOf(phongbanB) !== -1
            ? phongbanOrder.indexOf(phongbanB)
            : 999;

        if (indexPhongbanA !== indexPhongbanB)
          return indexPhongbanA - indexPhongbanB;

        const chucvuA = normalize(a.chucvu);
        const chucvuB = normalize(b.chucvu);
        const indexChucvuA = chucvuOrderMap[chucvuA] ?? 999;
        const indexChucvuB = chucvuOrderMap[chucvuB] ?? 999;

        return indexChucvuA - indexChucvuB;
      });
    },
  },

  mounted() {
    this.fetchUsers();
  },
};
</script>

<style scoped>
.full {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 56px;
  left: 0;
  background-color: aliceblue;
  overflow: auto;
  /* padding: 20px; */
  box-sizing: border-box;
  /* font-size: xx-small; */
}

.filter-dropdown {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  min-width: 220px;
  background-color: rgb(53, 140, 155);
}

.filter {
  margin-left: 30px;
}

.delete-all-btn {
  margin-left: 10px;
  background-color: #e74c3c;
  color: white;
  padding: 8px 12px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.delete-all-btn:hover {
  background-color: #c0392b;
}

.button-row21 {
  margin-bottom: 10px;
}

h2 {
  text-align: center;
  color: rgb(19, 19, 18);
}

.bg-custom {
  background-size: cover;
  background-color: rgb(241, 241, 235);
}

.highlight-row {
  background-color: #f3f02c !important; /* Màu vàng nhạt để dễ nhìn */
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid black;
  font-size: x-small;
}

th,
td,
tr {
  text-align: center;
  vertical-align: middle;
  padding: 8px;
  border: 1px solid black;
}

thead th {
  position: sticky;
  background-color: #ece938;
  z-index: 2;
  border: 1px solid black;
}

.header-row-1 th {
  top: 0;
  z-index: 3;
}

.header-row-2 th {
  top: 32px;
  z-index: 2;
}

.bg-yellow-200 {
  background-color: #fefcbf;
}

.bg-green-200 {
  background-color: #079642;
}

/* .table-wrapper {
  max-height: 500px;
  overflow: auto;
} */
</style>
