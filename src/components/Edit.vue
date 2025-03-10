<template>
    <div id="wrapper">
        <form id="form-edit" @submit.prevent="updateUser">
            <h1 class="form-heading">Chỉnh Sửa Người Dùng</h1>

            <div class="form-group">
                <i class="fas fa-building"></i>
                <select class="form-input" v-model="unit" >
                    <option value="" disabled selected>Chọn đơn vị</option>
                    <option v-for="unit in unitList" :key="unit" :value="unit">
                        {{ unit }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <i class="far fa-user"></i>
                <input type="text" class="form-input" v-model="user" placeholder="Tên đăng nhập"  />
            </div>

            <div class="form-group">
                <i class="fas fa-key"></i>
                <input :type="showPassword ? 'text' : 'password'" class="form-input" v-model="password"
                    placeholder="Mật khẩu mới" />
                <div id="eye" @click="togglePassword">
                    <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
                </div>
            </div>

            <div class="form-group">
                <i class="far fa-id-card"></i>
                <input type="text" class="form-input" v-model="name" placeholder="Tên đầy đủ" required />
            </div>

            <div class="form-group">
                <i class="far fa-id-badge"></i>
                <input type="text" class="form-input" v-model="shortname" placeholder="Tên viết tắt" />
            </div>

            <div class="form-group">
                <i class="fas fa-tasks"></i>
                <select class="form-input" v-model="function_1">
                    <option value="">Chọn chức năng</option>
                    <option v-for="role in functionList" :key="role" :value="role">
                        {{ role }}
                    </option>
                </select>
            </div>

            <div class="form-group">
                <i class="fas fa-user-shield"></i>
                <select class="form-input" v-model="usage_rights">
                    <option value="">Chọn quyền sử dụng</option>
                    <option v-for="role in usageRightsList" :key="role" :value="role">
                        {{ role }}
                    </option>
                </select>
            </div>


            <div class="form-group">
                <i class="fas fa-gavel"></i>
                <input type="text" class="form-input" v-model="authority" placeholder="Quyết định/Giấy ủy quyền số" />
            </div>

            <div class="form-group">
                <i class="fas fa-calendar-alt"></i>
                <select class="form-input" v-model="validity_of_use">
                    <option value="">Chọn hiệu lực sử dụng</option>
                    <option :value="true">Có hiệu lực</option>
                    <option :value="false">Không hiệu lực</option>
                </select>
            </div>


            
            <div class="form-group">
                <i class="fas fa-bars"></i>
                <select class="form-input" v-model="menu">
                    <option value="" disabled selected>Chọn menu</option>
                    <option value="all">Tất cả</option>
                    <option value="baocao">Báo cáo</option>
                </select>
            </div>

            <div class="button-group">
                <button class="form-submit" type="submit">Cập Nhật</button>
                <button type="button" class="form-submit" @click="exit" style="margin-top: 10px;">Thoát</button>
            </div>

            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import UsersService from "@/services/users.service";

export default {
    data() {
        return {
            id: this.$route.params.id,  // Lấy ID từ URL
            user: "",
            password: "",
            name: "",
            shortname: "",
            authority: "",
            validity_of_use: "",
            menu: "",
            showPassword: false,
            errorMessage: "",
            Madonvi: "", // Mã đơn vị
            MaCN: "", // Mã chi nhánh
            unit: "", // Lưu giá trị đơn vị được chọn
            function_1: "",
            usage_rights: "",
            unitList: [
                "Tỉnh Kiên Giang",
                "Kiên Giang - PGD 01",
                "Huyện Kiên Lương",
                "Huyện Hòn Đất",
                "Huyện Kiên Hải",
                "PGD Bình An - Kiên Hải",
                "Huyện Hà Tiên",
                "PGD Giang Thành - Hà Tiên",
                "Huyện Ba Hòn",
                "Huyện Rạch Sỏi",
                "PGD Mong Thọ - Rạch Sỏi",
                "TP Rạch Giá",
                "PGD 02 - TP Rạch Giá",
                "Mỹ Lâm",
                "PGD Sóc Sơn - Mỹ Lâm"
            ],
            functionList: [
                "Đại diện ngân hàng",
                "Phê duyệt",
                "Giao dịch viên",
                "Giám đốc",
                "Phó giám đốc",
                "Trưởng phòng",
                "Phó phòng",
                "Cán bộ"
            ],
            usageRightsList: ["admin", "manager", "user", "quanlybaocao"],

            // Mapping đơn vị với Madonvi và MaCN
            unitMapping: {
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
                "PGD Sóc Sơn - Mỹ Lâm": { Madonvi: 45, MaCN: 7716 }
            }
        };
    },

    watch: {
        unit(newUnit) {
            if (newUnit && this.unitMapping[newUnit]) {
                this.Madonvi = this.unitMapping[newUnit].Madonvi;
                this.MaCN = this.unitMapping[newUnit].MaCN;
            } else {
                this.Madonvi = "";
                this.MaCN = "";
            }
        }
    },

    async created() {
        await this.fetchUser();
    },

    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword;
        },

        async fetchUser() {
            try {
                const userData = await UsersService.getById(this.id);
                if (userData) {
                    this.user = userData.user;
                    this.name = userData.name;
                    this.password = userData.password;
                    this.function_1 = userData.function;
                    this.usage_rights = userData.usage_rights;
                    this.shortname = userData.shortname;
                    this.authority = userData.authority;
                    this.validity_of_use = userData.validity_of_use;
                    this.menu = userData.menu;

                    // Lấy Madonvi từ API
                    this.Madonvi = userData.Madonvi;

                    // Tìm unit tương ứng với Madonvi
                    this.unit = Object.keys(this.unitMapping).find(
                        key => this.unitMapping[key].Madonvi === this.Madonvi
                    ) || "";

                    // Cập nhật MaCN nếu tìm thấy unit
                    if (this.unit) {
                        this.MaCN = this.unitMapping[this.unit].MaCN;
                    }
                } else {
                    this.errorMessage = "Không tìm thấy người dùng!";
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu người dùng:", error);
                this.errorMessage = "Không thể tải dữ liệu người dùng!";
            }
        },

        async updateUser() {
            if (!this.name) {
                this.errorMessage = "Tên đầy đủ không được để trống!";
                return;
            }
            try {
                // Tìm Madonvi tương ứng với unit
                const selectedUnit = this.unitMapping[this.unit] || {};
                const Madonvi = selectedUnit.Madonvi || "";
                const MaCN = selectedUnit.MaCN || "";

                const updatedData = {
                    user: this.user,
                    name: this.name,
                    function: this.function_1,
                    usage_rights: this.usage_rights,
                    shortname: this.shortname,
                    authority: this.authority,
                    validity_of_use: this.validity_of_use,
                    menu: this.menu,
                    MaCN: MaCN, 
                    Madonvi: Madonvi // Chuyển về số
                };
                if (this.password) {
                    updatedData.password = this.password;
                }
                await UsersService.update(this.id, updatedData);
                alert("Cập nhật thành công!");
                this.$router.push("/userlist");
            } catch (error) {
                console.error("Lỗi khi cập nhật người dùng:", error);
                this.errorMessage = "Có lỗi xảy ra, vui lòng thử lại!";
            }
        },

        exit() {
            this.$router.push("/userlist");
        },
    }
};
</script>



