import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import crypto from "crypto";

const app = express();
app.use(express.json()); // To parse JSON request bodies

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const config = {
    customKey: "45525",
    validTokens: [
        { token: "4552255", status: "active" },
        { token: "4552528", status: "active" },
        { token: "4552525", status: "active" },
    ],
};

// Utility function for hashing tokens
const hashToken = (token) => {
    return crypto
        .createHmac("sha256", config.customKey)
        .update(token)
        .digest("hex");
};

// Hash the tokens in the validTokens array
config.validTokens.forEach((tokenObj) => {
    tokenObj.token = hashToken(tokenObj.token);
});

// Token authentication middleware
const authenticateToken = (req, res, next) => {
    const token = req.headers["authorization"]?.split(" ")[1];
    if (!token) {
        return res.status(401).json({ error: "No token provided." });
    }
    const hashedToken = hashToken(token);
    const validToken = config.validTokens.find((t) => t.token === hashedToken);
    if (!validToken) {
        return res.status(403).json({ error: "Invalid token." });
    }
    if (validToken.status === "inactive") {
        return res
            .status(403)
            .json({ error: "Your Token is inactive. Please Contact Admin" });
    }
    next();
};

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


app.get("/api/token", authenticateToken, async (req, res) => {
    const allowedDomains = ["localhost", "fff-mu-nine.vercel.app"];
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


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/AdminPanel", express.static(path.join(__dirname, "/AdminPanel")));
app.use("/AdminPanel", express.static(path.join(__dirname, "/AdminPanel")));
app.use("/AdminPanel/Add/Book", express.static(path.join(__dirname, "/AdminPanel/Add/Book")));
app.use("/AdminPanel/Add/QuizAss", express.static(path.join(__dirname, "/AdminPanel/Add/QuizAss")));
app.use("/history", express.static(path.join(__dirname, "/history")));
app.use("/History", express.static(path.join(__dirname, "/History")));

app.use((req, res) => {
    console.log(`Path not found: ${req.url}`);
    res.sendFile(path.join(__dirname, "404.html"));
});

const port = 3000;

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});