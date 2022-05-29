
import {Link} from 'react-router-dom';
import AuthenticationService from './AuthenticationService';


function Header({navigate}) {

    const userLoggedIn = AuthenticationService.isUserLoggedIn();
    const user = AuthenticationService.getUser();

    function logout() {
        AuthenticationService.logout();
        navigate('/login');
    }

    return (
        <header>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="https://www.udemy.com/user/in28minutes/">in28Minutes</a>
                    {
                        userLoggedIn
                        &&
                        <ul className="navbar-nav">
                            <li><Link className="nav-link" to={`/welcome/${user}`}>Home</Link></li>
                            <li><Link className="nav-link" to="/todos">Todos</Link></li>
                        </ul>
                    }
                        <ul className="navbar-nav collapse navbar-collapse justify-content-end">
                            {!userLoggedIn && <li><Link className="nav-link" to="/login">Login</Link></li>}
                            {userLoggedIn && <li className="nav-link cursor-pointer" onClick={logout}>Logout</li>}
                        </ul>
                </div>
            </nav>
        </header>
    );

}

export default Header;