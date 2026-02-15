
import { Link } from "react-router-dom";


export const CustomLogo = () => {
  return (
    <Link to='/' className="flex items-center space-x-4">
      <div className="flex items-center gap-2">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold tracking-tight">
          <span className="text-foreground">Bunker</span>
          <span className="text-gradient">|Shop</span>
        </h1>
      </div>
    </Link>
  );
};
