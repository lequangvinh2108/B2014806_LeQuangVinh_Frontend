<template>
    <div id="wrapper">
        <form id="form-login" @submit.prevent="login">
            <h1 class="form-heading">Đăng nhập</h1>
            <div class="form-group">
                <i class="far fa-user"></i>
                <input type="text" class="form-input" v-model="username" placeholder="Tên đăng nhập" />
            </div>
            <div class="form-group">
                <i class="fas fa-key"></i>
                <input :type="showPassword ? 'text' : 'password'" class="form-input" v-model="password"
                    placeholder="Mật khẩu" />
                <div id="eye" @click="togglePassword">
                    <i :class="showPassword ? 'far fa-eye-slash' : 'far fa-eye'"></i>
                </div>
            </div>
            <input type="submit" value="Đăng nhập" class="form-submit" />
            <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
        </form>
    </div>
</template>

<script>
import { RouterLink } from "vue-router";
import UserService from "../services/users.service";

export default {
    data() {
        return {
            username: "",
            password: "",
            showPassword: false,
            errorMessage: "",
        };
    },
    mounted() {
        document.body.style.background = "url('../../img/agribank.jpg') no-repeat center center fixed";
        document.body.style.backgroundSize = "cover";
    },
    unmounted() {
        document.body.style.background = "";
    },
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
        async login() {
            try {
                const response = await UserService.login(this.username, this.password);

                if (response.message === "Login successful") {
                    this.$router.push("/home"); // Chuyển đến trang Home nếu đăng nhập thành công
                } else {
                    this.errorMessage = "Tên đăng nhập hoặc mật khẩu không đúng!";
                }
            } catch (error) {
                this.errorMessage = "Tên đăng nhập hoặc mật khẩu không đúng!";
                console.error("Lỗi đăng nhập:", error.response?.data || error.message);
            }
        }
    },
};
</script>


<style scoped>
#wrapper {
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
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

#eye i {
    padding-right: 0;
    cursor: pointer;
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
</style>
