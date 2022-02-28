import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "../views/Home.vue";
import Files from "../views/Files.vue";
import Record from "../views/Record.vue";
import Change from "../views/Change.vue";
import Position from "../views/Position.vue";

const routes = [
  {
    path: "/",
    name: "Change",
    component: Change,
  },
  {
    path: "/files",
    name: "Files",
    component: Files,
  },
  {
    path: "/record",
    name: "Record",
    component: Record,
  },
  {
    path: "/change",
    name: "Change",
    component: Change,
  },
  {
    path: "/position",
    name: "Position",
    component: Position,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
