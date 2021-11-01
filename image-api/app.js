const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
app.use(express.static('css'))
app.use(express.static('js'))
app.use(express.static('public'))
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "html"));

router.get("/", (req, res) => {
    res.render("index",{
        title: 'jjklkjkj',
        tl: 1000000,
        avaibletl: 50000
    });
});


app.use("/", router);
app.listen(process.env.port || 3000);

console.log("Running at Port 3000");