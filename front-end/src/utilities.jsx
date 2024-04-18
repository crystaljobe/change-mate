import axios from "axios";


export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
});

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

// user confirmation asyn function 
export const userConfirmation = async() => {
    const token = localStorage.getItem("token");
    if (token) {
        api.defaults.headers.common['Authorization'] = `Token ${token}`;
        const response = await api.get('users/');
        if (response.status === 200) {
            console.log(api.defaults.headers.common['Authorization']);
            return { user: response.data.email }
        } else {
            // console.log('userConfirmation error', response)
            return null
        }
    } else {
        console.log('userConfirmation no token in localStorage');
        return null
    }
}