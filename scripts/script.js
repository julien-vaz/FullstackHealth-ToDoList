const taskList = document.getElementById("taskList");

const newTaskText = document.getElementById("newItemText");
const addNewTaskButton = document.getElementById("appendNewItem");
addNewTaskButton.addEventListener("click", function () {
    addNewTask(newTaskText.value);
})

// Classe que modela uma tarefa
class Task {
    constructor(title, completed) {
        this.title = title;
        this.completed = completed;
    }
};

// Funão que lê a lista de tarefas no localStorage do navegador
function readTaskList() {
    const savedTasks = localStorage.getItem("tasks");

    // Verifica se savedTasks existe e tem um valor definido
    if (!!savedTasks) {
        return JSON.parse(savedTasks);
    }
    return [];
}

/*
Função que altera o atributo completed da task
*/

function markAsCompleted(title) {
    const savedTasks = readTaskList();

    /*
    Itera pela lista no localStorage até encontrar o título
    e inverte o valor de completed
    */
    savedTasks.forEach(task => {
        if (task.title == title) {
            task.completed = !task.completed;
        }
    })

    // Atualiza a lista no localStorage
    localStorage.setItem("tasks", JSON.stringify(savedTasks));

    // Renderiza a lista de tarefas
    renderTaskList();

    // Atualiza o contador de tarefas
    updateCounter();
};

/*
Função que adiciona uma nova tarefa na lista,
verificando antes se já existe uma tarefa com o mesmo nome.
*/
function addNewTask(title) {
    // Obtem a lista de tarefas do localStorage
    const savedTasks = readTaskList();

    // Verifica se a tarefa já existe na lista.
    let alreadyAdded = savedTasks.find(task => task.title == title);
    if (alreadyAdded) {
        window.alert("Essa tarefa já foi adicionada.");
        return
    };

    // Verifica se a tarefa possui um nome.
    if (title === "") {
        window.alert("Escolha um nome para a tarefa.");

    } else {
        // Cria um objeto Task com complete como false
        const task = new Task(title, false);

        // Adiciona a nova tarefa
        savedTasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));

        // Esvazia o campo de entrada
        newTaskText.value = "";

        // Renderiza a lista de tarefas
        renderTaskList();

        // Atualiza o contador de tarefas
        updateCounter();
    }
};

function renderTaskList() {

    const savedTasks = readTaskList();
    taskList.innerHTML = "";

    // Itera pela lista no localStorage e renderiza item por item
    savedTasks.forEach(task => {

        // Cria um item e altera o HTML interno
        const newTask = document.createElement("li");
        const newTaskText = document.createElement("p"); 
        newTaskText.innerText = task.title;
        newTask.appendChild(newTaskText);

        // Cria uma checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        if (checkbox.checked) {
            newTaskText.classList.add("completed");
        }
        checkbox.onchange = () => { markAsCompleted(task.title) };
        newTask.appendChild(checkbox);

        // Cria um botão customizado
        const button = document.createElement("button");
        button.innerHTML = "&#x2716;";
        button.classList.add("delete");
        button.onclick = () => { removeTask(task.title) };
        newTask.appendChild(button);

        // Adiciona o novo item à lista
        newTask.classList.add("task");
        taskList.appendChild(newTask);
    })
}

// Função que remove uma tarefa da lista.
function removeTask(title) {
    let savedTasks = readTaskList();

    if (window.confirm(
        `Você realmente deseja excluir a tarefa ${title}?`
    )) {
        // Itera pela lista no localStorage e não adiciona a com o título selecionado
        savedTasks = savedTasks.filter((task) => task.title != title);
    };

    // Atualiza o localStorage
    localStorage.setItem("tasks", JSON.stringify(savedTasks));
    
    // Renderiza a lista de tarefas
    renderTaskList();

    // Atualiza o contador de tarefas
    updateCounter();
};

// Função para obter o número de tarefas na lista e atualizar
function updateCounter() {
    const taskCounter = document.getElementById("taskCounter");
    const savedTasks = readTaskList();

    const doneTasks = savedTasks.filter((task) => {
        if (task.completed) {
            return true;
        }
    })
    taskCounter.innerText = "(" + doneTasks.length + "/" + savedTasks.length + ") tarefas cumpridas";
};

renderTaskList();

updateCounter();