import express from "express";

import { router } from "./routes";
const app = express();
const cors = require('cors');


app.use(cors({
    origin: '*'
}));

app.use(express.json());
app.use(router);

app.listen(3030, () => console.log("Server listening on port 3030"));