import "./style.css"
import { renderTasks } from "./script.js"

const dialog = document.querySelector("dialog");
const addbtn = document.querySelector(".add-task-btn");
const closebtn = document.querySelector(".close-btn");

addbtn.addEventListener("click", () => {
    dialog.showModal();
});

closebtn.addEventListener("click", () => {
    dialog.close();
});

renderTasks();