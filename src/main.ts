import "@/assets/styles/scss/main.scss"
import app from "@/global/app"
import { useDark } from "@vueuse/core"

useDark()

app.mount("#app")
