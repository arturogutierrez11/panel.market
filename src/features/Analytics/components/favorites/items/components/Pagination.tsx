type Props = {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export function Pagination({ page, totalPages, onPageChange }: Props) {
  return (
    <div className="flex justify-center gap-4 mt-6">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
      >
        ← Anterior
      </button>

      <span>
        Página {page} de {totalPages}
      </span>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
      >
        Siguiente →
      </button>
    </div>
  );
}