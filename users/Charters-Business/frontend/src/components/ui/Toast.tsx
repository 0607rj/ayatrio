"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";

interface ToastProps {
    message: string;
    type?: "success" | "error" | "info";
    duration?: number;
    onClose: () => void;
}

const Toast = ({ message, type = "success", duration = 3000, onClose }: ToastProps) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration, onClose]);

    const bgColor = {
        success: "bg-green-500",
        error: "bg-red-500",
        info: "bg-blue-500",
    }[type];

    const icon = {
        success: "✓",
        error: "✕",
        info: "ℹ",
    }[type];

    const toastContent = (
        <div className="fixed top-4 right-4 z-100000 animate-slideInRight">
            <div className={`${bgColor} text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-3 min-w-[300px] max-w-md`}>
                <div className="w-6 h-6 flex items-center justify-center bg-white/20 rounded-full font-bold">
                    {icon}
                </div>
                <p className="flex-1 text-sm font-medium">{message}</p>
                <button
                    onClick={onClose}
                    className="w-6 h-6 flex items-center justify-center hover:bg-white/20 rounded-full transition-colors"
                    aria-label="Close toast"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </div>
    );

    return createPortal(toastContent, document.body);
};

export default Toast;
