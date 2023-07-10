import React, { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import axios from "axios";

function AddFriend() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onChange" });

  const { authInfo , logOut } = useContext(AuthContext);
  const history = useHistory();
  const addFriendSubmit = (data) => {
    console.log("RHF", data);
    const postData = { ...data, age: Number(data.age), id: Date.now() };
    const config = {
      method: "post",
      url: "http://localhost:9000/api/friends",
      headers: {
        "Content-Type": "application/json",
        Authorization: authInfo.token,
      },
      data: JSON.stringify(postData),
    };
    axios(config)
      .then(function (response) {
        history.push("/friends-list");
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="loginFormMainDiv">
      <h1>Add Friend</h1>
      <form onSubmit={handleSubmit(addFriendSubmit)}>
        <div>
          <input
            type="text"
            placeholder="name"
            {...register("name", { required: "Ama adın ne?" })}
          />
          {errors?.name && <p>{errors.name.message}</p>}
        </div>
        <div>
          <input
            type="email"
            placeholder="email"
            {...register("email", {
              required: "Epostanı ver  ki spamlayalım.",
            })}
          />
          {errors?.email && <p>{errors.email.message}</p>}
        </div>
        <div>
          <input
            type="number"
            placeholder="age"
            {...register("age", {
              required: "yaş kaç",
            })}
          />
          {errors?.age && <p>{errors.age.message}</p>}
        </div>
        <button type="submit">Add Friend</button>
      </form>
    </div>
  );
}

export default AddFriend;
