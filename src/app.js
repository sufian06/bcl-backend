import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";

const app = express();

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

// test
app.get("/", (req, res) => {
  res.send("Welcome to bcl");
});

export default app;
