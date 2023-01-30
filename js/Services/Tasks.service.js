import { createFetch } from "../../createFetch.js"
import { Task } from "../task.model.js"
import { urlTasks, urlUsers } from "../config.js"

export default class TasksServices{
    constructor(){
        this.tasks = []
    }

    add(task, cb, error, userId){
        createFetch("POST", `${urlUsers}/${userId}/tasks`, JSON.stringify(task))
            .then(() => this.getTasks(userId))
            .then(() => cb())
            .catch(err => error(err))
    }

    getTasks(userId, success, error){
        const fn = (arrTasks) => {
            this.tasks = arrTasks.map(task => {
                const { title, completed, createdAt, updatedAt, id } = task
                return new Task(title, completed, createdAt, updatedAt, id)
            })

            if(typeof success === "function") success(this.tasks)
            return this.tasks
        }
        return createFetch("GET", `${urlUsers}/${userId}/tasks`)
            .then(response => fn(response))
            .catch(erro => {
                if(typeof error === "function"){
                    return error(error.message)
                }
                throw new Error(error.message)
            })
    }

    remove(id, cb, error, userId){
        createFetch("DELETE", `${urlTasks}/${id}`)
            .then(() => this.getTasks(userId))
            .then(() => cb())
            .catch(err => error(err.message))
    }

    update(task, cb, error, userId){
        task.updatedAt = Date.now()
        createFetch("PATCH", `${urlTasks}/${task.id}`, JSON.stringify(task))
            .then(() => this.getTasks(userId))
            .then(() => cb())
            .catch(err => error(err.message))
    }

    getById(id){
        return this.tasks.find(task => parseInt(task.id) === id)
    }
}