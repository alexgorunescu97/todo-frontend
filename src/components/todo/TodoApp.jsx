import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Welcome from './Welcome';
import withNavigation from './withNavigation';
import withParams from './withParams';
import Error from './Error';
import TodoList from './TodoList';
import Footer from './Footer';
import Header from './Header';
import AuthenticatedRoute from './AuthenticatedRoute';
import RouteHome from './RouteHome';
import TodoComponent from './TodoComponent';

function TodoApp() {


    const LoginWithNavigation = withNavigation(Login);
    const WelcomeWithParams = withParams(Welcome);
    const HeaderWithNavigation = withNavigation(Header);
    const TodoListWithNavigation = withNavigation(TodoList);
    const TodoComponentWithParamsAndNavigation = withNavigation(withParams(TodoComponent));

    return (
        <div className="TodoApp">
            <Router>
                <HeaderWithNavigation/>
                <Routes>
                    <Route path="/" element={
                        <RouteHome>
                            <LoginWithNavigation/>
                        </RouteHome>
                    } />
                    <Route path="/login" element={
                        <RouteHome>
                            <LoginWithNavigation/>
                        </RouteHome>
                    } />
                    <Route path="/welcome/:name" element={
                        <AuthenticatedRoute>
                            <WelcomeWithParams/>
                        </AuthenticatedRoute>
                    } />
                    <Route path="/todos" element={
                        <AuthenticatedRoute>
                            <TodoListWithNavigation/>
                        </AuthenticatedRoute>
                    } />
                    <Route path="/todos/:id" element={
                        <AuthenticatedRoute>
                            <TodoComponentWithParamsAndNavigation/>
                        </AuthenticatedRoute>
                    } />
                     <Route path="/todos/create" element={
                        <AuthenticatedRoute>
                            <TodoComponentWithParamsAndNavigation/>
                        </AuthenticatedRoute>
                    } />
                    <Route path="*" element={<Error />}/>
                </Routes>
                <Footer/>
            </Router>
        </div>
    );

}

export default TodoApp;