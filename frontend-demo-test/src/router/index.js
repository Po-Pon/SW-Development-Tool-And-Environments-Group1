import { createWebHistory, createRouter } from "vue-router"
import Index from "@/pages/index.vue"
import Login from "@/pages/login.vue"
import Register from "@/pages/register.vue"
import Addbedsforsell from "@/pages/addbedsforsell.vue"
import Profile from "@/pages/profile.vue"
import Findbeds from "@/pages/findbeds.vue"
import Buybeds from "@/pages/buybeds.vue"
import Beds from "@/pages/beds.vue"

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
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
