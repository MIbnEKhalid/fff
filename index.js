import express from "express"; 
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const app = express();
app.use(express.json()); // To parse JSON request bodies
 

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
 
app.use("/", express.static(path.join(__dirname, "public/")));
app.use("/AdminPanel", express.static(path.join(__dirname, "public/AdminPanel")));
app.use("/AdminPanel", express.static(path.join(__dirname, "public/AdminPanel")));
app.use("/AdminPanel/Add/Book", express.static(path.join(__dirname, "public/AdminPanel/Add/Book")));
app.use("/AdminPanel/Add/QuizAss", express.static(path.join(__dirname, "public/AdminPanel/Add/QuizAss")));
app.use("/history", express.static(path.join(__dirname, "public/history")));
app.use("/History", express.static(path.join(__dirname, "public/History"))); 
   

const port =  3000;

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});