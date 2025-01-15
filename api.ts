import axios from "axios";

export const fetchUserByEmail = async (email: string) => {
  axios
    .get(`https://liars-table-be.onrender.com/api/users/${email}`)
    .then((response) => {
      console.log("api", response.data);
      return response.data;
    });
};
