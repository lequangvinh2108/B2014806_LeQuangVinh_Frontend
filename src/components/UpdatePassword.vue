<template>
  <div id="wrapper">
    <form id="form-edit" @submit.prevent="updatePassword">
      <h1 class="form-heading">Đổi Mật Khẩu</h1>

      <div class="form-group">
        <i class="fas fa-lock"></i>
        <input
          :type="showPassword ? 'text' : 'password'"
          class="form-input"
          v-model="password"
          placeholder="Mật khẩu hiện tại"
        />
      </div>

      <div class="form-group">
        <i class="fas fa-key"></i>
        <input
          :type="showPassword ? 'text' : 'password'"
          class="form-input"
          v-model="newPassword"
          placeholder="Mật khẩu mới"
        />
      </div>

      <div class="form-group">
        <i class="fas fa-check-circle"></i>
        <input
          :type="showPassword ? 'text' : 'password'"
          class="form-input"
          v-model="confirmPassword"
          placeholder="Xác nhận mật khẩu"
        />
        <div id="eye" @click="togglePassword">
          <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
        </div>
      </div>

      <div class="button-group">
        <button class="form-submit" type="submit">Cập Nhật</button>
        <button type="button" class="form-submit" @click="exit">Thoát</button>
      </div>

      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-icon">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
import UsersService from "../services/users.service";

export default {
  data() {
    return {
      password: "",
      newPassword: "",
      confirmPassword: "",
      showPassword: false,
      errorMessage: "",
      successMessage: "",
      currentUserId: null,
    };
  },
  async created() {
    // Lấy user đang đăng nhập (tùy theo cách bạn lưu người dùng)
    const user = JSON.parse(localStorage.getItem("user")); // hoặc dùng Vuex
    if (user && user._id) {
      this.currentUserId = user._id;
    } else {
      this.errorMessage = "Không tìm thấy người dùng đang đăng nhập!";
    }
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    async updatePassword() {
      this.errorMessage = "";
      this.successMessage = "";

      if (!this.password || !this.newPassword || !this.confirmPassword) {
        this.errorMessage = "Vui lòng điền đầy đủ các trường!";
        return;
      }

      if (this.newPassword !== this.confirmPassword) {
        this.errorMessage = "Mật khẩu mới và xác nhận không khớp!";
        return;
      }

      try {
        // Bước 1: Kiểm tra mật khẩu hiện tại (nếu backend yêu cầu)
        const user = JSON.parse(localStorage.getItem("user"));
        const loginResponse = await UsersService.login(
          user.user,
          this.password
        );

        if (!loginResponse) {
          this.errorMessage = "Mật khẩu hiện tại không đúng!";
          return;
        }

        // Bước 2: Gửi yêu cầu cập nhật mật khẩu mới
        await UsersService.updatePassword(this.currentUserId, this.newPassword);

        this.successMessage = "Đổi mật khẩu thành công!";
        this.password = "";
        this.newPassword = "";
        this.confirmPassword = "";
      } catch (error) {
        console.error("Lỗi khi cập nhật mật khẩu:", error);
        this.errorMessage =
          error.response?.data?.message || "Có lỗi xảy ra, vui lòng thử lại!";
      }
    },
    exit() {
      this.$router.push("/userlist");
    },
  },
};
</script>

<style scoped>
/* Giữ nguyên phong cách như register.vue */
#wrapper {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-left: 25%; */
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
