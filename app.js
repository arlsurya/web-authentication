import express from 'express';
import path from 'path';
import morgan from 'morgan';
import crypto from 'crypto'; // this is required for authentication
import { fileURLToPath } from 'url';
import connectToDatabase from './db.js';

import apiRoutes from './routes/api.js';

const app = express();

// This code checks if the 'crypto' object is available in the global scope.
if (!globalThis.crypto) {
    globalThis.crypto = crypto;
}

// Workaround to get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));
app.use(express.json());

app.use('/', apiRoutes);



// Connect to the database
connectToDatabase();

export default app;
