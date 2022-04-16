import { createWebHistory, createRouter } from "vue-router";
import Index from "@/components/index.vue";
import Login from "@/components/login.vue";
import Register from "@/components/register.vue";
import Addbedsforsell from "@/components/addbedsforsell.vue";
import Profile from "@/components/profile.vue";
import Findbeds from "@/components/findbeds.vue";
import Buybeds from "@/components/buybeds.vue";
import Beds from "@/components/beds.vue";
import Bedsdetail from "@/components/bedsdetail.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
  {
    path: "/addbedsforsell",
    name: "addbedsforsell",
    component: Addbedsforsell,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/findbeds",
    name: "findbeds",
    component: Findbeds,
  },
  {
    path: "/buybeds/:id",
    name: "buybeds",
    component: Buybeds,
  },
  {
    path: "/beds",
    name: "beds",
    component: Beds,
  },
  {
    path: "/bedsdetail/:id",
    name: "bedsdetail",
    component: Bedsdetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
