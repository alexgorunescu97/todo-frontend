import {Navigate} from "react-router-dom";
import AuthenticationService from './AuthenticationService';



function RouteHome(props) {

    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

    return (
        <>
            {
                !isUserLoggedIn ? {...props.children} : <Navigate to={`/welcome/${AuthenticationService.getUser()}`} />
            }
        </>
    );
}

export default RouteHome;