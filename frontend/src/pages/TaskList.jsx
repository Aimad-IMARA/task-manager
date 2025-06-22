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

    const statusLabels = {
        TODO: 'To Do',
        IN_PROGRESS: 'In Progress',
        DONE: 'Done'
    };

    return (
        <div className="max-w-3xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
            </div>

            <div className="space-y-4 pr-2">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <div
                            key={task.id}
                            className="p-3 m-4 rounded shadow-sm flex justify-between items-center"
                        >
                            <div>
                                <h2 className="font-semibold text-lg text-gray-700">{task.title}</h2>
                                <p className="text-sm text-gray-500">{task.description}</p>
                                <p className="text-xs mt-1 text-gray-400">Status: {statusLabels[task.status]}</p>
                            </div>
                            <div className="flex gap-2">
                                <Link to={`/edit/${task.id}`} className="text-blue-500 hover:underline">Edit</Link>
                                <button
                                    onClick={() => handleDelete(task.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">No tasks found.</p>
                )}
            </div>
        </div>

    );
}

export default TaskList;
