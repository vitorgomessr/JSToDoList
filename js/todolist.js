// Abre um terminal na pasta/diretório
// npm init -y
// npm install json-server -D  -> vai gerar o node_modules

// cria o arquivo db.json, que é como a base de dados 
// npx json-server --watch db.json ou npx json-server db.json

// OU

// configura o start no package.json
// abre o terminal na pasta
// npm start


/*
GET 
POST
PUT - alterar inteiro. Cuidado ao passar dados parciais
PATCH - alterar partes
DELETE
*/

import TasksController from "./Constroller/Tasks.controller.js"
import TasksServices from "./Services/Tasks.service.js"
import TasksView from "./View/Tasks.view.js"

const itemInput = document.getElementById("item-input")
itemInput.focus()
const todoAddForm = document.getElementById("todo-add")
const ul = document.getElementById("todo-list")
const lis = ul.getElementsByTagName("li")

const taskService = new TasksServices()
const taskView = new TasksView(ul)
const taskController = new TasksController(taskService, taskView)

taskController.getTasks()

todoAddForm.addEventListener("submit", function (e) {
    e.preventDefault()
    taskController.add(itemInput.value)
    itemInput.value = ""
    itemInput.focus()
});


function clickedUl(e) {
    const dataAction = e.target.getAttribute("data-action")
    console.log(e.target)
    if (!dataAction) return

    let currentLi = e.target
    while (currentLi.nodeName !== "LI") {
        currentLi = currentLi.parentElement
    }
    const currentLiIndex = [...lis].indexOf(currentLi)

    const actions = {
        editButton: function () {
            const editContainer = currentLi.querySelector(".editContainer");

            [...ul.querySelectorAll(".editContainer")].forEach(container => {
                container.removeAttribute("style")
            });

            editContainer.style.display = "flex";

        },
        deleteButton: function () {
            taskController.remove(currentLi.getAttribute("data-id"))

        },
        containerEditButton: function () {
            const title = currentLi.querySelector(".editInput").value
            const id = currentLi.getAttribute("data-id")
            taskController.update({title, id})
        },
        containerCancelButton: function () {
            currentLi.querySelector(".editContainer").removeAttribute("style")
            currentLi.querySelector(".editInput").value = arrInstancesTasks[currentLiIndex].title
        },
        checkButton: function () {
            const id = currentLi.getAttribute("data-id")
            taskController.toggleDone(id)
        }
    }

    if (actions[dataAction]) {
        actions[dataAction]()
    }
}
ul.addEventListener("click", clickedUl)
