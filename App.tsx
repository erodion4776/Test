
import React, { useState, useEffect, useCallback } from 'react';
import { AlertType } from './types';
import { signInWithPassword, requestPasswordReset } from './services/authService';
import Alert from './components/Alert';
import LoginForm from './components/LoginForm';
import FeatureDisplay from './components/FeatureDisplay';
import ResetPasswordModal from './components/ResetPasswordModal';
import SuccessModal from './components/SuccessModal';

const App: React.FC = () => {
    const [alerts, setAlerts] = useState<{ id: number; message: string; type: AlertType }[]>([]);
    const [isResetModalOpen, setIsResetModalOpen] = useState(false);
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

    const addAlert = useCallback((message: string, type: AlertType) => {
        const id = Date.now();
        setAlerts(prevAlerts => [...prevAlerts, { id, message, type }]);
        if (type !== 'error') {
            setTimeout(() => {
                removeAlert(id);
            }, 5000);
        }
    }, []);

    const removeAlert = (id: number) => {
        setAlerts(prevAlerts => prevAlerts.filter(alert => alert.id !== id));
    };
    
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const message = urlParams.get('message');
        if (message) {
             switch (message) {
                case 'signup_success':
                    addAlert('Account created successfully! Please check your email to verify your account.', 'success');
                    break;
                case 'logout':
                    addAlert('You have been logged out successfully.', 'info');
                    break;
                case 'session_expired':
                    addAlert('Your session has expired. Please log in again.', 'warning');
                    break;
                case 'unauthorized':
                    addAlert('Please log in to access that page.', 'warning');
                    break;
                case 'password_reset_success':
                    addAlert('Password reset successful! You can now log in with your new password.', 'success');
                    break;
                case 'email_confirmed':
                    addAlert('Email confirmed successfully! You can now log in to your account.', 'success');
                    break;
            }
            // Clean up URL
            window.history.replaceState({}, document.title, window.location.pathname);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleLogin = async (email: string, password: string): Promise<string | null> => {
        try {
            await signInWithPassword(email, password);
            addAlert('Login successful! Redirecting...', 'success');
            setTimeout(() => {
                // Mock redirection
                console.log("Redirecting to dashboard...");
            }, 1000);
            return null;
        } catch (error: any) {
            addAlert(error.message || 'Login failed. Please try again.', 'error');
            return error.message.includes('password') ? 'password' : 'email';
        }
    };

    const handlePasswordReset = async (email: string): Promise<boolean> => {
        try {
            await requestPasswordReset(email);
            setIsResetModalOpen(false);
            setIsSuccessModalOpen(true);
            return true;
        } catch (error: any) {
             addAlert(error.message || 'Failed to send reset email.', 'error');
            return false;
        }
    };

    return (
        <div className="auth-body text-white min-h-screen flex flex-col relative overflow-x-hidden bg-stone-950">
            {/* Background Animation */}
            <div className="auth-bg fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="w-[500px] h-[500px] bg-violet-500/30 rounded-full absolute -top-[250px] -left-[250px] filter blur-3xl animate-float-shape-1"></div>
                <div className="w-[400px] h-[400px] bg-cyan-500/30 rounded-full absolute -bottom-[200px] -right-[200px] filter blur-3xl animate-float-shape-2"></div>
                <div className="w-[300px] h-[300px] bg-amber-500/30 rounded-full absolute top-1/2 left-1/2 filter blur-3xl animate-pulse-shape"></div>
                <div className="absolute inset-0">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="absolute w-0.5 h-0.5 bg-white rounded-full animate-twinkle" style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 3}s` }}></div>
                    ))}
                </div>
            </div>

            {/* Header */}
            <header className="relative p-8 z-10">
                <a href="#" className="inline-flex items-center gap-2 text-2xl font-bold text-violet-300 transition hover:scale-105">
                    <i className="fas fa-moon animate-rotate-slow text-3xl"></i>
                    <span>DreamGate</span>
                </a>
            </header>

            {/* Main Content */}
            <main className="flex-1 flex items-center justify-center p-4 sm:p-8 relative z-10">
                <div className="w-full max-w-6xl bg-stone-900/50 backdrop-blur-2xl rounded-2xl overflow-hidden shadow-2xl shadow-black/50 border border-stone-800 grid md:grid-cols-2 min-h-[600px]">
                    
                    {/* Left Side - Login Form */}
                    <div className="p-6 sm:p-12">
                        <div className="max-w-md mx-auto">
                            <div className="text-center mb-10">
                                <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full flex items-center justify-center text-4xl text-white animate-float-icon">
                                    <i className="fas fa-cloud-moon"></i>
                                </div>
                                <h1 className="text-3xl font-bold text-gray-100 mb-2">Welcome Back</h1>
                                <p className="text-gray-400">Sign in to continue your dream journey</p>
                            </div>
                            
                            <div id="alert-container" className="mb-6 space-y-4">
                                {alerts.map(alert => (
                                    <Alert key={alert.id} message={alert.message} type={alert.type} onClose={() => removeAlert(alert.id)} />
                                ))}
                            </div>
                            
                            <LoginForm onLogin={handleLogin} onForgotPassword={() => setIsResetModalOpen(true)} />
                        </div>
                    </div>
                    
                    {/* Right Side - Feature Display */}
                    <FeatureDisplay />
                </div>
            </main>
            
            <ResetPasswordModal 
                isOpen={isResetModalOpen} 
                onClose={() => setIsResetModalOpen(false)}
                onReset={handlePasswordReset}
            />

            <SuccessModal
                isOpen={isSuccessModalOpen}
                onClose={() => setIsSuccessModalOpen(false)}
            />
        </div>
    );
};

export default App;
