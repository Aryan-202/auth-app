import express from 'express';
import { 
  isAuthenticated, 
  login, 
  logout, 
  register,
  verifyEmail,
  requestPasswordReset,
  resetPassword,
  resendVerificationEmail
} from '../controllers/authController.js';
import userModel from '../models/user.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);
authRouter.get('/authenticated', isAuthenticated);

// Email verification routes
authRouter.get('/verify-email/:token', verifyEmail);
authRouter.post('/resend-verification', resendVerificationEmail);

// Password reset routes
authRouter.post('/request-password-reset', requestPasswordReset);
authRouter.post('/reset-password/:token', resetPassword);

export default authRouter;