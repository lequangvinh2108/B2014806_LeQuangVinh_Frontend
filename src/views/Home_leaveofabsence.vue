<template>
  <div class="full">
    <div class="top-bar">
      <button class="back-button" @click="goBack">Quay lại</button>
    </div>
    <h2 class="text-2xl font-bold mb-4">
      Kế hoạch nghỉ phép bắt buộc (TRANG WEB ĐANG THỬ NGHIỆM)
    </h2>
    <div class="row button-row21 justify-between">
      <!-- Dropdown lọc đơn vị -->
      <div class="filter">
        <select
          v-model="selectedDonvi"
          @change="filterByDonvi"
          class="filter-dropdown"
        >
          <option value="">Tất cả đơn vị</option>
          <option v-for="donvi in donviList" :key="donvi" :value="donvi">
            {{ donvi }}
          </option>
        </select>
      </div>
      <!-- Dropdown lọc đợt -->
      <div class="filter">
        <select
          v-model="selectedDot"
          @change="filterByDotAndDonvi"
          class="filter-dropdown"
        >
          <option value="">Tất cả đợt</option>
          <option v-for="dot in dotList" :key="dot" :value="dot">
            {{ dot }}
          </option>
        </select>
      </div>

      <!-- Ô tìm kiếm -->
      <div class="search">
        <input
          v-model="searchKeyword"
          @input="applySearchFilter"
          type="text"
          placeholder="Tìm kiếm theo tên, chức vụ..."
          class="search-input"
        />
      </div>
    </div>

    <div>
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
            <!-- <th rowspan="2">Đơn vị</th> -->
            <th rowspan="2">Số ngày phép năm</th>
            <th rowspan="2">Số ngày đã nghỉ</th>
            <th rowspan="2">Số ngày đăng ký</th>
            <th colspan="2">Thời gian nghỉ phép bắt buộc</th>
            <th rowspan="2">Ghi chú</th>
          </tr>
          <tr class="header-row-2">
            <th>Phê duyệt theo VB 1409</th>
            <th>Điều chỉnh</th>
          </tr>
        </thead>

        <tbody>
          <tr
            v-for="(item, index) in displayLeaveofabsences"
            :key="item._id || 'group-' + index"
            :class="[
              'text-center',
              { 'highlight-row': selectedRowIndex === index },
              {
                'bg-gray-300 font-bold':
                  item.isGroupHeader || item.isDonviHeader,
              },
            ]"
            @dblclick="
              !item.isGroupHeader &&
                !item.isDonviHeader &&
                handleRowDblClick(index)
            "
          >
            <template v-if="item.isDonviHeader">
              <td colspan="10" class="text-left pl-2 uppercase text-red-600">
                🔶 <b>{{ item.donvi }}</b>
              </td>
            </template>
            <template v-else-if="item.isGroupHeader">
              <td colspan="10" class="text-left pl-4 uppercase">
                🔷 <b>{{ item.phongban }}</b>
              </td>
            </template>
            <template v-else>
              <!-- <td>{{ index + 1 }}</td> -->
              <td>{{ getSTT(index) }}</td>
              <td class="text-left">{{ item.hoten }}</td>
              <td class="text-left">{{ item.chucvu }}</td>
              <td class="text-left">{{ item.phongban }}</td>
              <td>{{ item.tongsongaynghinam }}</td>
              <td>{{ item.songaydanghi }}</td>
              <td>{{ item.songaydk }}</td>
              <td>{{ item.pheduyentheoVB1409 }}</td>
              <td>{{ item.dieuchinhthoigiannghi }}</td>
              <td>{{ item.ghichu }}</td>
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
      searchKeyword: "",

      selectedRowIndex: null,
      leaveofabsences: [],
      filteredLeaveofabsences: [],
      selectedDonvi: "",
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
    displayLeaveofabsences() {
      return this.generateGroupedLeaveofabsences();
    },
  },

  methods: {
    async fetchUsers() {
      try {
        const response = await LeaveOfAbsenceService.findAll();
        this.leaveofabsences = response;
        // Tạo danh sách đợt duy nhất
        this.dotList = [
          ...new Set(response.map((item) => item.dot).filter(Boolean)),
        ];

        this.filterByDonvi();
        // this.sortLeaveofabsences(); // <-- thêm dòng này
      } catch (error) {
        console.error("Lỗi khi lấy danh sách nghỉ phép:", error);
      }
    },
    filterByDotAndDonvi() {
      this.filteredLeaveofabsences = this.leaveofabsences.filter((item) => {
        const matchDonvi = this.selectedDonvi
          ? item.donvi === this.selectedDonvi
          : true;
        const matchDot = this.selectedDot
          ? item.dot === this.selectedDot
          : true;
        return matchDonvi && matchDot;
      });

      this.sortLeaveofabsences();
    },
    getSTT(index) {
      // Đếm số dòng trước đó có hoten
      let count = 0;
      for (let i = 0; i <= index; i++) {
        if (this.displayLeaveofabsences[i]?.hoten) {
          count++;
        }
      }
      return count;
    },

    applySearchFilter() {
      let keyword = this.searchKeyword.toLowerCase().trim();

      let source = this.leaveofabsences.filter((item) => {
        const matchDonvi = this.selectedDonvi
          ? item.donvi === this.selectedDonvi
          : true;
        const matchDot = this.selectedDot
          ? item.dot === this.selectedDot
          : true;
        return matchDonvi && matchDot;
      });

      // let source = this.leaveofabsences;
      // if (this.selectedDonvi) {
      //   source = source.filter((item) => item.donvi === this.selectedDonvi);
      // }

      if (keyword) {
        this.filteredLeaveofabsences = source.filter((item) => {
          return (
            item.hoten?.toLowerCase().includes(keyword) ||
            item.chucvu?.toLowerCase().includes(keyword) ||
            item.phongban?.toLowerCase().includes(keyword) ||
            item.ghichu?.toLowerCase().includes(keyword)
          );
        });
      } else {
        this.filteredLeaveofabsences = source;
      }

      this.sortLeaveofabsences();
    },
    goBack() {
      window.location.href = "http://10.143.0.20/";
    },
    generateGroupedLeaveofabsences() {
      const groupedByDonvi = {};

      for (const item of this.filteredLeaveofabsences) {
        const donvi = item.donvi?.trim() || "Khác";
        const phongban = item.phongban?.trim() || "Khác";

        if (!groupedByDonvi[donvi]) {
          groupedByDonvi[donvi] = {};
        }

        if (!groupedByDonvi[donvi][phongban]) {
          groupedByDonvi[donvi][phongban] = [];
        }

        groupedByDonvi[donvi][phongban].push(item);
      }

      const result = [];

      for (const donvi in groupedByDonvi) {
        result.push({ isDonviHeader: true, donvi });

        for (const phongban in groupedByDonvi[donvi]) {
          result.push({ isGroupHeader: true, phongban });
          result.push(...groupedByDonvi[donvi][phongban]);
        }
      }

      return result;
    },
    handleRowDblClick(index) {
      this.selectedRowIndex = index;
    },

    goCreateLeaveofAbsence() {
      this.$router.push({ path: "/createleaveofabsence" });
    },

    filterByDonvi() {
      this.filterByDotAndDonvi();
    },
    sortLeaveofabsences() {
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
        "ban giám đốc": {
          "giám đốc": 0,
          "phó giám đốc": 1,
        },
        "phòng kt&nq": {
          "trưởng phòng": 0,
          "phó phòng": 1,
          "cán bộ": 2,
          "giao dịch viên": 3,
        },
        "phòng tổng hợp": {
          "trưởng phòng": 0,
          "phó phòng": 1,
          "cán bộ": 2,
          "giao dịch viên": 3,
        },
        "phòng ktgsnb": {
          "trưởng phòng": 0,
          "phó phòng": 1,
          "cán bộ": 2,
          "giao dịch viên": 3,
        },
        "phòng kh & qlrr": {
          "trưởng phòng": 0,
          "phó phòng": 1,
          "cán bộ": 2,
          "giao dịch viên": 3,
        },
        "phòng khcn": {
          "trưởng phòng": 0,
          "phó phòng": 1,
          "cán bộ": 2,
          "giao dịch viên": 3,
        },
        "phòng khdn": {
          "trưởng phòng": 0,
          "phó phòng": 1,
          "cán bộ": 2,
          "giao dịch viên": 3,
        },
      };

      const donviOrder = this.donviList.map((d) => d.toLowerCase().trim());

      this.filteredLeaveofabsences.sort((a, b) => {
        const normalize = (str) =>
          str?.toLowerCase().trim().replace(/\s+/g, " ") || "";

        // Sắp xếp theo đơn vị
        const donviA = normalize(a.donvi);
        const donviB = normalize(b.donvi);
        const indexDonviA =
          donviOrder.indexOf(donviA) !== -1 ? donviOrder.indexOf(donviA) : 999;
        const indexDonviB =
          donviOrder.indexOf(donviB) !== -1 ? donviOrder.indexOf(donviB) : 999;
        if (indexDonviA !== indexDonviB) return indexDonviA - indexDonviB;

        // Sắp xếp theo phòng ban
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

        // Sắp xếp theo chức vụ
        const chucvuA = normalize(a.chucvu);
        const chucvuB = normalize(b.chucvu);
        const chucvuMap = chucvuOrderMap[phongbanA] || {};
        const indexChucvuA = chucvuMap[chucvuA] ?? 999;
        const indexChucvuB = chucvuMap[chucvuB] ?? 999;

        return indexChucvuA - indexChucvuB;
      });

      // Debug log kết quả sắp xếp
      console.log(
        this.filteredLeaveofabsences.map(
          (e) =>
            `${e.donvi?.trim()} - ${e.phongban?.trim()} - ${e.chucvu?.trim()}`
        )
      );
    },
  },

  mounted() {
    this.fetchUsers();
  },
};
</script>

