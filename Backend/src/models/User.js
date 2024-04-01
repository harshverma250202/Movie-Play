import mongoose from "mongoose";
import jwt from 'jsonwebtoken';

const userSchema = mongoose.Schema({
    username: { type: String, required:true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { type: String, required: true },
    mobileNumber: {
        type: String,
        default: null,
    },
    profilePicture: {
        type: String,
        default: null,
    },
    role: {
        type: Boolean,
        default: false
    },
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
        default: null,
    },
    lastPayment: {
        type: Date,
        default: null
    },
    devicesLogged: {
        type: Number,
        default: 0,
    },
    watchedMovies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'movies',
        default: [],
    },
    transactions: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Transaction',
        default: [],
    },
    refreshToken: {
        type: String,
        default: null,
    },
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return password === this.password;
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_KEY, { expiresIn: '1h' });
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({ _id: this._id }, process.env.JWT_KEY, { expiresIn: '7d' });
};

export const User = mongoose.model('User', userSchema);

