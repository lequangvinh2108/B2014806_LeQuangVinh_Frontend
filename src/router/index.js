import { createWebHistory, createRouter } from "vue-router";
import Login from "../components/Login.vue";
import Home from "../views/Home.vue";
import DKKHCN from "../views/DKKHCN.vue";
import Register from "../components/Register.vue";
import Edit from "../components/Edit.vue";
import UserList from "../components/UserList.vue";
import Notifications from "../components/Notifications.vue";
import Thongke from "../views/ThongKeHS_KH.vue";
import UpdateCardDate from "../views/UpdateCardDate.vue";


const routes = [
    {
        path: "/updatecarddate",
        name: "updatecarddate",
        component: UpdateCardDate,
    },
    {
        path: "/thongke",
        name: "thongke",
        component: Thongke,
    },
    {
        path: "/notifications",
        name: "notifications",
        component: Notifications,
    },
    {
        path: "/userlist",
        name: "userlist",
        component: UserList,
    },
    {
        path: "/edit/:id",
        name: "edit",
        component: Edit,
    },
    {
        path: "/",
        name: "login",
        component: Login,
    },
    {
        path: "/dkkhcn",
        name: "dkkhcn",
        component: DKKHCN,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },
    {
        path: "/home",
        name: "home",
        component: Home,
    },
    {
        path: "/:pathMatch(.*)*",
        name: "notfound",
        component: () =>
            import ("../views/NotFound.vue"),
    },
    
];

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes,
});

export default router;