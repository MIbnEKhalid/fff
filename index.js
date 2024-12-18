import express from "express"; 
import path from "path";
import { fileURLToPath } from "url";
// import { dirname } from "path";

const app = express();
app.use(express.json()); // To parse JSON request bodies

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files
app.use(
    "/Assets",
    express.static(path.join(__dirname, "Assets"), {
        setHeaders: (res, path) => {
            if (path.endsWith(".css")) {
                res.setHeader("Content-Type", "text/css");
            }
        },
    })
);

app.use(
    "/AdminPanel",
    express.static(path.join(__dirname, "AdminPanel"), {
        setHeaders: (res, path) => {
            if (path.endsWith(".css")) {
                res.setHeader("Content-Type", "text/css");
            }
        },
    })
);



 
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/token", (req, res) => {
    const allowedDomains = ["localhost","fff-mu-nine.vercel.app"];
    const requestDomain = req.get("Host");

    // Extract the domain from the Host header (remove port if present)
    const domain = requestDomain.split(":")[0];

    if (!allowedDomains.includes(domain)) {
        return res.status(403).json({ error: "Unauthorized domains" });
    }

    const token = process.env.GITHUB_TOKEN;
    if (token) {
        res.json({ token });
    } else {
        res.status(404).json({ error: "Token not found" });
    }
});


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