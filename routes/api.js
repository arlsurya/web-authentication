import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = express.Router();


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public/index.html'));
});
router.get('/login', async (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public/login.html'));
});
router.get('/signup', async (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public/signup.html'));
});
router.get('/profile', async (req, res) => {
    res.sendFile(path.join(__dirname, '../', 'public/profile.html'));
});

export default router;
