import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskForm from "./pages/TaskForm.jsx";
import TaskList from "./pages/TaskList.jsx";
import Login from "./pages/Login.jsx";

function App() {

  return (
      <Router>
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
                      <Link to="/login" className="text-gray-600 hover:underline">
                          Login
                      </Link>
                  </div>
              </nav>
              <div className="max-w-4xl mx-auto">
                  <Routes>
                      <Route path="/" element={<TaskList />} />
                      <Route path="/new" element={<TaskForm />} />
                      <Route path="/edit/:id" element={<TaskForm />} />
                      <Route path="/login" element={<Login />} />
                  </Routes>
              </div>
          </div>
      </Router>
  )
}

export default App
