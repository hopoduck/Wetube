import "core-js";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { userRouter } from "./router";

const app = express();

const handleHome = (req, res) => res.send("Hello from home");
const handleProfile = (req, res) => res.send("Yout are no my asdasd");

app.use(cookieParser());
app.use(bodyParser.json()); // 모든 라우터에 적용되는 함수
app.use(bodyParser.urlencoded({ extended: true })); // 모든 라우터에 적용되는 함수
app.use(helmet());
app.use(morgan("dev"));

app.get("/", handleHome);

app.get("/profile", handleProfile);

app.use("/user", userRouter);

export default app;
