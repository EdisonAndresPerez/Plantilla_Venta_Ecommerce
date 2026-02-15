import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface AuthContainerProps {
  children: ReactNode;
}

export const AuthContainer = ({ children }: AuthContainerProps) => {
  return (
    <div className="min-h-screen bunker-gradient flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background animated shapes */}
      <motion.div
        className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, hsl(0,0%,100%) 0%, transparent 70%)" }}
        animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-20%] left-[-10%] w-[400px] h-[400px] rounded-full opacity-[0.03]"
        style={{ background: "radial-gradient(circle, hsl(0,0%,100%) 0%, transparent 70%)" }}
        animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md relative z-10"
      >
        {/* Logo */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h1 className="font-display text-6xl tracking-[0.2em] text-bunker-light">
            BUNKER
          </h1>
          <motion.div
            className="h-[1px] mx-auto mt-2 bg-bunker-gray/30"
            initial={{ width: 0 }}
            animate={{ width: "60%" }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
          />
          <motion.p
            className="text-bunker-gray text-sm tracking-[0.3em] uppercase mt-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Shop
          </motion.p>
        </motion.div>

        {/* Card Container */}
        <motion.div
          className="bg-bunker-surface/80 backdrop-blur-xl rounded-2xl p-8 border border-bunker-border/50 bunker-glow"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>

        {/* Footer */}
        <motion.p
          className="text-center text-bunker-gray/50 text-xs mt-8 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          © 2026 Bunker|Shop. Todos los derechos reservados.
        </motion.p>
      </motion.div>
    </div>
  );
};