<style>
.full {
  width: 100%;
  /* transform: translateX(-10%); */
  min-height: 100vh;
  overflow-x: auto;
  font-size: x-small;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

table {
  width: auto;
  min-width: 100%;
  border-collapse: collapse;
  border: 1px solid black;
}

/* Đảm bảo dropdown luôn nằm sát phải */
.filter-dropdown {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  min-width: 220px;
  background-color: rgb(53, 140, 155);
}

.filter {
  margin-left: 15px;
}

.button-row21 {
  margin-bottom: 10px;
}
.row.button-row21 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.search-input {
  margin-right: 20px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  min-width: 250px;
}

h2 {
  text-align: center;
  color: rgb(27, 27, 26);
}

.bg-custom {
  background-size: cover;
  background-color: rgb(248, 248, 248);
}

body {
  margin: 0;
  padding: 0;
  /* background-size: cover; */
}

.highlight-row {
  background-color: #fffd8a !important; /* Màu vàng nhạt để dễ nhìn */
}

th,
td {
  text-align: center;
  vertical-align: middle;
  padding: 8px;
  border: 1px solid black; /* Viền ô */
}

thead th {
  border: 1px solid black;
  background-color: #e5e5e5; /* hoặc màu tùy chọn để giữ cho đẹp */
}

.bg-gray-300 {
  background-color: #d1d5db; /* Tailwind gray-300 */
}

.top-bar {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 10px;
}

.back-button {
  padding: 8px 16px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
  font-size: 14px;
}

.back-button:hover {
  background-color: #084298;
}
</style>
