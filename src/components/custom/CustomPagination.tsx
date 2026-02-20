import { useSearchParams } from 'react-router';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/button';

interface Props {
  totalPages: number;
}

export const CustomPagination = ({ totalPages }: Props) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryPage = searchParams.get('page') || '1';
  const page = isNaN(+queryPage) ? 1 : +queryPage;

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;

    searchParams.set('page', page.toString());

    setSearchParams(searchParams);

    // Pequeño delay para que React actualice el DOM primero
    setTimeout(() => {
      const productsSection = document.getElementById('products-section');
      if (productsSection) {
        // Calcular posición con offset para headers
        const yOffset = -80; // Ajusta este valor si tienes header fijo
        const y = productsSection.getBoundingClientRect().top + window.pageYOffset + yOffset;
        
        window.scrollTo({ top: y, behavior: 'smooth' });
      } else {
        // Si no existe la sección, scroll al inicio
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="flex items-center justify-center gap-1 sm:gap-2 px-4 py-8">
      <Button
        variant="outline"
        size="sm"
        disabled={page === 1}
        onClick={() => handlePageChange(page - 1)}
        className="rounded-full h-9 sm:h-10 px-3 sm:px-4"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline ml-1">Anteriores</span>
      </Button>

      {/* Show all pages on desktop, limited on mobile */}
      <div className="flex items-center gap-1 sm:gap-2">
        {/* Mobile: Only show current page and adjacent */}
        <div className="flex sm:hidden items-center gap-1">
          {page > 1 && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page - 1)}
              className="h-9 w-9 rounded-full p-0"
            >
              {page - 1}
            </Button>
          )}
          <Button
            variant="default"
            size="sm"
            className="h-9 w-9 rounded-full p-0"
          >
            {page}
          </Button>
          {page < totalPages && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(page + 1)}
              className="h-9 w-9 rounded-full p-0"
            >
              {page + 1}
            </Button>
          )}
        </div>

        {/* Desktop: Show all pages */}
        <div className="hidden sm:flex items-center gap-2">
          {Array.from({ length: totalPages }).map((_, index) => (
            <Button
              key={index}
              variant={page === index + 1 ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePageChange(index + 1)}
              className="h-10 w-10 rounded-full p-0"
            >
              {index + 1}
            </Button>
          ))}
        </div>
      </div>

      <Button
        variant="outline"
        size="sm"
        disabled={page === totalPages}
        onClick={() => handlePageChange(page + 1)}
        className="rounded-full h-9 sm:h-10 px-3 sm:px-4"
      >
        <span className="hidden sm:inline mr-1">Siguientes</span>
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};