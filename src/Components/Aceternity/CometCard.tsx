import React, { useEffect, useRef } from "react";

export const CometCard = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const div = divRef.current;
        if (!div) return;

        const updateMousePosition = (e: MouseEvent) => {
            if (!div) return;
            const rect = div.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            div.style.setProperty("--mouse-x", `${x}px`);
            div.style.setProperty("--mouse-y", `${y}px`);
        };

        div.addEventListener("mousemove", updateMousePosition);

        return () => {
            div.removeEventListener("mousemove", updateMousePosition);
        };
    }, []);

    return (
        <div
            ref={divRef}
            className={`group relative overflow-hidden rounded-3xl border border-white/10 ${className || ""}`}
            style={{
                background: "radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(139, 92, 246, 0.15), transparent 40%)",
            }}
        >
            {/* Animated Comet/Meteor Effect */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
                {[...Array(20)].map((_, i) => (
                    <span
                        key={i}
                        className="absolute h-[2px] w-[100px] animate-meteor-effect opacity-0"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 50%, rgba(255,255,255,0) 100%)",
                            animationDelay: `${Math.random() * 5}s`,
                            animationDuration: `${2 + Math.random() * 3}s`,
                            transform: "rotate(-45deg)",
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative z-10">{children}</div>
        </div>
    );
};
