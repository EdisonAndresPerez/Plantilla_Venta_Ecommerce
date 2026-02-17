import { Sparkles } from "lucide-react";

export const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {/* Spinning ring */}
          <div className="h-16 w-16 rounded-full border-4 border-muted animate-spin border-t-primary"></div>
          
          {/* Center icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-10 w-10 rounded-full button-gradient flex items-center justify-center animate-pulse">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
        
        <p className="text-sm text-muted-foreground animate-pulse">Cargando...</p>
      </div>
    </div>
  );
};
