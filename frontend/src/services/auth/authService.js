import axios from "axios";

const ROOT_URL = process.env.REACT_APP_API_URL;

class AuthService {
    googleLogin(access_token) {
        return axios.post(
            ROOT_URL + "/api/accounts/rest-auth/google/",
            {
                access_token: access_token,
            }
        ).then(response => {
            if (response.data.access_token) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }

            return response.data;
        })
    };

    login(username, password) {
        return axios.post(
            ROOT_URL + "/api/accounts/rest-auth/login/", {
                username,
                password
            })
            .then(response => {
                if (response.data.access_token) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }

                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }

    register(username, email, password) {
        return axios.post(ROOT_URL + "/api/accounts/", {
            username,
            email,
            password
        }).then(response => {
            return this.login(username, password)
        });
    }

    refresh_token(refresh_token) {
        return axios.post(ROOT_URL + "/api/accounts/rest-auth/token/refresh/", {
            refresh: refresh_token,
        }).then(response => {
            if (response.data.access) {
                let user = JSON.parse(localStorage.getItem('user'))
                user.access_token = response.data.access
                localStorage.setItem("user", JSON.stringify(user));
            }

            return response.data;
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem('user'));
    }

    isLoggedIn() {
        return localStorage.hasOwnProperty('user');
    }
}

export default new AuthService();