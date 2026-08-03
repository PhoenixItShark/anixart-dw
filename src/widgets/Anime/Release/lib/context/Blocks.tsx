// components/Blocks.tsx
import { ReactNode } from "react";
import { cn } from "@shared/lib/utils"; // ваш cn из Tailwind (className merger)

// Основные пропсы для Block
type BlockProps = {
  children: ReactNode;
  /** Сколько колонок занимает блок (1–12, по умолчанию 1) */
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  /** Вертикальный размер (для masonry или фиксированной высоты) */
  height?: "auto" | "sm" | "md" | "lg" | "full";
  className?: string;
};

// Провайдер грида
export const BlocksProvider = ({
  children,
  cols = "auto", // 'auto' или конкретное число, напр. 4
  gap = 6,
  className,
}: {
  children: ReactNode;
  cols?: "auto" | number;
  gap?: number;
  className?: string;
}) => {
  const gridColsClass =
    cols === "auto"
      ? "grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
      : `grid-cols-${cols}`;

  return (
    <section
      className={cn(
        "grid",
        gridColsClass,
        `gap-${gap}`,
        "w-full",
        className
      )}
    >
      {children}
    </section>
  );
};

// Один блок
export const Block = ({
  children,
  span = 1,
  height = "auto",
  className,
}: BlockProps) => {
  const spanClass = span === 1 ? "" : `col-span-${span}`;
  const heightClass =
    height === "auto"
      ? ""
      : height === "sm"
      ? "h-48"
      : height === "md"
      ? "h-72"
      : height === "lg"
      ? "h-96"
      : "h-full";

  return (
    <div
      className={cn(
        "bg-color-primary rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300",
        spanClass,
        heightClass,
        "overflow-hidden flex flex-col",
        className
      )}
    >
      {children}
    </div>
  );
};