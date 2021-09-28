import axios from "axios";

export const createOrUpdateUser = async (authtoken) => {
    console.log("jeee",`${process.env.REACT_APP_API}/create-or-update-user`);
  return await axios.post(
    "http://localhost:8000/api/create-or-update-user",
    {},
    {
      headers: {
        authtoken,
      },
    }
  );
};


export const login = async (authtoken) => {
  // console.log("jeee",`${process.env.REACT_APP_API}/create-or-update-user`);
return await axios.post(
  "http://localhost:8000/api/login",
  { email },
  {
    headers: {
      authtoken,
    },
  }
);
};