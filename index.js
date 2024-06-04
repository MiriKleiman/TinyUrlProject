import connectDB from "./DB.js";
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import LinksRouter from "./Routers/LinksRouter.js";
import UsersRouter from "./Routers/UsersRouter.js";
import linkController from "./Controllers/LinksController.js"
console.log("hi");
connectDB();

const app = express();
const port = 3200;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());

function middleware(req, res, next) {
    const shabbat = false
    if (shabbat) {
        res.status(400).send('היום שבת!')
        console.log('after shabbat middleware')
    } else {
        next()
    }
}

app.use(middleware)

app.use("/links", LinksRouter);
app.use("/users", UsersRouter);
app.get("/:shortUrl", linkController.redirection)

// app.get('/', (req, res) => {
//   res.send('Hello World!!!')
// })

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
