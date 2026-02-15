import { Link } from "react-router";
import { Button } from "@/components/ui/button";

export const Not404 = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-6xl font-bold text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mt-4">Página no encontrada</p>
        <Link to="/">
          <Button className="mt-4">Volver a la página principal</Button>
        </Link>
      </div>
    </>
  );
};
