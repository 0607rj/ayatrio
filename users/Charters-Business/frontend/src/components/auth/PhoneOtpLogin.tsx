'use client';

import { useState, useRef, useEffect } from 'react';
import {
  signInWithPhoneNumber,
  ConfirmationResult,
  RecaptchaVerifier,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { auth, setupRecaptcha } from '@/lib/firebase';
import { countryCodes } from '@/data/applyPageData';
import { useAuth } from '@/context/AuthContext';
import { COURSE_OPTIONS } from '@/data/courseOptions';

type Step = 'phone' | 'otp' | 'details' | 'password';

type AuthMode = 'login' | 'signup';

type AuthError = Error & {
  code?: string;
  status?: number;
};

function getAuthError(error: unknown): AuthError {
  if (error instanceof Error) {
    return error as AuthError;
  }

  return new Error('Unexpected error') as AuthError;
}

export default function PhoneOtpLogin({
  onSuccess,
  mode = 'login',
}: {
  onSuccess?: () => void;
  mode?: AuthMode;
}) {
    const { loginWithPhone, signupWithPhone, login, user, navigateToRemoteDashboard } = useAuth();
    const router = useRouter();
    const isSignupMode = mode === 'signup';

    const [step, setStep] = useState<Step>('phone');
    const [countryCode, setCountryCode] = useState('+91');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [program, setProgram] = useState('');
    const [idToken, setIdToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
    const [resendTimer, setResendTimer] = useState(0);

    const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
    const recaptchaVerifierRef = useRef<RecaptchaVerifier | null>(null);

    // Countdown timer for resend
    useEffect(() => {
        if (resendTimer <= 0) return;
        const interval = setInterval(() => {
            setResendTimer((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [resendTimer]);

    // Setup RecaptchaVerifier ONLY ONCE after component mounts.
    // DO NOT call .render() here — Firebase calls it automatically inside signInWithPhoneNumber.
    // The container is created dynamically on document.body by setupRecaptcha — outside React's tree.
    useEffect(() => {
        if (!recaptchaVerifierRef.current) {
            console.log('[PhoneOtpLogin] Initializing RecaptchaVerifier...');
            try {
                recaptchaVerifierRef.current = setupRecaptcha();
                console.log('[PhoneOtpLogin] RecaptchaVerifier instance created successfully.');
            } catch (error) {
                console.error('[PhoneOtpLogin] Failed to setup RecaptchaVerifier:', error);
            }
        }
        
        // Proper cleanup handling if component unmounts
        return () => {
            if (recaptchaVerifierRef.current) {
                console.log('[PhoneOtpLogin] Cleaning up RecaptchaVerifier on unmount...');
                try {
                    recaptchaVerifierRef.current.clear();
                } catch (e) {
                    console.error('Error clearing recaptcha', e);
                }
                recaptchaVerifierRef.current = null;
                // Also remove the dynamically created container from body
                const container = document.getElementById('firebase-recaptcha-root');
                if (container) container.remove();
            }
        };
    }, []);

    const handleSendOtp = async () => {
        console.log("[PhoneOtpLogin] handleSendOtp hit! Current user:", user ? user.email : "GUEST");
        if (user) {
            router.push('/');
            return;
        }

        setError('');

        const cleaned = phoneNumber.replace(/\D/g, '');
        if (cleaned.length < 7 || cleaned.length > 15) {
            setError('Please enter a valid phone number');
            return;
        }

        setIsLoading(true);

        try {
            const fullNumber = `${countryCode}${cleaned}`;
            console.log("[PhoneOtpLogin] Initiating OTP send flow for phone:", fullNumber);

            // Log Firebase initialization & configuration details for debugging
            console.log("[PhoneOtpLogin] Firebase Client Auth Configuration:", {
                apiKey: auth.config?.apiKey ? "LOADED" : "MISSING (check .env)",
                authDomain: auth.config?.authDomain ? "LOADED" : "MISSING (check .env)",
                projectId: auth.config?.projectId ? "LOADED" : "MISSING (check .env)",
                appId: auth.config?.appId ? "LOADED" : "MISSING (check .env)",
            });

            // Verify RecaptchaVerifier initialized successfully
            if (!recaptchaVerifierRef.current) {
                console.error('[PhoneOtpLogin] RecaptchaVerifier is null. Cannot send OTP.');
                setError('Authentication service not ready. Please refresh the page and try again.');
                setIsLoading(false);
                return;
            }

            // Check if user exists
            const API_V1 = (process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") || "/api/backend") + "/api/v1";
            console.log("[PhoneOtpLogin] Verifying user existence with backend at:", `${API_V1}/auth/check-user`);
            const checkRes = await fetch(`${API_V1}/auth/check-user`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ phoneNumber: fullNumber })
            });
            const checkData = await checkRes.json();
            console.log("[PhoneOtpLogin] Backend user check response:", checkData);
            
            if (checkRes.ok && checkData?.data?.exists) {
                console.log("[PhoneOtpLogin] User exists in database. Redirecting to password sign-in step.");
                setStep('password');
                setIsLoading(false);
                return;
            }

            // Call signInWithPhoneNumber with the verified RecaptchaVerifier
            console.log("[PhoneOtpLogin] Sending signInWithPhoneNumber request to Firebase...");
            const result = await signInWithPhoneNumber(auth, fullNumber, recaptchaVerifierRef.current);
            console.log("[PhoneOtpLogin] signInWithPhoneNumber success! confirmationResult received successfully.");
            
            setConfirmationResult(result);
            setStep('otp');
            setResendTimer(30);
        } catch (err: unknown) {
            const authError = getAuthError(err);
            console.error("[PhoneOtpLogin] Firebase OTP delivery failed. Full error details:", {
                code: authError.code,
                message: authError.message,
                stack: authError.stack,
            });

            if (authError.code === 'auth/too-many-requests') {
                setError('Too many attempts. Please try again later.');
            } else if (authError.code === 'auth/invalid-phone-number') {
                setError('Invalid phone number. Please check and try again.');
            } else if (authError.code === 'auth/invalid-app-credential') {
                setError('App verification failed (auth/invalid-app-credential). Please verify your Firebase authorized domains list contains localhost.');
            } else {
                setError(`Failed to send OTP: ${authError.message || 'Unknown Firebase error.'}`);
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleOtpChange = (index: number, value: string) => {
        if (!/^\d*$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value.slice(-1);
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            otpRefs.current[index + 1]?.focus();
        }
    };

    const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            otpRefs.current[index - 1]?.focus();
        }
    };

    const handleOtpPaste = (e: React.ClipboardEvent) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
        if (pastedData.length === 0) return;

        const newOtp = [...otp];
        for (let i = 0; i < pastedData.length && i < 6; i++) {
            newOtp[i] = pastedData[i];
        }
        setOtp(newOtp);

        // Focus the next empty input or the last one
        const nextEmpty = newOtp.findIndex((v) => !v);
        otpRefs.current[nextEmpty === -1 ? 5 : nextEmpty]?.focus();
    };

    const handleVerifyOtp = async () => {
        setError('');

        const otpCode = otp.join('');

        if (!confirmationResult) {
            setError('Session expired. Please resend the OTP.');
            return;
        }

        setIsLoading(true);

        let token: string | null = null;
        try {
            // Verify OTP with Firebase
            const credential = await confirmationResult.confirm(otpCode);
            token = await credential.user.getIdToken();

            // Send the Firebase ID token to our backend
            const role = await loginWithPhone(token);

            if (onSuccess) {
                onSuccess();
            } else {
                if (role === 'admin' || role === 'recruiter') {
                    await navigateToRemoteDashboard('/admin/dashboard');
                } else {
                    await navigateToRemoteDashboard('/dashboard');
                }
            }
        } catch (err: unknown) {
            const authError = getAuthError(err);
            console.error('OTP verify error:', authError);

            // If user not found (404), proceed to signup details step
            if (authError.status === 404) {
                if (token) {
                    setIdToken(token);
                    setStep('details');
                    setError('');
                } else {
                    setError('Authentication completed but user data missing. Please try again.');
                }
            } else if (authError.code === 'auth/invalid-verification-code') {
                setError('Incorrect OTP. Please check and try again.');
            } else if (authError.code === 'auth/code-expired') {
                setError('OTP has expired. Please resend.');
            } else if (authError.status === 502 || authError.status === 503) {
                setError('We could not reach the server. Please try again in a moment.');
            } else {
                setError(authError.message || 'Verification failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSignup = async () => {
        setError('');
        const isCurrentAdmin = phoneNumber.replace(/\D/g, '').endsWith('1234567890');
        const nameToSubmit = isCurrentAdmin ? (name.trim() || 'System Admin') : name;
        const emailToSubmit = isCurrentAdmin ? (email.trim() || 'admin@chartersbusiness.com') : email;
        const programToSubmit = isCurrentAdmin ? (program || COURSE_OPTIONS[0] || 'General') : program;

        if (!nameToSubmit.trim() || !emailToSubmit.trim() || !password || !programToSubmit) {
            setError('Please enter your name, email, password, and select a course');
            return;
        }

        if (!idToken) {
            setError('Session expired. Please try logging in again.');
            setStep('phone');
            return;
        }

        setIsLoading(true);

        try {
            const role = await signupWithPhone(idToken, nameToSubmit, emailToSubmit, password, programToSubmit);

            if (onSuccess) {
                onSuccess();
            } else {
                if (role === 'admin' || role === 'recruiter') {
                    await navigateToRemoteDashboard('/admin/dashboard');
                } else {
                    await navigateToRemoteDashboard('/dashboard');
                }
            }
        } catch (err: unknown) {
            const authError = getAuthError(err);
            console.error('Signup error:', authError);
            if (authError.status === 502 || authError.status === 503) {
                setError('We could not reach the server. Please try again in a moment.');
            } else {
                setError(authError.message || 'Signup failed. Please try again.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendTimer > 0) return;
        setOtp(['', '', '', '', '', '']);
        setStep('phone');
        setError('');
    };

    const handlePasswordLogin = async () => {
        setError('');
        if (!password) {
            setError('Please enter your password');
            return;
        }

        setIsLoading(true);
        try {
            const fullNumber = `${countryCode}${phoneNumber.replace(/\D/g, '')}`;
            const role = await login(fullNumber, password);

            if (onSuccess) {
                onSuccess();
            } else {
                if (role === 'admin' || role === 'recruiter') {
                    await navigateToRemoteDashboard('/admin/dashboard');
                } else {
                    await navigateToRemoteDashboard('/dashboard');
                }
            }
        } catch (err: unknown) {
            const authError = getAuthError(err);
            console.error('Login error:', authError);
            setError(authError.message || 'Login failed. Please check your password.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            {/* reCAPTCHA container is managed dynamically on document.body by setupRecaptcha() */}

            {step === 'phone' ? (
                /* ── Step 1: Phone Number Input ── */
                <div className="space-y-4">
                    <div>
                        <label htmlFor="phone-country" className="block text-sm font-medium text-gray-700 mb-1">
                            Phone Number *
                        </label>
                        <div className="flex gap-2">
                            <select
                                id="phone-country"
                                value={countryCode}
                                onChange={(e) => setCountryCode(e.target.value)}
                                className="w-28 px-2 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B30437] focus:border-transparent bg-white text-sm"
                            >
                                {countryCodes.map((cc) => (
                                    <option key={cc.code} value={cc.code}>
                                        {cc.flag} {cc.code}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="tel"
                                id="phone-number"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                placeholder="Enter phone number"
                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B30437] focus:border-transparent"
                                autoComplete="tel"
                            />
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    {/* Send OTP Button */}
                    <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={isLoading || !phoneNumber.trim()}
                        className="w-full bg-[#B30437] hover:bg-[#8B0329] text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verifying...
                            </span>
                        ) : (
                            <span className="flex items-center justify-center gap-2">
                                Continue
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </span>
                        )}
                    </button>
                </div>
            ) : step === 'otp' ? (
                /* ── Step 2: OTP Verification ── */
                <div className="space-y-4">
                    {/* Info */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <p className="text-sm text-blue-800">
                            OTP sent to <strong>{countryCode} {phoneNumber}</strong>
                        </p>
                    </div>

                    {/* OTP Inputs */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Enter 6-digit OTP *
                        </label>
                        <div className="flex gap-2 justify-center" onPaste={handleOtpPaste}>
                            {otp.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={(el) => { otpRefs.current[index] = el; }}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength={1}
                                    value={digit}
                                    onChange={(e) => handleOtpChange(index, e.target.value)}
                                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                                    className="w-12 h-14 text-center text-xl font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B30437] focus:border-transparent"
                                    autoFocus={index === 0}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    {/* Verify Button */}
                    <button
                        type="button"
                        onClick={handleVerifyOtp}
                        disabled={isLoading || otp.join('').length !== 6}
                        className="w-full bg-[#B30437] hover:bg-[#8B0329] text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Verifying...
                            </span>
                        ) : (
                            isSignupMode ? 'Verify & Continue' : 'Verify & Login'
                        )}
                    </button>

                    {/* Resend */}
                    <div className="text-center">
                        {resendTimer > 0 ? (
                            <p className="text-sm text-gray-500">
                                Resend OTP in <span className="font-semibold text-[#B30437]">{resendTimer}s</span>
                            </p>
                        ) : (
                            <button
                                type="button"
                                onClick={handleResend}
                                className="text-sm text-[#B30437] hover:text-[#8B0329] font-medium underline"
                            >
                                Resend OTP
                            </button>
                        )}
                    </div>
                </div>
            ) : step === 'details' ? (
                /* ── Step 3: User Details (Signup) ── */
                <div className="space-y-4">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-green-800">
                            {phoneNumber.replace(/\D/g, '').endsWith('1234567890')
                                ? 'Phone verified! Please set a secure password for your admin account.'
                                : `Phone verified! Please complete your profile${isSignupMode ? ' and choose your course.' : '.'}`}
                        </p>
                    </div>

                    {!phoneNumber.replace(/\D/g, '').endsWith('1234567890') && (
                        <>
                            {/* Name Input */}
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                    Full Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B30437] focus:border-transparent"
                                    required
                                />
                            </div>

                            {/* Email Input */}
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B30437] focus:border-transparent"
                                    required
                                />
                            </div>
                        </>
                    )}

                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            {phoneNumber.replace(/\D/g, '').endsWith('1234567890') ? 'Set Password *' : 'Password *'}
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={phoneNumber.replace(/\D/g, '').endsWith('1234567890') ? 'Create admin password' : 'Create a password'}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B30437] focus:border-transparent"
                            required
                        />
                    </div>
 
                    {!phoneNumber.replace(/\D/g, '').endsWith('1234567890') && (
                        /* Course Selection */
                        <div>
                            <label htmlFor="program" className="block text-sm font-medium text-gray-700 mb-1">
                                Course Interested In *
                            </label>
                            <select
                                id="program"
                                value={program}
                                onChange={(e) => setProgram(e.target.value)}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B30437] focus:border-transparent bg-white"
                                required
                            >
                                <option value="">Select a course</option>
                                {COURSE_OPTIONS.map((courseOption) => (
                                    <option key={courseOption} value={courseOption}>
                                        {courseOption}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}
 
                    {/* Complete Signup Button */}
                    <button
                        type="button"
                        onClick={handleSignup}
                        disabled={isLoading || !password || (!phoneNumber.replace(/\D/g, '').endsWith('1234567890') && (!name.trim() || !email.trim() || !program))}
                        className="w-full bg-[#B30437] hover:bg-[#8B0329] text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Creating Account...
                            </span>
                        ) : (
                            'Complete Signup'
                        )}
                    </button>
                </div>
            ) : step === 'password' ? (
                /* ── Step 4: Password Login (Returning User) ── */
                <div className="space-y-4">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                        <p className="text-sm text-blue-800">
                            Welcome back! Please enter your password for <strong>{countryCode} {phoneNumber}</strong>
                        </p>
                    </div>

                    <div>
                        <label htmlFor="login-password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password *
                        </label>
                        <input
                            type="password"
                            id="login-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#B30437] focus:border-transparent"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handlePasswordLogin();
                            }}
                            required
                        />
                    </div>

                    {/* Error */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-800">{error}</p>
                        </div>
                    )}

                    <button
                        type="button"
                        onClick={handlePasswordLogin}
                        disabled={isLoading || !password}
                        className="w-full bg-[#B30437] hover:bg-[#8B0329] text-white font-bold py-4 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Logging in...
                            </span>
                        ) : (
                            'Login'
                        )}
                    </button>
                    
                    <div className="text-center">
                        <button
                            type="button"
                            onClick={() => { setStep('phone'); setPassword(''); setError(''); }}
                            className="text-sm text-gray-500 hover:text-gray-700 underline"
                        >
                            Back to Phone Number
                        </button>
                    </div>
                </div>
            ) : null}
        </div>
    );
}