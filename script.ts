class Task {
    public id: number;
    public description: string;
    public completed: boolean;

    constructor(description: string) {
        this.id = Math.round(Math.random() * 1000);
        this.description = description;
        this.completed = false;
    }
}

class TaskManager {
    public tasks: Task[];

    constructor() {
        this.tasks = [];
    }

    addTask(description: string): void {
        this.tasks.push(new Task(description));
        this.tasksListUpdate();
    }

    deleteTask(id: number): void {
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id == id) this.tasks.splice(i, 1);
        }
        this.tasksListUpdate();
    }

    updateTaskDescription(id: number, newDescription: string): void {
        let index: number = this.tasks.findIndex((task) => task.id == id);
        this.tasks[index].description = newDescription;
        this.tasksListUpdate();
    }

    completeTask(id: number): void {
        let index: number = this.tasks.findIndex((task) => task.id == id);
        this.tasks[index].completed = true;
        this.tasksListUpdate();
    }

    tasksListUpdate(): void {
        (document.getElementById("newTaskInput")! as HTMLInputElement).value = "";
        document.getElementById("activeH")!.style.display = "none";
        document.getElementById("completedH")!.style.display = "none";
        document.getElementById("activeTasksList")!.innerHTML = "";
        document.getElementById("completedTasksList")!.innerHTML = "";
        for (let task of this.tasks) {
            if (!task.completed) {
                let activeCounter = 0;
                for (let task of this.tasks) {
                    if (!task.completed) activeCounter++;
                }
                document.getElementById("activeH")!.style.display = "block";
                document.getElementById("activeH")!.innerText = `Active Tasks: ${activeCounter}`;
                document.getElementById("activeTasksList")!.innerHTML += `
                <div class="row">
                    <div class="col-sm-2"><h5 class="text-bold mt-2">Task ID: ${task.id}</h5></div>
                    <div class="col-sm-8">
                        <li class="list-group-item d-inline-block w-75 text-break fs-5">${task.description}</li>
                        <span><button class="btn btn-success" onclick="comleteTask(${task.id})"><i class="fa-solid fa-check text-light"></i></button>
                        <span><button class="btn btn-primary" onclick="updateTaskDescription(${task.id})"><i class="fa-solid fa-pen text-light"></i></button>
                        <span><button class="btn btn-danger" onclick="deleteTask(${task.id})"><i class="fa-solid fa-trash text-light"></i></button>
                    </div>
                    <div class="col-sm-2"></div>
                </div>`
            }
            else {
                let completedCounter = 0;
                for (let task of this.tasks) {
                    if (task.completed) completedCounter++;
                }
                document.getElementById("completedH")!.style.display = "block";
                document.getElementById("completedH")!.innerText = `Completed Tasks: ${completedCounter}`;
                document.getElementById("completedTasksList")!.innerHTML += `
                <div class="row">
                    <div class="col-sm-2"><h5 class="text-bold mt-2">Task ID: ${task.id}</h5></div>
                    <div class="col-sm-8">
                        <span><i class="fa-solid fa-check-double text-success"></i>
                        <li class="list-group-item d-inline-block text-break w-75 text-success fs-5">${task.description}</li>
                        <span><button class="btn btn-primary" onclick="moveToActiveTasks(${task.id})"><i class="fa-solid fa-arrow-up"></i></button>
                    </div>
                    <div class="col-sm-2"></div>
                </div>`;
            }
        }
        document.getElementById("totalTasks")!.innerText = `Total Tasks: ${this.tasks.length}`
        localStorage.setItem("TasksList", JSON.stringify(this.tasks));
    }
}

let clearTasks = (): void => {
    let isConfirmed: boolean = confirm("Are you sure?");
    if (isConfirmed) {
        for (let i = 0; i < manager.tasks.length; i++) {
            if (manager.tasks[i].completed) {
                manager.tasks.splice(i, 1);
                i--;
            }
        }
        manager.tasksListUpdate();
    }
}

let addNewTask = (): void => {
    if ((document.getElementById("newTaskInput") as HTMLInputElement).value == "") { alert("Nothing Entered!") }
    else {
        let description = (document.getElementById("newTaskInput") as HTMLInputElement).value;
        manager.addTask(description);
    }
}

let deleteTask = (id: number): void => {
    let isConfirmed: boolean = confirm("Are you sure?");
    if (isConfirmed) manager.deleteTask(id);
}

let moveToActiveTasks = (id: number): void => {
    let isConfirmed: boolean = confirm("Are you sure the task is not done yet?");
    if (isConfirmed) {
        for (let i in manager.tasks) {
            if (id == manager.tasks[i].id) manager.tasks[i].completed = false;
        }
    }
    manager.tasksListUpdate();
}

let updateTaskDescription = (id: number): void => {
    let newDescription = prompt("Submit new task description:");
    if (newDescription != null && newDescription != "") {
        manager.updateTaskDescription(id, newDescription as string);
    }
    else alert("Something went wrong!");
}

let comleteTask = (id: number): void => {
    manager.completeTask(id);
}

let manager = new TaskManager();
if (localStorage.getItem("TasksList") != null) {
    manager.tasks = JSON.parse(localStorage.getItem("TasksList") as string);
    manager.tasksListUpdate();
}




