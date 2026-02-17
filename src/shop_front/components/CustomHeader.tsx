import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useProductFilters } from "@/hooks/useProductFilters";
import { Link, useParams } from "react-router-dom";
import { cn } from "@/lib/utils";
import { CustomLogo } from "./CustomLogo";


export const CustomHeader = () => {
  const [cartCount] = useState(3);
  const { currentSearch, setSearch } = useProductFilters();
  const [searchInput, setSearchInput] = useState(currentSearch);
  const { gender } = useParams();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Todo", active: !gender },
    { to: "/gender/camisetas", label: "Camisetas", active: gender === "camisetas" },
    { to: "/gender/sudaderas", label: "Sudaderas", active: gender === "sudaderas" },
    { to: "/gender/chaquetas", label: "Chaquetas", active: gender === "chaquetas" },
    { to: "/gender/accesorios", label: "Accesorios", active: gender === "accesorios" },
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
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    placeholder="Buscar productos..."
                    className="pl-11 w-48 xl:w-64 h-11 rounded-full border-2 border-transparent bg-muted/50 focus:border-primary focus:bg-white transition-all duration-300"
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
                <Link to="/auth/login">
                  <Button variant="default" size="sm" className="cursor-pointer text-xs">
                    <span className="hidden lg:inline">Iniciar Sesión</span>
                    <span className="lg:hidden">Login</span>
                  </Button>
                </Link>

                <Link to="/admin" className="hidden xl:inline-block">
                  <Button variant="destructive" size="sm" className="cursor-pointer text-xs  bg-yellow-500  text-black  font-semibold">
                    Admin
                  </Button>
                </Link>
              </div>

              {/* Cart */}
              <Button
                size="icon"
                className="relative button-gradient rounded-full h-10 w-10 sm:h-11 sm:w-11 cursor-pointer"
              >
                <ShoppingBag className="h-4 w-4 sm:h-5 sm:w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 sm:h-6 sm:w-6 rounded-full  bg-yellow-500  text-white text-[10px] sm:text-xs font-bold flex items-center justify-center shadow-lg animate-bounce">
                    {cartCount}
                  </span>
                )}
              </Button>
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
                <Link to="/auth/login" onClick={() => setMobileMenuOpen(false)}>
                  <Button variant="default" className="w-full cursor-pointer">
                    Iniciar Sesión
                  </Button>
                </Link>
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
