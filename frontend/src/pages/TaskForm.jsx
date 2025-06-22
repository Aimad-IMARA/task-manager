import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

function TaskForm() {
    const [task, setTask] = useState({
        title: '',
        description: '',
        status: 'TODO'
    });

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
        const request = isEditing
            ? api.put(`/tasks/${id}`, task)
            : api.post('/tasks', task);

        request
            .then(() => navigate('/'))
            .catch(err => console.error("Error saving task", err));
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
                        required
                    />
                </div>

                <div>
                    <label>Description:</label><br />
                    <textarea
                        name="description"
                        value={task.description}
                        onChange={handleChange}
                    />
                </div>

                <div>
                    <label>Status:</label><br />
                    <select name="status" value={task.status} onChange={handleChange}>
                        <option value="TODO">TODO</option>
                        <option value="IN_PROGRESS">IN_PROGRESS</option>
                        <option value="DONE">DONE</option>
                    </select>
                </div>

                <button type="submit">{isEditing ? 'Update' : 'Create'}</button>
            </form>
        </div>
    );
}

export default TaskForm;
