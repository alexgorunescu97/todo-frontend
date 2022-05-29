import { Navigate} from "react-router-dom";
import AuthenticationService from './AuthenticationService';


function AuthenticatedRoute(props) {

    const isUserLoggedIn = AuthenticationService.isUserLoggedIn();

    return (
        <>
            {
                isUserLoggedIn ? {...props.children} : <Navigate to="/login" />
            }
        </>
    );
}

export default AuthenticatedRoute;