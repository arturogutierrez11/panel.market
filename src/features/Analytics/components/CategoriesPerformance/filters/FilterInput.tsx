type Props = {
  label: string;
  value: string;
  onChange: (value: string) => void;
};

export function FilterInput({ label, value, onChange }: Props) {
  return (
    <div className="space-y-1">
      <label className="text-xs font-medium text-zinc-500 uppercase tracking-wide">
        {label}
      </label>

      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full
          bg-zinc-900
          border border-zinc-800
          rounded-lg
          px-3 py-2
          text-sm
          text-white
          placeholder:text-zinc-600
          focus:outline-none
          focus:ring-2
          focus:ring-blue-600
          focus:border-blue-600
          transition
        "
      />
    </div>
  );
}