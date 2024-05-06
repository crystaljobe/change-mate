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
  Modal,
  Box,
  Button,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add"

function TodoList({ showAddToDo, eventID, hosts, approvedVolunteers }) {
  const [tasks, setTasks] = useState([]); //arr of objs {id <task id>, assigned_host, task, completed<boolean>}
  const { userProfileData } = useOutletContext();
  const [newTask, setNewTask] = useState("");
  const [allParticipants, setAllParticipants] = useState([]);
  const [selectedTask, setSelectedTask] = useState({});
  //modal open/close <assign someone todo item & delete todo item>
  const [openModal, setOpenModal] = useState(false);
  const handleopenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleSettingsButtonClick = (aTask) => {
    handleopenModal();
    setSelectedTask(aTask);
    console.log("a Task",aTask)
  }

  useEffect(() => {
    getTodos();
  }, [eventID]);

  useEffect(() => {
    let uniqueParticipants = createAllParticipants();
    setAllParticipants(uniqueParticipants);
  }, [approvedVolunteers, hosts]);

  //helper function that uses a Set to remove duplicate participants based on user_id
  function createAllParticipants() {
    let combinedParticipants = [...hosts, ...approvedVolunteers];
    const uniqueParticipants = Array.from(
      new Set(combinedParticipants.map((participant) => participant.user_id))
    ).map((user_id) =>
      combinedParticipants.find(
        (participant) => participant.user_id === user_id
      )
    );
    return uniqueParticipants;
  }

  const getNameFromId = (id) => {
    return allParticipants.find((participant) => participant.user_id === id)
      ?.display_name;
  };

  //get all todos for an event
  const getTodos = async () => {
    let data = await getAllTodos(eventID);
    setTasks(data);
    console.log('all todos!! tasks--', tasks)
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

  //update todo -- assigned user or completed
  const updateTheTodo = async (taskID, assignedHost, completed) => {
      console.log("update the todo funct --", taskID, assignedHost, completed);

    let response = await updateTodo(taskID, assignedHost, completed);
    if (response) {
      getTodos();
      handleCloseModal();
    } else {
      console.log("todo could not be updated");
    }
  };

  //delete todo
  const deleteTheTodo = async (taskID) => {
    let response = await deleteATodo(taskID);
    if (response) {
      getTodos();
      handleCloseModal();
    } else {
      console.log("todo could not be deleted");
    }
  };

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
            <ListItem style={{ marginLeft: 0 }} key={task.id} dense>
              <ListItemText 
                primary={<span className="card-body">{task.task}</span>}
                secondary={allParticipants.length
                    ? <span className="card-body">{getNameFromId(task.assigned_host)}</span>
                    : ""
                }
                style={{
                  textDecoration: task.completed ? "line-through" : "none"
                }}
                
              />
              {showAddToDo && (
                <ListItemSecondaryAction>
                  <IconButton onClick={() => handleSettingsButtonClick(task)}>
                    <SettingsIcon />
                  </IconButton>

                  <IconButton
                    edge="end"
                    aria-label="toggle"
                    onClick={() =>
                      updateTheTodo(task.id, task.assigned_host, !task.completed)
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

      {/* !!!  Modal opens to confirm searched user is correct user  !!! */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography>
            Delete this todo item?
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => deleteTheTodo(selectedTask.id)}
            >
              <DeleteIcon />
            </IconButton>{" "}
          </Typography>
          <List>
            Assign to a different participant:
            {allParticipants && allParticipants.length
              ? allParticipants.map((participant, index) => (
                  <ListItem key={index}>
                    {participant.display_name}
                    <IconButton
                      onClick={() =>
                        updateTheTodo(
                          selectedTask.id,
                          participant.user_id,
                          false
                        )
                      }
                    >
                      <AddIcon />
                    </IconButton>
                  </ListItem>
                ))
              : null}
          </List>
        </Box>
      </Modal>
    </Card>
  );
}

export default TodoList;
