<template>
  <div class="fullscreen">
    <h1 class="text-xl font-bold mb-4">Quản lý thông báo</h1>

    <div class="row">
      <div class="col">
        <input type="checkbox" v-model="hienThongBao" /> Hiện thông báo
      </div>
      <div class="col">
        <label>Phiên bản mới:</label><br />
        <input type="text" v-model="phienBanMoi" class="input" />
      </div>
      <div class="col">
        <label>Ngày cập nhật phiên bản mới:</label>
        <input type="date" v-model="ngayCapNhat" class="input" style="width: 210px;" />
      </div>
      <div class="col">
        <label>Ngày hiệu lực:</label><br />
        <input type="date" v-model="ngayHieuLuc" class="input" style="width: 200px;" />
      </div>
    </div>

    <hr />

    <div class="row-2">
      <div class="flex items-center gap-2">
        <input type="checkbox" v-model="khoaDangNhap" />
        <label style="margin-left: 5px;">Khóa đăng nhập khi chưa cập nhật mới</label>
        <label style="margin-left: 195px;">Size thông báo:</label>
        <input type="text" v-model="sizeThongBao" class="input size-input" style="width: 210px; margin-left: 5px;" />
      </div>
    </div>

    <hr />

    <div class="mb-2">
      <label>Nội dung thông báo:</label>
      <input type="text" v-model="noiDungThongBao" class="input w-full" style="width: 100%; height: 60px;" />
    </div>

    <div class="button-group">
      <div class="button-wrapper">
        <button @click="themThongBao" class="btn btn-green">Thêm</button>
      </div>
      <div class="button-wrapper">
        <button @click="suaThongBao" class="btn btn-yellow">Sửa</button>
      </div>
      <div class="button-wrapper">
        <button @click="xoaThongBao" class="btn btn-red">Xóa</button>
      </div>
      <div class="button-wrapper">
        <button @click="thoat" class="btn btn-gray">Thoát</button>
      </div>
    </div>

    <!-- Bảng danh sách thông báo -->
    <table class="table-auto w-full border-collapse border border-gray-400">
      <thead>
        <tr class="bg-gray-200">
          <th class="border-black p-2">STT</th>
          <th class="border-black p-2">Hiện thông báo</th>
          <th class="border-black p-2">Thông báo</th>
          <th class="border-black p-2">Phiên bản</th>
          <th class="border-black p-2">Hiệu lực</th>
          <th class="border-black p-2">Ngày CN chương trình</th>
          <th class="border-black p-2">Ngày hiệu lực</th>
          <th class="border-black p-2">Size thông báo</th>
          <th class="border-black p-2">ID</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(thongbao, index) in danhSachThongBao" :key="thongbao._id" class="border">
          <td class="border-black p-2">{{ index + 1 }}</td>
          <td class="border-black p-2">
            <input type="checkbox" v-model="thongbao.hienthongbao" @change="chonThongBao(thongbao)" />


          </td>
          <td class="border-black p-2">{{ thongbao.Thongbao }}</td>
          <td class="border-black p-2">{{ thongbao.Phienban }}</td>
          <td class="border-black p-2">
            <input type="checkbox" v-model="thongbao.Hieuluc"  />
          </td>
          <td class="border-black p-2">{{ thongbao.NgayCNchuongtrinh }}</td>
          <td class="border-black p-2">{{ thongbao.Ngayhieuluc }}</td>
          <td class="border-black p-2">{{ thongbao.SizeThongbao }}</td>
          <td class="border-black p-2">{{ thongbao._id }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import NotificationsService from "@/services/notifications.service";

export default {
  data() {
    return {
      hienThongBao: false,
      phienBanMoi: "",
      ngayCapNhat: "",
      ngayHieuLuc: "",
      khoaDangNhap: false,
      sizeThongBao: "",
      noiDungThongBao: "",
      danhSachThongBao: [],
      thongBaoDuocChon: null,

      loggedInUser: null, // Thông tin người dùng đăng nhập
    };
  },
  methods: {
    getLoggedInUser() {
            const userData = localStorage.getItem("user");
            if (userData) {
                this.loggedInUser = JSON.parse(userData);
                console.log("Người dùng đăng nhập:", this.loggedInUser);
            }
        },


    async loadDanhSachThongBao() {
      try {
        this.danhSachThongBao = await NotificationsService.getAll();
        // Gán thêm thuộc tính hienthongbao vào từng đối tượng thông báo mà không lưu vào database
        this.danhSachThongBao = this.danhSachThongBao.map(tb => ({
          ...tb,
          hienthongbao: tb.Hieuluc, // Gán mặc định theo Hieuluc
        }));
      } catch (error) {
        console.error("Lỗi khi tải danh sách thông báo:", error);
      }
    },

    convertDateToInputFormat(dateString) {
      if (!dateString) return "";
      const parts = dateString.split("/");
      return parts.length === 3 ? `${parts[2]}-${parts[1]}-${parts[0]}` : "";
    },

    convertDateToDatabaseFormat(dateString) {
      if (!dateString) return "";
      const parts = dateString.split("-");
      return parts.length === 3 ? `${parts[2]}/${parts[1]}/${parts[0]}` : "";
    },

    chonThongBao(thongbao) {
      this.hienThongBao = thongbao.hienthongbao; // Sử dụng thuộc tính mới
      this.noiDungThongBao = thongbao.Thongbao;
      this.phienBanMoi = thongbao.Phienban;
      this.ngayCapNhat = this.convertDateToInputFormat(thongbao.NgayCNchuongtrinh);
      this.ngayHieuLuc = this.convertDateToInputFormat(thongbao.Ngayhieuluc);
      this.sizeThongBao = thongbao.SizeThongbao;

      this.thongBaoDuocChon = thongbao;
    },

    themThongBao() {
      if (!this.noiDungThongBao.trim()) {
        alert("Vui lòng nhập nội dung thông báo!");
        return;
      }
      if (!this.phienBanMoi.trim()) {
        alert("Vui lòng nhập phiên bản mới!");
        return;
      }
      if (!this.ngayCapNhat) {
        alert("Vui lòng chọn ngày cập nhật chương trình!");
        return;
      }
      if (!this.ngayHieuLuc) {
        alert("Vui lòng chọn ngày hiệu lực!");
        return;
      }
      if (!this.sizeThongBao.trim()) {
        alert("Vui lòng nhập kích thước thông báo!");
        return;
      }

      const thongBaoMoi = {
        Thongbao: this.noiDungThongBao,
        Phienban: this.phienBanMoi,
        NgayCNchuongtrinh: this.convertDateToDatabaseFormat(this.ngayCapNhat),
        Ngayhieuluc: this.convertDateToDatabaseFormat(this.ngayHieuLuc),
        SizeThongbao: this.sizeThongBao,
        Hieuluc: this.hienThongBao,
      };

      NotificationsService.create(thongBaoMoi)
        .then(() => {
          alert("Đã thêm thông báo thành công!");
          location.reload(); // Tải lại trang
        })
        .catch(error => console.error("Lỗi khi thêm thông báo:", error));
    },


    suaThongBao() {
      const thongBaoCapNhat = {
        Thongbao: this.noiDungThongBao,
        Phienban: this.phienBanMoi,
        NgayCNchuongtrinh: this.convertDateToDatabaseFormat(this.ngayCapNhat),
        Ngayhieuluc: this.convertDateToDatabaseFormat(this.ngayHieuLuc),
        SizeThongbao: this.sizeThongBao,
        Hieuluc: this.hienThongBao,
      };

      NotificationsService.update(this.thongBaoDuocChon._id, thongBaoCapNhat)
        .then(() => {
          alert("Đã cập nhật thông báo thành công!");
          location.reload(); // Tải lại trang
        })
        .catch(error => console.error("Lỗi khi cập nhật thông báo:", error));
    },

    

     async xoaThongBao() {
      if (!this.thongBaoDuocChon) {
        alert("Vui lòng chọn một thông báo để xóa.");
        return;
      }
      
      try {
        
        await NotificationsService.delete(this.thongBaoDuocChon._id);
          alert("Đã xóa thông báo thành công!");
          location.reload(); // Tải lại trang
      } catch (error) {
        console.error("Lỗi khi xóa thông báo:", error);
      }
    },

    thoat() {
      this.$router.push({ path: "/home" });
    },
  },

  mounted() {
    this.loadDanhSachThongBao();
    this.getLoggedInUser();
  },
};

</script>

<style>
.fullscreen {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 56px;
  left: 0;
  background-color: aliceblue;
  overflow: auto;
  padding: 20px;
  box-sizing: border-box;
}

.input {
  width: 100%;
  padding: 6px;
  border: 1px solid #111010;
  border-radius: 5px;
}

.button-group {
  display: flex;
  justify-content: center;
  gap: 12px;
  padding: 12px;
}

.btn {
  width: 100px;
  border-radius: 5px;
  border: solid black 2px;
}

.btn-green { background-color: green; }
.btn-yellow { background-color: burlywood; }
.btn-red { background-color: red; }
.btn-gray { background-color: darkgray; }


table {
  margin-top: 20px;
  margin-bottom: 200px;
  width: 100%;
  border-collapse: collapse;
  border: 2px solid black;
  background-color: beige;
}

th,
td {
  border: 2px solid black;
  padding: 10px;
  text-align: center;
}

</style>