import {BrowserRouter as Router, Routes, Route, Link, useNavigate} from 'react-router-dom';
import TaskForm from "./pages/TaskForm.jsx";
import TaskList from "./pages/TaskList.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import {useAuth} from "./context/AuthContext.jsx";
import PrivateRoute from "./components/PrivateRoute.jsx";

function App() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };


  return (
          <div className="min-h-screen bg-gray-100 py-4">
              <nav className="mb-6 flex justify-between items-center shadow-sm pb-4 px-4">
                  <h1 className="text-xl font-bold text-gray-600">Task Manager</h1>
                  <div className="space-x-4">
                      <Link to="/" className="text-blue-600 hover:underline">
                          My Tasks
                      </Link>
                      <Link to="/new" className="text-green-600 hover:underline">
                          New Task
                      </Link>

                      {user ? (
                          <>
                              <button
                                  onClick={handleLogout}
                                  className="text-red-500 hover:underline"
                              >
                                  Logout
                              </button>
                          </>
                      ) : (
                          <>
                              <Link to="/login" className="text-gray-600 hover:underline">
                                  Login
                              </Link>
                              <Link to="/register" className="text-gray-600 hover:underline">
                                  Register
                              </Link>
                          </>
                      )}
                  </div>
              </nav>
              <div className="max-w-4xl mx-auto">
                  <Routes>
                      <Route path="/" element={<PrivateRoute><TaskList /></PrivateRoute>} />
                      <Route path="/new" element={<PrivateRoute><TaskForm /></PrivateRoute>} />
                      <Route path="/edit/:id" element={<PrivateRoute><TaskForm /></PrivateRoute>} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />
                  </Routes>
              </div>
          </div>
  )
}

export default App
