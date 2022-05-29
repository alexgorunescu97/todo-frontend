import {Link} from 'react-router-dom';
import React, {useState} from 'react';
import HelloWorld from '../api/todo/HelloWorld';

function Welcome(props) {

    const [message, setMessage] = useState(null);
    const [error, setError] = useState(null);

    async function onRetrieveMessage() {
        try {
            let helloWorldResponse = await HelloWorld.getHelloWorld();

            if (helloWorldResponse.status === 200) {
                setMessage(helloWorldResponse.data);
                setError(null);
            }
        } catch {
            setMessage(null);
            setError("Something went wrong");
        }

    }

    return (
        <div>
            <h1>Welcome</h1>
            <div className="container">
                {`Welcome, ${props.params.name}! You can manage your todos `}
                <Link to="/todos">here</Link>
            </div>

            <div className="container mt-2">
                Click below to get a customized welcome message.
                <button className="btn btn-success ms-2" onClick={onRetrieveMessage}>Get message</button>
            </div>

            <div className="container mt-2">
                {message && <p>Message: {message}</p>}
                {error && <p className="text-danger">{error}</p>}
            </div>
        </div>
    );
}

export default Welcome;