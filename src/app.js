//configurar express
import express from "express";
import morgan from "morgan";
import ProductsRouter from "./routes/products.routes";

const app = express();

app.use(morgan("dev"));
app.use(express.json());

app.get("/", (req, res) => {
    res.json("Hello world");
});

app.use("/products", ProductsRouter);

export default app;
