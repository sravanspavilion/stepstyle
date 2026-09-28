type IconProps = {
  name: string;
  className?: string;
  /** 0 = outlined glyph, 1 = filled glyph (uses the variable FILL axis) */
  fill?: 0 | 1;
};

export function Icon({ name, className = "text-[20px]", fill = 0 }: IconProps) {
  return (
    <span
      aria-hidden="true"
      className={`material-symbols-outlined select-none ${className}`}
      style={fill === 1 ? { fontVariationSettings: "'FILL' 1" } : undefined}
    >
      {name}
    </span>
  );
}

export function StarRow({
  rating,
  iconClass = "text-[16px]",
  containerClass = "flex items-center gap-0.5 text-amber-500",
}: {
  rating: number;
  iconClass?: string;
  containerClass?: string;
}) {
  const full = Math.floor(rating);
  const hasHalf = rating - full >= 0.25 && rating - full < 0.75;
  const rounded = Math.round(rating);

  return (
    <span className={containerClass} aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon
          key={i}
          name={i < full || (i === full && hasHalf) ? "star" : i === rounded ? "star_half" : "star"}
          className={iconClass}
          fill={1}
        />
      ))}
    </span>
  );
}
