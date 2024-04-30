import { Card, ListGroup, Form, Button, InputGroup } from "react-bootstrap";
import { useState } from "react";

function TodoList() {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Prepare event budget", completed: false },
        { id: 2, text: "Confirm speakers", completed: true },
        { id: 3, text: "Promotional materials", completed: false }
    ]);
    const [newTask, setNewTask] = useState("");

    const handleAddTask = () => {
        if (newTask) {
            setTasks([...tasks, { id: tasks.length + 1, text: newTask, completed: false }]);
            setNewTask("");
        }
    };

    const toggleTaskCompletion = (taskId) => {
        const updatedTasks = tasks.map(task =>
            task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        setTasks(updatedTasks);
    };

    return (
        <Card className="todo-list-card">
            <Card.Header as="h5">To-Do List</Card.Header>
            <ListGroup variant="flush">
                {tasks.map(task => (
                    <ListGroup.Item key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`} onClick={() => toggleTaskCompletion(task.id)}>
                        {task.text}
                    </ListGroup.Item>
                ))}
            </ListGroup>
            <Card.Footer>
                <InputGroup>
                    <Form.Control
                        type="text"
                        placeholder="Add new task..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                    />
                    <Button variant="outline-secondary" onClick={handleAddTask}>Add Task</Button>
                </InputGroup>
            </Card.Footer>
        </Card>
    );
}

export default TodoList;
