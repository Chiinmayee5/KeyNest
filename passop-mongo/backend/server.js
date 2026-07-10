import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import bodyParser from 'body-parser'; 



dotenv.config();

const app = express(); 
 app.use(cors())
const port = process.env.PORT || 3000;

app.use(bodyParser.json());         // ✅ ONLY ONCE, AFTER app

const url = process.env.MONGODB_URI;
const client = new MongoClient(url);
const dbName = 'passop';

async function startServer() {
  try {
    await client.connect();
    console.log('MongoDB connected ✅');

    // Get all passwords
    app.get('/', async (req, res) => {
      const db = client.db(dbName);
      const collection = db.collection('documents');
      const data = await collection.find({}).toArray();
      res.json(data);
    });

    // Save a password
    app.post('/', async (req, res) => {
      const password = req.body;
      const db = client.db(dbName);
      const collection = db.collection('documents');
      const result = await collection.insertOne(password);
      res.json({ success: true, result });
    });

    // ❗ DELETE — UNCHANGED as requested
    app.delete('/', async (req, res) => {
      const password = req.body;
      const db = client.db(dbName);
      const collection = db.collection('documents');
      const result = await collection.deleteOne(password);
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
