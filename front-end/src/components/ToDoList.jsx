import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, TextField, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { getEventTasks } from '../utilities/EventUtilities';

function TodoList( {showAddToDo, eventDetails} ) {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Fetches tasks and sets them to tasks for rendering
  const fetchTasks = async () => {
    try {
      const tasksData = await getEventTasks(eventDetails.id);
      setTasks(tasksData); 
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };
  
  useEffect(() => {
    fetchTasks();
  }, [eventDetails]);

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

  //styles for card
	const styles = {
		cardCSS: {
			maxWidth: "800px",
			margin: "24px",
      width: "100%",
      maxHeight: "1300px",
		},
	};

  return (
    <Card className="cardCSS d-flex justify-self-end" style={styles.cardCSS}>
      <h2>To-Do List</h2>
      <hr/>
      <CardContent>
        <List>
          {tasks.map((task) => (
            <ListItem
              style={{ marginLeft: 0 }}
              key={task.id}
              dense
              button
              onClick={showAddToDo ? () => toggleTaskCompletion(task.id) : null}
            >
              <span className='card-body' style={{
                  textDecoration: (task.completed) ? "line-through" : "none",
                }}>- {task.task}</span>
              {showAddToDo &&
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
}
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
