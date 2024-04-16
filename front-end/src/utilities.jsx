import axios from "axios";

export const api = axios.create({
    baseURL: "http://127.0.0.1:8000/api/v1/",
});

// user confirmation asyn function 
export const userConfirmation = async() => {
    const token = localStorage.getItem("token");
    if (token) {
        api.defaults.headers.common['Authorization'] = `Token ${token}`;
        const response = await api.get('users/');
        if (response.status = 200) {
            console.log(response.data);
            return { user: response.data.user, email: response.data.email }
        } else {
            console.log('userConfirmation error', response)
            return null
        }
    } else {
        console.log('userConfirmation no token in localStorage');
        return null
    }
}

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