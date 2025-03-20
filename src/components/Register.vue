<template>
    <div id="wrapper">
        <form id="form-login" @submit.prevent="register">
            <h1 class="form-heading">Đăng Ký User</h1>

            <div class="form-group">
                <i class="fas fa-building"></i>
                <select class="form-input" v-model="unit" >
                    <option value="" disabled selected>Chọn đơn vị</option>
                    <option v-for="unit in unitList" :key="unit" :value="unit">
                        {{ unit }}
                    </option>
                </select>
                <i v-if="unit" class="fas fa-check-circle success-icon"></i>
            </div>

            

            <div class="form-group">
                <i class="far fa-user"></i>
                <input type="text" class="form-input" v-model="user" placeholder="Tên đăng nhập" required />
                <i v-if="user" class="fas fa-check-circle success-icon"></i>
            </div>

            <div class="form-group">
                <i class="fas fa-key"></i>
                <input :type="showPassword ? 'text' : 'password'" class="form-input" v-model="password"
                    placeholder="Mật khẩu" required />
                <div id="eye" @click="togglePassword">
                    <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
                </div>
                <i v-if="password" class="fas fa-check-circle success-icon"></i>
            </div>

            <div class="form-group">
                <i class="far fa-id-card"></i>
                <input type="text" class="form-input" v-model="name" placeholder="Tên đầy đủ" required />
                <i v-if="name" class="fas fa-check-circle success-icon"></i>
            </div>

            <div class="form-group">
                <i class="far fa-id-badge"></i>
                <input type="text" class="form-input" v-model="shortname" placeholder="Tên viết tắt" />
                <i v-if="shortname" class="fas fa-check-circle success-icon"></i>
            </div>

            
            <div class="form-group">
                <i class="fas fa-tasks"></i>
                <select class="form-input" v-model="function_1">
                    <option value="">Chọn chức năng</option>
                    <option v-for="role in functionList" :key="role" :value="role">
                        {{ role }}
                    </option>
                </select>
                <i v-if="function_1" class="fas fa-check-circle success-icon"></i>
            </div>


            <div class="form-group">
                <i class="fas fa-user-shield"></i>
                <select class="form-input" v-model="usage_rights">
                    <option value="">Chọn quyền sử dụng</option>
                    <option v-for="role in usageRightsList" :key="role" :value="role">
                        {{ role }}
                    </option>
                </select>
                <i v-if="usage_rights" class="fas fa-check-circle success-icon"></i>
            </div>


            <div class="form-group">
                <i class="fas fa-gavel"></i>
                <input type="text" class="form-input" v-model="authority" placeholder="Quyết định/Giấy ủy quyền số" />
                <i v-if="authority" class="fas fa-check-circle success-icon"></i>
            </div>

            <div class="form-group">
                <i class="fas fa-calendar-alt"></i>
                <select class="form-input" v-model="validity_of_use">
                    <option value="">Chọn hiệu lực sử dụng</option>
                    <option :value="true">Có hiệu lực</option>
                    <option :value="false">Không hiệu lực</option>
                </select>
                <i v-if="validity_of_use" class="fas fa-check-circle success-icon"></i>
            </div>


            
            <div class="form-group">
                <i class="fas fa-bars"></i>
                <select class="form-input" v-model="menu">
                    <option value="" disabled selected>Chọn menu</option>
                    <option value="all">Tất cả</option>
                    <option value="baocao">Báo cáo</option>
                </select>
                <i v-if="menu" class="fas fa-check-circle success-icon"></i>
            </div>


            <!-- <input type="submit" value="Đăng Ký" class="form-submit" /> -->
             <div class="button-group">
                <!-- <input type="submit" value="Đăng Ký" class="form-submit" /> -->
                <button @click="registerUser" class="form-submit" type="submit" value="Đăng Ký">Đăng Ký</button>
                <button type="button" class="form-submit" @click="exit" style="">Thoát</button>
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
            unitList: ["Tỉnh Kiên Giang", "Kiên Giang - PGD 01", "Huyện Kiên Lương", "Huyện Hòn Đất", "Huyện Kiên Hải", "PGD Bình An - Kiên Hải", "Huyện Hà Tiên", "PGD Giang Thành - Hà Tiên", "Huyện Ba Hòn", "Huyện Rạch Sỏi", "PGD Mong Thọ - Rạch Sỏi", "TP Rạch Giá", "PGD 02 - TP Rạch Giá", "Mỹ Lâm", "PGD Sóc Sơn - Mỹ Lâm"], // Danh sách đơn vị
            function_1: "",
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
            usage_rights: "", // Giá trị mặc định rỗng
            usageRightsList: ["admin", "manager", "user", "quanlybaocao"],

            
        };
    },
    mounted() {
        document.body.style.background = "url('../../img/agribank-2.jpg') no-repeat center center fixed";
        document.body.style.backgroundSize = "cover";
    },
    unmounted() {
        document.body.style.background = "";
    },
    watch: {
        unit(newUnit) {
            this.updateUnitCodes(newUnit);
        }
    },
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword;
        },

         updateUnitCodes(selectedUnit) {
            const unitMapping = {
                "Tỉnh Kiên Giang": { Madonvi: 20, MaCN: 7700 },
                "Huyện Kiên Lương": { Madonvi: 24, MaCN: 7701 },
                "Kiên Giang - PGD 01": { Madonvi: 1, MaCN: 7700},
                "Huyện Hòn Đất": { Madonvi: 27, MaCN: 7706},
                "Huyện Kiên Hải": { Madonvi: 28, MaCN: 7708},
                "PGD Bình An - Kiên Hải": { Madonvi: 29, MaCN: 7708},
                "Huyện Hà Tiên": { Madonvi: 36, MaCN: 7711},
                "PGD Giang Thành - Hà Tiên": { Madonvi: 37, MaCN: 7711},
                "Huyện Ba Hòn": { Madonvi: 40, MaCN: 7712},
                "Huyện Rạch Sỏi": { Madonvi: 32, MaCN: 7716},
                "PGD Mong Thọ - Rạch Sỏi": { Madonvi: 42, MaCN: 7713},
                "TP Rạch Giá": { Madonvi: 33, MaCN: 7715},
                "PGD 02 - TP Rạch Giá": { Madonvi: 2, MaCN: 7700},
                "Mỹ Lâm": { Madonvi: 34, MaCN: 7716},
                "PGD Sóc Sơn - Mỹ Lâm": { Madonvi: 45, MaCN: 7716},
            };

            if (unitMapping[selectedUnit]) {
                this.Madonvi = unitMapping[selectedUnit].Madonvi;
                this.MaCN = unitMapping[selectedUnit].MaCN;
            } else {
                this.Madonvi = "";
                this.MaCN = "";
            }
        },
        

        async registerUser() {
            if (!this.user || !this.password || !this.name) {
                this.errorMessage = "Vui lòng nhập đầy đủ thông tin!";
                return;
            }
            try {
                const userData = {
                    user: this.user,
                    password: this.password,
                    name: this.name,
                    shortname: this.shortname,
                    function: this.function_1,
                    usage_rights: this.usage_rights,
                    authority: this.authority,
                    validity_of_use: this.validity_of_use ,
                    menu: this.menu,
                    Madonvi: this.Madonvi,  // Gửi mã đơn vị
                    MaCN: this.MaCN,        // Gửi mã chi nhánh
                };
                
                await UsersService.create(userData);
                alert("Đăng ký thành công!");
                this.$router.push("/userlist");
            } catch (error) {
                console.error("Lỗi khi đăng ký:", error);
                this.errorMessage = "Có lỗi xảy ra, vui lòng thử lại!";
            }
        },

        exit() {
            this.$router.push("/userlist");
        },
    },
};
</script>

<style scoped>
#wrapper {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    /* margin-left: 25%; */
}

#form-login {
    max-width: 400px;
    background: rgba(0, 0, 0, 0.8);
    flex-grow: 1;
    padding: 30px 30px 40px;
    box-shadow: 0px 0px 17px 2px rgba(255, 255, 255, 0.8);
    border-radius: 15px;
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
