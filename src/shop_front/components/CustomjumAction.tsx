import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";

interface PropsClick {
  //definimos las funciones de los botones
  onClickExpolore: () => void;
  onClickTrends?: () => void;

  //definimos el contenido de los botones
  titleButtonExplore: string;
  titleButtonTrends?: string;
}

export const CustomjumAction = ({
  onClickExpolore,
  titleButtonExplore,
}: PropsClick) => {
  return (
    <>
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
        <Button
          onClick={onClickExpolore}
          size="lg"
          className="button-gradient rounded-full px-10 h-14 text-lg font-semibold gap-2 cursor-pointer  "
        >
          <Zap className="h-5 w-5" />
          {titleButtonExplore}
        </Button>
      </div>
    </>
  );
};
