type Props = {
  open: boolean;
  onConfirm: () => void;
  onClose: () => void;
  disabled?: boolean;
};

export function ConfirmDeleteModal({
  open,
  onConfirm,
  onClose,
  disabled = false,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl w-[420px] shadow-2xl">
        
        <h3 className="text-lg font-semibold mb-2 text-white">
          ¿Eliminar carpeta?
        </h3>

        <p className="text-sm text-zinc-400 mb-6">
          Esta acción no se puede deshacer.
        </p>

        {disabled && (
          <div className="mb-4 text-xs text-yellow-400 bg-yellow-500/10 border border-yellow-500/30 rounded-lg px-3 py-2">
            No podés eliminar una carpeta cerrada.
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-xl text-sm transition"
          >
            Cancelar
          </button>

          <button
            onClick={onConfirm}
            disabled={disabled}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition ${
              disabled
                ? 'bg-red-900/40 text-red-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-500 text-white'
            }`}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}