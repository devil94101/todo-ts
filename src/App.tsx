import './App.css';
import { Routes, Route, Navigate, Link } from "react-router-dom";
import CheckAuth from './components/auth/checkAuth';
import Login from './components/auth/login';
import TodoHome from './components/todo/TodoHome';
import { TodoProvider } from './components/context/TodoProvider';

function App() {

  return (
    <div className='app'>
      <TodoProvider>
        <Routes >
          <Route path='/' element={<CheckAuth />} >
            <Route path="/" element={<TodoHome />} />
          </Route>
          <Route path="/login" element={<Login />} />
          {/* <Route path="/signup" element={<Signup />} /> */}
        </Routes>
      </TodoProvider>
    </div>
  );
}

export default App;
