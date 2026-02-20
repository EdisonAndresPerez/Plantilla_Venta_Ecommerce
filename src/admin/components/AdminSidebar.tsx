import { CustomLogo } from "@/shop_front/components/CustomLogo";
import { NavLink } from "./NavLink";
import {
  LayoutDashboard,
  ShoppingBag,
  Tags,
  BarChart3,
  Settings,
  Package,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useStoreAuth } from "@/auth/store/auth.store";

const navItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Productos", url: "/admin/products", icon: ShoppingBag },
  { title: "Categorías", url: "/admin/categories", icon: Tags },
  { title: "Inventario", url: "/admin/inventory", icon: Package },

];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen = true, onClose }: AdminSidebarProps) {



  const {user} = useStoreAuth()
  console.log(user)


  return (
    <>
      {/* Overlay para móvil */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-60 flex-col border-r border-border bg-sidebar transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo y botón cerrar */}
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <CustomLogo />
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 px-3 py-4">
          <p className="mb-3 px-3 font-mono text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Menu
          </p>
          {navItems.map((item) => (
            <NavLink
              key={item.url}
              to={item.url}
              end={item.url === "/admin"}
              onClick={() => onClose?.()} 
              className="flex items-center gap-3 rounded-sm px-3 py-2.5 text-sm text-sidebar-foreground transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              activeClassName="bg-sidebar-accent text-primary font-medium"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.title}</span>
            </NavLink>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-border p-4">
          <div className="flex items-center gap-3">

            <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-secondary font-mono text-xs font-bold text-secondary-foreground">
              {user?.email.charAt(0).toUpperCase()}
            </div>
            
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-foreground">{user?.roles}</p>
              <p className="truncate text-xs text-muted-foreground">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}