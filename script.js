var Task = /** @class */ (function () {
    function Task(description) {
        this.id = Math.round(Math.random() * 1000);
        this.description = description;
        this.completed = false;
    }
    return Task;
}());
var TaskManager = /** @class */ (function () {
    function TaskManager() {
        this.tasks = [];
    }
    TaskManager.prototype.addTask = function (description) {
        this.tasks.push(new Task(description));
        this.tasksListUpdate();
    };
    TaskManager.prototype.deleteTask = function (id) {
        for (var i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].id == id)
                this.tasks.splice(i, 1);
        }
        this.tasksListUpdate();
    };
    TaskManager.prototype.updateTaskDescription = function (id, newDescription) {
        var index = this.tasks.findIndex(function (task) { return task.id == id; });
        this.tasks[index].description = newDescription;
        this.tasksListUpdate();
    };
    TaskManager.prototype.completeTask = function (id) {
        var index = this.tasks.findIndex(function (task) { return task.id == id; });
        this.tasks[index].completed = true;
        this.tasksListUpdate();
    };
    TaskManager.prototype.tasksListUpdate = function () {
        document.getElementById("newTaskInput").value = "";
        document.getElementById("activeH").style.display = "none";
        document.getElementById("completedH").style.display = "none";
        document.getElementById("activeTasksList").innerHTML = "";
        document.getElementById("completedTasksList").innerHTML = "";
        for (var _i = 0, _a = this.tasks; _i < _a.length; _i++) {
            var task = _a[_i];
            if (!task.completed) {
                var activeCounter = 0;
                for (var _b = 0, _c = this.tasks; _b < _c.length; _b++) {
                    var task_1 = _c[_b];
                    if (!task_1.completed)
                        activeCounter++;
                }
                document.getElementById("activeH").style.display = "block";
                document.getElementById("activeH").innerText = "Active Tasks: ".concat(activeCounter);
                document.getElementById("activeTasksList").innerHTML += "\n                <div class=\"row\">\n                    <div class=\"col-sm-2\"><h5 class=\"text-bold mt-2\">Task ID: ".concat(task.id, "</h5></div>\n                    <div class=\"col-sm-8\">\n                        <li class=\"list-group-item d-inline-block w-75 text-break fs-5\">").concat(task.description, "</li>\n                        <span><button class=\"btn btn-success\" onclick=\"comleteTask(").concat(task.id, ")\"><i class=\"fa-solid fa-check text-light\"></i></button>\n                        <span><button class=\"btn btn-primary\" onclick=\"updateTaskDescription(").concat(task.id, ")\"><i class=\"fa-solid fa-pen text-light\"></i></button>\n                        <span><button class=\"btn btn-danger\" onclick=\"deleteTask(").concat(task.id, ")\"><i class=\"fa-solid fa-trash text-light\"></i></button>\n                    </div>\n                    <div class=\"col-sm-2\"></div>\n                </div>");
            }
            else {
                var completedCounter = 0;
                for (var _d = 0, _e = this.tasks; _d < _e.length; _d++) {
                    var task_2 = _e[_d];
                    if (task_2.completed)
                        completedCounter++;
                }
                document.getElementById("completedH").style.display = "block";
                document.getElementById("completedH").innerText = "Completed Tasks: ".concat(completedCounter);
                document.getElementById("completedTasksList").innerHTML += "\n                <div class=\"row\">\n                    <div class=\"col-sm-2\"><h5 class=\"text-bold mt-2\">Task ID: ".concat(task.id, "</h5></div>\n                    <div class=\"col-sm-8\">\n                        <span><i class=\"fa-solid fa-check-double text-success\"></i>\n                        <li class=\"list-group-item d-inline-block text-break w-75 text-success fs-5\">").concat(task.description, "</li>\n                        <span><button class=\"btn btn-primary\" onclick=\"moveToActiveTasks(").concat(task.id, ")\"><i class=\"fa-solid fa-arrow-up\"></i></button>\n                    </div>\n                    <div class=\"col-sm-2\"></div>\n                </div>");
            }
        }
        document.getElementById("totalTasks").innerText = "Total Tasks: ".concat(this.tasks.length);
        localStorage.setItem("TasksList", JSON.stringify(this.tasks));
    };
    return TaskManager;
}());
var clearTasks = function () {
    var isConfirmed = confirm("Are you sure?");
    if (isConfirmed) {
        for (var i = 0; i < manager.tasks.length; i++) {
            if (manager.tasks[i].completed) {
                manager.tasks.splice(i, 1);
                i--;
            }
        }
        manager.tasksListUpdate();
    }
};
var addNewTask = function () {
    if (document.getElementById("newTaskInput").value == "") {
        alert("Nothing Entered!");
    }
    else {
        var description = document.getElementById("newTaskInput").value;
        manager.addTask(description);
    }
};
var deleteTask = function (id) {
    var isConfirmed = confirm("Are you sure?");
    if (isConfirmed)
        manager.deleteTask(id);
};
var moveToActiveTasks = function (id) {
    var isConfirmed = confirm("Are you sure the task is not done yet?");
    if (isConfirmed) {
        for (var i in manager.tasks) {
            if (id == manager.tasks[i].id)
                manager.tasks[i].completed = false;
        }
    }
    manager.tasksListUpdate();
};
var updateTaskDescription = function (id) {
    var newDescription = prompt("Submit new task description:");
    if (newDescription != null && newDescription != "") {
        manager.updateTaskDescription(id, newDescription);
    }
    else
        alert("Something went wrong!");
};
var comleteTask = function (id) {
    manager.completeTask(id);
};
var manager = new TaskManager();
if (localStorage.getItem("TasksList") != null) {
    manager.tasks = JSON.parse(localStorage.getItem("TasksList"));
    manager.tasksListUpdate();
}
