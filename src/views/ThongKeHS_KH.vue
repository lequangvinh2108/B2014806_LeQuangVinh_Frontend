<template>
    <div class="fullscreen-tk">
        <h2>Thống kê hồ sơ khách hàng</h2>

        <!-- Bộ lọc ngày -->
        <div class="filter">
            <p style="color: blue;">Chọn ngày thống kê:</p>
            <label style="margin-left: 10px;">Từ ngày:</label>
            <input type="date" v-model="fromDate" style="height: 30px;"/>
            <label style="margin-left: 10px;">Đến ngày:</label>
            <input type="date" v-model="toDate" style="height: 30px;"/>
            <button @click="fetchStatistics" style="margin-left: 10px; height: 30px; background-color: green; color: white; border-radius: 5px;">
                Thống kê
            </button>
            <button @click="goHome" style="margin-left: 100px; width: 100px; height: 30px; background-color: red; color: white;  border-radius: 5px;">
                Thoát
            </button>
        </div>

        <!-- Tổng số giao dịch -->
        <div class="summary">
            <h4 style="color: red;">Tổng số giao dịch: {{ totalTransactions }}</h4>
        </div>

        <!-- Bảng thống kê -->
        <table>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Mã Chi Nhánh</th>
                    <th>Tên Chi Nhánh</th>
                    <th>Tổng Số Giao Dịch</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(branch, index) in statistics" :key="branch.MaCN">
                    <td>{{ index + 1 }}</td>
                    <td>{{ branch.MaCN }}</td>
                    <td>{{ branch.tenCN }}</td>
                    <td>{{ branch.totalTransactions }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import DatabaseService from "@/services/database.service";

export default {
    data() {
        return {
            fromDate: "",
            toDate: "",
            totalTransactions: 0,
            statistics: [],
        };
    },
    methods: {
        async fetchStatistics() {
            if (!this.fromDate || !this.toDate) {
                alert("Vui lòng chọn khoảng thời gian.");
                return;
            }

            try {
                const allRecords = await DatabaseService.getAll();
                const filteredRecords = allRecords.filter(record => {
                    return record.ngaydk >= this.fromDate && record.ngaydk <= this.toDate;
                });

                this.totalTransactions = filteredRecords.length;

                const groupedData = {};
                filteredRecords.forEach(record => {
                    if (!groupedData[record.MaCN]) {
                        groupedData[record.MaCN] = { MaCN: record.MaCN, tenCN: record.tenCN, totalTransactions: 0 };
                    }
                    groupedData[record.MaCN].totalTransactions += 1;
                });

                this.statistics = Object.values(groupedData);
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu thống kê:", error);
            }
        },
        goHome() {
            this.$router.push("/home");
        }
    }
};
</script>

<style scoped>
.fullscreen-tk {
  width: 80vw;
  height: 100vh;
  position: fixed;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  background-color: aliceblue;
  overflow: auto;
  padding: 20px;
  box-sizing: border-box;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1); 
}

h2 {
    color: red;
    margin-bottom: 30px;
}

.filter {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    margin-left: 1px;
    padding: 5px;
    border: solid 2px black;
    width: 100%;
}

.summary {
    margin-bottom: 20px;
    font-weight: bold;
}

table {
    width: 100%;
    border-collapse: collapse;
}

table, th, td {
    border: 2px solid black;
}

th, td {
    padding: 8px;
    text-align: center;
}
</style>
