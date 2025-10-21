// src/components/ui/toggle.tsx
interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  className?: string;
}

export const Toggle = ({ checked, onChange, className = "" }: ToggleProps) => (
  <button
    onClick={() => onChange(!checked)}
    className={`relative w-11 h-5 rounded-full transition-colors duration-200 ${
      checked ? "bg-green-500" : "bg-gray-300"
    } ${className}`}
  >
    <span
      className={`absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-transform duration-200 ${
        checked ? "translate-x-6" : "translate-x-0"
      }`}
    />
  </button>
);
