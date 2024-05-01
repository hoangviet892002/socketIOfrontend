import { MessengerContainer, SideBar } from "../../components";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { setSocket, setOnlineUsers } from "../../redux/actions/socketAction";
const HomePage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.data);
  const socket = useSelector((state) => state.socket.socket);
  useEffect(() => {
    if (user) {
      const newSocket = io("http://localhost:8000", {
        query: {
          userId: user._id,
        },
      });
      dispatch(setSocket(newSocket));
      newSocket.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users));
      });
      return () => {
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        dispatch(setSocket(null));
      }
    }
  }, [user]);
  return (
    <div className="flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
      <SideBar />
      <MessengerContainer />
    </div>
  );
};
export default HomePage;
