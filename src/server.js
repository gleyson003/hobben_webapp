import express from "express";

const app = express();
const PORT = 3000;

// Configures EJS as the template engine.
app.set("view engine", "ejs");

// Allows Express to serve static files such as CSS.
app.use(express.static("public"));

// Allows Express to process form data.
app.use(express.urlencoded({ extended: true }));

// Displays the home page.
app.get("/", (req, res) => {
    res.render("index");
});

// Starts the local web server.
app.listen(PORT, () => {
    console.log(
        `Hobben is running at http://localhost:${PORT}`
    );
});