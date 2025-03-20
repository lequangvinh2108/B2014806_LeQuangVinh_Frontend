<template>
    <div class="full">
        <h2 class="text-2xl font-bold mb-4">Danh sách người dùng</h2>
        <!-- Dropdown lọc -->
        <!-- Thanh chứa nút thêm và dropdown -->
        <div class="row button-row21">
            <!-- Nút Thêm Người Dùng (Sát bên trái) -->
            <div>
                <button class="add-user-btn" @click="goToRegister()">
                + Thêm Người Dùng
                </button>
            </div>

            <!-- Bọc dropdown trong div để căn phải -->
            <div class="filter">
                <select v-model="selectedMadonvi" @change="filterUsers" class="filter-dropdown">
                    <option value="">Tất cả đơn vị</option>
                    <option v-for="(value, key) in madonviList" :key="value.Madonvi" :value="value.Madonvi">
                        {{ key }}
                    </option>
                </select>
            </div>
        </div>





        

        <table class="w-full border-collapse border border-gray-300 bg-custom" style="margin-bottom: 100px;">
            <thead>
                <tr class="bg-gray-200">
                    <th class="border border-gray-300 p-2">STT</th>
                    <th class="border border-gray-300 p-2">Madonvi</th>
                    <th class="border border-gray-300 p-2">MaCN</th>
                    <th class="border border-gray-300 p-2">Mã cán bộ</th>
                    <th class="border border-gray-300 p-2">Tên cán bộ</th>
                    <th class="border border-gray-300 p-2">Tên tắt cán bộ</th>
                    <th class="border border-gray-300 p-2">Chức vụ</th>
                    <th class="border border-gray-300 p-2">Quyền SD</th>
                    <th class="border border-gray-300 p-2">Hiệu lực</th>
                    <th class="border border-gray-300 p-2">Giấy Ủy Quyền</th>
                    <th class="border border-gray-300 p-2">Hành động</th>
                </tr>
            </thead>
            <tbody>
                <!-- <tr v-for="(user, index) in users" :key="user._id" class="text-center"> -->
                <tr v-for="(user, index) in filteredUsers" :key="user._id" class="text-center">
                    <td class="border border-gray-300 p-2">{{ index + 1 }}</td>
                    <td class="border border-gray-300 p-2">{{ user.Madonvi }}</td>
                    <td class="border border-gray-300 p-2">{{ user.MaCN }}</td>
                    <td class="border border-gray-300 p-2">{{ user.user }}</td>
                    <td class="border border-gray-300 p-2">{{ user.name }}</td>
                    <td class="border border-gray-300 p-2">{{ user.shortname }}</td>
                    <td class="border border-gray-300 p-2">{{ user.function }}</td>
                    <td class="border border-gray-300 p-2">{{ user.usage_rights }}</td>
                    <td class="border border-gray-300 p-2">{{ user.validity_of_use }}</td>
                    <td class="border border-gray-300 p-2">{{ user.authority }}</td>
                    <td class="border border-gray-300 p-2 action-buttons">
                        <button class="edit text-white px-3 py-1 rounded" 
                            @click="$router.push({ name: 'edit', params: { id: user._id } })">
                            Sửa
                        </button>
                        <button class="delete text-white px-3 py-1 rounded" @click="deleteUser(user._id)">Xóa</button>
                    </td>
                </tr>
                <tr v-if="filteredUsers.length === 0">
                    <td colspan="8" class="text-center p-3">Không có dữ liệu</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import UsersService from "../services/users.service";

export default {
    data() {
        return {
            users: [],
            filteredUsers: [],
            selectedMadonvi: "", // Giá trị lọc
            madonviList: {
                "Tỉnh Kiên Giang": { Madonvi: 20, MaCN: 7700 },
                "Huyện Kiên Lương": { Madonvi: 24, MaCN: 7701 },
                "Kiên Giang - PGD 01": { Madonvi: 1, MaCN: 7700 },
                "Huyện Hòn Đất": { Madonvi: 27, MaCN: 7706 },
                "Huyện Kiên Hải": { Madonvi: 28, MaCN: 7708 },
                "PGD Bình An - Kiên Hải": { Madonvi: 29, MaCN: 7708 },
                "Huyện Hà Tiên": { Madonvi: 36, MaCN: 7711 },
                "PGD Giang Thành - Hà Tiên": { Madonvi: 37, MaCN: 7711 },
                "Huyện Ba Hòn": { Madonvi: 40, MaCN: 7712 },
                "Huyện Rạch Sỏi": { Madonvi: 32, MaCN: 7716 },
                "PGD Mong Thọ - Rạch Sỏi": { Madonvi: 42, MaCN: 7713 },
                "TP Rạch Giá": { Madonvi: 33, MaCN: 7715 },
                "PGD 02 - TP Rạch Giá": { Madonvi: 2, MaCN: 7700 },
                "Mỹ Lâm": { Madonvi: 34, MaCN: 7716 },
                "PGD Sóc Sơn - Mỹ Lâm": { Madonvi: 45, MaCN: 7716 },
            },
        };
    },
    
    

    methods: {
        async fetchUsers() {
            try {
                const response = await UsersService.getAll();
                console.log("Dữ liệu trả về từ API:", response); // Kiểm tra dữ liệu
                this.users = response;
                this.filteredUsers = response; // Khởi tạo danh sách hiển thị ban đầu
            } catch (error) {
                console.error("Lỗi khi lấy danh sách người dùng:", error);
            }
        },

        async deleteUser(id) {
            if (confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
                try {
                    await UsersService.delete(id);
                    this.fetchUsers();
                } catch (error) {
                    console.error("Lỗi khi xóa người dùng:", error);
                }
            }
        },
        goToRegister() {
            this.$router.push({ path: "/register" });
        },
        filterUsers() {
            if (this.selectedMadonvi) {
                this.filteredUsers = this.users.filter(user => user.Madonvi == this.selectedMadonvi);
            } else {
                this.filteredUsers = this.users;
            }
        },
        getLoggedInUser() {
            const userData = localStorage.getItem("user");
            if (userData) {
                this.loggedInUser = JSON.parse(userData);
                console.log("Người dùng đăng nhập:", this.loggedInUser);
            }
        },
    },
    mounted() {
        this.fetchUsers();
        this.getLoggedInUser();
    },
};
</script>

<style >
.full {
    font-size: small;
}
table {
    width: 100%;
}

h2 {
    text-align: center;
    color: yellow;
}

.bg-custom {
    background-size: cover;
    background-color: aliceblue;
    

}

body {
    height: 100%; /* Đảm bảo phần tử cha có chiều cao 100% */
    margin: 0;
    padding: 0;
    background: url('../../img/agribank.jpg') no-repeat center center fixed;
    background-size: cover;
}


.action-buttons {
    display: flex;
    justify-content: center; /* Canh giữa */
    align-items: center; /* Căn giữa theo chiều dọc */
    gap: 10px; /* Khoảng cách giữa hai nút */
}


button.edit{
    background-color: rgb(24, 56, 238);
}
button.delete{
    background-color: rgb(231, 12, 30);
}


.add-user-btn {
    background-color: #4CAF50;
    font-size: 16px;
    font-weight: bold;
    border: none;
    cursor: pointer;
    padding: 8px 12px;
    color: white;
    border-radius: 5px;
    margin-left: 15px;
}

.add-user-btn:hover {
    background-color: #45a049;
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
    margin-left: 30px;
}

.button-row21 {
    margin-bottom: 10px;
}


</style>
