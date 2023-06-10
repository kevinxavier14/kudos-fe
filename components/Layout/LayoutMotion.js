import { motion } from "framer-motion";

export default function LayoutMotion({ children }) {
    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
                width: "100%",
                height: "100%",
                margin: "0",
                padding: "0",
                display: "flex",
            }}
        >
            {children}
        </motion.section>
    );
}
