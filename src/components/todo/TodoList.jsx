import React, { useEffect, useState } from 'react';
import TodoDataService from '../api/todo/TodoDataService';
import AuthenticationService from './AuthenticationService';
import moment from 'moment';


function TodoList({navigate}) {

    const [todos, setTodos] = useState([]);
    const [getTodosError, setGetTodosError] = useState("");
    const [deleteStatus, setDeleteStatus] = useState(null);

    function updateTodo(id) {
        navigate(`/todos/${id}`);
    }

    function createTodo() {
        navigate("/todos/create");
    }

    async function deleteTodo(id) {
        try {
            let deleteTodoResponse = await TodoDataService.deleteTodoById(AuthenticationService.getUser(), id);
            if (deleteTodoResponse.status === 204) {
                getAllTodos();
                setDeleteStatus("SUCCESS");
                setTimeout(() => setDeleteStatus(null), 2000);
            }
        } catch (e) {
            setDeleteStatus(e.message);
        }
    }

    async function getAllTodos() {
        try {
            let todosResponse = await TodoDataService.getAllTodos(AuthenticationService.getUser());
            if (todosResponse.status === 200) {
                setTodos(todosResponse.data);
                setGetTodosError("");
            }
        } catch (e) {
            setGetTodosError(e.message);
        }
    }

    useEffect(() => {

        getAllTodos();

    }, []);

    return (
        <div>
            {deleteStatus === "SUCCESS" ? 
                <div className="alert alert-success">Delete was successful</div> : 
                deleteStatus !== null && <p className="alert alert-danger">Error while deleting todo: {deleteStatus}</p>
            }
            {getTodosError ?

                <p className="alert alert-danger">Error while getting todos: {getTodosError}</p> :
                <div>
                    {!todos.length ? <p className="alert alert-warning">You don't have any todos</p> :
                        <div>
                            <h1>Todo List</h1>
                            <div className="container">
                                <table className="table">
                                    <thead>
                                        <tr className="d-flex">
                                            <th className="col-2">Id</th>
                                            <th className="col-3">Description</th>
                                            <th className="col-3">Target Date</th>
                                            <th className="col-2">Done</th>
                                            <th className="col-1">Update</th>
                                            <th className="col-1">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            todos.map(todo =>
                                                <tr key={todo.id} className="d-flex">
                                                    <td className="col-2">{todo.id}</td>
                                                    <td className="col-3">{todo.description}</td>
                                                    <td className="col-3">{moment(todo.targetDate).format("YYYY-MM-DD")}</td>
                                                    <td className="col-2">{todo.done.toString()}</td>
                                                    <td className="col-1">
                                                        <button className="btn btn-warning" onClick={() => updateTodo(todo.id)}>Update</button>
                                                    </td>
                                                    <td className="col-1">
                                                        <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>Delete</button>
                                                    </td>
                                                </tr>
                                            )
                                        }

                                    </tbody>
                                </table>
                            </div>

                            <button className="btn btn-success" onClick={createTodo}>Create a new todo</button>
                        </div>
                    }

                </div>
            }
        </div>
    );

}

export default TodoList;