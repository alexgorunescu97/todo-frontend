import axios from "axios";
import {JPA_API_URL} from "../../todo/Constants";

class TodoDataService {

    getAllTodos(username) {
        return axios.get(`${JPA_API_URL}/users/${username}/todos`);
    }

    deleteTodoById(username, id) {
        return axios.delete(`${JPA_API_URL}/users/${username}/todos/${id}`);
    }

    getTodoById(username, id) {
        return axios.get(`${JPA_API_URL}/users/${username}/todos/${id}`);
    }

    updateTodo(username, id, todo) {
        return axios.put(`${JPA_API_URL}/users/${username}/todos/${id}`, todo)
    }

    createTodo(username, todo) {
        return axios.post(`${JPA_API_URL}/users/${username}/todos`, todo)
    }

}

export default new TodoDataService();