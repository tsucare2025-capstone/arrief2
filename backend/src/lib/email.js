import nodemailer from 'nodemailer';

// Email configuration - these should be set in your .env file
const createTransporter = () => {
    return nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE || 'gmail', // gmail, outlook, etc.
        auth: {
            user: process.env.EMAIL_USER, // your email
            pass: process.env.EMAIL_PASS  // your email password or app password
        }
    });
};

/**
 * Send OTP verification email
 * @param {string} to - Recipient email address
 * @param {string} otp - 6-digit OTP code
 * @param {string} name - Recipient name
 * @returns {Promise<boolean>} Success status
 */
export const sendOTPEmail = async (to, otp, name) => {
    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: 'TSU Care - OTP Verification Code',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #2563eb; margin: 0;">TSU Care</h1>
                        <p style="color: #6b7280; margin: 5px 0;">Guidance and Counseling Unit</p>
                    </div>
                    
                    <div style="background-color: #f8fafc; padding: 30px; border-radius: 10px; text-align: center;">
                        <h2 style="color: #1f2937; margin-bottom: 20px;">OTP Verification</h2>
                        <p style="color: #4b5563; margin-bottom: 30px;">
                            Hello ${name},<br>
                            Please use the following verification code to complete your login:
                        </p>
                        
                        <div style="background-color: #ffffff; padding: 20px; border-radius: 8px; border: 2px dashed #d1d5db; margin: 20px 0;">
                            <h1 style="color: #2563eb; font-size: 32px; letter-spacing: 8px; margin: 0; font-family: 'Courier New', monospace;">
                                ${otp}
                            </h1>
                        </div>
                        
                        <p style="color: #6b7280; font-size: 14px; margin: 20px 0;">
                            This code will expire in 5 minutes.<br>
                            If you didn't request this code, please ignore this email.
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                            © 2024 TSU Care - Guidance and Counseling Unit
                        </p>
                    </div>
                </div>
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('OTP email sent successfully:', result.messageId);
        return true;
    } catch (error) {
        console.error('Error sending OTP email:', error);
        return false;
    }
};

/**
 * Send welcome email after successful verification
 * @param {string} to - Recipient email address
 * @param {string} name - Recipient name
 * @returns {Promise<boolean>} Success status
 */
export const sendWelcomeEmail = async (to, name) => {
    try {
        const transporter = createTransporter();
        
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: 'Welcome to TSU Care - Account Verified',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <div style="text-align: center; margin-bottom: 30px;">
                        <h1 style="color: #2563eb; margin: 0;">TSU Care</h1>
                        <p style="color: #6b7280; margin: 5px 0;">Guidance and Counseling Unit</p>
                    </div>
                    
                    <div style="background-color: #f0f9ff; padding: 30px; border-radius: 10px; text-align: center;">
                        <h2 style="color: #1f2937; margin-bottom: 20px;">Welcome, ${name}!</h2>
                        <p style="color: #4b5563; margin-bottom: 20px;">
                            Your account has been successfully verified and you can now access all features of TSU Care.
                        </p>
                        <p style="color: #4b5563;">
                            Thank you for using our counseling services.
                        </p>
                    </div>
                    
                    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
                        <p style="color: #9ca3af; font-size: 12px; margin: 0;">
                            © 2024 TSU Care - Guidance and Counseling Unit
                        </p>
                    </div>
                </div>
            `
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Welcome email sent successfully:', result.messageId);
        return true;
    } catch (error) {
        console.error('Error sending welcome email:', error);
        return false;
    }
};
