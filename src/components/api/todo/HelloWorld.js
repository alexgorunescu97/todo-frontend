import axios from "axios";

class HelloWorld {

    getHelloWorld() {


        return axios.get('http://localhost:8080/helloworld');
    }

}

export default new HelloWorld();