const express = require('express');
const cors = require('cors');

const app = express()

const PORT = process.env.PORT || 3001

const db = require("./config/db");
const allRoutes = require("./routes");

db.then(() =>{
    console.log("object berhasil connect ke mongoDB");
})
.catch(() =>{
    console.log("object gagal connect");
})

app.use(cors())
app.use(express.json())
app.use(allRoutes)

app.listen(PORT, () => {
    console.log("server running on port" + PORT);
})