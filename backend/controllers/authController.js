import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';
import crypto from 'crypto';
import {sendPasswordResetEmail, sendVerificationEmail} from '../config/nodemailer.js';

export const register = async (req, res) => {
    const { name, email, password } = req.body;

    if(!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        });
    }

    try {

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        //email things
        const emailVerificationToken = crypto.randomBytes(20).toString('hex');
        const emailVerificationTokenExpireAt = Date.now() + 24 * 60 * 60 * 1000; // 24 hours


        // store user in db
        const user = new userModel({
            name,
            email,
            password: hashedPassword,
            emailVerificationToken,
            emailVerificationTokenExpireAt
        });
        await user.save();

        await sendVerificationEmail(email, emailVerificationToken);

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
        });
        res.status(201).json({
            success: true,
            message: "User registered successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}

export const login = async (req, res) => {
    const { email, password } = req.body;

    if(!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        });
    }

    try {

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User does not exist"
            });
        }

        if (!user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "Email not verified"
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
        }).status(200).json({
            success: true,
            message: "Logged in successfully",
            user: {
                name: user.name,
                email: user.email
            }
        });
        // res.status(201).json({
        //     success: true,
        //     message: "User registered successfully",
        // });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}   

export const logout = async (req, res) => {
    try{
        res.clearCookie('token', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
    });

    return  res.json({
        success: true,
        message: "Logged out successfully"
    });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export const isAuthenticated = (req, res, next) => {
    const token = req.cookies.token || '';

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
}


export const verifyEmail = async (req, res) => { // Added email verification function
    try {
        const { token } = req.params;
        
        const user = await userModel.findOne({
            emailVerificationToken: token,
            emailVerificationExpires: { $gt: Date.now() }
        });
        
        if (!user) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid or expired verification token" 
            });
        }
        
        user.isVerified = true;
        user.emailVerificationToken = undefined;
        user.emailVerificationExpires = undefined;
        await user.save();
        
        res.status(200).json({ 
            success: true,
            message: "Email verified successfully" 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Error verifying email", 
            error: error.message 
        });
    }
};

export const requestPasswordReset = async (req, res) => {
    try {
        const { email } = req.body;
        
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User with this email does not exist" 
            });
        }
        
        // Generate reset token
        const resetToken = crypto.randomBytes(20).toString('hex');
        user.passwordResetToken = resetToken;
        user.passwordResetExpires = Date.now() + 60 * 60 * 1000; // 1 hour
        await user.save();
        
        // Send reset email
        await sendPasswordResetEmail(email, resetToken);
        
        res.status(200).json({ 
            success: true,
            message: "Password reset email sent" 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Error requesting password reset", 
            error: error.message 
        });
    }
};

export const resetPassword = async (req, res) => { // Added password reset function
    try {
        const { token } = req.params;
        const { password } = req.body;
        
        const user = await userModel.findOne({
            passwordResetToken: token,
            passwordResetExpires: { $gt: Date.now() }
        });
        
        if (!user) {
            return res.status(400).json({ 
                success: false,
                message: "Invalid or expired reset token" 
            });
        }
        
        // Update password
        user.password = await bcrypt.hash(password, 10); // Added password hashing
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();
        
        res.status(200).json({ 
            success: true,
            message: "Password reset successfully" 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Error resetting password", 
            error: error.message 
        });
    }
};

export const resendVerificationEmail = async (req, res) => { // Added optional resend function
    try {
        const { email } = req.body;
        
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: "User not found" 
            });
        }
        
        if (user.isVerified) {
            return res.status(400).json({ 
                success: false,
                message: "Email is already verified" 
            });
        }
        
        // Generate new verification token
        const emailVerificationToken = crypto.randomBytes(20).toString('hex');
        user.emailVerificationToken = emailVerificationToken;
        user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;
        await user.save();
        
        // Send verification email
        await sendVerificationEmail(email, emailVerificationToken);
        
        res.status(200).json({ 
            success: true,
            message: "Verification email sent" 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: "Error resending verification email", 
            error: error.message 
        });
    }
};