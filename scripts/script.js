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