import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Link } from 'react-router-dom';

function TaskList() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        api.get('/tasks')
            .then(res => {
                setTasks(res.data);
            })
            .catch(err => {
                console.error("Error fetching tasks", err);
            });
    }, []);

    return (
        <div>
            <h2>Task List</h2>
            {tasks.length === 0 ? (
                <p>No tasks available.</p>
            ) : (
                <ul>
                    {tasks.map(task => (
                        <li key={task.id}>
                            <strong>{task.title}</strong> — {task.status} | <Link to={`/edit/${task.id}`}>Edit</Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default TaskList;