<style scoped>
/* Giữ nguyên phong cách như register.vue */
#wrapper {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 25%;
}

#form-edit {
    max-width: 400px;
    background: rgba(0, 0, 0, 0.8);
    padding: 30px 30px 40px;
    border-radius: 15px;
    box-shadow: 0px 0px 17px 2px rgba(255, 255, 255, 0.8);
}

.form-heading {
    font-size: 25px;
    color: #f5f5f5;
    text-align: center;
    margin-bottom: 30px;
}

.form-group {
    border-bottom: 1px solid #fff;
    margin-top: 15px;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
}

.form-group i {
    color: #fff;
    font-size: 14px;
    padding-top: 5px;
    padding-right: 10px;
}

.form-input {
    background: transparent;
    border: 0;
    outline: 0;
    color: #f5f5f5;
    flex-grow: 1;
}

.form-input::placeholder {
    color: #f5f5f5;
}

#eye {
    cursor: pointer;
    padding-left: 10px;
}

.form-submit {
    background: transparent;
    border: 1px solid #f5f5f5;
    color: #fff;
    width: 100%;
    text-transform: uppercase;
    padding: 6px 10px;
    transition: 0.25s ease-in-out;
    margin-top: 30px;
}

.form-submit:hover {
    border: 1px solid #54a0ff;
}

.error-message {
    color: white;
    text-align: center;
    margin-top: 10px;
}

.form-group i {
    color: white;
    font-size: 14px;
    padding-top: 5px;
    padding-right: 10px;
    transition: color 0.3s ease;
}

.form-group:hover i {
    color: #54a0ff; /* Màu xanh khi hover */
}

.form-group select {
    background: transparent;
    border: none;
    outline: none;
    color: #f5f5f5;
    width: 100%;
    font-size: 14px;
    appearance: none; /* Ẩn style mặc định của trình duyệt */
}

.form-group select option {
    color: black; /* Màu chữ của dropdown khi mở */
}

.success-icon {
    color: #28a745; /* Màu xanh lá cây */
    font-size: 18px;
    margin-left: 10px;
}

</style>
