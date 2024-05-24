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
  const handleJoinRoom = (money) => {
    joinRoom(money);
  };

  const money = [500, 1000, 1500, 9000];
  return (
    <div>
      <h1>Available Rooms</h1>
      {rooms && rooms.status === "created" && <>Wait</>}
      {rooms === null && (
        <>
          {money.map((item) => {
            return (
              <button
                className="btn btn-neutral m-5"
                onClick={() => handleJoinRoom(item)}
              >
                Join Room {item}
              </button>
            );
          })}
        </>
      )}
      {rooms && (rooms.status === "ready" || rooms.status === "finish") && (
        <Board />
      )}
    </div>
  );
};

export default RoomList;
