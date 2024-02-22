/*
Função que modifica o estilo do texto da tarefa marcada para tachado
Utiliza-se a propriedade previousElementSibling para selecionar apenas
o texto dentro da tag <p>. Após isso, verifica se o atributo checked
existe para a checkbox selecionada e, caso exista, adiciona uma classe
completed que contém a regra CSS text-decoration: line-through.

OBS: foi necessário utilizar a propriedade previousElementSibling,
pois sem ela os buttons da classe delete também eram modificados.
*/

function markAsCompleted(checkbox) {
    const listItem = checkbox.previousElementSibling;
    if (checkbox.checked) {
        listItem.classList.add("completed");
    } else {
        listItem.classList.remove("completed");
    };

    // Atualiza o contador de tarefas
    updateCounter();
};

/*
Função que adiciona uma nova tarefa na lista,
verificando antes se já existe uma tarefa com o mesmo nome.
*/
function addNewTask() {
    const taskList = document.getElementById("taskList");
    const newTaskText = document.getElementById("newItemText");

    // Verifica se a tarefa possui um nome.
    if (newTaskText.value === "") {
        window.alert("Escolha um nome para a tarefa.");

        // Verifica se a tarefa já existe na lista.
    } else if (Array.from(taskList.querySelectorAll("li"))
        .find((task) => task.querySelector("p").innerText == newTaskText.value) != undefined) {
        window.alert("Essa tarefa já foi adicionada.");
    } else {

        // Cria um item e altera o HTML interno
        const newTask = document.createElement("li");
        newTask.innerHTML = `<p>${newTaskText.value}</p>`;

        // Cria uma checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.onchange = () => { markAsCompleted(checkbox) };
        newTask.appendChild(checkbox);

        // Cria um botão customizado
        const button = document.createElement("button");
        button.innerHTML = "&#x2716;";
        button.classList.add("delete");
        button.onclick = () => { removeTask(button) };
        newTask.appendChild(button);

        // Adiciona o novo item à lista
        newTask.classList.add("task");
        taskList.appendChild(newTask);

        // Esvazia o campo de entrada
        newTaskText.value = "";

        // Atualiza o contador de tarefas
        updateCounter();
    };
};

// Função que remove uma tarefa da lista.
function removeTask(button) {
    let task = button.parentElement;
    if (window.confirm(
        `Você realmente deseja excluir a tarefa ${task.querySelector("p").innerText}?`
        )) {
        task.remove();
        // Atualiza o contador de tarefas
        updateCounter();
    };
};

// Função para obter o número de tarefas na lista e atualizar
function updateCounter() {
    debugger
    const taskCounter = document.getElementById("taskCounter");
    const taskList = document.querySelectorAll(".task");
    let doneTasks = 0;
    for (let i = 0; i < taskList.length; i++) {
        if (taskList[i].querySelector("p").classList.contains("completed")) {
            doneTasks += 1;
        }
    }
    taskCounter.innerText = "(" + doneTasks + "/" + taskList.length + ") tarefas cumpridas";
};

updateCounter();