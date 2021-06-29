//initializing the app
const env = require("dotenv");
env.config()
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const app = express();

//routes section
const authRoutes = require("./routes/auth");
const adminRoutes = require("./routes/admin/auth");
const questionRoutes = require("./routes/questions");
//database connection with mongoose ODM
mongoose
    .connect(
        `mongodb://localhost:27017/beweddy`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
        }
    )
    .then(() => {
        console.log("DataBase Connected");
    });


//middleware section
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

//declaring API for production
app.use("/api", authRoutes);
app.use("/api", adminRoutes);
app.use("/api", questionRoutes);
//listen section
app.listen(process.env.PORT, () =>
    console.log(`Server is running on this ${process.env.PORT}`)
);