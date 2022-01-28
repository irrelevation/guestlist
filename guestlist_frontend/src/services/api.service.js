import axios from "axios";
import authHeader from "./auth-header";
import authService from "./auth.service";

const API_URL = "http://localhost:3000/api/v1/";

class ApiService {
  createEvent(data) {
    return axios({
      method: "post",
      url: API_URL + "events",
      headers: authHeader(),
      data,
    });
  }

  getEvents() {
    const { user } = authService.getCurrentUser();

    return axios({
      method: "get",
      url: `${API_URL}users/${user._id}/events`,
      headers: authHeader(),
    });
  }

  getEvent(id) {
    return axios({
      method: "get",
      url: `${API_URL}events/${id}`,
      headers: authHeader(),
    });
  }
}

export default new ApiService();
