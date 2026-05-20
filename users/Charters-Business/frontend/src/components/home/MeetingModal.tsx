"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Toast from "../ui/Toast";
import {
    createInstantMeeting,
    scheduleMeeting,
    checkMeetingOAuthStatus,
    getMeetingOAuthUrl,
    disconnectMeetingOAuth,
    MeetingFormData,
    ScheduleMeetingFormData,
} from "@/lib/api";

interface MeetingModalProps {
    isOpen: boolean;
    onClose: () => void;
    defaultTab?: 'instant' | 'schedule';
}

type TabType = "instant" | "schedule";

const MeetingModal = ({ isOpen, onClose, defaultTab = 'instant' }: MeetingModalProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [activeTab, setActiveTab] = useState<TabType>(defaultTab);
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isOAuthConnected, setIsOAuthConnected] = useState<boolean | null>(null);
    const [isCheckingOAuth, setIsCheckingOAuth] = useState(true);
    const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);

    // Check OAuth status when modal opens
    useEffect(() => {
        if (isOpen) {
            setActiveTab(defaultTab);
            checkOAuthConnection();
        }
    }, [isOpen, defaultTab]);

    const checkOAuthConnection = async () => {
        setIsCheckingOAuth(true);
        try {
            const response = await checkMeetingOAuthStatus();
            const connected = response.data?.isConnected || false;
            setIsOAuthConnected(connected);

            // Prefill forms with user info
            if (connected && response.data?.userInfo) {
                const { name, email } = response.data.userInfo;
                if (name || email) {
                    setInstantForm(prev => ({
                        ...prev,
                        hostName: name || prev.hostName,
                        hostEmail: email || prev.hostEmail,
                    }));
                    setScheduleForm(prev => ({
                        ...prev,
                        hostName: name || prev.hostName,
                        hostEmail: email || prev.hostEmail,
                    }));
                }
            }
        } catch {
            setIsOAuthConnected(false);
        } finally {
            setIsCheckingOAuth(false);
        }
    };

    const handleConnectGoogle = async () => {
        try {
            const response = await getMeetingOAuthUrl();
            const authUrl = response.data?.authUrl;
            if (authUrl) {
                const popup = window.open(authUrl, '_blank', 'width=600,height=700');

                // Listen for message from popup
                const handleMessage = async (event: MessageEvent) => {
                    if (event.data?.type === 'OAUTH_SUCCESS') {
                        window.removeEventListener('message', handleMessage);
                        clearInterval(statusCheckInterval);
                        clearInterval(popupCheckInterval);
                        // Verify connection and fetch user info
                        await checkOAuthConnection();
                    }
                };
                window.addEventListener('message', handleMessage);

                // Actively check OAuth status every 2 seconds
                const statusCheckInterval = setInterval(async () => {
                    try {
                        const statusResponse = await checkMeetingOAuthStatus();
                        if (statusResponse.data?.isConnected) {
                            // User has successfully connected!
                            clearInterval(statusCheckInterval);
                            clearInterval(popupCheckInterval);
                            window.removeEventListener('message', handleMessage);
                            if (popup && !popup.closed) {
                                popup.close();
                            }
                            // Fetch user info and update forms
                            await checkOAuthConnection();
                        }
                    } catch (error) {
                        // Silently continue polling if check fails
                        console.log('Checking OAuth status...');
                    }
                }, 2000); // Check every 2 seconds

                // Also check if popup was closed manually
                const popupCheckInterval = setInterval(() => {
                    if (popup?.closed) {
                        clearInterval(statusCheckInterval);
                        clearInterval(popupCheckInterval);
                        window.removeEventListener('message', handleMessage);

                        // Check OAuth status three times with delays after popup closes
                        const checkWithDelay = async (delay: number, attempt: number) => {
                            setTimeout(async () => {
                                console.log(`Checking OAuth status (attempt ${attempt}/3)...`);
                                await checkOAuthConnection();
                            }, delay);
                        };

                        // Check after 500ms, 1000ms, and 1500ms
                        checkWithDelay(500, 1);
                        checkWithDelay(1000, 2);
                        checkWithDelay(1500, 3);
                    }
                }, 1000);

                // Stop all polling after 3 minutes
                setTimeout(() => {
                    clearInterval(statusCheckInterval);
                    clearInterval(popupCheckInterval);
                    window.removeEventListener('message', handleMessage);
                }, 180000);
            }
        } catch (err: any) {
            setError('Failed to get authorization URL');
        }
    };

    const handleDisconnect = async () => {
        try {
            await disconnectMeetingOAuth();
            setIsOAuthConnected(false);
            // Clear form data
            setInstantForm({ hostName: "", hostEmail: "", subject: "" });
            setScheduleForm({
                hostName: "",
                hostEmail: "",
                subject: "",
                description: "",
                scheduledDate: "",
                scheduledTime: "",
                duration: 30,
            });
        } catch (err: any) {
            setError('Failed to disconnect Google account');
        }
    };

    // Instant meeting form
    const [instantForm, setInstantForm] = useState<MeetingFormData>({
        hostName: "",
        hostEmail: "",
        subject: "",
    });

    // Scheduled meeting form
    const [scheduleForm, setScheduleForm] = useState<ScheduleMeetingFormData>({
        hostName: "",
        hostEmail: "",
        subject: "",
        description: "",
        scheduledDate: "",
        scheduledTime: "",
        duration: 30,
    });

    const resetForms = () => {
        setInstantForm({ hostName: "", hostEmail: "", subject: "" });
        setScheduleForm({
            hostName: "",
            hostEmail: "",
            subject: "",
            description: "",
            scheduledDate: "",
            scheduledTime: "",
            duration: 30,
        });
        setSuccess(null);
        setError(null);
    };

    const handleClose = () => {
        resetForms();
        onClose();
    };

    const handleInstantMeeting = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await createInstantMeeting(instantForm);
            const meetingLink = response.data?.meetingLink;

            if (meetingLink) {
                // Open Google Meet in new tab
                window.open(meetingLink, "_blank");
                setSuccess(
                    `Meeting created! A notification has been sent. Meeting #: ${response.data?.meeting?.meetingNumber}`
                );
            }
        } catch (err: any) {
            setError(err.message || "Failed to create meeting");
        } finally {
            setIsLoading(false);
        }
    };

    const handleScheduleMeeting = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await scheduleMeeting(scheduleForm);
            const meetingNumber = response.data?.meeting?.meetingNumber;

            // Show success toast
            setToast({
                message: `Meeting scheduled successfully! Confirmation sent to ${scheduleForm.hostEmail}`,
                type: "success"
            });

            // Close modal after a short delay
            setTimeout(() => {
                handleClose();
            }, 2000);
        } catch (err: any) {
            setError(err.message || "Failed to schedule meeting");
            setToast({
                message: err.message || "Failed to schedule meeting",
                type: "error"
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Generate time slots
    const timeSlots = [];
    for (let h = 9; h <= 18; h++) {
        timeSlots.push(`${h.toString().padStart(2, "0")}:00`);
        if (h < 18) timeSlots.push(`${h.toString().padStart(2, "0")}:30`);
    }

    // Get minimum date (today)
    const today = new Date().toISOString().split("T")[0];

    // Track client-side mounting for portal
    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isOpen || !isMounted) return null;

    const modalContent = (
        <div className="fixed inset-0 z-[99999] flex items-start justify-center pt-16">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm z-[99998]"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="relative z-[99999] bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 max-h-[90vh] flex flex-col overflow-hidden animate-fadeIn">
                {/* Header */}
                <div className="bg-gradient-to-r from-[#B30437] to-[#8B0329] p-6 text-white">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold">Schedule a Meeting</h2>
                        <button
                            onClick={handleClose}
                            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                            aria-label="Close modal"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Tabs */}
                    <div className="flex mt-4 bg-white/10 rounded-lg p-1">
                        <button
                            onClick={() => {
                                setActiveTab("instant");
                                setError(null);
                                setSuccess(null);
                            }}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === "instant"
                                ? "bg-white text-[#B30437]"
                                : "text-white hover:bg-white/10"
                                }`}
                        >
                            📞 Call Now
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab("schedule");
                                setError(null);
                                setSuccess(null);
                            }}
                            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${activeTab === "schedule"
                                ? "bg-white text-[#B30437]"
                                : "text-white hover:bg-white/10"
                                }`}
                        >
                            📅 Schedule
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 overflow-y-auto flex-1">
                    {/* OAuth Connection Status */}
                    {isCheckingOAuth ? (
                        <div className="flex items-center justify-center py-8">
                            <svg className="animate-spin h-8 w-8 text-[#B30437]" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                            </svg>
                        </div>
                    ) : !isOAuthConnected ? (
                        <div className="text-center py-6">
                            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">Connect Google Account</h3>
                            <p className="text-sm text-gray-600 mb-6">
                                To create meetings with unique Google Meet links, please connect your Google account.
                            </p>
                            <button
                                onClick={handleConnectGoogle}
                                className="inline-flex items-center gap-3 bg-white border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Sign in with Google
                            </button>
                            <div className="mt-4">
                                <button
                                    onClick={checkOAuthConnection}
                                    className="text-xs text-[#B30437] hover:text-[#8B0329] underline transition-colors"
                                >
                                    Refresh connection status
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            {/* Connected indicator */}
                            <div className="mb-4">
                                <div className="flex items-center gap-2 text-sm text-green-700 bg-green-50 px-3 py-2 rounded-lg">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                    </svg>
                                    Google connected
                                </div>
                                <div className="mt-2 text-xs">
                                    <button
                                        onClick={handleDisconnect}
                                        className="text-[#B30437] hover:text-[#8B0329] underline transition-colors"
                                    >
                                        Disconnect
                                    </button>
                                </div>
                            </div>

                            {/* Success Message */}
                            {success && (
                                <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg text-green-800 text-sm">
                                    ✅ {success}
                                </div>
                            )}

                            {/* Error Message */}
                            {error && (
                                <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
                                    ❌ {error}
                                </div>
                            )}

                            {/* Instant Meeting Form */}
                            {activeTab === "instant" && (
                                <form onSubmit={handleInstantMeeting} className="space-y-4">
                                    <p className="text-sm text-gray-600 mb-4">
                                        Start a meeting now and we&apos;ll notify our team that you&apos;re waiting.
                                    </p>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Your Name *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={instantForm.hostName}
                                            onChange={(e) =>
                                                setInstantForm({ ...instantForm, hostName: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B30437] focus:border-transparent transition-all text-gray-900"
                                            placeholder="Enter your name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Your Email *
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={instantForm.hostEmail}
                                            onChange={(e) =>
                                                setInstantForm({ ...instantForm, hostEmail: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B30437] focus:border-transparent transition-all text-gray-900"
                                            placeholder="your@email.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Subject (Optional)
                                        </label>
                                        <input
                                            type="text"
                                            value={instantForm.subject}
                                            onChange={(e) =>
                                                setInstantForm({ ...instantForm, subject: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B30437] focus:border-transparent transition-all text-gray-900"
                                            placeholder="What's this about?"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-[#B30437] hover:bg-[#8B0329] text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        fill="none"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                                Starting Meeting...
                                            </>
                                        ) : (
                                            <>
                                                📞 Start Call Now
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}

                            {/* Schedule Meeting Form */}
                            {activeTab === "schedule" && (
                                <form onSubmit={handleScheduleMeeting} className="space-y-4">
                                    <p className="text-sm text-gray-600 mb-4">
                                        Schedule a meeting and receive a confirmation email with the meeting link.
                                    </p>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Your Name *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={scheduleForm.hostName}
                                                onChange={(e) =>
                                                    setScheduleForm({ ...scheduleForm, hostName: e.target.value })
                                                }
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B30437] focus:border-transparent transition-all text-gray-900"
                                                placeholder="Your name"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Your Email *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={scheduleForm.hostEmail}
                                                onChange={(e) =>
                                                    setScheduleForm({ ...scheduleForm, hostEmail: e.target.value })
                                                }
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B30437] focus:border-transparent transition-all text-gray-900"
                                                placeholder="your@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={scheduleForm.subject}
                                            onChange={(e) =>
                                                setScheduleForm({ ...scheduleForm, subject: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B30437] focus:border-transparent transition-all text-gray-900"
                                            placeholder="Meeting subject"
                                        />
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Date *
                                            </label>
                                            <input
                                                type="date"
                                                required
                                                min={today}
                                                value={scheduleForm.scheduledDate}
                                                onChange={(e) =>
                                                    setScheduleForm({ ...scheduleForm, scheduledDate: e.target.value })
                                                }
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B30437] focus:border-transparent transition-all text-gray-900"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                                Time *
                                            </label>
                                            <select
                                                required
                                                value={scheduleForm.scheduledTime}
                                                onChange={(e) =>
                                                    setScheduleForm({ ...scheduleForm, scheduledTime: e.target.value })
                                                }
                                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B30437] focus:border-transparent transition-all text-gray-900"
                                            >
                                                <option value="">Select time</option>
                                                {timeSlots.map((time) => (
                                                    <option key={time} value={time}>
                                                        {time}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Duration
                                        </label>
                                        <select
                                            value={scheduleForm.duration}
                                            onChange={(e) =>
                                                setScheduleForm({ ...scheduleForm, duration: parseInt(e.target.value) })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B30437] focus:border-transparent transition-all text-gray-900"
                                        >
                                            <option value={15}>15 minutes</option>
                                            <option value={30}>30 minutes</option>
                                            <option value={45}>45 minutes</option>
                                            <option value={60}>1 hour</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Notes (Optional)
                                        </label>
                                        <textarea
                                            value={scheduleForm.description}
                                            onChange={(e) =>
                                                setScheduleForm({ ...scheduleForm, description: e.target.value })
                                            }
                                            rows={3}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#B30437] focus:border-transparent transition-all resize-none text-gray-900"
                                            placeholder="Any additional information..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="w-full bg-[#B30437] hover:bg-[#8B0329] text-white font-semibold py-3 px-4 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                        fill="none"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                    />
                                                </svg>
                                                Scheduling...
                                            </>
                                        ) : (
                                            <>
                                                📅 Schedule Meeting
                                            </>
                                        )}
                                    </button>
                                </form>
                            )}
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <>
            {createPortal(modalContent, document.body)}
            {toast && (
                <Toast
                    message={toast.message}
                    type={toast.type}
                    onClose={() => setToast(null)}
                    duration={3000}
                />
            )}
        </>
    );
};

export default MeetingModal;

