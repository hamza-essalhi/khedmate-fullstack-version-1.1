// const io = new Server(server, {
//     pingTimeOut: 6000,
//     cors: {
//       origin: 'http://localhost:3000'
//     }
//   });




const io = require('socket.io')(
    4000, {
    cors: {
        origin: 'http://localhost:3000'
    }
}
)

let users = [];

const addUser = (userId, socketId) => {
    !users.some((user) => user.userId === userId) &&
        users.push({ userId, socketId });
};

const removeUser = (socketId) => {
    users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
    return users.find((user) => user.userId === userId);
};
io.on('connection', (socket) => {
    socket.on('postUser', userId => {
        addUser(userId, socket.id)
        io.emit('getOnlineUsers', users)
    })


    socket.on('sendMessage', ({ userId, conversationId, toUnit, message }) => {
        const user = getUser(toUnit)

        if (user) {
            io.to(user.socketId).emit('getMessage', {
                userId,
                message,
                conversationId
            });
        } 
    })


    socket.on('typing', ({toUnit, conversationId}) => {
        const user = getUser(toUnit)

        if (user) {
            // io.to(user.socketId).emit('typing', conversationId);
            socket.broadcast.to(user.socketId).emit('typing', conversationId);
        } 
    });
    socket.on("disconnect", () => {
        removeUser(socket.id);
        io.emit("getUsers", users);
      });

})
