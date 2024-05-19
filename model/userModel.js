
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    webAuthnCredentials: [{
        credentialId: { type: String, required: true },
        publicKey: { type: String, required: true },
        userHandle: { type: String, required: true },
        counter: { type: Number, required: true },
        transports: [{ type: String }]
    }]
});

const User = mongoose.model('User', userSchema);

export default User;
