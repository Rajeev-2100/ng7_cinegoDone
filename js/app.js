import themeSwitcher from "./lib/theme-switcher.js";
import router from "./routes.js";
import movieAPIs from "./api/cinema.mock.server.js";

router.start();

movieAPIs();

function intializeThemeSwitcher() {
  themeSwitcher();
}

document.addEventListener("DOMContentLoaded", intializeThemeSwitcher);
