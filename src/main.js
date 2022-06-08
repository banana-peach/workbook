// eslint-disable-next-line no-unused-vars
import { createApp, reactive } from "vue";
import Vant from "vant";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "vant/lib/index.css";

const sourceOfTruth = reactive({
  message: "Hello"
});
console.log(sourceOfTruth);

createApp(App)
  .use(store)
  .use(Vant)
  .use(router)
  // .use(VueVideoPlayer)
  .mount("#app");
