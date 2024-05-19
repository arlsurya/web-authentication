import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    challenge: { type: String, required: true },
});

const Challenge = mongoose.model('Challenge', challengeSchema);

export default Challenge;
