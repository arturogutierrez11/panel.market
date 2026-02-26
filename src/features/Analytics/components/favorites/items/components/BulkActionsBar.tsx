type Props = {
  selectedCount: number;
  onRemoveSelected: () => void;
};

export function BulkActionsBar({
  selectedCount,
  onRemoveSelected
}: Props) {
  if (!selectedCount) return null;

  return (
    <div className="flex justify-between items-center bg-zinc-800 p-4 rounded-xl">
      <div>{selectedCount} productos seleccionados</div>
      <button
        onClick={onRemoveSelected}
        className="bg-red-600 px-4 py-2 rounded-lg"
      >
        Eliminar seleccionados
      </button>
    </div>
  );
}