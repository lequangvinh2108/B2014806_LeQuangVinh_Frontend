<template>
    <div class="page">
        <h4>Tạo Liên hệ mới</h4>
        <ContactForm :contact="newContact" @submit:contact="createContact" />
        <p>{{ message }}</p>
    </div>
</template>

<script>
import ContactForm from "@/components/ContactForm.vue";
import ContactService from "@/services/contact.service";

export default {
    components: {
        ContactForm,
    },
    data() {
        return {
            newContact: {
                name: "",
                email: "",
                address: "",
                phone: "",
                favorite: false,
            },
            message: "",
        };
    },
    methods: {
        async createContact(data) {
            try {
                await ContactService.create(data);
                this.message = "Liên hệ được tạo thành công.";

                // Hiển thị thông báo trong 3 giây trước khi chuyển hướng
                setTimeout(() => {
                    // Sau khi chờ 3 giây, chuyển hướng đến đường dẫn "contactbook"
                    this.$router.push({ name: "contactbook" });
                }, 3000);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>