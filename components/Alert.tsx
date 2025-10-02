
import React from 'react';
import { AlertType } from '../types';

interface AlertProps {
    message: string;
    type: AlertType;
    onClose: () => void;
}

const alertStyles = {
    [AlertType.Success]: {
        bg: 'bg-green-500/10',
        border: 'border-green-500',
        text: 'text-green-400',
        icon: 'fa-check-circle'
    },
    [AlertType.Error]: {
        bg: 'bg-red-500/10',
        border: 'border-red-500',
        text: 'text-red-400',
        icon: 'fa-exclamation-circle'
    },
    [AlertType.Warning]: {
        bg: 'bg-yellow-500/10',
        border: 'border-yellow-500',
        text: 'text-yellow-400',
        icon: 'fa-exclamation-triangle'
    },
    [AlertType.Info]: {
        bg: 'bg-blue-500/10',
        border: 'border-blue-500',
        text: 'text-blue-400',
        icon: 'fa-info-circle'
    },
};

const Alert: React.FC<AlertProps> = ({ message, type, onClose }) => {
    const styles = alertStyles[type];

    return (
        <div className={`flex items-center gap-3 p-4 rounded-md border animate-slide-down ${styles.bg} ${styles.border} ${styles.text}`}>
            <i className={`fas ${styles.icon}`}></i>
            <span className="flex-1 text-sm">{message}</span>
            <button className="ml-auto bg-transparent border-none text-inherit cursor-pointer p-1 opacity-70 hover:opacity-100" onClick={onClose}>
                <i className="fas fa-times"></i>
            </button>
        </div>
    );
};

export default Alert;
