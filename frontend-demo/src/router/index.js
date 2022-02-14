import { createWebHistory, createRouter } from "vue-router";
import Index from "@/components/index.vue";

const routes = [
  {
    path: "/",
    name: "index",
    component: Index,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
