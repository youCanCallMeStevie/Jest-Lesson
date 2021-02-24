const server = require("./server")
const mongoose = require("mongoose")
const { PORT, ATLAS_URL } = process.env
const list = require("express-list-endpoints")

mongoose.connect(
    ATLAS_URL + "/jest-lesson",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
    }
).then(() => server.listen(PORT, () => {
    console.log(list(server))
    console.log("Server listening on port " + PORT)
}))