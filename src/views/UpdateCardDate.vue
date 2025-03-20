<template>
  <div class="container mx-auto p-4">
    <h1 style="text-align: center; color: brown; margin-bottom: 50px;">Cập nhật ngày kích hoạt thẻ</h1>

    <!-- Ngày đăng ký -->
    <div class="flex space-x-4 mt-2" style="padding: 2px; border: solid 1px black;">
      <label style="color: blue; margin-right: 200px;"><b>Ngày đăng ký thẻ:</b></label>
      <label style="color: blue; margin-right: 60px; font-weight: bold;">Ngày tìm kiếm:</label>
      <label style="color: blue; margin-right: 20px; font-weight: bold;">Từ ngày:</label>
      <input type="date" v-model="fromDate" class="border p-2" style="height: 30px;">
      <label style="color: blue; margin-right: 20px; font-weight: bold; margin-left: 20px;">Đến ngày:</label>
      <input type="date" v-model="toDate" class="border p-2" style="height: 30px;">
    </div>

    
    <div style="padding: 2px; border: solid 1px black; height: 300px; display: flex; flex-direction: column;">
        <div class="flex space-x-4 mt-2">
            <label style="color: blue; margin-right: 20px; font-weight: bold;">Tiêu chí tra cứu:</label>
            <select v-model="searchCriteria" class="border p-2" style="height: 35px; font-size: small; width: 200px; border-radius: 5px;">
            <option value="all">Tất cả</option>
            <option value="hoten">Tên</option>
            <option value="cmnd">CMND</option>
            <option value="MaKH">Mã KH</option>
            </select>
            <label style="color: blue; margin-right: 20px; font-weight: bold; margin-left: 20px;">Nhập thông tin:</label>
            <input type="text" v-model="searchValue" class="border p-2" style="height: 30px; width: 400px; border-radius: 5px;">
            <button @click="fetchCustomers" style="height: 35px; width: 100px; border-radius: 5px; background-color: white; color: black; font-weight: bold; margin-left: 20px;">Tra cứu</button>
        </div>

        

        <!-- Phần này sẽ tự động co giãn theo số lượng dữ liệu -->
        <div style="flex-grow: 1; overflow-y: auto; padding: 1px; border: solid black 2px; margin-top: 10px;">
            <table class="border-collapse border border-gray-300 w-full">
                <thead class="sticky top-0 bg-gray-200">
                    <tr class="font-bold">
                    <th class="border p-2">Chọn</th>
                    <th class="border p-2">STT</th>
                    <th class="border p-2">Ngày ĐK</th>
                    <th class="border p-2">Họ và tên</th>
                    <th class="border p-2">CMND</th>
                    <th class="border p-2">Mã KH</th>
                    <th class="border p-2">Ngày kích hoạt</th>
                    <th class="border p-2">Ngày hết hạn</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="searched && customers.length === 0">
                    <td colspan="8" class="border p-4 text-center text-red-500 font-bold">
                        Không có dữ liệu!
                    </td>
                    </tr>
                    <tr v-for="(customer, index) in customers" :key="customer._id">
                    <td class="border p-2">
                        <input type="checkbox" v-model="selectedCustomers" :value="customer">
                    </td>
                    <td class="border p-2">{{ index + 1 }}</td>
                    <td class="border p-2">{{ customer.ngaydk }}</td>
                    <td class="border p-2">{{ customer.hoten }}</td>
                    <td class="border p-2">{{ customer.cmnd }}</td>
                    <td class="border p-2">{{ customer.MaKH }}</td>
                    <td class="border p-2">{{ customer.ngayphathanh }}</td>
                    <td class="border p-2">{{ customer.ngaydenhan }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>



    <!-- Ngày kích hoạt thẻ -->
    <div class="flex space-x-4 mt-4" style="padding: 2px; border: solid 1px black;">
      <label style="color: blue; font-weight: bold;">CMND:</label>
      <input type="text" :value="selectedCustomer ? selectedCustomer.cmnd : ''" class="border p-2" style="height: 35px; margin-left: 20px; border-radius: 5px;" disabled>
    </div>

    <div class="flex space-x-4 mt-2" style="padding: 2px; border: solid 1px black;">
      <label style="color: blue; font-weight: bold;">Ngày kích hoạt thẻ:</label>
      <input type="date" v-model="issueDate" class="border p-2" style="height: 35px; margin-left: 20px;">
      <label style="color: blue; font-weight: bold; margin-left: 20px;">Ngày hết hạn thẻ:</label>
      <input type="date" v-model="expiryDate" class="border p-2" style="height: 35px; margin-left: 20px;">
    </div>

    <!-- Nút hành động -->
    <div class="mt-2" style="padding: 2px; border: solid 1px black;">
      <button @click="updateCardDates" style="height: 35px; width: 150px; border-radius: 5px; background-color: white; font-weight: bold; margin-left: 25%;">
        Ghi dữ liệu
      </button>
      <button @click="goHome" style="height: 35px; width: 150px; border-radius: 5px; background-color: white; font-weight: bold; margin-left: 15%;">
        Thoát
      </button>
    </div>
  </div>
</template>

<script>
import DatabaseService from "../services/database.service";

export default {
  data() {
    return {
      fromDate: "",
      toDate: "",
      searchCriteria: "all",
      searchValue: "",
      customers: [],
      selectedCustomers: [],
      issueDate: "",
      expiryDate: "",
      searched: false,
    };
  },
  methods: {
    async fetchCustomers() {
  try {
    let allCustomers = await DatabaseService.getAll();
    this.searched = true;

    this.customers = allCustomers.filter(customer => {
      let isValidDate = true;
      let isValidSearch = true;

      // Lọc theo ngày đăng ký (nếu có)
      if (this.fromDate && this.toDate) {
        let ngaydk = new Date(customer.ngaydk);
        let from = new Date(this.fromDate);
        let to = new Date(this.toDate);
        isValidDate = ngaydk >= from && ngaydk <= to;
      }

      // Lọc theo tiêu chí tìm kiếm
      if (this.searchValue) {
        let searchValueLower = this.searchValue.toLowerCase();

        if (this.searchCriteria === "all") {
          // Nếu tìm kiếm "Tất cả", kiểm tra tất cả các trường
          isValidSearch = ["hoten", "cmnd", "MaKH"].some(key => 
            customer[key] && String(customer[key]).toLowerCase().includes(searchValueLower)
          );
        } else {
          // Nếu tìm kiếm theo một tiêu chí cụ thể
          let fieldValue = customer[this.searchCriteria] ? String(customer[this.searchCriteria]).toLowerCase() : "";
          isValidSearch = fieldValue.includes(searchValueLower);
        }
      }

      return isValidDate && isValidSearch;
    });

  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu khách hàng:", error);
  }
},
    async updateCardDates() {
      if (this.selectedCustomers.length === 0) return alert("Vui lòng chọn ít nhất một khách hàng!");
      if (!this.issueDate || !this.expiryDate) return alert("Vui lòng chọn ngày kích hoạt và ngày hết hạn!");

      try {
        await Promise.all(this.selectedCustomers.map(customer =>
          DatabaseService.update(customer._id, { ngayphathanh: this.issueDate, ngaydenhan: this.expiryDate })
        ));
        alert("Cập nhật thành công!");
        this.selectedCustomers = [];
        this.fetchCustomers();
      } catch (error) {
        alert("Cập nhật thất bại!");
      }
    },
    goHome() {
      this.$router.push("/home");
    },
  },
  
};
</script>


<style scoped>
.container {
  max-width: 1200px;
  background-color: aliceblue;
}
.overflow-x-auto {
  max-width: 100%;
  overflow-x: auto;
  margin-top: 10px;
}
tbody {
  display: block;
  max-height: 400px; /* Giới hạn chiều cao của bảng */
  overflow-y: auto;  /* Thêm cuộn nếu quá dài */
}

table {
  width: 100%;
  border-collapse: collapse;
}

td, th {
  white-space: nowrap; /* Giữ nội dung không bị xuống dòng */
}

tr {
  display: table;
  width: 100%;
  table-layout: fixed;
}

</style>
