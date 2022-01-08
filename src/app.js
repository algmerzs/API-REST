//configurar express
import express from "express";
import morgan from "morgan";
import pkg from "../package.json";

import { createRoles } from "./libs/initialSetup";

import AuthRouter from "./routes/auth.routes";
import ProductsRouter from "./routes/products.routes";

const app = express();
createRoles();

app.set("pkg", pkg);

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({
        name: app.get("pkg").name,
        author: app.get("pkg").author,
        description: app.get("pkg").description,
    });
});

app.use("/api/products", ProductsRouter);
app.use("/api/auth", AuthRouter);

export default app;
