
import React, { useState } from 'react';
import { signInWithProvider } from '../services/authService';
import SocialButton from './SocialButton';

interface LoginFormProps {
    onLogin: (email: string, password: string) => Promise<string | null>;
    onForgotPassword: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, onForgotPassword }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorField, setErrorField] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorField(null);
        setIsLoading(true);
        const fieldWithError = await onLogin(email, password);
        if (fieldWithError) {
            setErrorField(fieldWithError);
        }
        setIsLoading(false);
    };

    const handleSocialLogin = async (provider: 'google' | 'github') => {
        await signInWithProvider(provider);
    };
    
    const handleDemoLogin = async () => {
        setIsLoading(true);
        await onLogin('demo@dreamgate.com', 'DemoUser123!');
        setIsLoading(false);
    }

    return (
        <>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
                <SocialButton provider="google" onClick={() => handleSocialLogin('google')} />
                <SocialButton provider="github" onClick={() => handleSocialLogin('github')} />
            </div>

            <div className="text-center relative my-8">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-stone-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="bg-stone-900/50 px-4 text-gray-500 uppercase tracking-wider backdrop-blur-sm">or sign in with email</span>
                </div>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="space-y-2">
                    <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                        <i className="fas fa-envelope text-violet-400"></i>
                        Email Address
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full px-4 py-3 bg-black/30 border-2 rounded-lg text-gray-200 placeholder-gray-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${errorField === 'email' ? 'border-red-500' : 'border-stone-700 focus:border-violet-500'}`}
                        placeholder="you@example.com"
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="password" className="flex items-center gap-2 text-sm font-medium text-gray-300">
                        <i className="fas fa-lock text-violet-400"></i>
                        Password
                    </label>
                    <div className="relative">
                        <input
                            type={isPasswordVisible ? 'text' : 'password'}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-4 py-3 bg-black/30 border-2 rounded-lg text-gray-200 placeholder-gray-500 transition duration-300 focus:outline-none focus:ring-2 focus:ring-violet-500/50 ${errorField === 'password' ? 'border-red-500' : 'border-stone-700 focus:border-violet-500'}`}
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                        />
                        <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute inset-y-0 right-0 px-4 text-gray-500 hover:text-violet-400 transition">
                            <i className={`fas ${isPasswordVisible ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                        </button>
                    </div>
                </div>
                
                <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                        <input type="checkbox" id="remember" checked={remember} onChange={(e) => setRemember(e.target.checked)} className="h-4 w-4 rounded border-stone-600 bg-stone-800 text-violet-500 focus:ring-violet-600 cursor-pointer" />
                        <label htmlFor="remember" className="text-gray-400 cursor-pointer">Remember me</label>
                    </div>
                    <a href="#" onClick={(e) => { e.preventDefault(); onForgotPassword(); }} className="font-medium text-violet-400 hover:underline">Forgot password?</a>
                </div>

                <div className="space-y-4">
                    <button type="submit" disabled={isLoading} className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-full shadow-sm text-base font-semibold text-white bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-700 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:-translate-y-0.5">
                        {isLoading ? <><i className="fas fa-spinner fa-spin"></i><span>Signing in...</span></> : <span>Sign In</span>}
                    </button>
                    <button type="button" onClick={handleDemoLogin} disabled={isLoading} className="w-full flex justify-center items-center gap-2 py-3 px-4 border-2 border-stone-700 rounded-full shadow-sm text-base font-semibold text-gray-300 bg-transparent hover:border-violet-500 hover:text-violet-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300">
                        <i className="fas fa-user-astronaut"></i>
                        <span>Try Demo Account</span>
                    </button>
                </div>
            </form>
            
            <div className="text-center mt-8 pt-8 border-t border-stone-800">
                <p className="text-gray-400">Don't have an account? <a href="#" className="font-medium text-violet-400 hover:underline">Sign up free</a></p>
            </div>
        </>
    );
};

export default LoginForm;
