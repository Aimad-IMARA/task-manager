import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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
        <div>
            <h2>{isEditing ? 'Edit Task' : 'Add New Task'}</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label><br />
                    <input
                        type="text"
                        name="title"
                        value={task.title}
                        onChange={handleChange}
                    />
                    {errors.title && <div style={{ color: 'red' }}>{errors.title}</div>}
                </div>

                <div>
                    <label>Description:</label><br />
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                    />
                    {errors.description && <div style={{ color: 'red' }}>{errors.description}</div>}
                </div>

                <div>
                    <label>Status:</label><br />
                    <select name="status" value={task.status} onChange={handleChange}>
                        {Object.entries(statusLabels).map(([value, label]) => (
                            <option key={value} value={value}>{label}</option>
                        ))}
                    </select>
                </div>

                <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
}

export default TaskForm;
