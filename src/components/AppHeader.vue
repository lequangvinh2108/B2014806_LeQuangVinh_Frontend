<template>
    <nav class="navbar navbar-expand navbar-dark" style="background-color: green;">
        <div class="navbar-left">
            <div class="navbar-brand">
                <router-link to="/home" class="text-white font-bold">Agribank</router-link>
            </div>

            <div class="menu">
                <!-- Select Menu Giao Dịch -->
                <select v-model="selectedTransactionPage" @change="navigate" class="menu-select">
                    <option value="" disabled selected>📌 Menu giao dịch</option>
                    <option value="/dkkhcn">Đăng ký KH cá nhân</option>
                    <option value="/updatecarddate">Cập nhật ngày phát hành thẻ</option>
                    <option value="/thongke">Thống kê HS Khách hàng</option>
                </select>

                <!-- Select Menu Quản Trị (Chỉ hiển thị nếu user là admin) -->
                <select v-if="isAdmin" v-model="selectedAdminPage" @change="navigate" class="menu-select" style="margin-left: 20px;">
                    <option value="" disabled selected>⚙️ Menu quản trị</option>
                    <option value="/userlist">Quản lý User</option>
                    <option value="/notifications">Quản lý Thông báo</option>
                </select>
            </div>
        </div>

        <!-- Kiểm tra trạng thái đăng nhập -->
        <div class="nav-auth">
            <span v-if="user" class="user-info">Xin chào, {{ user.name }}</span>
            <router-link v-if="!user" to="/" class="navbar-brand">Đăng nhập</router-link>
            <router-link v-if="!user" to="/register" class="navbar-brand">Đăng Ký</router-link>
            <button v-if="user" @click="logout" class="logout-button">Đăng xuất</button>
        </div>
    </nav>
</template>

<script>
export default {
    data() {
        return {
            user: null, // Lưu thông tin user đăng nhập
            selectedTransactionPage: "",
            selectedAdminPage: "",
        };
    },
    computed: {
        isAdmin() {
            return this.user && this.user.usage_rights === "admin";
        }
    },
    created() {
        this.updateUser(); // Kiểm tra user khi component được tạo
    },
    watch: {
        // Theo dõi đường dẫn route, khi thay đổi thì cập nhật user
        $route() {
            this.updateUser();
        }
    },
    methods: {
        navigate() {
            if (this.selectedTransactionPage) {
                this.$router.push(this.selectedTransactionPage);
                this.selectedTransactionPage = "";
            } else if (this.selectedAdminPage) {
                this.$router.push(this.selectedAdminPage);
                this.selectedAdminPage = "";
            }
        },
        updateUser() {
            const storedUser = localStorage.getItem("user");
            this.user = storedUser ? JSON.parse(storedUser) : null;
        },
        logout() {
            localStorage.removeItem("user"); // Xóa thông tin user
            this.user = null; // Cập nhật trạng thái đăng nhập
            this.$router.push("/");
        }
    }
};
</script>

<style scoped>
.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
}

/* Căn logo và menu sát nhau */
.navbar-left {
    display: flex;
    align-items: center;
    gap: 10px; /* Tạo khoảng cách nhỏ giữa logo và menu */
}

.menu-select {
    padding: 6px;
    border-radius: 5px;
    border: none;
    font-size: 14px;
}

.nav-auth {
    display: flex;
    align-items: center;
}

.user-info {
    color: white;
    margin-right: 15px;
}

.logout-button {
    background: red;
    color: white;
    border: none;
    padding: 8px 15px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
}

.logout-button:hover {
    background: darkred;
}
</style>
