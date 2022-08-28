// Axios
import axios from "axios";

const createUser = (name, email, password) => {
  const url = "http://localhost:5000/api/users";

  axios
    .post(url, {
      name: name,
      email: email,
      password: password
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
};

export default createUser;
