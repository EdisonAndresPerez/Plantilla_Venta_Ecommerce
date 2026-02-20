import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { AuthContainer } from "@/auth/components/AuthContainer";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { loginAction } from "@/auth/actions/login.action";

const LoginPage = () => {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

   // console.log({email, password})
   
   
   try {
      const data = await loginAction(email, password)
      localStorage.setItem("token", data.token)
      console.log("Login exitoso:", data);
      console.log("redireccionando a home...");
      navigate("/")
    } catch (error) {
      console.log(error);
      toast.error("Error al iniciar sesión", {
        description: "Revisa tus credenciales e intenta de nuevo.",
      });
      setIsLoading(false);
      return;
    }



    // Simulate loading
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);

    toast.success("Bienvenido de vuelta", {
      description: "Has iniciado sesión correctamente.",
    });
  };

  return (
    <AuthContainer>
      <div className="space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-bunker-light tracking-wide">
            Iniciar Sesión
          </h2>
          <p className="text-bunker-gray text-sm mt-2">
            Ingresa tus credenciales para acceder
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div>
            <Label className="text-bunker-gray text-xs tracking-widest uppercase mb-2 block">
              Email
            </Label>
            <div className="relative bunker-input-focus rounded-xl">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-bunker-gray/50" />
              <Input
                type="email"
                placeholder="tu@email.com"
                name="email"
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
                name="password"
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

          <div className="text-right">
            <button
              type="button"
              className="text-xs text-bunker-gray hover:text-bunker-light transition-colors tracking-wide cursor-pointer"
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-bunker-light text-bunker-dark hover:bg-bunker-light/90 rounded-xl font-semibold tracking-wide text-sm group transition-all duration-300 cursor-pointer"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Entrar
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </Button>
          </motion.div>
        </motion.form>

        {/* Divider */}
        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-[1px] bg-bunker-border/30" />
          <span className="text-bunker-gray text-xs tracking-widest">O</span>
          <div className="flex-1 h-[1px] bg-bunker-border/30" />
        </div>

        {/* Social */}
        <motion.div
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

        {/* Link to Register */}
        <div className="text-center mt-6">
          <p className="text-bunker-gray text-sm">
            ¿No tienes una cuenta?{" "}
            <Link
              to="/auth/register"
              className="text-bunker-light hover:underline underline-offset-4 font-medium cursor-pointer"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </AuthContainer>
  );
};

export default LoginPage;