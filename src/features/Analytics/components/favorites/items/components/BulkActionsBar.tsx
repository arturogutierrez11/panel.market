type Props = {
  selectedCount: number;
  onRemoveSelected: () => void;
  disabled?: boolean; 
};

export function BulkActionsBar({
  selectedCount,
  onRemoveSelected,
  disabled
}: Props) {
  if (!selectedCount) return null;

  return (
    <div className="flex justify-between items-center bg-zinc-800 p-4 rounded-xl">
      <div>{selectedCount} productos seleccionados</div>
      <button
  disabled={disabled}
  onClick={onRemoveSelected}
  className={`px-4 py-2 rounded-lg ${
    disabled
      ? "bg-zinc-700 cursor-not-allowed"
      : "bg-red-600"
  }`}
>
  Eliminar seleccionados
</button>
    </div>
  );
}