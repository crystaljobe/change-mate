import { api } from "../utilities";

//get all todos for an event
export const getAllTodos = async (eventID) => {
  const response = await api.get(`todo/event/${eventID}/`);
  let todos = response.data;
  console.log('utilities --todos', todos)
  return todos;
};

//make a new todo for an event 
export const postTodo = async (eventID, task) => {
  const response = await api.post(`todo/event/${eventID}/`, {
    task: task,
  });
  if (response.status === 201) {
    return true;
  } else {
    console.log("error:", response.data);
    return false;
  }
}

//update todo 
export const updateTodo = async (taskID, assignedHost, completed) => {
  const response = await api.put(`todo/${taskID}/`, {
    assigned_host: assignedHost,
    completed: completed,
  });
    if (response.status === 200) {
      return true;
    } else {
      console.log("error:", response.data);
      return false;
    }
}

//delete todo 
export const deleteATodo = async (taskID) => {

  const response = await api.delete(`todo/${taskID}/`);
    if (response.status === 204) {
      return true;
    } else {
      console.log("error:", response.data);
      return false;
    }
}

