import express from "express"; 
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


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
app.use("/", express.static(path.join(__dirname, "/")));
app.use("/AdminPanel", express.static(path.join(__dirname, "/AdminPanel")));
app.use("/AdminPanel", express.static(path.join(__dirname, "/AdminPanel")));
app.use("/AdminPanel/Add/Book", express.static(path.join(__dirname, "/AdminPanel/Add/Book")));
app.use("/AdminPanel/Add/QuizAss", express.static(path.join(__dirname, "/AdminPanel/Add/QuizAss")));
app.use("/history", express.static(path.join(__dirname, "/history")));
app.use("/History", express.static(path.join(__dirname, "/History"))); 
   

const port =  3000;

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});