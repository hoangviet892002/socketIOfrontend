export const setSocket = (socket) => ({
  type: "SET_SOCKET",
  payload: socket,
});

export const setOnlineUsers = (users) => ({
  type: "SET_ONLINE_USERS",
  payload: users,
});
