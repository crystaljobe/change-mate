import { api } from "../utilities"

// user registration async function 
export const userRegistration = async (email, password) => {
    let response = await api.post('users/signup/', {
        email: email,
        password: password,
    });
    if (response.status === 201) {
        let { user, token } = response.data;
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        return user;
    }
    alert(response.data);
    return null;
}

// user login async function 
export const userLogin = async(email, password) => {
    const response = await api.post("users/login/", { email, password });

    if (response.status === 200) {
        let { user, token } = response.data;
        localStorage.setItem("token", token);
        api.defaults.headers.common["Authorization"] = `Token ${token}`;
        return user;
    }
    alert('Invalid Login Credentials');
    return null;
}

// user logout async function 
export const userLogout = async() => {
    let response = await api.post("/users/logout/");
    if (response.status === 204){
        localStorage.removeItem("token");
        delete api.defaults.headers.common["Authorization"];
        console.log("user logged out")
        return true;
    }
    alert("Logout failure.")
}

