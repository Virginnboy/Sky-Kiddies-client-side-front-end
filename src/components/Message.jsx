import { socket } from "../../socket.io";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getAdmin } from "../store/auth";
import Loading from "../components/Loading";

export default function Message() {
  const [ text, setText ] = useState("")

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["adminId"],
    queryFn: getAdmin
  });

  if (isLoading) {
    return <Loading/>
  }

  if (isError) {
    return <p>{error?.response?.data?.message || "Failed to get AdminId"}</p>
  }

  const adminId = data?._id;

  const user = JSON.parse(localStorage.getItem("userData"));
  const userId = user._id

  const handleSendMessage = (e) => {
    e.preventDefault()

    socket.emit("send_message", {
      sender: userId,
      receiver: adminId,
      message: text
    });

    setText("")
  } 

  return (
    <div>
      <header>
        <h2>Messages</h2>
      </header>

      <main>
        <span>
          <input 
            type="text" 
            value={text}
            onChange={(e)=>setText(e.target.value)}
            />

          <button onClick={handleSendMessage}>Send</button>
        </span>
      </main>
    </div>
  )
}