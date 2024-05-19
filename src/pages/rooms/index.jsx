import React, { useEffect } from "react";
import useGetRooms from "./hook/useGetRooms";
import useSocket from "../../hook/useSocket";
import { useSelector } from "react-redux";
import useListenJoin from "./hook/useListenJoinRoom";
import { Board } from "../../components";

const RoomList = () => {
  const rooms = useSelector((state) => state.socket.rooms);
  useListenJoin();
  useSocket();
  const { joinRoom } = useGetRooms();
  const handleJoinRoom = () => {
    joinRoom();
  };
  console.log(rooms);

  return (
    <div>
      <h1>Available Rooms</h1>
      {rooms && rooms.status === "created" && <>Wait</>}
      {rooms === null && (
        <button className="btn btn-neutral" onClick={() => handleJoinRoom()}>
          Join Room
        </button>
      )}
      {rooms && rooms.status === "ready" && <Board />}
    </div>
  );
};

export default RoomList;
