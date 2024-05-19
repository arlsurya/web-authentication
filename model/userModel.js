
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    // passkey: { type: String },
    webAuthnCredentials: [{
        fmt: String,
        counter: Number,
        aaguid: String,
        credentialID: String,
        credentialPublicKey: [Number],
        credentialType: { type: String, default: 'public-key' },
        attestationObject: [Number],
        userVerified: Boolean,
        credentialDeviceType: String,
        credentialBackedUp: Boolean,
        origin: String,
        rpID: String,

    }]
});

const User = mongoose.model('User', userSchema);

export default User;
