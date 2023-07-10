import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { useParams } from "react-router-dom";

export default function Friend(props) {
  const { authInfo } = useContext(AuthContext);
  const { id } = useParams();
  const [friend, setFriend] = useState([]);

  useEffect(() => {
    console.log("authInfo", id, authInfo);
    axios
      .get(`http://localhost:9000/api/friends/${id}`, {
        headers: {
          authorization: authInfo.token,
        },
      })
      .then((res) => setFriend(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="friendListDiv">
      <h1>FRIEND </h1>
      <div className="friendList">
        -{friend.name}-{friend.email}
      </div>
    </div>
  );
}
