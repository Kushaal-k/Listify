import { formatDistance, isSameDay } from '/root/repos/Listify/node_modules/date-fns'

const formTask = document.querySelector(".add-task-form");
const taskContainer = document.querySelector("#tasks-container");
const taskName = document.getElementById("task-head");
const taskPriority = document.getElementById("task-priority");
const date = document.querySelector("#due-date");
const dialog = document.querySelector("dialog");
const notasks = document.querySelector(".no-tasks");
const hr = document.querySelector("hr");

let i = 0;
let tasksList = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem("tasks", JSON.stringify(tasksList));
}

function renderTasks(){
    // taskContainer.innerHTML = "";

    taskContainer.querySelectorAll(".task-card").forEach(el => el.remove());
    
    if(tasksList.length === 0)
    {
        console.log("No tasks detected, showing message");
        hr.style.display = "block";
        notasks.style.display = "flex";
        return;
    }

    hr.style.display = "none";
    notasks.style.display = "none";

    tasksList.forEach(task => {
        const taskEle = document.createElement("div");

        taskEle.classList.add("task-card");
        taskEle.dataset.id = task.id;

        taskEle.innerHTML = `<div class="task-header">
                        <div>
                            <div class="task-title">${task.title}</div>
                            <div class="task-meta">
                                <span class="priority-badge">${task.priority}</span>
                                <span class="due-badge">${task.displayDate}</span>
                            </div>
                        </div>
                        <button class="delete-btn">×</button>
                    </div>`;

        taskContainer.appendChild(taskEle);

        
    });

};

function addTask(title, priority, dueDate){

        const today = new Date();

        let date_formatted = formatDistance(dueDate, today, { addSuffix: true });
        
        if(isSameDay(dueDate, today))
        {
            date_formatted = "Today";
        }

        const newTask = {
            id: crypto.randomUUID(),
            title, 
            priority,
            dueDate,
            displayDate: date_formatted
        }

        tasksList.push(newTask);
        saveTasks();
        renderTasks();
};

function deleteTask(id) {
    tasksList = tasksList.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
};

formTask.addEventListener("submit", (e) => {
    e.preventDefault();

    addTask(taskName.value, taskPriority.value, new Date(date.value));

    // Reset form
    taskName.value = "";
    taskPriority.value = "";
    date.value = "";
    dialog.close();
});

taskContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        const taskEl = e.target.closest(".task-card");
        const id = taskEl.dataset.id; 
        deleteTask(id);
    }
});

export {renderTasks};

// TODO:
// Change date format using    date-Fns
// use local storage 
// change color according to taskPriority
// give option for high, medium and low priority with colr 