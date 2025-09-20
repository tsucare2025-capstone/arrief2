// OTP utility functions for TSU Care application

/**
 * Generate a 6-digit OTP code
 * @returns {string} 6-digit OTP code
 */
export const generateOTP = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
};

/**
 * Check if OTP has expired
 * @param {Date} expiryTime - The expiry time to check against
 * @returns {boolean} True if expired, false if still valid
 */
export const isOTPExpired = (expiryTime) => {
    if (!expiryTime) return true;
    return new Date() > new Date(expiryTime);
};

/**
 * Calculate OTP expiry time (default: 5 minutes from now)
 * @param {number} minutes - Minutes until expiry (default: 5)
 * @returns {Date} Expiry time
 */
export const getOTPExpiryTime = (minutes = 5) => {
    const now = new Date();
    return new Date(now.getTime() + minutes * 60 * 1000);
};

/**
 * Validate OTP format (6 digits)
 * @param {string} otp - OTP to validate
 * @returns {boolean} True if valid format
 */
export const isValidOTPFormat = (otp) => {
    return /^\d{6}$/.test(otp);
};

/**
 * Compare OTP codes (case-insensitive)
 * @param {string} inputOTP - User input OTP
 * @param {string} storedOTP - Stored OTP from database
 * @returns {boolean} True if OTPs match
 */
export const compareOTP = (inputOTP, storedOTP) => {
    if (!inputOTP || !storedOTP) return false;
    return inputOTP.trim() === storedOTP.trim();
};
