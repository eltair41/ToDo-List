{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false},
        ];
        render();
    };

    const deleteTask = (taskIndex) => {
        tasks = tasks.filter((task, index) => index !== taskIndex);
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) => 
            index === taskIndex 
                ? ({ ...task, done: !task.done,})
                : task
        );
        render();
    };


    const bindDeleteEvents = () => {
        const deleteButtons = document.querySelectorAll(".js-delete");

        deleteButtons.forEach((deleteButton, index) => (
            deleteButton.addEventListener("click", () => {
                deleteTask(index);
            })
        ));
    };
    
    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");

        toggleDoneButtons.forEach((toggleDoneButton, index) => (
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            })
        ));
    };

    const renderTasks = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li class="list__item">
                <button class="js-done list__button list__button--done">
                    ${task.done ? "✔" : ""}
                </button>
                <span class="list__task${task.done ? " list__task--done" : ""}">
                    ${task.content}
                </span>
                <button class="js-delete list__button list__button--delete">
                    🗑
                </button>
            </li>
            `;
        };

        document.querySelector(".js-tasks").innerHTML = htmlString
    };

    const renderButtons = () => {};

    const bindButtonsEvents = () => {};

    const render = () => {
        renderTasks();
        renderButtons();

        bindDeleteEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const inputElement = document.querySelector(".js-newTask")
        const newTaskContent = inputElement.value.trim();

        if (newTaskContent !== "") {
            addNewTask(newTaskContent);
            inputElement.value = "";
        }

        inputElement.focus();
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);
    };

    init();
};