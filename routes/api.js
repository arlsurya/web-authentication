import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import User from '../model/userModel.js';
import Challenge from '../model/challengeModel.js';
import { generateRegistrationOptions, verifyRegistrationResponse } from '@simplewebauthn/server';
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
        const { userId } = req.query;

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

router.post('/register-challenge', async (req, res) => {
    try {
        const { userId } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate registration options for the user
        const registrationOptions = await generateRegistrationOptions({
            rpID: 'localhost', // The relying party ID
            rpName: 'Local Machine', // The relying party name
            userName: user.username, // The username of the user
            timeout: 30000, // Timeout for the registration process (optional)
            attestationType: 'none', // Specify the attestation type (none, direct, indirect)
        });

        // Create a new challenge document
        const challenge = new Challenge({
            userId: userId,
            challenge: registrationOptions.challenge,
        });

        await challenge.save();

        // Return the registration options to the client
        return res.status(200).json({ options: registrationOptions });
    } catch (error) {
        console.error('Error generating registration options:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});
router.post('/register-verify', async (req, res) => {
    const { userId, authResult } = req.body;

    if (!userId || !authResult) {
        return res.status(400).json({ error: 'Invalid request data' });
    }

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ error: 'User not found!' });
        }

        const challenge = await Challenge.findOne({ userId: userId });

        if (!challenge) {
            return res.status(404).json({ error: 'Challenge not found!' });
        }

        // Verify the registration response
        const verificationResult = await verifyRegistrationResponse({
            expectedChallenge: challenge.challenge, // Use the stored challenge
            expectedOrigin: 'http://localhost:3000', // Specify the expected origin
            expectedRPID: 'localhost', // Specify the expected relying party ID
            response: authResult,
        });

        // If verification failed, return an error
        if (!verificationResult.verified) {
            return res.status(400).json({ error: 'Could not verify' });
        }

        const newWebAuthnCredential = {
            fmt: verificationResult.registrationInfo.fmt,
            counter: verificationResult.registrationInfo.counter,
            aaguid: verificationResult.registrationInfo.aaguid,
            credentialID: verificationResult.registrationInfo.credentialID,
            credentialPublicKey: Array.from(verificationResult.registrationInfo.credentialPublicKey),
            credentialType: verificationResult.registrationInfo.credentialType,
            attestationObject: Array.from(verificationResult.registrationInfo.attestationObject),
            userVerified: verificationResult.registrationInfo.userVerified,
            credentialDeviceType: verificationResult.registrationInfo.credentialDeviceType,
            credentialBackedUp: verificationResult.registrationInfo.credentialBackedUp,
            origin: verificationResult.registrationInfo.origin,
            rpID: verificationResult.registrationInfo.rpID,
        };

        // Push the new credential into the webAuthnCredentials array
        user.webAuthnCredentials.push(newWebAuthnCredential);

        await user.save();

        // Return success response
        return res.json({ verified: true });
    } catch (error) {
        console.error('Verification error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});



export default router;
