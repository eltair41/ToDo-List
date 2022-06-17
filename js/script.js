{
    let tasks = [];
    let hideDoneTasks = false;

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent},
        ];
        render();
    };

    const toggleHideDoneTasks = (taskIndex) => {
        hideDoneTasks = !hideDoneTasks
        render();
    };

    const deleteTask = (taskIndex) => {
        tasks = tasks.filter((task, index) => index !== taskIndex);
        render();
    }

    const toggleTaskDone = (taskIndex) => {
        tasks = tasks.map((task, index) => 
            index === taskIndex 
                ? ( { ...task, done: !task.done} )
                : task
        );
        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map( task => ({ ...task, done: true}));
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
            <li class="list__item
            ${hideDoneTasks && task.done ? "list__item--hide" : ""}">
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

    const renderButtons = () => {
        const buttonsElement = document.querySelector(".js-buttons");

        if(tasks.length !== 0) {
            return buttonsElement.innerHTML = `
            <button class="js-hideDoneTasks section__headerButtons"
            ${tasks.some(({done}) => done) ? "" : "disabled"}>
                ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
            </button>
            <button class="js-allTasksDone section__headerButtons"
            ${tasks.every(({done}) => done) ? "disabled" : ""}>
                Ukończ wszystkie
            </button>
            `;
        } else { 
            if(tasks.length === 0) {
                return buttonsElement.innerHTML = ``;
            }
        };  
    };

    const bindMarkAllButtonEvents = () => {
        if(tasks.length > 0) {
            const markAllDoneButton = document.querySelector(".js-allTasksDone");
            markAllDoneButton.addEventListener("click", () => {
                markAllTasksDone();
            })
        };
    };

    const bindHideButtonEvents = () => {
            if(tasks.length > 0) {
                const hideDoneTasksButton = document.querySelector(".js-hideDoneTasks");
                hideDoneTasksButton.addEventListener("click", () => {
                    toggleHideDoneTasks();
                })
            }
    };
    
    const render = () => {
        renderTasks();
        renderButtons();

        bindDeleteEvents();
        bindToggleDoneEvents();
        bindMarkAllButtonEvents();
        bindHideButtonEvents();
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