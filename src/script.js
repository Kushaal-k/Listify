const formTask = document.querySelector(".add-task-form");
const taskContainer = document.querySelector("#tasks-container");
const taskName = document.getElementById("task-head");
const taskPriority = document.getElementById("task-priority");
const date = document.getElementById("due-date");
const dialog = document.querySelector("dialog");

function addTask(){
    formTask.addEventListener("submit", (e) => {
        e.preventDefault();
        const task = document.createElement("div");
        task.classList.add("task-card");
        task.innerHTML = `<div class="task-header">
                        <div>
                            <div class="task-title">${taskName.value}</div>
                            <div class="task-meta">
                                <span class="priority-badge">${taskPriority.value}</span>
                                <span class="due-badge">${date.value}</span>
                            </div>
                        </div>
                        <button class="delete-btn">×</button>
                    </div>`
        taskContainer.appendChild(task);

        taskName.value = "";
        taskPriority.value = "";
        date.value = "";
        dialog.close();
    });
};

taskContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        e.target.closest(".task-card").remove();
    }
});

export {addTask};