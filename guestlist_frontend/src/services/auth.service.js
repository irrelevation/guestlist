import axios from "axios";

const API_URL = "http://localhost:3000/api/v1/auth/";

class AuthService {
  login({ email, password }) {
    return axios
      .post(API_URL + "login/password", {
        email,
        password,
      })
      .then((response) => {
        const { user, token } = response.data;
        if (token) {
          localStorage.setItem("user", JSON.stringify({ user, token }));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register({ username, email, password }) {
    return axios.post(API_URL + "signUp", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new AuthService();
