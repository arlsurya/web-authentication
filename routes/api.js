import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../model/userModel.js'
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

router.post('/register', async (req, res) => {
    const { username, email, password } = req.body;

    try {
        // Check if the username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: 'Username already exists' });
        }

        // Create a new user with the provided username and password
        const newUser = new User({ username, password, email });
        await newUser.save();

        // Return the newly created user's ID
        return res.status(201).json({ id: newUser._id });
    } catch (error) {
        console.error('Error registering user:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.get('/user', async (req, res) => {
    try {
        const {userId} = req.query;

        // Find the user by ID
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

export default router;
