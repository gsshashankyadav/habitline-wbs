import { motion } from 'motion/react';

export default function SlideButton({ children, className }) {
    return (
        <motion.button
            className={`relative overflow-hidden ${className}`}
            initial="rest"
            whileHover="hover"
            animate="rest"
            variants={{
                rest: { scale: 1 },
                hover: { scale: 0.95 },
            }}
            transition={{
                type: "spring",
                stiffness: 350,
                damping: 22,
            }}
        >
            {/* ORIGINAL CONTENT */}
            <motion.span
                variants={{
                    rest: { y: 0 },
                    hover: { y: "-100%", opacity: 0 },
                }}
                transition={{ duration: 0.2, ease: "easeIn" }}
                className="block"
            >
                {children}
            </motion.span>

            {/* HOVER CONTENT */}
            <motion.span
                variants={{
                    rest: { y: "100%", opacity: 0 },
                    hover: { y: 0, opacity: 1 },
                }}
                transition={{ duration: 0.2, ease: "easeIn" }}
                className="absolute inset-0 flex items-center justify-center"
            >
                {children}
            </motion.span>
        </motion.button>
    );
}
