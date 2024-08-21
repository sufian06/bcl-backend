import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import globalErrorHandler from "./app/middlewares/globalErrorHandler.js";
import notFound from "./app/middlewares/notFound.js";
import router from "./app/routes/index.js";

const app = express();

// parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors());

// application routes
app.use("/api/v1", router);

// test
app.get("/", (req, res) => {
  res.send("Welcome to bcl");
});

// global error handler
app.use(globalErrorHandler);

// not found
app.use(notFound);

export default app;
