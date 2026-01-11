import { Button } from "@/components/ui/button";
import { TrendingUp, Zap } from "lucide-react";

interface PropsClick {
  //definimos las funciones de los botones
  onClickExpolore: () => void;
  onClickTrends: () => void;

  //definimos el contenido de los botones
  titleButtonExplore: string;
  titleButtonTrends: string;
}

export const CustomjumAction = ({
  onClickExpolore,
  onClickTrends,
  titleButtonExplore,
  titleButtonTrends,
}: PropsClick) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          onClick={onClickExpolore}
          size="lg"
          className="button-gradient rounded-full px-10 h-14 text-lg font-semibold gap-2"
        >
          <Zap className="h-5 w-5" />
          {titleButtonExplore}
        </Button>
        <Button
          size="lg"
          onClick={onClickTrends}
          variant="outline"
          className="rounded-full px-10 h-14 text-lg font-semibold border-2 hover:bg-secondary hover:text-white hover:border-secondary transition-all"
        >
          <TrendingUp className="h-5 w-5 mr-2" />
          {titleButtonTrends}
        </Button>
      </div>
    </>
  );
};
