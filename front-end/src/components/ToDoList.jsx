import { useState } from 'react';
import { Card, CardHeader, CardContent, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

function TodoList( {showAddToDo} ) {
    const [tasks, setTasks] = useState([
        { id: 1, text: "Prepare event budget", completed: false },
        { id: 2, text: "Confirm speakers", completed: true },
        { id: 3, text: "Promotional materials", completed: false }
    ]);
    const [newTask, setNewTask] = useState("");

    const handleAddTask = () => {
        if (newTask.trim()) {
            const newId = tasks.length ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
            setTasks([...tasks, { id: newId, text: newTask, completed: false }]);
            setNewTask("");
        }
    };

    const toggleTaskCompletion = (taskId) => {
        setTasks(tasks.map(task => 
            task.id === taskId ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleDeleteTask = (taskId) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    };

    return (
      <Card style={{ marginTop: "2vw" }}>
        <CardHeader title="To-Do List" />
        <CardContent>
          <List>
            {tasks.map((task) => (
              <ListItem
                key={task.id}
                dense
                button
                onClick={
                  showAddToDo ? () => toggleTaskCompletion(task.id) : null
                }
              >
                <ListItemText
                  primary={task.text}
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                  }}
                />
                {showAddToDo && (
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      aria-label="delete"
                      onClick={() => handleDeleteTask(task.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      edge="end"
                      aria-label="toggle"
                      onClick={() => toggleTaskCompletion(task.id)}
                    >
                      {task.completed ? (
                        <CheckCircleIcon />
                      ) : (
                        <CheckCircleOutlineIcon />
                      )}
                    </IconButton>
                  </ListItemSecondaryAction>
                )}
              </ListItem>
            ))}
          </List>
          {showAddToDo && (
            <>
              <TextField
                label="Add new task"
                variant="outlined"
                fullWidth
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddTask()}
              />
              <Button
                startIcon={<AddCircleOutlineIcon />}
                onClick={handleAddTask}
                color="primary"
                variant="contained"
                style={{ marginTop: 8 }}
              >
                Add Task
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    );
}

export default TodoList;
