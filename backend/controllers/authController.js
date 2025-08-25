import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.js';
import transporter from '../config/nodemailer.js';

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

       


        // store user in db
        const user = new userModel({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 1 week
        });
        //sending welcome email
        const mainOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: 'Welcome to Our App',
            text: `Hello ${name},\n\nWelcome to our app! We're glad to have you on board.\nYour account has been created successfully with email id: ${email}\n\nBest regards,\nThe Team`
        }

        await transporter.sendMail(mainOptions);

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

//send verification otp
export const sendVerifyOtp = async (req, res) => {
    try{
        const {userId} = req.body;
        const user = await userModel.findById(userId);
        if(user.isAccountVerified){
            return res.json({
                success: false,
                message: "Account is already verified"
            });
        }

       const otp = String(Math.floor(100000 + Math.random() * 900000));

       user.verifyOtp = otp;
       user.verifyOtpExpireAt = Date.now() + 24 * 60 * 60 * 1000; //24 hours

       await user.save();

         const mainOptions = {
          from: process.env.SENDER_EMAIL,
          to: user.email,
          subject: 'Email Verification OTP',
          text: `Hello ${user.name},\n\nYour OTP for email verification is ${otp}. It is valid for 24 hours.\n\nBest regards,\nThe Team`
        };

        await transporter.sendMail(mainOptions);

        res.json({
            success: true,
            message: "OTP sent successfully"
        });
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        });
    }
}

//verify email using otp
export const verifyEmail = async (req, res) => {
    const { userId, otp } = req.body;

    if (!userId || !otp) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields"
        });
    }

    try {
        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found"
            });
        }

        if (user.verifyOtp === '' || user.verifyOtp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        if (Date.now() > user.verifyOtpExpireAt) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired"
            });
        }

        user.isAccountVerified = true;
        user.verifyOtp = undefined;
        user.verifyOtpExpireAt = undefined;

        await user.save();

        res.json({
            success: true,
            message: "Email verified successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// Check if user is authenticated
export const isAuthenticated = (req, res) => {
    try {
        
        console.log("✅ Function isAuthenticated is being called!");
        return res.json({
            success: true,
            message: "User is authenticated"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

//send verification otp
export const sendResetOtp = async (req, res) => {
    const email = req.body.email;

    if(!email) {
        return res.status(400).json({
            success: false,
            message: "Please provide email"
        });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Generate OTP and send email
        const otp = String(Math.floor(100000 + Math.random() * 900000));
        user.resetOtp = otp;
        user.resetOtpExpireAt = Date.now() + 15 * 60 * 1000; // 15 minutes

        await user.save();

        const mainOptions = {
            from: process.env.SENDER_EMAIL,
            to: user.email,
            subject: 'Password Reset OTP',
            text: `Hello ${user.name},\n\nYour OTP for password reset is ${otp}. It is valid for 15 minutes.\n\nBest regards,\nThe Team`
        };

        await transporter.sendMail(mainOptions);

        res.json({
            success: true,
            message: "OTP sent successfully"
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

// reset user password
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({
            success: false,
            message: "Please provide all required fields: email, OTP, and new password"
        });
    }

    try {
        // Find user by email
        const user = await userModel.findOne({ email });
        
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not found with this email"
            });
        }

        // Check if OTP exists and matches
        if (!user.resetOtp || user.resetOtp !== otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP"
            });
        }

        // Check if OTP has expired
        if (Date.now() > user.resetOtpExpireAt) {
            return res.status(400).json({
                success: false,
                message: "OTP has expired"
            });
        }

        // Hash new password and update user
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = undefined;
        user.resetOtpExpireAt = undefined;

        await user.save();

        res.json({
            success: true,
            message: "Password reset successfully"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
}