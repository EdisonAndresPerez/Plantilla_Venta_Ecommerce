import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useProductFilters } from "@/hooks/useProductFilters";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CustomLogo } from "./CustomLogo";
import { useStoreAuth } from "@/auth/store/auth.store";
import { useFavoritesStore } from "@/shop_front/store/favorites.store";


export const CustomHeader = () => {

  const {authStatus, logout, isAdmin} = useStoreAuth()
  //console.log(user)

  const favoritesCount = useFavoritesStore((state) => state.favoriteIds.length);
  const { currentSearch, setSearch } = useProductFilters();
  const [searchInput, setSearchInput] = useState(currentSearch);
  const { pathname } = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setSearchInput(currentSearch);
  }, [currentSearch]);

  const scrollToProductsSection = () => {
    // Espera a que React renderice los nuevos resultados tras cambiar los query params.
    setTimeout(() => {
      const productsSection = document.getElementById("products-section");

      if (!productsSection) {
        return;
      }

      const yOffset = -80;
      const y = productsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }, 100);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSearch(searchInput);
    scrollToProductsSection();
  };

  const navLinks = [
    { to: "/", label: "Todo", active: pathname === "/" },
    { to: "/gender/camisetas", label: "Camisetas", active: pathname === "/gender/camisetas" },
    { to: "/gender/sudaderas", label: "Sudaderas", active: pathname === "/gender/sudaderas" },
    { to: "/gender/chaquetas", label: "Chaquetas", active: pathname === "/gender/chaquetas" },
    { to: "/gender/accesorios", label: "Accesorios", active: pathname === "/gender/accesorios" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 w-full glass-effect shadow-lg shadow-primary/5">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex h-16 sm:h-18 items-center justify-between">
            {/* Menu Mobile Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden hover:bg-primary/10"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            {/* Logo */}
            <div className="flex-1 md:flex-none flex justify-center md:justify-start">
              <CustomLogo />
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={cn(
                    "px-3 lg:px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 hover:bg-primary/10 hover:text-primary",
                    link.active ? "underline underline-offset-4" : ""
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Search and Cart */}
            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Search Desktop */}
              <div className="hidden lg:flex items-center">
                <form className="relative group" onSubmit={handleSearchSubmit}>
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder="Buscar productos..."
                    className="pl-11 w-48 xl:w-64 h-11 rounded-full border-2 border-transparent bg-muted/50 focus:border-primary focus:bg-white transition-all duration-300"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                </form>
              </div>

              {/* Search Mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-primary/10 rounded-full"
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Auth Buttons - Hidden on small mobile */}
              <div className="hidden sm:flex items-center gap-2">
                {authStatus === "not-authenticated" ? (
                  <Link to="/auth/login">
                    <Button variant="default" size="sm" className="cursor-pointer text-xs">
                      <span className="hidden lg:inline">Iniciar Sesión</span>
                      <span className="lg:hidden">Login</span>
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    variant="default" 
                    size="sm" 
                    className="cursor-pointer text-xs"
                    onClick={logout}
                  >
                    <span className="hidden lg:inline">Cerrar Sesión</span>
                    <span className="lg:hidden">Salir</span>
                  </Button>
                )}

                {isAdmin() && (
                  <Link to="/admin" className="hidden xl:inline-block">
                    <Button variant="default" size="sm" className="cursor-pointer text-xs  bg-yellow-500 hover:bg-amber-400  text-black  font-semibold">
                      Panel Administrativo
                    </Button>
                  </Link>
                )}
              </div>

              {/* Cart */}
              <Link
                to="/cart"
                aria-label="Ir al carrito"
                className="transition-transform duration-300 hover:scale-105 active:scale-95"
              >
                <Button
                  size="icon"
                  className="relative button-gradient rounded-full h-10 w-10 sm:h-11 sm:w-11 cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
                >
                  <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                    {favoritesCount > 0 && (
                    <span className="absolute -top-1 -right-1 h-5 w-5 sm:h-6 sm:w-6 rounded-full  bg-yellow-500  text-white text-[10px] sm:text-xs font-bold flex items-center justify-center shadow-lg animate-bounce">
                        {favoritesCount}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 z-40 md:hidden">
          {/* Overlay */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Menu Content */}
          <div className="relative bg-background border-b border-border shadow-lg">
            <nav className="container mx-auto px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "block px-4 py-3 text-base font-medium rounded-lg transition-all duration-300",
                    link.active
                      ? "bg-primary/10 text-primary"
                      : "hover:bg-primary/5"
                  )}
                >
                  {link.label}
                </Link>
              ))}

              <div className="pt-4 space-y-2 border-t border-border">
                {authStatus === "not-authenticated" ? (
                  <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                    <Button variant="default" className="w-full cursor-pointer">
                      Iniciar Sesión
                    </Button>
                  </Link>
                ) : (
                  <Button 
                    variant="default" 
                    className="w-full cursor-pointer"
                    onClick={() => {
                      logout();
                      setMobileMenuOpen(false);
                    }}
                  >
                    Cerrar Sesión
                  </Button>
                )}
                <Link to="/admin" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="outline" className="w-full cursor-pointer">
                    Panel Administrativo
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};
