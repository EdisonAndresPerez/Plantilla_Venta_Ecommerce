import { useState } from "react";
import { Product } from "@/types/product";
import { categories } from "@/data/mockProducts";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { X } from "lucide-react";

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;
  onSave: (product: Partial<Product>) => void;
}

export function ProductFormDialog({ open, onOpenChange, product, onSave }: ProductFormDialogProps) {
  const [formData, setFormData] = useState<Partial<Product>>(
    product || { name: "", category: "", price: 0, stock: 0, sizes: [], status: "draft", description: "" }
  );

  const [sizeInput, setSizeInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onOpenChange(false);
  };

  const addSize = () => {
    if (sizeInput.trim() && !formData.sizes?.includes(sizeInput.trim())) {
      setFormData({ ...formData, sizes: [...(formData.sizes || []), sizeInput.trim()] });
      setSizeInput("");
    }
  };

  const removeSize = (size: string) => {
    setFormData({ ...formData, sizes: formData.sizes?.filter((s) => s !== size) });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg border-border bg-card">
        <DialogHeader>
          <DialogTitle className="font-mono text-lg tracking-tight">
            {product ? "EDITAR PRODUCTO" : "NUEVO PRODUCTO"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Nombre
            </Label>
            <Input
              value={formData.name || ""}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="mt-1 rounded-sm border-border bg-secondary font-mono"
              placeholder="NOMBRE DEL PRODUCTO"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Categoría
              </Label>
              <Select
                value={formData.category}
                onValueChange={(val) => setFormData({ ...formData, category: val })}
              >
                <SelectTrigger className="mt-1 rounded-sm border-border bg-secondary font-mono">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent className="border-border bg-card">
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                Precio (USD)
              </Label>
              <Input
                type="number"
                step="0.01"
                value={formData.price || ""}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) })}
                className="mt-1 rounded-sm border-border bg-secondary font-mono"
                required
              />
            </div>
          </div>

          <div>
            <Label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Stock
            </Label>
            <Input
              type="number"
              value={formData.stock || ""}
              onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) })}
              className="mt-1 rounded-sm border-border bg-secondary font-mono"
              required
            />
          </div>

          <div>
            <Label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Tallas
            </Label>
            <div className="mt-1 flex gap-2">
              <Input
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
                className="rounded-sm border-border bg-secondary font-mono"
                placeholder="Ej: M, L, 42..."
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSize())}
              />
              <Button type="button" variant="outline" onClick={addSize} className="rounded-sm font-mono">
                +
              </Button>
            </div>
            <div className="mt-2 flex flex-wrap gap-1.5">
              {formData.sizes?.map((size) => (
                <span
                  key={size}
                  className="inline-flex items-center gap-1 rounded-sm border border-border bg-secondary px-2 py-0.5 font-mono text-xs text-secondary-foreground"
                >
                  {size}
                  <button type="button" onClick={() => removeSize(size)}>
                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div>
            <Label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
              Descripción
            </Label>
            <Textarea
              value={formData.description || ""}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 rounded-sm border-border bg-secondary font-mono"
              rows={3}
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="ghost" onClick={() => onOpenChange(false)} className="rounded-sm font-mono">
              Cancelar
            </Button>
            <Button type="submit" className="rounded-sm font-mono">
              {product ? "Guardar Cambios" : "Crear Producto"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
