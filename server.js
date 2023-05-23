const express = require("express");
const cors = require("cors");

const app = express();

var corsOption = {
    origin: "http://localhost:3000"
};

app.use(cors(corsOption));

app.use(express.json());

app.use(express.urlencoded({
    extended: true
}));

const db = require("./app/models");

db.sequelizeConnect.sync()
.then(() => {
    console.log('Database Syncronized')
}).catch((err) => {
    console.log('Error to sync: ' + err.message)
})

// Main route
app.get("/", (req, res) => {
    res.json({
        message: "This is main route of biodata"
    });
});


// Biodata route
const biodata = require("./app/controllers/biodata.controller.js")

// Create route
app.post("/biodata/", (req, res) => {
    biodata.create(req, res)
});

// Read All biodata
app.get("/biodata/", (req, res) => {
    biodata.findAll(req, res)
});

// Read one biodata
app.get("/biodata/:id", (req, res) => {
    biodata.findOne(req, res)
})

// Update a Biodata
app.put("/biodata/:id", (req, res) => {
    biodata.update(req, res)
})

// Update one column
app.patch("/biodata/:id", (req, res) => {
    biodata.updateOne
})

// Delete a biodata
app.delete("/biodata/:id", (req, res) => {
    biodata.delete(req, res)
})


// Port and running server
const PORT = process.env.port || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});