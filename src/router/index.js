import { createRouter, createWebHashHistory } from "vue-router";
import Home from "../views/Home.vue";
import Files from "../views/Files.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/files",
    name: "Files",
    component: Files,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
