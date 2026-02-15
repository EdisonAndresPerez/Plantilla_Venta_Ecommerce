import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    
    toast.success(
      isLogin ? "Bienvenido de vuelta" : "Cuenta creada",
      {
        description: isLogin
          ? "Has iniciado sesión correctamente."
          : "Tu cuenta ha sido creada exitosamente.",
      }
    );
  };

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

        {/* Card */}
        <motion.div
          className="bg-bunker-surface/80 backdrop-blur-xl rounded-2xl p-8 border border-bunker-border/50 bunker-glow"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Toggle */}
          <div className="flex mb-8 bg-bunker-dark/50 rounded-xl p-1 relative">
            <motion.div
              className="absolute top-1 bottom-1 rounded-lg bg-bunker-border/30"
              initial={false}
              animate={{
                left: isLogin ? "4px" : "50%",
                right: isLogin ? "50%" : "4px",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
            <button
              type="button"
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 text-sm font-medium tracking-wide rounded-lg relative z-10 transition-colors duration-300 cursor-pointer ${
                isLogin ? "text-bunker-light underline underline-offset-4" : "text-bunker-gray"
              }`}
            >
              Iniciar Sesión
            </button>
            <button
              type="button"
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 text-sm font-medium tracking-wide rounded-lg relative z-10 transition-colors duration-300 cursor-pointer ${
                !isLogin ? "text-bunker-light underline underline-offset-4" : "text-bunker-gray"
              }`}
            >
              Registrarse
            </button>
          </div>

          {/* Form */}
          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "register"}
              initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
              transition={{ duration: 0.3 }}
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <Label className="text-bunker-gray text-xs tracking-widest uppercase mb-2 block">
                    Nombre completo
                  </Label>
                  <div className="relative bunker-input-focus rounded-xl">
                    <Input
                      type="text"
                      placeholder="Tu nombre"
                      className="bg-bunker-dark/50 border-bunker-border/30 text-bunker-light placeholder:text-bunker-gray/50 h-12 rounded-xl pl-4 focus-visible:ring-bunker-border/50 focus-visible:ring-offset-0"
                    />
                  </div>
                </motion.div>
              )}

              <div>
                <Label className="text-bunker-gray text-xs tracking-widest uppercase mb-2 block">
                  Email
                </Label>
                <div className="relative bunker-input-focus rounded-xl">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bunker-gray/50" />
                  <Input
                    type="email"
                    placeholder="tu@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-bunker-dark/50 border-bunker-border/30 text-bunker-light placeholder:text-bunker-gray/50 h-12 rounded-xl pl-11 focus-visible:ring-bunker-border/50 focus-visible:ring-offset-0"
                    required
                  />
                </div>
              </div>

              <div>
                <Label className="text-bunker-gray text-xs tracking-widest uppercase mb-2 block">
                  Contraseña
                </Label>
                <div className="relative bunker-input-focus rounded-xl">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bunker-gray/50" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="bg-bunker-dark/50 border-bunker-border/30 text-bunker-light placeholder:text-bunker-gray/50 h-12 rounded-xl pl-11 pr-11 focus-visible:ring-bunker-border/50 focus-visible:ring-offset-0"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-bunker-gray/50 hover:text-bunker-light transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {isLogin && (
                <motion.div
                  className="text-right"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <button
                    type="button"
                    className="text-xs text-bunker-gray hover:text-bunker-light transition-colors tracking-wide cursor-pointer"
                  >
                    ¿Olvidaste tu contraseña?
                  </button>
                </motion.div>
              )}

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-bunker-light text-bunker-dark hover:bg-bunker-light/90 rounded-xl font-semibold tracking-wide text-sm group transition-all duration-300 cursor-pointer"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <>
                      {isLogin ? "Entrar" : "Crear cuenta"}
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </motion.div>
            </motion.form>
          </AnimatePresence>

          {/* Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-[1px] bg-bunker-border/30" />
            <span className="text-bunker-gray text-xs tracking-widest">O</span>
            <div className="flex-1 h-[1px] bg-bunker-border/30" />
          </div>

          {/* Social */}
          <motion.div
            className="space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Button
              variant="outline"
              className="w-full h-12 bg-transparent border-bunker-border/30 text-bunker-light hover:bg-bunker-border/10 hover:text-bunker-light rounded-xl tracking-wide text-sm cursor-pointer"
            >
              <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continuar con Google
            </Button>
          </motion.div>
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

export default LoginPage;