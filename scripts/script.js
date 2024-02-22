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
};

/*
Função que adiciona uma nova tarefa na lista,
verificando antes se já existe uma tarefa com o mesmo nome.
*/
function addNewTask() {
    const taskList = document.getElementById("taskList");
    console.log(taskList);
    const newTaskText = document.getElementById("newItemText").value;

    // Verifica se a tarefa possui um nome.
    if (newTaskText === "") {
        window.alert("Escolha um nome para a tarefa.");

    // Verifica se a tarefa já existe na lista.
    } else if (Array.from(taskList.querySelectorAll("li"))
        .find((task) => task.querySelector("p").innerText == newTaskText) != undefined) {
        window.alert("Essa tarefa já foi adicionada.");
    } else {
        
        // Cria um item e altera o HTML interno
        const newTask = document.createElement("li");
        newTask.innerHTML = `<p>${newTaskText}</p>`;

        // Cria uma checkbox
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.onchange = () => { markAsCompleted(checkbox) };
        newTask.appendChild(checkbox);

        // Cria um botão customizado
        const button = document.createElement("button");
        button.innerHTML = "&#x2716;";
        button.classList.add("delete");
        newTask.appendChild(button);

        // Adiciona o novo item à lista
        newTask.classList.add("task");
        taskList.appendChild(newTask);
    }
};

