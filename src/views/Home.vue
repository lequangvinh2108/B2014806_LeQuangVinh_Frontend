<template>
    <div class="home-container">
        <h1> 
            Chào mừng, {{ userData?.user || 'Người dùng' }} đến với Agribank
            <h2>Chương trình quản lý thẻ</h2>
        </h1>
        <canvas ref="fireworksCanvas"></canvas>
    </div>
</template>

<script>
import { Fireworks } from 'fireworks-js';

export default {
    data() {
        return {
            userData: null // Lưu thông tin người dùng
        };
    },
    mounted() {
        // Lấy thông tin user từ localStorage
        const user = localStorage.getItem("user");
        if (user) {
            this.userData = JSON.parse(user);
            console.log("this.userData: ", this.userData);
        } else {
            // Chưa đăng nhập, chuyển về trang đăng nhập
            window.location.href = "/";
        }

        // Xóa mọi ảnh nền cũ khi vào Home
        // document.body.style.background = "url('../../img/agribank.jpg') no-repeat center center fixed";
        // document.body.style.backgroundSize = "cover";
        
        // Khởi tạo pháo hoa
        const container = this.$refs.fireworksCanvas;
        const fireworks = new Fireworks(container, {
            acceleration: 1.05,
            friction: 0.97,
            gravity: 1.5,
            particles: 150,
            trace: 3,
            explosion: 5,
            brightness: { min: 50, max: 80 },
            decay: { min: 0.015, max: 0.03 },
            delay: { min: 30, max: 60 },
        });

        fireworks.start();
    },
    
};
</script>

<style scoped>
.home-container {
    color:yellow;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    position: relative;
}

h1 {
    font-size: 3rem;
    font-weight: bold;
    position: relative;
    z-index: 2;
}

canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
}

/* Nút đăng xuất */
.logout-button {
    position: absolute;
    top: 20px;
    right: 20px;
    background: red;
    color: white;
    border: none;
    padding: 10px 20px;
    font-size: 1rem;
    cursor: pointer;
    border-radius: 5px;
}

.logout-button:hover {
    background: darkred;
}
</style>
