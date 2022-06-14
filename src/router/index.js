import { createRouter, createWebHashHistory } from "vue-router";
// import Home from "../views/Home.vue";
import Files from "../views/Files.vue";
import Record from "../views/Record.vue";
import Change from "../views/Change.vue";
import Position from "../views/Position.vue";
import Directive from "../views/Directive";
import Chart from "../views/Chart";
import Video from "../views/Video";
import Video2 from "../views/Video2";
import Table from "../views/Table";
import Player from "../views/Player";
import Upload from "../views/Upload";
import Wechat from "../views/Wechat";

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
  {
    path: "/directive",
    name: "Directive",
    component: Directive,
  },
  {
    path: "/chart",
    name: "Chart",
    component: Chart,
  },
  {
    path: "/video",
    name: "Video",
    component: Video,
  },
  {
    path: "/table",
    name: "Table",
    component: Table,
  },
  {
    path: "/chat",
    name: "Wechat",
    component: Wechat,
  },
  {
    path: "/video2",
    name: "Video2",
    component: Video2,
  },
  {
    path: "/player",
    name: "Player",
    component: Player,
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
