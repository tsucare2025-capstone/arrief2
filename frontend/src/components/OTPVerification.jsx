import React, { useState, useEffect } from 'react';
import { Mail, ArrowLeft, Loader, RotateCcw } from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import axiosInstance from '../lib/axios';
import { toast } from 'react-hot-toast';

const OTPVerification = ({ counselorData, onBack, onSuccess }) => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isVerifying, setIsVerifying] = useState(false);
    const [isResending, setIsResending] = useState(false);
    const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
    const [canResend, setCanResend] = useState(false);

    // Timer countdown
    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
            return () => clearTimeout(timer);
        } else {
            setCanResend(true);
        }
    }, [timeLeft]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const handleOtpChange = (index, value) => {
        if (value.length > 1) return; // Prevent multiple characters
        
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            const nextInput = document.getElementById(`otp-${index + 1}`);
            if (nextInput) nextInput.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            const prevInput = document.getElementById(`otp-${index - 1}`);
            if (prevInput) prevInput.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        const newOtp = [...otp];
        
        for (let i = 0; i < pastedData.length && i < 6; i++) {
            newOtp[i] = pastedData[i];
        }
        
        setOtp(newOtp);
        
        // Focus the last filled input or the next empty one
        const lastFilledIndex = Math.min(pastedData.length - 1, 5);
        const nextInput = document.getElementById(`otp-${lastFilledIndex}`);
        if (nextInput) nextInput.focus();
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        
        const otpString = otp.join('');
        if (otpString.length !== 6) {
            toast.error('Please enter all 6 digits');
            return;
        }

        setIsVerifying(true);
        
        try {
            const response = await axiosInstance.post('/auth/verify-otp', {
                counselorId: counselorData.counselorId,
                otp: otpString
            });

            if (response.data.token) {
                localStorage.setItem('authToken', response.data.token);
            }

            // Update auth store with verified user data
            useAuthStore.setState({ 
                authUser: response.data,
                pendingVerification: null 
            });
            toast.success(response.data.message || 'Account verified successfully!');
            onSuccess();
        } catch (error) {
            toast.error(error.response?.data?.message || 'Verification failed');
        } finally {
            setIsVerifying(false);
        }
    };

    const handleResend = async () => {
        setIsResending(true);
        
        try {
            await axiosInstance.post('/auth/resend-otp', {
                counselorId: counselorData.counselorId
            });
            
            toast.success('OTP resent successfully!');
            setTimeLeft(300);
            setCanResend(false);
            setOtp(['', '', '', '', '', '']);
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to resend OTP');
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="otp-verification-container">
            <div className="otp-verification-card">
                <div className="otp-header">
                    <button 
                        onClick={onBack}
                        className="back-button"
                        disabled={isVerifying}
                    >
                        <ArrowLeft size={20} />
                    </button>
                    <div className="logo-section">
                        <img src="/logo-counsel.png" alt="TSU Guidance and Counseling Unit Logo" />
                        <p>TSU Guidance and Counseling Unit</p>
                    </div>
                </div>
                
                <div className="otp-content">
                    <div className="otp-icon">
                        <Mail size={48} className="text-blue-500" />
                    </div>
                    
                    <h2 className="otp-title">Verify Your Email</h2>
                    <p className="otp-description">
                        We've sent a 6-digit verification code to<br />
                        <strong>{counselorData.email}</strong>
                    </p>
                    
                    <form onSubmit={handleVerify} className="otp-form">
                        <div className="otp-inputs">
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    inputMode="numeric"
                                    pattern="[0-9]"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={handlePaste}
                                    className="otp-input"
                                    disabled={isVerifying}
                                    autoComplete="off"
                                />
                            ))}
                        </div>
                        
                        <button 
                            type="submit" 
                            className="verify-button"
                            disabled={isVerifying || otp.join('').length !== 6}
                        >
                            {isVerifying ? (
                                <>
                                    <Loader className="w-4 h-4 animate-spin mr-2" />
                                    Verifying...
                                </>
                            ) : (
                                'Verify Code'
                            )}
                        </button>
                    </form>
                    
                    <div className="otp-footer">
                        <p className="timer-text">
                            {timeLeft > 0 ? (
                                <>Code expires in <strong>{formatTime(timeLeft)}</strong></>
                            ) : (
                                'Code has expired'
                            )}
                        </p>
                        
                        <button
                            onClick={handleResend}
                            disabled={!canResend || isResending}
                            className="resend-button"
                        >
                            {isResending ? (
                                <>
                                    <Loader className="w-4 h-4 animate-spin mr-2" />
                                    Resending...
                                </>
                            ) : (
                                <>
                                    <RotateCcw size={16} className="mr-2" />
                                    Resend Code
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OTPVerification;
