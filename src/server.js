const express = require("express")
const listEndPoints =require("express-list-endpoints");
const server = new express()
const {
    notFoundHandler,
    badRequestHandler,
    genericErrorHandler,
  } = require("./middleware/errorhandling");

const userRouter = require("./services/users/route")

server.use(express.json())

server.get("/test", (req, res) => {
    res.status(200).send({ message: "Test success" })
})

//ROUTES
server.use("/users", userRouter)


//ERROR HANDLERS
server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);
console.log(listEndPoints(server));

module.exports = server