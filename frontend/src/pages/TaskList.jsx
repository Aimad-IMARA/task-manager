import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = () => {
        api.get('/tasks')
            .then(res => setTasks(res.data))
            .catch(err => console.error("Error fetching tasks", err));
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    const handleDelete = (id) => {
        if (!confirm('Are you sure you want to delete this task?')) return;

        api.delete(`/tasks/${id}`)
            .then(() => fetchTasks())
            .catch(err => console.error("Error deleting task", err));
    }

    return (
        <div>
            <h2>Task List</h2>
            {tasks.length === 0 ? (
                <p>No tasks available.</p>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <strong>{task.title}</strong> - {task.status} | <Link to={`/edit/${task.id}`}>Edit</Link> | <button onClick={()=> handleDelete(task.id)}> Delete</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TaskList;
