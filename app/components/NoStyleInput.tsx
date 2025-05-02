import { useAtom } from "jotai";
import { cardStateAtom } from "~/atom/card";

export default function NoStyleInput({
  value,
  onChange,
  placeholder,
  className = "",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}) {
  const [cardState, setCardState] = useAtom(cardStateAtom);
  return cardState.drawIng ? (
    <span className={className}>{value}</span>
  ) : (
    <input
      aria-label="No Style Input"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`bg-transparent outline-none w-auto ${className}`}
      style={{ width: `${value.length}ch` }}
    />
  );
}
