import { useEffect, useState } from "react";
import {
  getAllTodos,
  postTodo,
  updateTodo,
  deleteATodo,
} from "../utilities/TodoListUtilities";
import { useOutletContext } from "react-router-dom";

//styling imports
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

function TodoList({ showAddToDo, eventID, hosts, approvedVolunteers }) {
  const [tasks, setTasks] = useState([]); //arr of objs {id <task id>, assigned_host, task, completed<boolean>}
  const { userProfileData } = useOutletContext();
  const [newTask, setNewTask] = useState("");
  const [allParticipants, setAllParticipants] = useState([]);

  useEffect(() => {
    getTodos();
  }, [eventID]);

  useEffect(() => {
    setAllParticipants([...hosts, ...approvedVolunteers]);
  }, [approvedVolunteers, hosts]);


  const getNameFromId = (id) => {
    return allParticipants.find((participant) => participant.user_id === id)
      .display_name;
  };

  //get all todos for an event
  const getTodos = async () => {
    let data = await getAllTodos(eventID);

    console.log("data: ", data);
    setTasks(data);
  };

  //create a new todo
  const createTodo = async (assignedHost) => {
    let response = await postTodo(eventID, userProfileData.id, newTask);
    if (response) {
      getTodos();
      setNewTask("");
    } else {
      console.log("todo could not be created");
    }
  };

  //update todo
  const updateTheTodo = async (taskID, assignedHost, completed) => {
    let response = await updateTodo(eventID, taskID, assignedHost, !completed);
    if (response) {
      console.log("todo updated :)");
      getTodos();
    } else {
      console.log("todo could not be updated");
    }
  };

  //delete todo
  const deleteTheTodo = async (taskID) => {
    let response = await deleteATodo(eventID, taskID);
    if (response) {
      console.log("todo deleted :)");
      getTodos();
    } else {
      console.log("todo could not be deleted");
    }
  };

  return (
    <Card style={{ marginTop: "2vw" }}>
      <CardHeader title="To-Do List" />
      <CardContent>
        <List>
          {tasks.map((task) => (
            <ListItem key={task.id} dense button>
              <ListItemText
                primary={task.task}
                secondary={allParticipants.length ? getNameFromId(task.assigned_host) : ""}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              />
              {showAddToDo && (
                <ListItemSecondaryAction>
                  <IconButton
                    edge="end"
                    aria-label="delete"
                    onClick={() => deleteTheTodo(task.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="toggle"
                    onClick={() =>
                      updateTheTodo(task.id, task.assigned_host, task.completed)
                    }
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
              onKeyPress={(e) => e.key === "Enter" && createTodo()}
            />
            <Button
              startIcon={<AddCircleOutlineIcon />}
              onClick={createTodo}
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
