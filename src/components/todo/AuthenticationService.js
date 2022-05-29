import axios from "axios";
import { API_URL } from "./Constants";

class AuthenticationService {

    constructor() {
        this.user = sessionStorage.getItem('authenticatedUser');
        this.userLoggedIn = this.user !== null ? true : false;
    }

    login(username, password) {
        return axios.get(`${API_URL}/basicauth`, {
            headers: {
                Authorization: this.createBasicAuthToken(username, password)
            }
        });
    }

    jwtLogin(username, password) {
        return axios.post(`${API_URL}/authenticate`, {
            username,
            password
        });
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(`${username}:${password}`);
    }

    createJwtToken(token) {
        return 'Bearer ' + token;
    }

    registerSuccessfulLogin(username, password) {
        this.setUser(username);
        this.setUserLoggedIn(true);

        let basicAuth = this.createBasicAuthToken(username, password);
        this.setupAxiosInterceptor(basicAuth);
    }

    registerSuccessfulLoginForJwt(username, token) {
        this.setUser(username);
        this.setUserLoggedIn(true);

        let jwtToken = this.createJwtToken(token);
        this.setupAxiosInterceptor(jwtToken);

    }

    logout() {
        sessionStorage.removeItem('authenticatedUser');
        this.setUser(null);
        this.setUserLoggedIn(false);
    }

    setUserLoggedIn(isUserLoggedIn) {
        this.userLoggedIn = isUserLoggedIn;  
    }

    isUserLoggedIn() {
        return this.userLoggedIn;
    }

    setUser(username) {
        if (username !== null) {
            sessionStorage.setItem('authenticatedUser', username);
        }
        this.user = username;
    }

    getUser() {
        return this.user;
    }

    setupAxiosInterceptor(authorizationHeader) {
        axios.interceptors.request.use((config) => {

            if (this.isUserLoggedIn()) {
                config.headers.Authorization = authorizationHeader;
            }

            return config;
        });
    }
}

export default new AuthenticationService();