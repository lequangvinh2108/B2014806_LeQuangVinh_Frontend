<template>
  <div class="container">
    <!-- Topbar -->
    <div class="topbar">
      <div class="topbar-left">HTQLN</div>

      <div class="topbar-right">
        <input
          type="date"
          v-model="fromDate"
          placeholder="Từ ngày "
          class="date-input"
        />
        <span class="date-separator">-</span>
        <input
          type="date"
          v-model="toDate"
          placeholder="Đến ngày "
          class="date-input"
        />
        <!-- <button class="search-btn" @click="searchData">Tìm kiếm</button> -->
        <button class="search-btn" @click="searchAll">Tìm kiếm</button>
      </div>
    </div>

    <!-- 4 Box Stats -->
    <div class="stats-container">
      <div class="stat-box" v-for="(item, index) in stats" :key="index">
        <div class="stat-title">{{ item.title }}</div>

        <div class="stat-amount">
          <span v-if="item.title === 'TLNXTT'"> {{ item.amount }}% </span>
          <span v-else>
            {{ formatCurrency(item.amount) }}
          </span>
        </div>
        <!-- <div class="stat-amount">
          <span v-if="item.title === 'TLNXTT'"> {{ item.amount }}% </span>
          <span v-else>
            {{ formatCurrency(item.amount) }} <br />
            <small>{{ numberToWords(item.amount) }}</small>
          </span>
        </div> -->

        <div
          class="stat-change"
          :class="{
            increase: item.change > 0,
            decrease: item.change < 0,
            nochange: item.change === 0,
          }"
        >
          <span v-if="item.title === 'TLNXTT'"> {{ item.change }} %</span>
          <span v-else-if="item.diff !== undefined">
            {{ formatCurrency(item.diff) }} ({{ item.change > 0 ? "+" : ""
            }}{{ item.change }}%)
          </span>
        </div>
      </div>
    </div>
    <!-- Tabs -->
    <div class="tabs">
      <div
        v-for="tab in tabs"
        :key="tab"
        class="tab"
        :class="{ active: activeTab === tab }"
        @click="activeTab = tab"
      >
        {{ tab }}
      </div>
    </div>

    <!-- Tab content -->
    <div class="tab-content" v-show="activeTab === 'DSKHNN2'">
      <div class="tab-header">
        <span class="bnd-text">BDN</span>
        <div class="right-actions">
          <!-- Ô tìm kiếm với icon -->
          <div class="search-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="search-icon"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Tìm theo tên, IDKH, IDCN"
              class="search-input"
            />
          </div>
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>IDKH</th>
            <th>IDCN</th>
            <th>Tên</th>
            <th>Trạng thái</th>
            <th>CN</th>
            <th>Dư nợ chênh lệch</th>
          </tr>
        </thead>
        <tbody style="background-color: white">
          <tr
            v-for="(row, idx) in dskhnn2"
            :key="idx"
            @click="selectedRowIndex = idx"
            :class="{ 'selected-row': selectedRowIndex === idx }"
          >
            <td>{{ idx + 1 }}</td>
            <td>{{ row.MaKH || row.idkh }}</td>
            <td>{{ row.MaCN || row.idcn }}</td>
            <td>{{ row.HoTenKH || row.ten }}</td>
            <td
              :class="{
                increase:
                  row.trangthai === 'Xuất hiện mới' || row.trangthai === 'Tăng',
                decrease:
                  row.TrangThai === 'Giảm nợ nhóm 2' ||
                  row.trangthai === 'Giảm',
                nochange:
                  row.TrangThai === 'Không còn nợ nhóm 2' ||
                  row.trangthai === 'Không còn nợ nhóm 2',
              }"
            >
              {{ row.TrangThai || row.trangthai }}
            </td>
            <td>{{ row.TenCN || row.cn }}</td>
            <td class="text-right">
              {{ Number(row.duNoDiff).toLocaleString("vi-VN") }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Tab DSKHNX -->
    <div class="tab-content" v-show="activeTab === 'DSKHNX'">
      <div class="tab-header">
        <span class="bnd-text">BDN</span>
        <div class="right-actions">
          <!-- Ô tìm kiếm -->
          <div class="search-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="search-icon"
            >
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <input
              type="text"
              placeholder="Tìm theo tên, IDKH, IDCN"
              class="search-input"
            />
          </div>
        </div>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>STT</th>
            <th>IDKH</th>
            <th>IDCN</th>
            <th>Tên</th>
            <th>Trạng thái</th>
            <th>CN</th>
            <th>Dư nợ chênh lệch</th>
          </tr>
        </thead>
        <tbody style="background-color: white">
          <tr
            v-for="(row, idx) in dskhnx"
            :key="idx"
            @click="selectedRowIndex = idx"
            :class="{ 'selected-row': selectedRowIndex === idx }"
          >
            <td>{{ idx + 1 }}</td>
            <td>{{ row.idkh }}</td>
            <td>{{ row.idcn }}</td>
            <td>{{ row.ten }}</td>
            <td
              :class="{
                increase:
                  row.trangthai === 'Xuất hiện mới' || row.trangthai === 'Tăng',
                decrease: row.trangthai === 'Giảm',
                nochange: row.trangthai === 'Không còn nợ xấu',
              }"
            >
              {{ row.trangthai }}
            </td>
            <td>{{ row.cn }}</td>
            <td class="text-right">
              {{ Number(row.duNoDiff).toLocaleString("vi-VN") }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Tab BCN -->
    <div class="tab-content" v-show="activeTab === 'BCN'">
      <div class="tab-header">
        <span class="bnd-text">So sánh theo Chi nhánh</span>
      </div>

      <table class="data-table">
        <thead>
          <tr>
            <th>MaCN</th>
            <th>DN</th>
            <th>NN2</th>
            <th>NX</th>
          </tr>
        </thead>
        <tbody style="background-color: white">
          <tr v-for="(row, idx) in bcn" :key="idx">
            <td>
              <b>{{ row.MaCN }}</b>
            </td>
            <td :class="statusClass(row.DN)">
              <b>{{ row.DN || "-" }}</b>
            </td>
            <td :class="statusClass(row.NN2)">
              <b>{{ row.NN2 || "-" }}</b>
            </td>
            <td :class="statusClass(row.NX)">
              <b>{{ row.NX || "-" }}</b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Tab XFBC -->
    <div class="tab-content" v-show="activeTab === 'XFBC'">
      <div>
        <input type="date" v-model="ngaytruoc" />
        <input type="date" v-model="ngaysau" />
        <button @click="xuatFile">Xuất Excel</button>
      </div>
    </div>

    <div class="upload-section" v-show="activeTab === 'Upload File'">
      <!-- Chọn ngày -->
      <input type="date" v-model="uploadDate" class="date-input" />

      <!-- Thêm option Báo cáo TT trong select -->
      <select v-model="selectedLoaiNo" class="select-input">
        <option value="">-- Chọn loại nợ/báo cáo --</option>
        <option value="Nợ Nhóm 2">Nợ Nhóm 2</option>
        <option value="Nợ Xấu">Nợ Xấu</option>
        <option value="BaoCaoTT">Báo cáo TT (Toàn tỉnh)</option>
      </select>

      <!-- <input
        type="file"
        ref="fileExcel"
        @change="handleFileUpload"
        accept=".xlsx,.xls"
      />
      <button @click="submitUpload">Upload</button> -->
      <!-- Chọn file -->
      <input
        type="file"
        ref="fileExcel"
        @change="handleFileUpload"
        accept=".xlsx,.xls"
      />

      <!-- nút upload -->
      <button
        class="icon-btn"
        @click="submitUpload"
        style="background-color: white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20 17.58A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 4 16.25" />
          <polyline points="12 12 12 21" />
          <polyline points="9 15 12 12 15 15" />
        </svg>
        Upload file
      </button>
    </div>

    <!-- Các tab khác -->
  </div>
</template>

<script>
import axios from "axios";
import "./TrangChuHTQLN.css";

export default {
  name: "TrangChuHTQLN",
  data() {
    return {
      ngaytruoc: "",
      ngaysau: "",
      bcn: [], // dữ liệu so sánh chi nhánh
      dskhnx: [],
      uploadDate: "", // Người dùng chọn ngày (có thể dạng dd/mm/yyyy)
      selectedLoaiNo: "",
      selectedFile: null, // 👈 Sử dụng đúng biến này
      selectedRowIndex: null,
      fromDate: "",
      toDate: "",
      stats: [
        { title: "DNTT", amount: 0, change: 0 },
        { title: "NN2TT", amount: 0, change: 0 },
        { title: "NXTT", amount: 0, change: 0 },
        { title: "TLNXTT", amount: 0, change: 0 },
      ],
      tabs: ["DSKHNN2", "DSKHNX", "BCN", "XFBC", "Upload File"],
      activeTab: "DSKHNN2",
      dskhnn2: [
        {
          idkh: "KH001",
          idcn: "CN01",
          ten: "Nguyễn Văn A",
          trangthai: "Tăng",
          cn: "Hà Nội",
        },
        {
          idkh: "KH002",
          idcn: "CN02",
          ten: "Trần Thị B",
          trangthai: "Giảm",
          cn: "HCM",
        },
        {
          idkh: "KH003",
          idcn: "CN03",
          ten: "Lê Văn C",
          trangthai: "Không còn",
          cn: "Đà Nẵng",
        },
      ],
    };
  },
  methods: {
    async xuatFile() {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/XFBC/generateBCAndExport",
          {
            ngaytruoc: this.ngaytruoc,
            ngaysau: this.ngaysau,
          },
          { responseType: "blob" } // quan trọng để nhận file Excel
        );

        // Tạo link download file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute(
          "download",
          `BaoCaoTT-${this.ngaytruoc}-${this.ngaysau}.xlsx`
        );
        document.body.appendChild(link);
        link.click();
      } catch (err) {
        console.error("❌ Xuất Excel lỗi:", err);
      }
    },
    formatCurrency(value) {
      if (!value) return "0 triệu";
      return (value / 1_000_000).toLocaleString("vi-VN") + " triệu";
    },
    numberToWords(num) {
      if (!num) return "Không đồng";

      const ChuSo = [
        "không",
        "một",
        "hai",
        "ba",
        "bốn",
        "năm",
        "sáu",
        "bảy",
        "tám",
        "chín",
      ];
      const Tien = ["", "nghìn", "triệu", "tỷ", "nghìn tỷ", "triệu tỷ"];

      let s = "";
      let i = 0;
      while (num > 0) {
        let ty = num % 1000;
        if (ty > 0) {
          let str = this.readThreeDigits(ty, ChuSo);
          s = str + " " + Tien[i] + " " + s;
        }
        num = Math.floor(num / 1000);
        i++;
      }

      return s.trim() + " đồng";
    },

    readThreeDigits(num, ChuSo) {
      let tram = Math.floor(num / 100);
      let chuc = Math.floor((num % 100) / 10);
      let donvi = num % 10;
      let str = "";

      if (tram > 0) {
        str += ChuSo[tram] + " trăm ";
        if (chuc === 0 && donvi > 0) str += "linh ";
      }
      if (chuc > 1) {
        str += ChuSo[chuc] + " mươi ";
        if (donvi === 1) str += "mốt ";
        else if (donvi === 5) str += "lăm ";
        else if (donvi > 0) str += ChuSo[donvi] + " ";
      } else if (chuc === 1) {
        str += "mười ";
        if (donvi === 1) str += "một ";
        else if (donvi === 5) str += "lăm ";
        else if (donvi > 0) str += ChuSo[donvi] + " ";
      } else if (donvi > 0) {
        str += ChuSo[donvi] + " ";
      }
      return str.trim();
    },

    async searchData() {
      if (!this.fromDate || !this.toDate) {
        alert("❌ Vui lòng chọn đủ từ ngày và đến ngày!");
        return;
      }

      try {
        const res = await axios.get(
          "http://localhost:3000/api/BaoCaoTT/compare",
          {
            params: {
              date1: this.fromDate,
              date2: this.toDate,
            },
          }
        );

        const data = res.data;

        if (!Array.isArray(data) || data.length < 2) {
          alert("❌ Không đủ dữ liệu 2 ngày để tính toán!");
          return;
        }

        // 🔹 Sắp xếp theo ngày tăng dần để xác định ngày trước và ngày sau
        data.sort((a, b) => new Date(a.NgayNhap) - new Date(b.NgayNhap));

        const prev = data[0]; // ngày trước
        const next = data[1]; // ngày sau

        // 🔹 Tính tỷ lệ tăng giảm
        const calcChange = (prevVal, nextVal) => {
          if (prevVal === 0) return 0; // tránh chia cho 0
          return (((nextVal - prevVal) / prevVal) * 100).toFixed(2);
        };

        const calcDiff = (prevVal, nextVal) => nextVal - prevVal;

        this.stats = [
          {
            title: "DNTT",
            amount: next.DNTT,
            diff: calcDiff(prev.DNTT, next.DNTT),
            change: parseFloat(calcChange(prev.DNTT, next.DNTT)), // % tăng giảm
          },
          {
            title: "NN2TT",
            amount: next.NN2TT,
            diff: calcDiff(prev.NN2TT, next.NN2TT),
            change: parseFloat(calcChange(prev.NN2TT, next.NN2TT)),
          },
          {
            title: "NXTT",
            amount: next.NXTT,
            diff: calcDiff(prev.NXTT, next.NXTT),
            change: parseFloat(calcChange(prev.NXTT, next.NXTT)),
          },
          {
            title: "TLNXTT",
            amount: parseFloat(next.TLNXTT.toFixed(6)), // giá trị ngày sau
            change: parseFloat((next.TLNXTT - prev.TLNXTT).toFixed(6)), // tăng giảm tuyệt đối
          },
        ];
      } catch (err) {
        console.error("❌ Lỗi khi tìm kiếm:", err);
        alert("❌ Không tìm thấy dữ liệu!");
      }
    },

    // 🔹 Hàm mới: lấy dữ liệu DSKHNN2 theo logic so sánh 2 ngày
    async fetchDSKHNN2() {
      if (!this.fromDate || !this.toDate) {
        alert("❌ Vui lòng chọn đủ từ ngày và đến ngày!");
        return;
      }

      try {
        // Gọi API backend compareByDate
        const res = await axios.get("http://localhost:3000/api/htqln/compare", {
          params: {
            date1: this.fromDate,
            date2: this.toDate,
          },
        });

        const data = res.data;

        if (!Array.isArray(data) || data.length === 0) {
          this.dskhnn2 = [];
          alert("❌ Không có dữ liệu DSKHNN2 cho 2 ngày đã chọn!");
          return;
        }

        this.dskhnn2 = data.map((item) => {
          let trangthai = "";

          if (item.TrangThai === "Xuất hiện mới") trangthai = "Xuất hiện mới";
          else if (item.TrangThai === "Không còn nợ nhóm 2")
            trangthai = "Không còn nợ nhóm 2";
          else if (item.TrangThai === "Tăng nợ nhóm 2") trangthai = "Tăng";
          else if (item.TrangThai === "Giảm nợ nhóm 2") trangthai = "Giảm";

          return {
            idkh: item.MaKH,
            idcn: item.MaCN,
            ten: item.HoTenKH,
            trangthai,
            cn: item.TenCN,
            duNoDiff: item.DuNoDiff,
          };
        });

        console.log("Mapped DSKHNN2:", this.dskhnn2);

        console.log("✅ DSKHNN2 fetched:", this.dskhnn2.length, "entries");
      } catch (err) {
        console.error("❌ Lỗi khi fetch DSKHNN2:", err);
        alert("❌ Không thể lấy dữ liệu DSKHNN2!");
      }
    },

    // 🔹 Hàm mới: lấy dữ liệu DSKHNX (Nợ Xấu) theo logic so sánh 2 ngày
    async fetchDSKHNX() {
      if (!this.fromDate || !this.toDate) {
        alert("❌ Vui lòng chọn đủ từ ngày và đến ngày!");
        return;
      }

      try {
        // Gọi API backend compareNXByDate
        const res = await axios.get(
          "http://localhost:3000/api/htqln/compareNX",
          {
            params: {
              date1: this.fromDate,
              date2: this.toDate,
            },
          }
        );

        const data = res.data;

        if (!Array.isArray(data) || data.length === 0) {
          this.dskhnx = [];
          alert("❌ Không có dữ liệu DSKHNX cho 2 ngày đã chọn!");
          return;
        }

        this.dskhnx = data.map((item) => {
          let trangthai = "";

          if (item.TrangThai === "Xuất hiện mới") trangthai = "Xuất hiện mới";
          else if (item.TrangThai === "Không còn nợ xấu")
            trangthai = "Không còn nợ xấu";
          else if (item.TrangThai === "Tăng nợ xấu") trangthai = "Tăng";
          else if (item.TrangThai === "Giảm nợ xấu") trangthai = "Giảm";

          return {
            idkh: item.MaKH,
            idcn: item.MaCN,
            ten: item.HoTenKH,
            trangthai,
            cn: item.TenCN,
            duNoDiff: item.DuNoDiff,
          };
        });

        console.log("Mapped DSKHNX:", this.dskhnx);
        console.log("✅ DSKHNX fetched:", this.dskhnx.length, "entries");
      } catch (err) {
        console.error("❌ Lỗi khi fetch DSKHNX:", err);
        alert("❌ Không thể lấy dữ liệu DSKHNX!");
      }
    },

    async fetchBCN() {
      if (!this.fromDate || !this.toDate) {
        alert("❌ Vui lòng chọn đủ từ ngày và đến ngày!");
        return;
      }

      try {
        // gọi song song 3 API
        const [dnRes, nn2Res, nxRes] = await Promise.all([
          axios.get("http://localhost:3000/api/BaoCaoTT/compare-chinhanh", {
            params: { date1: this.fromDate, date2: this.toDate },
          }),
          axios.get("http://localhost:3000/api/BaoCaoTT/compare-nhom2", {
            params: { date1: this.fromDate, date2: this.toDate },
          }),
          axios.get("http://localhost:3000/api/BaoCaoTT/compare-noxau", {
            params: { date1: this.fromDate, date2: this.toDate },
          }),
        ]);

        const dnData = dnRes.data || [];
        const nn2Data = nn2Res.data || [];
        const nxData = nxRes.data || [];

        // gom theo MaCN (thực ra là brcd trong backend)
        const map = {};

        dnData.forEach((item) => {
          const key = item.brcd;
          map[key] = map[key] || { MaCN: key };
          map[key].DN = item.trangthai || "";
        });

        nn2Data.forEach((item) => {
          const key = item.brcd;
          map[key] = map[key] || { MaCN: key };
          map[key].NN2 = item.trangthai || "";
        });

        nxData.forEach((item) => {
          const key = item.brcd;
          map[key] = map[key] || { MaCN: key };
          map[key].NX = item.trangthai || "";
        });

        this.bcn = Object.values(map);
        console.log("✅ BCN data:", this.bcn);
      } catch (err) {
        console.error("❌ Lỗi khi fetch BCN:", err);
        alert("❌ Không thể lấy dữ liệu BCN!");
      }
    },

    statusClass(status) {
      if (!status) return "";
      if (status === "Tăng") return "status-tang";
      if (status === "Giảm") return "status-giam";
      return "status-khong"; // Không có sự biến động
    },

    async searchAll() {
      await this.searchData();
      await this.fetchDSKHNN2();
      await this.fetchDSKHNX();
      await this.fetchBCN(); // 👈 gọi thêm BCN
      this.activeTab = "DSKHNN2";
    },

    // giả sử bạn có biến selectedDate = "10/08/2025" từ input
    formatDate(dateStr) {
      // dateStr dạng dd/mm/yyyy
      const [day, month, year] = dateStr.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`; // yyyy-mm-dd
    },

    handleFileUpload(e) {
      this.selectedFile = e.target.files[0];
    },
    onFileChange(e) {
      this.selectedFile = e.target.files[0];
    },
    async submitUpload() {
      if (!this.uploadDate || !this.selectedLoaiNo || !this.selectedFile) {
        alert("❌ Vui lòng chọn ngày, loại nợ và file!");
        return;
      }

      try {
        const formData = new FormData();

        // 🔀 Nếu là BaoCaoTT thì key phải là "NgayNhap"
        if (this.selectedLoaiNo === "BaoCaoTT") {
          formData.append("NgayNhap", this.uploadDate);
        } else {
          formData.append("uploadDate", this.uploadDate);
        }

        formData.append("loaiNo", this.selectedLoaiNo);
        formData.append("file", this.selectedFile);

        // 🔀 Chọn endpoint theo loại nợ
        let url = "http://localhost:3000/api/htqln/upload";
        if (this.selectedLoaiNo === "BaoCaoTT") {
          url = "http://localhost:3000/api/BaoCaoTT/import/excel";
        }

        const res = await axios.post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        alert("✅ Upload thành công!");
        location.reload();
        console.log(res.data);
      } catch (err) {
        console.error("❌ Upload lỗi:", err);
        alert("❌ Upload thất bại!");
      }
    },
  },
};
</script>

<style scoped></style>
