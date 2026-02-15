import { Search, ShoppingBag, Menu, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useProductFilters } from "@/hooks/useProductFilters";
import { Link, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";


export const CustomHeader = () => {
  const [cartCount] = useState(3);
  const { currentSearch, setSearch } = useProductFilters();
  const [searchInput, setSearchInput] = useState(currentSearch);
  const { gender } = useParams();

  console.log(gender);

  return (
    <header className="sticky top-0 z-50 w-full glass-effect shadow-lg shadow-primary/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-18 items-center justify-between py-3">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-primary/10"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2">
              <div className="h-10 w-10 rounded-xl button-gradient flex items-center justify-center animate-pulse-glow">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight">
                <span className="text-foreground">bunker</span>
                <span className="text-gradient">|Shop</span>
              </h1>
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={cn(
                `px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:bg-primary/10 hover:text-primary`,
                !gender ? "underline underline-offset-4" : "",
              )}
            >
              Todo
            </Link>
            <Link
              to="/gender/camisetas"
              className={cn(
                `px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:bg-primary/10 hover:text-primary`,
                gender === "camisetas" ? "underline underline-offset-4" : "",
              )}
            >
              Camisetas
            </Link>
            <Link
              to="/gender/sudaderas"
              className={cn(
                `px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:bg-primary/10 hover:text-primary`,
                gender === "sudaderas" ? "underline underline-offset-4" : "",
              )}
            >
              Sudaderas
            </Link>
            <Link
              to="/gender/chaquetas"
              className={cn(
                `px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:bg-primary/10 hover:text-primary`,
                gender === "chaquetas" ? "underline underline-offset-4" : "",
              )}
            >
              Chaquetas
            </Link>
            <Link
              to="/gender/accesorios"
              className={cn(
                `px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:bg-primary/10 hover:text-primary`,
                gender === "accesorios" ? "underline underline-offset-4" : "",
              )}
            >
              Accesorios
            </Link>
          </nav>

          {/* Search and Cart */}
          <div className="flex items-center space-x-3">
            <div className="hidden md:flex items-center">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder="Buscar productos..."
                  className="pl-11 w-64 h-11 rounded-full border-2 border-transparent bg-muted/50 focus:border-primary focus:bg-white transition-all duration-300"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSearch(searchInput);
                    }
                  }}
                />
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-primary/10 rounded-full"
            >
              <Search className="h-5 w-5" />
            </Button>
                  
                  <Link to="/auth/login">
                  <Button 
                  variant="default"
                  size='sm'
                   className="cursor-pointer">
                    Iniciar Sesión
                  </Button>
                  </Link>

                   <Link to="/admin">
                  <Button 
                  variant="destructive"
                  size='sm'
                   className="cursor-pointer">
                    Panel Administrativo
                  </Button>
                  </Link>
                 
            <Button
              size="icon"
              className="relative button-gradient rounded-full h-11 w-11 cursor-pointer"
            >
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-6 w-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center shadow-lg animate-bounce">
                  {cartCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
