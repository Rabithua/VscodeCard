import { useAtom } from "jotai";
import { cardStateAtom } from "~/atom/card";
import { useMemo, useRef, useLayoutEffect, useState } from "react";

// 使用 Canvas 精确测量文本宽度
function measureTextWidth(text: string, font: string): number {
  // 检查是否在浏览器环境
  if (typeof document === "undefined") {
    return text.length * 8; // SSR 降级方案
  }

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return text.length * 8; // 降级方案

  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

// 获取元素的计算字体样式
function getComputedFont(element: HTMLElement): string {
  if (typeof window === "undefined") {
    return "14px monospace"; // SSR 降级方案
  }

  const style = window.getComputedStyle(element);
  return `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
}

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
  const [cardState] = useAtom(cardStateAtom);
  const inputRef = useRef<HTMLInputElement>(null);
  const [font, setFont] = useState("14px monospace"); // 默认字体

  // 获取真实的字体样式
  useLayoutEffect(() => {
    if (inputRef.current) {
      setFont(getComputedFont(inputRef.current));
    }
  }, [className]);

  const inputWidth = useMemo(() => {
    const text = value || placeholder || "";
    if (!text) return "1ch";

    const textWidth = measureTextWidth(text, font);
    // const bufferWidth = 8; // 8px 缓冲空间
    return `${textWidth}px`;
  }, [value, placeholder, font]);

  return cardState.drawIng ? (
    <span className={className}>{value}</span>
  ) : (
    <input
      ref={inputRef}
      aria-label="No Style Input"
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`bg-transparent outline-none w-auto ${className}`}
      style={{ width: inputWidth, minWidth: "1ch" }}
    />
  );
}
