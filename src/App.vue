<script>
import AppHeader from "@/components/AppHeader.vue";
import { useRoute } from "vue-router";
import { computed } from "vue";

export default {
  components: {
    AppHeader,
  },
  setup() {
    const route = useRoute();

    // Ẩn AppHeader nếu là trang login hoặc homeleaveofabsence
    const isLoginPage = computed(
      () => route.path === "/" || route.path === "/homeleaveofabsence"
    );

    return { isLoginPage };
  },
};
</script>

<template>
  <div id="app">
    <!-- Chỉ hiển thị AppHeader nếu không phải trang login -->
    <AppHeader v-if="!isLoginPage" />
    <!-- <AppHeader /> -->

    <div class="container mt-3">
      <router-view />
    </div>
  </div>
</template>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
