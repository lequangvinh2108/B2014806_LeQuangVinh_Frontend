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
import LeaveOfAbsence from "../views/Leave_of_absence.vue";
import create_leaveofabsence from "../views/create_leaveofabsence.vue";
import Home_leaveofabsence from "../views/Home_leaveofabsence.vue";
import edit_leaveofabsence from "../views/edit_leaveofabsence.vue";
import vongquay from "../views/vongquay.vue";
import UpdatePassword from "../components/UpdatePassword.vue";
import create_users from "../components/create_users.vue";

const routes = [
  {
    path: "/createusers",
    name: "createusers",
    component: create_users,
  },
  {
    path: "/updatepassword",
    name: "updatepassword",
    component: UpdatePassword,
  },
  {
    path: "/vongquay",
    name: "vongquay",
    component: vongquay,
  },
  {
    path: "/edit-leaveofabsence/:id",
    name: "editleaveofabsence",
    component: edit_leaveofabsence,
  },
  {
    path: "/homeleaveofabsence",
    name: "homeleaveofabsence",
    component: Home_leaveofabsence,
  },
  {
    path: "/createleaveofabsence",
    name: "createleaveofabsence",
    component: create_leaveofabsence,
  },
  {
    path: "/leaveofabsence",
    name: "leaveofabsence",
    component: LeaveOfAbsence,
  },
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
    component: () => import("../views/NotFound.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
