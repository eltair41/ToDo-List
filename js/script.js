{
    const tasks = [];

    const deleteTask = (taskIndex) => {
        tasks.splice(taskIndex, 1);
        render();
    }

    const addNewTask = (newTaskContent) => {

        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const toggleTaskDone = (taskIndex) => {
        tasks[taskIndex].done = !tasks[taskIndex].done;
        render();
    };

    const bindEvents = () => {
        const deleteButtons = document.querySelectorAll(".js-delete");

        deleteButtons.forEach((deleteButton, index) => (
            deleteButton.addEventListener("click", () => {
                deleteTask(index);
            })
        ));

        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => (
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            })
        ));
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item">
            <button class="js-done list__button list__button-done">${task.done ? "✔" : ""}</button>
            <span class="list__task${task.done ? " list__task-done" : ""}">${task.content}</span>
            <button class="js-delete list__button list__button-delete">🗑️</button>
          </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString;

        bindEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-newTask").value.trim();

        if (newTaskContent === "") {
            return;
        }

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
};