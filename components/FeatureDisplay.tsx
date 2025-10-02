
import React, { useState, useEffect, useRef } from 'react';

const StatItem: React.FC<{ icon: string; finalCount: number; label: string; isPercentage?: boolean }> = ({ icon, finalCount, label, isPercentage }) => {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const duration = 2000;
                    const increment = finalCount / (duration / 20);

                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= finalCount) {
                            setCount(finalCount);
                            clearInterval(timer);
                        } else {
                            setCount(Math.ceil(start));
                        }
                    }, 20);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [finalCount]);

    return (
        <div ref={ref} className="text-center">
            <div className="w-10 h-10 mx-auto mb-2 bg-violet-500/10 rounded-full flex items-center justify-center text-violet-400">
                <i className={`fas ${icon}`}></i>
            </div>
            <h3 className="text-2xl font-bold text-violet-300 mb-1">{count.toLocaleString()}{isPercentage ? '%' : ''}</h3>
            <p className="text-xs text-gray-500 uppercase tracking-wider">{label}</p>
        </div>
    );
};


const FeatureDisplay: React.FC = () => {
    const features = [
        "AI-powered dream interpretation",
        "Personal dream journal",
        "Pattern recognition & insights",
        "Community of dreamers",
    ];

    return (
        <div className="hidden md:flex flex-col items-center justify-center p-12 bg-gradient-to-br from-violet-900/10 to-cyan-900/5 border-l border-stone-800">
            <div className="max-w-sm mx-auto text-center">
                <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-violet-500 to-cyan-500 rounded-full flex items-center justify-center text-5xl text-white animate-float-icon">
                    <i className="fas fa-brain"></i>
                </div>
                <h2 className="text-3xl font-bold text-gray-100 mb-4">Your Dreams Await</h2>
                <p className="text-gray-400 leading-relaxed">
                    Access your personal dream journal and continue exploring the depths of your subconscious mind.
                </p>

                <div className="grid grid-cols-3 gap-4 my-10 p-6 bg-black/20 rounded-lg">
                    <StatItem icon="fa-moon" finalCount={50000} label="Dreams Interpreted" />
                    <StatItem icon="fa-chart-line" finalCount={98} label="Accuracy Rate" isPercentage />
                    <StatItem icon="fa-users" finalCount={15000} label="Active Dreamers" />
                </div>

                <div className="space-y-3 text-left">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3 p-3 bg-black/10 rounded-md">
                            <i className="fas fa-check-circle text-green-500 text-xl"></i>
                            <span className="text-gray-300 text-sm">{feature}</span>
                        </div>
                    ))}
                </div>
                
                <div className="mt-10 inline-flex items-center gap-2 py-2 px-4 bg-violet-500/10 border border-violet-500/30 rounded-full text-sm text-violet-300">
                    <i className="fas fa-shield-alt"></i>
                    <span>Your data is encrypted and secure</span>
                </div>
            </div>
        </div>
    );
};

export default FeatureDisplay;
