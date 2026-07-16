import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser'; 
import authRoutes, { setDatabase } from "./routes/auth.js";
import authMiddleware from "./middleware/authMiddleware.js";

dotenv.config();

const app = express(); 
 app.use(cors())
const port = process.env.PORT || 3000;

app.use(bodyParser.json());  
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "🚀 Welcome to KeyNest API",
    status: "Running"
  });
}); 
app.use("/auth", authRoutes);

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const dbName = 'passop';

async function startServer() {
  try {
    await client.connect();
    console.log('MongoDB connected ✅');
    const database = client.db(dbName);
setDatabase(database);

    // Get all passwords
 app.get("/", authMiddleware, async (req, res) => {
    console.log("==============");
    console.log("Decoded JWT:", req.user);

    const db = client.db(dbName);
    const collection = db.collection("documents");

    const query = {
        userId: req.user.id,
    };

    console.log("Query:", query);

    const data = await collection.find(query).toArray();

    console.log("Passwords Found:", data);

    res.json(data);
});
    // Save a password
   app.post('/', authMiddleware, async (req, res) => {
      const password = {
  ...req.body,
  userId: req.user.id,
};
      const db = client.db(dbName);
      const collection = db.collection('documents');
      const result = await collection.insertOne(password);
      res.json({ success: true, result });
    });
// Update a password
app.put("/", authMiddleware, async (req, res) => {
  try {
    const { id, site, username, password, category } = req.body;

    const db = client.db(dbName);
    const collection = db.collection("documents");

    const result = await collection.updateOne(
      
      {
        id: id,
        userId: req.user.id,
      },
      {
        $set: {
          site,
          username,
          password,
          category,
        },
      }
    );
console.log(result);
    res.json({
      success: true,
      result,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Could not update password",
    });
  }
});
    // ❗ DELETE — UNCHANGED as requested
   app.delete('/', authMiddleware, async (req, res) => {
      const password = req.body;
      const db = client.db(dbName);
      const collection = db.collection('documents');
      const result = await collection.deleteOne({
  id: password.id,
 userId: req.user.id,
});
      res.json({ success: true, result });
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });

  } catch (err) {
    console.error('Startup error:', err);
  }
}

startServer();
