import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from 'cors'; // Import the CORS middleware
//imported routes
import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import jobRoute from "./routes/jobRoute.js";
import jobApplicationRoute from "./routes/jobApplicationRoute.js";
import conversationRoute from "./routes/conversationRoute.js";
import messageRoute from "./routes/messageRoute.js";
import employeeRoute from "./routes/employeeRoute.js";
import { error } from "./controllers/errorController.js";
import { Server, Socket } from 'socket.io';
dotenv.config();//Configs
const app = express();
const port = 9000;
mongoose.set("strictQuery", true);// Db connection
try {
  await mongoose.connect(process.env.DBCONNECTION);
  console.log("Yes DB is connected");
} catch (error) {
  console.error(error);
}

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, // Allow credentials
};

app.use(cors(corsOptions));// Use the CORS middleware to allow requests from all origins
//Middleware
app.use(express.json());
app.use(cookieParser());

//Routes
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/employees", employeeRoute);
app.use("/api/conversations", conversationRoute);
app.use("/api/messages", messageRoute);
app.use("/api/jobs", jobRoute);
app.use("/api/jobApplication", jobApplicationRoute);
//Errors
app.use(error);

const server =app.listen(port, () => {
  console.log(`The server is runing on  http://localhost:${port}`);
});

const io = new Server(server, {
  pingTimeOut: 6000,
  cors: {
    origin: 'http://localhost:3000'
  }
});

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
  // console.log(`Socket is connectedd`);    
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
