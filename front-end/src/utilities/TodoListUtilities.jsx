import { api } from "../utilities";

//get all todos for an event
export const getAllTodos = async (eventID) => {
  const response = await api.get(`events/${eventID}/todo/`);
  let todos = response.data;
  return todos;
};

//make a new todo for an event 
export const postTodo = async (eventID, assignedHost, task) => {
  const response = await api.post(`events/${eventID}/todo/`, {
    "assigned_host": assignedHost,
    "task": task
  })
  if (response.status === 201) {
    return true;
  } else {
    console.log("error:", response.data);
    return false;
  }
}

//update todo 
export const updateTodo = async (eventID, taskID, assignedHost, completed) => {
  const response = await api.put(`events/${eventID}/todo/${taskID}/`, {
    "assigned_host": assignedHost,
    "completed": completed
  });
    if (response.status === 200) {
      return true;
    } else {
      console.log("error:", response.data);
      return false;
    }
}

//delete todo 
export const deleteATodo = async (eventID, taskID) => {
  const response = await api.delete(`events/${eventID}/todo/${taskID}/`);
    if (response.status === 204) {
      return true;
    } else {
      console.log("error:", response.data);
      return false;
    }
}

