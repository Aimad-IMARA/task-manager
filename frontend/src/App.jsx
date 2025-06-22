import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskForm from "./pages/TaskForm.jsx";
import TaskList from "./pages/TaskList.jsx";

function App() {

  return (
      <Router>
          <nav>
              <Link to="/">Tasks</Link> | <Link to="/new">Add Task</Link>
          </nav>
          <Routes>
              <Route path="/" element={<TaskList />} />
              <Route path="/new" element={<TaskForm />} />
              <Route path="/edit/:id" element={<TaskForm />} />
          </Routes>
      </Router>
  )
}

export default App
