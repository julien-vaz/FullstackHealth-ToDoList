const taskList = document.getElementById("taskList");

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
Função que modifica o estilo do texto da tarefa marcada para tachado
Utiliza-se a propriedade previousElementSibling para selecionar apenas
o texto dentro da tag <p>. Após isso, verifica se o atributo checked
existe para a checkbox selecionada e, caso exista, adiciona uma classe
completed que contém a regra CSS text-decoration: line-through.

OBS: foi necessário utilizar a propriedade previousElementSibling,
pois sem ela os buttons da classe delete também eram modificados.
*/

function markAsCompleted(title) {
    const savedTasks = readTaskList();

    /*
    Itera pela lista no localStorage até encontrar o título
    e inverte o valor de completed
    */
    savedTasks.map((task) => {
        if (task.title == title) {
            task.completed = !task.completed;
        }
    })

    // Atualiza a lista no localStorage
    localStorage.setItem("tasks", JSON.stringify(savedTasks));

    // Atualiza o contador de tarefas
    updateCounter();
};

/*
Função que adiciona uma nova tarefa na lista,
verificando antes se já existe uma tarefa com o mesmo nome.
*/
function addNewTask() {
    const newTaskText = document.getElementById("newItemText");

    // Verifica se a tarefa possui um nome.
    if (newTaskText.value === "") {
        window.alert("Escolha um nome para a tarefa.");

        // Verifica se a tarefa já existe na lista.
    } else if (Array.from(taskList.querySelectorAll("li"))
        .find((task) => task.querySelector("p").innerText == newTaskText.value) != undefined) {
        window.alert("Essa tarefa já foi adicionada.");
    } else {

        // Cria um objeto Task com complete como false
        const task = new Task(newTaskText.value, false);

        // Obtem a lista de tarefas do localStorage
        const savedTasks = readTaskList();

        // Adiciona a nova tarefa
        savedTasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(savedTasks));

        // Esvazia o campo de entrada
        newTaskText.value = "";

        // Atualiza o contador de tarefas
        updateCounter();

        // Renderiza a lista de tarefas
        renderTaskList();
    };
};

function renderTaskList() {
    const savedTasks = readTaskList();
    taskList.innerHTML = "";

    // Itera pela lista no localStorage e renderiza item por item
    savedTasks.map((task) => {

        // Cria um item e altera o HTML interno
        const newTask = document.createElement("li");
        newTask.innerHTML = `<p>${task.title}</p>`;

        // Cria uma checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;
        if (checkbox.checked) {
            newTask.classList.add("completed");
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
    const savedTasks = readTaskList();

    debugger
    // Itera pela lista no localStorage e não adiciona a com o título selecionado
    savedTasks = savedTasks.filter((task) => task.title != title);

    /*if (window.confirm(
        `Você realmente deseja excluir a tarefa ${title}?`
        )) {
        };*/

    // Atualiza o contador de tarefas
    updateCounter();

    // Atualiza o localStorage
    localStorage.setItem("tasks", JSON.stringify(savedTasks));

    // Renderiza a lista de tarefas
    renderTaskList();
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