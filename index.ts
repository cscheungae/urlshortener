require("dotenv").config();
import express from "express";
import cors from "cors";
const app = express();
import morgan from "morgan";
import router from "./src/router";

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/public", express.static(`${process.cwd()}/public`));

app.get("/", function (req, res) {
    res.sendFile(process.cwd() + "/views/index.html");
});

app.use("/api", router);

app.listen(port, function () {
    console.log(`Listening on port ${port}`);
});
