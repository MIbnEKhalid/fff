import express from "express";
import fs from "fs/promises"; // Use the promisified version of fs
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
app.use(express.json()); // To parse JSON request bodies


// Serve static files
app.use(
    "/Assets",
    express.static(path.join(dirname(fileURLToPath(import.meta.url)), "Assets"), {
        setHeaders: (res, path) => {
            if (path.endsWith(".css")) {
                res.setHeader("Content-Type", "text/css");
            }
        },
    })
);

app.use(
    "/AdminPanel",
    express.static(path.join(dirname(fileURLToPath(import.meta.url)), "AdminPanel"), {
        setHeaders: (res, path) => {
            if (path.endsWith(".css")) {
                res.setHeader("Content-Type", "text/css");
            }
        },
    })
);
// Route to serve the append file page
app.get("/", (req, res) => {
    res.sendFile(path.join(dirname(fileURLToPath(import.meta.url)), "index.html"));
});

// Route to serve the append file page
app.get("/AdminPanel", (req, res) => {
    res.sendFile(path.join(dirname(fileURLToPath(import.meta.url)), "AdminPanel/index.html"));
});


// Route to serve the append file page
app.get("/AdminPanel/Add/Book", (req, res) => {
    res.sendFile(path.join(dirname(fileURLToPath(import.meta.url)), "AdminPanel/Add/Book/index.html"));
});

// Route to serve the append file page
app.get("/AdminPanel/Add/QuizAss", (req, res) => {
    res.sendFile(path.join(dirname(fileURLToPath(import.meta.url)), "AdminPanel/Add/QuizAss/index.html"));
});

// Route to serve the history page
app.get("/history", (req, res) => {
    res.sendFile(
        path.join(dirname(fileURLToPath(import.meta.url)), "history/index.html")
    );
});

app.get("/History", (req, res) => {
    res.sendFile(
        path.join(dirname(fileURLToPath(import.meta.url)), "history/index.html")
    );
});
const port =  3000;

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});