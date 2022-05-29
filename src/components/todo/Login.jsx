import React, {useState} from 'react';
import AuthenticationService from './AuthenticationService';


function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoginInvalid, setLoginInvalid] = useState(false);

    function handleUsernameChange(evt) {
        let username = evt.target.value;
        setUsername(username);
    }

    function handlePasswordChange(evt) {
        let password = evt.target.value;
        setPassword(password);
    }

    async function handleLoginSubmit() {

        try {
            let loginResponse = await AuthenticationService.jwtLogin(username, password);
            setLoginInvalid(false);
            AuthenticationService.registerSuccessfulLoginForJwt(username, loginResponse.data.token);
            props.navigate(`/welcome/${username}`);
        } catch(e) {
            setLoginInvalid(true);
        }

    }

    return (
        <div>

            <h1>Login</h1>
            <div className="container d-flex flex-column w-25 text-start">
                <div className="w-100">
                    {isLoginInvalid && <p className="alert alert-warning">Invalid credentials</p>}
                </div>

                Username:
                <input type="text" className="w-100 mb-4" name="username" value={username} onChange={handleUsernameChange}/>
                Password:
                <input type="password" className="w-100 mb-4" name="password" value={password} onChange={handlePasswordChange}/>
                <button className="btn btn-success w-100" onClick={handleLoginSubmit}>Login</button>
            </div>
        </div>
    );

}

export default Login;