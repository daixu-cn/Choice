import { createApp } from "vue"
import "@/assets/style/scss/global.scss"
import App from "@/App.vue"
import router from "@/router"
import "web-animations-js"

const app = createApp(App)
app.use(router).mount("#app")
