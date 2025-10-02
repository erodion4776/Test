
import React, { useState } from 'react';

interface ResetPasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
    onReset: (email: string) => Promise<boolean>;
}

const ResetPasswordModal: React.FC<ResetPasswordModalProps> = ({ isOpen, onClose, onReset }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    
    if (!isOpen) return null;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        if (!email) {
            setError('Please enter a valid email address');
            return;
        }
        setIsLoading(true);
        const success = await onReset(email);
        if (success) {
            setEmail(''); // Clear on success
        } else {
            setError('No account found with this email address.');
        }
        setIsLoading(false);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
            <div className="relative w-full max-w-md bg-stone-900 rounded-2xl shadow-xl border border-stone-800 p-8 transform transition-all duration-300 scale-95 opacity-0 animate-slide-down" style={{animationFillMode: 'forwards'}}>
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-violet-400 transition-transform hover:rotate-90">
                    <i className="fas fa-times text-2xl"></i>
                </button>
                <div className="text-center mb-8">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl text-white">
                        <i className="fas fa-key"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-100">Reset Your Password</h2>
                    <p className="text-gray-400 mt-2">We'll send you a link to reset your password</p>
                </div>
                
                <form onSubmit={handleSubmit}>
                    <div className="space-y-2 mb-6">
                         <label htmlFor="reset-email" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                             <i className="fas fa-envelope text-violet-400"></i>
                             Email Address
                         </label>
                         <input
                            type="email"
                            id="reset-email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-3 bg-black/30 border-2 rounded-lg text-gray-200 placeholder-gray-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${error ? 'border-red-500' : 'border-stone-700 focus:border-violet-500'}`}
                            placeholder="you@example.com"
                            required
                         />
                         {error && <p className="text-red-500 text-sm mt-2 animate-shake">{error}</p>}
                    </div>

                    <div className="space-y-4">
                        <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300">
                            {isLoading ? <><i className="fas fa-spinner fa-spin"></i><span>Sending...</span></> : <span>Send Reset Link</span>}
                        </button>
                        <button type="button" onClick={onClose} className="w-full py-3 px-4 border-2 border-stone-700 rounded-full text-base font-semibold text-gray-300 bg-transparent hover:border-violet-500 hover:text-violet-400 transition-all duration-300">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ResetPasswordModal;
