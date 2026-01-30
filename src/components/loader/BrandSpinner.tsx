'use client';

type Props = {
  size?: number;
};

export function BrandSpinner({ size = 52 }: Props) {
  return (
    <div className="flex items-center justify-center py-28">
      <div
        className="relative"
        style={{ width: size, height: size }}
      >
        {/* Outer ring */}
        <div
          className="
            absolute inset-0
            rounded-full
            border border-gray-200
          "
        />

        {/* Inner spinning ring */}
        <div
          className="
            absolute inset-2
            rounded-full
            border-2
            border-transparent
            border-t-gray-900
            animate-spin
          "
        />
      </div>
    </div>
  );
}