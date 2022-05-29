import React, {useEffect, useState} from 'react';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import moment from 'moment';
import AuthenticationService from './AuthenticationService';
import TodoDataService from '../api/todo/TodoDataService';

function TodoComponent({params, navigate}) {

    const [todo, setTodo] = useState({
        description: '',
        targetDate: new Date()
    });
    const [getTodoError, setGetTodoError] = useState("");
    const [updateTodoError, setUpdateTodoError] = useState("");
    const [createTodoError, setCreateTodoError] = useState("");

    async function handleSubmit(values) {
         
        try {
            let todoId = todo.id;
            if (todoId) {
                let updateResponse = await TodoDataService.updateTodo(AuthenticationService.getUser(), todoId, {
                    id: todoId,
                    description: values.description,
                    targetDate: values.targetDate
                });

                if (updateResponse.status === 200) {
                    setUpdateTodoError("");
                    navigate("/todos");
                }
            } else {
                let createResponse = await TodoDataService.createTodo(AuthenticationService.getUser(), {
                    description: values.description,
                    targetDate: values.targetDate
                });

                if (createResponse.status === 201) {
                    setCreateTodoError("");
                    navigate("/todos");
                }
            }

        } catch (e) {
            setUpdateTodoError(e.message);
        }  
    }

    function validate(values) {
        let errors = {};
        if (!values.description) {
            errors.description = "Enter a description";
        } else if (values.description.length < 5) {
            errors.description = "Enter at least 5 characters in description";
        }

        if (!moment(values.targetDate).isValid()) {
            errors.targetDate = "Enter a valid date";
        }

        return errors;

    }

    async function getTodoById(id) {
        try {
            let todosResponse = await TodoDataService.getTodoById(AuthenticationService.getUser(), id);
            if (todosResponse.status === 200) {
                setTodo(todosResponse.data);
                setGetTodoError("");
            }
        } catch (e) {
            setGetTodoError(e.message);
        }

    }

    useEffect(() => {
        if (params.id) {
            getTodoById(params.id);
        }
    }, [params.id]);

    return (
        <div>
            {createTodoError && <p className="alert alert-danger">Error while creating a new todo item: {createTodoError}</p>}
            {updateTodoError && <p className="alert alert-danger">Error while updating the todo item: {updateTodoError}</p>}
            {
                getTodoError ? <p className="alert alert-danger">Error while getting todo: {getTodoError}</p> :
                <div>
                    <h1>Todo</h1>
                    <div className="container">
                        <Formik initialValues={{
                            description: todo.description,
                            targetDate: moment(todo.targetDate).format('YYYY-MM-DD')
                        }}
                        onSubmit={handleSubmit}
                        validateOnBlur={false}
                        validateOnChange={false}
                        validate={validate}
                        enableReinitialize={true}>
                            {
                                (props) => (
                                    <Form>
                                        <ErrorMessage name="description" component="div" className="alert alert-warning"/>
                                        <ErrorMessage name="targetDate" component="div" className="alert alert-warning"/>
                                        <fieldset className="text-start mb-3">
                                            <label>Description</label>
                                            <Field className="form-control" type="text" name="description"/>
                                        </fieldset>

                                        <fieldset className="text-start mb-4">
                                            <label>Target date</label>
                                            <Field className="form-control" type="date" name="targetDate"/>
                                        </fieldset>

                                        <button type="submit" className="btn btn-success">Save</button>
                                    </Form>
                                )
                            }
                        </Formik>
                    </div>
            </div>
            }

        </div>
    );
}

export default TodoComponent;