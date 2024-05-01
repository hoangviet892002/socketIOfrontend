const websocketMiddleware = (store) => {
  let socket = null;

  const onMessage = (event) => {
    const { data } = event;
    const parsedData = JSON.parse(data);
    store.dispatch({ type: "RECEIVE_MESSAGE", payload: parsedData });
  };

  return (next) => (action) => {
    switch (action.type) {
      case "CONNECT":
        if (socket !== null) {
          socket.close();
        }
        socket = new WebSocket(action.payload.url);
        socket.onmessage = onMessage;
        break;
      case "SEND_MESSAGE":
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(JSON.stringify(action.payload));
        }
        break;
      default:
        return next(action);
    }
  };
};
