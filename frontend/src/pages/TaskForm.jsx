import { useEffect, useState } from 'react';
import {Link, useNavigate, useParams} from 'react-router-dom';
import api from '../api/axios';

function TaskForm() {
    const [task, setTask] = useState({
        title: '',
        description: '',
        status: 'TODO'
    });

    const [errors, setErrors] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();
    const isEditing = Boolean(id);

    useEffect(() => {
        if (isEditing) {
            api.get(`/tasks/${id}`)
                .then(res => setTask(res.data))
                .catch(err => console.error("Error loading task", err));
        }
    }, [id]);

    const handleChange = (e) => {
        setTask({ ...task, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors({});

        const request = isEditing
            ? api.put(`/tasks/${id}`, task)
            : api.post('/tasks', task);

        request
            .then(() => navigate('/'))
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    setErrors(err.response.data);
                } else {
                    console.error("Unexpected error", err);
                }
            });
    };

    const statusLabels = {
        TODO: 'To Do',
        IN_PROGRESS: 'In Progress',
        DONE: 'Done'
    };

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow">
            <h2 className="text-2xl font-semibold mb-6">{isEditing ? "Edit Task" : "New Task"}</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-1 text-gray-700">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                </div>

                <div>
                    <label className="block mb-1 text-gray-700">Description</label>
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    />
                    {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                </div>

                <div>
                    <label className="block mb-1 text-gray-700">Status</label>
                    <select
                        name="status"
                        value={task.status}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                    >
                        {Object.entries(statusLabels).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>

                <div className="flex justify-end gap-4">
                    <Link to="/" className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Cancel</Link>
                    <button
                        type="submit"
                        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                    >
                        {isEditing ? "Update" : "Create"}
                    </button>
                </div>
            </form>
        </div>

    );
}

export default TaskForm;
