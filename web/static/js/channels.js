import socket from "app/socket"

export const lobbyChannel = socket.channel("retrospectives:lobby")
