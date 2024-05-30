import { createApp } from "vue";
import App from "./App.vue";
import mitt from "mitt";

let emitter = mitt();
let app = createApp(App);
app.config.globalProperties.emitter = emitter;  //글로벌한 변수보관함임


// vuex
import store from "./store.js";

import './registerServiceWorker'


// createApp(App).mount("#app");
// 모든 컴포넌트들이 store 데이터를 공유함
app.use(store).mount("#app");
