
import React from 'react';

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-md bg-stone-900 rounded-2xl shadow-xl border border-stone-800 p-8 text-center transform transition-all duration-300 scale-95 opacity-0 animate-slide-down" style={{ animationFillMode: 'forwards' }}>
                <div className="mb-6">
                    <div className="w-20 h-20 mx-auto bg-green-500 rounded-full flex items-center justify-center text-4xl text-white animate-success-pop">
                        <i className="fas fa-check"></i>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-100">Check Your Email!</h2>
                <p className="text-gray-400 mt-2 mb-8">We've sent a password reset link to your email address.</p>
                <button 
                    onClick={onClose} 
                    className="w-full py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 transition-all duration-300"
                >
                    Got it
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;
