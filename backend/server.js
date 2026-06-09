import dns from 'node:dns';
dns.setServers(['1.1.1.1', '8.8.8.8']);

import dotenv from "dotenv";
dotenv.config();
import path from "path";
import express from "express";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productroutes.js";

const app = express(); // create an instance of express application and store it in a variable called app

const PORT = process.env.PORT || 5000; // set the port number to either the value from environment variable or 5000
const _dirname = path.resolve();

app.use(express.json()); // this is a built-in middleware function in Express. It parses incoming requests with JSON payloads and is based on body-parser. It makes the parsed data available in req.body.

app.use("/api/products", productRoutes);
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(_dirname, "frontend/dist")));

    app.get("/*splat", (req, res) => {
        res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
    });
};


app.listen(PORT, () => {
    connectDB();
    console.log(`server started at http://localhost:${PORT}`);
});
