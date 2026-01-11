import { Button } from "@/components/ui/button";
import { TrendingUp, Zap } from "lucide-react";

export const CustomjumAction = () => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          size="lg"
          className="button-gradient rounded-full px-10 h-14 text-lg font-semibold gap-2"
        >
          <Zap className="h-5 w-5" />
          Explorar Colección
        </Button>
        <Button
          size="lg"
          variant="outline"
          className="rounded-full px-10 h-14 text-lg font-semibold border-2 hover:bg-secondary hover:text-white hover:border-secondary transition-all"
        >
          <TrendingUp className="h-5 w-5 mr-2" />
          Ver Tendencias
        </Button>
      </div>
    </>
  );
};
