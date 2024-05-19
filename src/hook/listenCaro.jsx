import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMessages } from "../redux/actions/messageAction";
import { setRooms } from "../redux/actions/socketAction";

const useListenCaro = () => {
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.socket.socket);
  const [game, setGame] = useState();

  useEffect(() => {
    socket?.on("move", (data) => {
      dispatch(setRooms(data));
      setGame(data.game);
    });

    return () => socket?.off("move");
  }, [socket]);
  return { game };
};
export default useListenCaro;
