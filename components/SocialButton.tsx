
import React from 'react';

interface SocialButtonProps {
    provider: 'google' | 'github';
    onClick: () => void;
}

const providerConfig = {
    google: {
        icon: 'fab fa-google',
        text: 'Continue with Google',
        hoverClasses: 'hover:border-red-500/50 hover:bg-red-500/10 hover:text-red-400',
    },
    github: {
        icon: 'fab fa-github',
        text: 'Continue with GitHub',
        hoverClasses: 'hover:border-green-500/50 hover:bg-green-500/10 hover:text-green-400',
    }
};

const SocialButton: React.FC<SocialButtonProps> = ({ provider, onClick }) => {
    const config = providerConfig[provider];

    return (
        <button
            type="button"
            onClick={onClick}
            className={`w-full flex items-center justify-center gap-3 py-3 px-4 border-2 border-stone-700 rounded-full text-sm font-medium text-gray-300 transition-all duration-300 ${config.hoverClasses}`}
        >
            <i className={`${config.icon} text-xl`}></i>
            <span>{config.text}</span>
        </button>
    );
};

export default SocialButton;
